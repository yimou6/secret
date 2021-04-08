import {IpcRenderer} from "electron";
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare interface Window {
//   ipcRenderer: IpcRenderer
// }

declare global {
  interface Window {
    ipcRenderer: IpcRenderer
  }
}
