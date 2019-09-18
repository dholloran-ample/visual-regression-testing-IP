
export * from '../types/components';
export interface CustomElementsDefineOptions {
  exclude?: string[];
  resourcesUrl?: string;
  syncQueue?: boolean;
<<<<<<< HEAD
  jmp?: (c: Function) => any;
=======
>>>>>>> development
  raf?: (c: FrameRequestCallback) => number;
  ael?: (el: EventTarget, eventName: string, listener: EventListenerOrEventListenerObject, options: boolean | AddEventListenerOptions) => void;
  rel?: (el: EventTarget, eventName: string, listener: EventListenerOrEventListenerObject, options: boolean | AddEventListenerOptions) => void;
}
export declare function defineCustomElements(win: Window, opts?: CustomElementsDefineOptions): Promise<void>;
export declare function applyPolyfills(): Promise<void>;
