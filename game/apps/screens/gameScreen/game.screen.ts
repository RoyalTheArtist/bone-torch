



import { GameInputHandler } from "./game.handler"

import { BaseScreen } from "bt-engine"
import { Vector2D } from "bt-engine/utils"
import { renderSystem } from "bt-engine/graphics"
import { InputManager } from "bt-engine/input"

import { Player } from '@/apps/player'
import { Settings } from "@/apps/settings"
import { GameMap } from "@/modules/map"
import { Actor, ActionQueue } from "@/modules/actors"
import { SurfaceLayer } from "bt-engine/render"
import { Item } from "@/modules/items/items.base"

// 1 = wall

export class GameScreen extends BaseScreen  {
    private _handler: GameInputHandler = new GameInputHandler()
    private _map: GameMap

    constructor(map: GameMap) {
        super()
        this._map = map
    }

    public initialize(): GameScreen {
        const player = Player.spawnPlayerAt(new Vector2D(5, 5))
        player.parent = this._map


        const rat = Actor.spawnRat(new Vector2D(7, 7))
        rat.parent = this._map

        const rat2 = Actor.spawnRat(new Vector2D(2, 2))
       
        const healingScroll = Item.makeScroll(new Vector2D(2, 5))
        this.map.addEntity(healingScroll)


        this.map.addActor(player)
        this.map.addActor(rat)
        this.map.addActor(rat2)

        SurfaceLayer.setZoom(3)

        return this
    }

    public get map(): GameMap {
        return this._map
    }
    update(delta: number) {
        const inputs = InputManager.getInputs(Settings.keyboardMappings.gameScreen)
        this._handler.handleInput(inputs)
    
        const allEntities = new Set([...this.map.entities, ...this.map.tiles.tiles])

        this.map.update(delta) 
        ActionQueue.processActions(delta)
        renderSystem.query(allEntities)
        renderSystem.update(delta)
        renderSystem.draw()
       
        return this
    }
}