/// <reference types="vite/client" />

declare type Option<T> = T | null;
declare type WithId<T> = T & { id: string };
declare type MouseTouchEvent = MouseEvent | TouchEvent;
