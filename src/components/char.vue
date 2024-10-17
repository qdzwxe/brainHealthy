<script setup lang="ts">
const props = defineProps<{
  c: string | number | undefined;
}>();
</script>

<template>
  <div class="c">
    {{ props.c ?? '　' }}
  </div>
</template>

<style scoped>
.c {
  width: 50px;
  height: 50px;
  background-color: bisque;
  text-align: center;
  font-size: 30px;
  display: inline-block;
  margin: 10px;
}
</style>
