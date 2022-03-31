declare interface ImportMeta{
    GlobNext<T,Eager extends boolean>(pattern:string|string[],options?:GlobOptions<Eager>):Eager extends true?Record<string,T>:Record<string,(() => Promise<T>)>
}
declare interface GlobOptions<Eager extends boolean>{
    eager:Eager
}