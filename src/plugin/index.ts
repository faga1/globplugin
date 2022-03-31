import type {Plugin} from 'vite'
import fg from 'fast-glob'
import MagicString from 'magic-string'
import {parse} from 'acorn'
import type {GlobOptions} from '../vue-env'
import type { ArrayExpression,Literal, ObjectExpression, Property } from 'estree'

const {dirname} = require('path')

export interface Options{

}
const importGlobRe = /\bimport\.meta\.GlobNext\((.*)\)/g
export default function():Plugin{
    return {
        name:'vite-plugin-glob',
        async transform(this,code,id){
            const matches = Array.from(code.matchAll(importGlobRe))
            if(!matches.length) return;
            const s = new MagicString(code)
            for(const match of matches){
                const ast = parse(`(${match[1]})`,{ecmaVersion:2020}).body[0].expression.expressions as ArrayExpression
                const arg1 = ast[0] as Literal | ArrayExpression
                const globs:string[] = []
                if(arg1.type === 'ArrayExpression'){
                    for(const element of arg1.elements){
                        if (element.type === 'Literal') globs.push(element.value as string)
                    }
                }
                const options:GlobOptions<boolean> = {}
                const arg2 = ast[1] as ObjectExpression | undefined;
                if(arg2.type === 'ObjectExpression'){
                    for(const property of arg2.properties){
                        options[property.key.name] = property.value.value;
                    }
                }
                const files = await fg(globs,{ dot: true, cwd: dirname(id) })
                const start = match.index;
                const end = start + match[0].length;
                const content = options.eager?`{${files.map(item=>`import(${item})`)}}`:
                `{${files.map(item=> `${item}: () => import(${item})\n`)}}`
                s.overwrite(start,end,content)
            }
            code = s.toString()
            console.log(code);
        }
    }
}