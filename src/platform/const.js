import EventEmitter from "eventemitter3";

export const UPDATE_SAGA = Symbol("UPDATE_SAGA");
export const emitter = new EventEmitter();
