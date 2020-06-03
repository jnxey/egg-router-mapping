declare module 'egg-router-mapping' {
  export const routerJSON: any[];
  export const routerMapping: Function;
  export const RouterController: Function;
  export const RouterAll: Function;
  export const RouterGet: Function;
  export const RouterPost: Function;
  export const RouterPut: Function;
  export const RouterDelete: Function;
  export const RouterPatch: Function;
  export const RouterOptions: Function;
  export const RouterHead: Function;
  export function RouterControllerMapping(name: string): Function;
  export function RouterAllMapping(name: string): Function;
  export function RouterGetMapping(name: string): Function;
  export function RouterPostMapping(name: string): Function;
  export function RouterPutMapping(name: string): Function;
  export function RouterDeleteMapping(name: string): Function;
  export function RouterPatchMapping(name: string): Function;
  export function RouterOptionsMapping(name: string): Function;
  export function RouterHeadMapping(name: string): Function;
}
