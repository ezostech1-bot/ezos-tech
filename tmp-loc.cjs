const fs = require('fs');
const code = fs.readFileSync('src/App.jsx','utf8');
const idx = 60163;
const before = code.slice(0, idx);
const line = before.split('\n').length;
const col = idx - before.lastIndexOf('\n') - 1;
console.log({line, col});
console.log(code.split('\n').slice(line-3, line+3).join('\n'));
