declare module 'egg-router-mapping' {
  interface Params {
    name?: string;
    tips?: string;
    accept?: any;
    returns?: any;
    middleware?: any;
  }
  export const routerJSON: any[];
  export const routerMapping: Function;
  export const RouterController: Function;
  export function RouterController(options: Params): Function;
  export function RouterAll(options: Params): Function;
  export function RouterGet(options: Params): Function;
  export function RouterPost(options: Params): Function;
  export function RouterPut(options: Params): Function;
  export function RouterDelete(options: Params): Function;
  export function RouterPatch(options: Params): Function;
  export function RouterOptions(options: Params): Function;
  export function RouterHead(options: Params): Function;
}
