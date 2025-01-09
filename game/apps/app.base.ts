import { IInitialize, IStart } from "bt-engine";

export abstract class App implements IInitialize, IStart { 
    initialize(): void {}
    start(): void {}
}