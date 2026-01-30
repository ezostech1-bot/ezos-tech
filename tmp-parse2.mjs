import fs from "fs";
import { parse } from "@babel/parser";
const code = fs.readFileSync("src/App.jsx","utf8");
try{
  parse(code,{sourceType:"module",plugins:["jsx"]});
  console.log('parse ok');
}catch(e){
  console.log('parse error',e.message,e.loc);
}
