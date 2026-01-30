const fs = require('fs');
const code = fs.readFileSync('src/App.jsx', 'utf8');
let stack = [];
let inS = false, inD = false, inT = false, esc = false;
for (let i = 0; i < code.length; i++) {
  const c = code[i];
  if (esc) { esc = false; continue; }
  if (c === '\\') { esc = true; continue; }
  if (inS) { if (c === "'") inS = false; continue; }
  if (inD) { if (c === '"') inD = false; continue; }
  if (inT) { if (c === '`') inT = false; continue; }
  if (c === "'") { inS = true; continue; }
  if (c === '"') { inD = true; continue; }
  if (c === '`') { inT = true; continue; }
  if (c === '{') stack.push(i);
  if (c === '}') stack.pop();
}
console.log('balance', stack.length, 'last', stack[stack.length - 1]);
