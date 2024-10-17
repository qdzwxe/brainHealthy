function brainHealthy(s) {
  const b = [0];
  let j = 0;
  const a = s.split('').filter(ss => ss !== ' ');
  const l = a.length;
  const f = findBrackets(a);
  if (f === null)
    return;
  let i = 0;
  while (i < l) {
    switch (a[i]) {
      case '<':
      case '>':
      {
        const c = a[i] !== '<';
        j = moveIndex(b, j, c).i;
        break;
      }
      case '+':
        b[j]++;
        break;
      case '-':
        b[j]--;
        break;
      case '[':
        if (b[j] === 0)
          i = f[i];
        break;
      case ']':
        if (b[j] !== 0)
          i = f[i];
        break;
      case '.':
        console.log(String.fromCharCode(b[j]));
    }
    i++;
  }
}

function findBrackets(a) {
  const r = {};
  const t = [];
  let islegal = true;
  a.forEach((v, i) => {
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

function moveIndex(a, i, p = true) {
  p ? i++ : i += 255;
  i %= 256;
  while (a.length <= i) a.push(0);
  return { a, i };
}

brainHealthy('+++++ ++[-> +++++ ++<]> .<+++ +++[- >++++ ++<]> +++++ +++++ ++.<+ +++++ [->-- ----< ]>--- ----- ---.< +++++ +[->+ +++++ <]>++ +++++ +++++ .<+++ +++[- >---- --<]> ----- ----- -.<++ ++++[ ->+++ +++<] >++++ +++++ +++.< +++++ +[->- ----- <]>-- ----- ----. <++++ ++[-> +++++ +<]>+ +++++ +++++ +.<');

// +++++ ++[-> +++++ ++<]> .< 0
// +++++ ++++[ ->+++ +++++ +<]>+ +++++ +++++ +++++ .< a
// +++++ +++[- >++++ ++++< ]>+.< A
