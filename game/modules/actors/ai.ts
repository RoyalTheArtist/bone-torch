import { Component } from "bt-engine/ecs"
import { Action, NoAction } from "./actions"
import { Actor } from "./actors"

export class AI implements Component {
    public parent: Actor

    constructor(parent: Actor) { this.parent = parent }
    public  initialize(): void {}
    public  update(_delta: number): void {}
    public  perform(_entity: Actor): Action { return new NoAction() }
}