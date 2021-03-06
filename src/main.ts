import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
interface ModuleType{
    name:number
}
const modules = import.meta.GlobNext<ModuleType,true>(['./fixtures/*.ts','!**/b.ts'],{eager:true});
Promise.all(Object.keys(modules).map(i=>modules[i]())).then((values)=>{
    console.log(values);
})