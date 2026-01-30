import fs from "fs";
import { parse } from "@babel/parser";
const code = fs.readFileSync("src/App.jsx","utf8");
const ast = parse(code,{sourceType:"module",plugins:["jsx"],errorRecovery:true});
console.log(ast.errors.map(e=>({message:e.message,loc:e.loc})));
