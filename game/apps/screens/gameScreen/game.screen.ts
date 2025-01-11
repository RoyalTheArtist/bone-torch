



import { GameInputHandler } from "./game.handler"

import { BaseScreen } from "bt-engine"
import { Vector2D } from "bt-engine/utils"
import { renderSystem } from "bt-engine/graphics"
import { InputManager } from "bt-engine/input"
import { Entity } from "bt-engine/ecs"

import { Player } from '@/apps/player'
import { Settings } from "@/apps/settings"
import { GameMap } from "@/modules/map"
import { Actor, ActionQueue } from "@/modules/actors"
import { TurnSystem } from "@/modules/actors"

// 1 = wall
const turnSystem = new TurnSystem()

export class GameScreen extends BaseScreen  {
    private _handler: GameInputHandler = new GameInputHandler()
    private _map: GameMap
    private _entities: Set<Entity> = new Set()
    private _activeActors: Set<Actor> = new Set()


    constructor(map: GameMap) {
        super()
        this._map = map
    }

    public initialize(): GameScreen {
        const player = Player.spawnPlayerAt(new Vector2D(5, 5))
        player.parent = this._map
        this._entities.add(player)
        this._activeActors.add(player)
        return this
    }

    public get map(): GameMap {
        return this._map
    }
    update(delta: number) {
        const inputs = InputManager.getInputs(Settings.keyboardMappings.gameScreen)
        this._handler.handleInput(inputs)
    
        const allEntities = new Set([...this._entities, ...this.map.tileManager.tiles])

        turnSystem.query(this._activeActors)
        //drawEntitySystem.query(new Set(this._entities))
        renderSystem.query(allEntities)

        turnSystem.update()       

        //drawEntitySystem.update(delta)
        renderSystem.update(delta)

        //this.map.update(delta) // not sure if I need this, uncertain as of 10/24/2024
        renderSystem.draw()
        ActionQueue.processActions(delta)
        return this
    }
}