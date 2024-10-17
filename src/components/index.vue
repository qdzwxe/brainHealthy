<script setup lang="ts">
import { computed, ref } from 'vue';
import char from './char.vue';

type Accept = ['+', '-', '<', '>', '[', ']', ',', '.'];
type bfChar = Accept[number];
interface History {
  step: number;
  index: number;
  memory: number[];
}

const step = ref(-1);
const memory = ref([0]);
const index = ref(0);
const str = ref('');
const accept = ['+', '-', '<', '>', '[', ']', ',', '.'];
const arr = computed(() => str.value.split('').filter(s => accept.includes(s)));
const len = computed(() => arr.value.length);
const brackets = computed(() => findBrackets(arr.value));
const islegal = computed(() => brackets.value instanceof Object);
const history: History[] = [];

function getNext(steps: number) {
  if (step.value + steps >= len.value
    || step.value + steps < 0
  ) {
    return;
  }
  step.value += steps;
  const a = arr.value;
  const b = brackets.value;
  const m = memory.value;
  let i = index.value;
  let s = step.value;

  if (history[s]) { // todo
    return history[s];
  }

  switch (a[s]) {
    case '<':
      i = moveIndex(m, i, false).i;
      break;
    case '>':
      i = moveIndex(m, i).i;
      break;
    case '+':
      m[i]++;
      break;
    case '-':
      m[i]--;
      break;
    case '[':
      if (m[i] === 0)
        s = b[s];
      break;
    case ']':
      if (m[i] !== 0)
        s = b[s];
      break;
    case '.':
      print(String.fromCharCode(m[i]));
      break;
  }
  index.value = i;
  step.value = s;
}

function print(s: string) {
  console.log(s);
}

function findBrackets(a: bfChar[]) {
  if (a.length === 0)
    return {};
  const r: Record<number, number> = {};
  const t: [bfChar, number][] = [];
  let islegal = true;
  a.forEach((v: bfChar, i: number) => {
    if (!islegal)
      return;
    if (v === '[') {
      t.push([v, i]);
    }
    else if (v === ']') {
      const p = t.pop();
      if (!p) {
        islegal = false;
      }
      else {
        r[p[1]] = i;
        r[i] = p[1];
      }
    }
  });
  if (t.length)
    islegal = false;
  return islegal ? r : null;
}

function moveIndex(m: number[], i: number, p = true) {
  p ? i++ : i += 255;
  i %= 256;
  while (m.length <= i) m.push(0);
  return { m, i };
}
</script>

<template>
  <div>
    <input v-model="str">
    <button disabled>
      Start!
    </button>
  </div>
  <div v-if="islegal" id="content">
    <div id="steps">
      <char :c="step > 1 ? arr[step - 2] : void 0" style="opacity: 15%;" />
      <char :c="step > 0 ? arr[step - 1] : void 0" style="opacity: 50%;" />
      <char :c="arr[step]" />
      <char :c="step < len - 1 ? arr[step + 1] : void 0" style="opacity: 50%;" />
      <char :c="step < len - 2 ? arr[step + 2] : void 0" style="opacity: 15%;" />
    </div>
    <div id="step">
      <button disabled @click="getNext(-1)">
        &lt;Prev
      </button>
      <div id="list">
        {{ step + 1 }}/{{ len }}
      </div>
      <button @click="getNext(1)">
        Next&gt;
      </button>
    </div>
    <div id="memory">
      <char :c="index > 1 ? memory[index - 2] : void 0" style="opacity: 15%;" />
      <char :c="index > 0 ? memory[index - 1] : void 0" style="opacity: 50%;" />
      <char :c="memory[index]" />
      <char :c="memory[index + 1]" style="opacity: 50%;" />
      <char :c="memory[index + 2]" style="opacity: 15%;" />
    </div>
    <div id="index">
      {{ index }}
    </div>
  </div>
  <div v-else-if="arr.length !== 0">
    Invalid input, please check.
  </div>
</template>

<style scoped>
#step {
  width: 350px;
  text-align: center;
}

#list {
  width: 100px;
  display: inline-block;
}

#index {
  width: 350px;
  text-align: center;
}
</style>
