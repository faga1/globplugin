declare interface ImportMeta{
    GlobNext<T>(pattern:string):Record<string,(() => Promise<T>)>
}
declare interface GlobOptions{
    eager:boolean
}