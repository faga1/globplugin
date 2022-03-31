import type {Plugin} from 'vite'
import fg from 'fast-glob'
import MagicString from 'magic-string'
import {parse} from 'acorn'
import type {GlobOptions} from '../vue-env'
import type { ArrayExpression,Literal, ObjectExpression } from 'estree'

const {dirname} = require('path')

export interface Options{

}
const importGlobRe = /\bimport\.meta\.globNext(?:<\w+>)\((.*)\)/g
export default function():Plugin{
    return {
        name:'vite-plugin-glob',
        async transform(this,code,id){
            // const matches = Array.from(code.matchAll(importGlobRe))
            // if(!matches.length) return;
            // const s = new MagicString(code)
            // for(const match of matches){
            //     console.log(match);
            //     const ast = parse(`(${match[1]})`,{ecmaVersion:2020}).body[0].expression as ArrayExpression
            //     console.log(ast);
            //     const arg1 = ast.elements[0] as Literal | ArrayExpression
            //     const globs:string[] = []
            //     if(arg1.type === 'ArrayExpression'){
            //         for(const element of arg1.elements){
            //             if (element.type === 'Literal') globs.push(element.value as string)
            //         }
            //     }
            //     const options:GlobOptions<boolean> = {}
            //     const arg2 = ast.elements[1] as ObjectExpression | undefined;
            //     console.log(arg2);
            //     const files = await fg(globs,{ dot: true, cwd: dirname(id) })
            //     const start = match.index;
            //     const end = start + match[0].length;
            //     const content = `{
            //         ${files.map(item=>{
            //             return `${item}: () => import(${item})`
            //         })}
            //     }`
            //     s.overwrite(start,end,content)
            // }
            // code = s.toString()
        }
    }
}