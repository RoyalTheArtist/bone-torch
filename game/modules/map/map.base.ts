import { Entity } from "bt-engine/ecs"
import { IInitialize } from "bt-engine"

import { Tile, TileManager } from "@/modules/tiles"
import { Vector2D } from "bt-engine/utils"
import { Actor } from "../actors/actors"
import { TurnSystem } from "../actors/actors.systems"
import { Position } from "@/apps/components"

export interface IMapData {
  width: number
  height: number
  tiles: Tile[]
}

const turnSystem = new TurnSystem()


export class GameMap extends Entity implements IInitialize {
  private _tiles: TileManager
  private _entities: Set<Entity> = new Set()
  private _activeActors: Set<Actor> = new Set()
  
  public get entities(): Set<Entity> {
    return this._entities
  }

 constructor(public size: Vector2D) {
    super()
    this._tiles = new TileManager(size)
  }

  public get width(): number {
    return this.size.x
  }

  public get height(): number { 
    return this.size.y
  }

  public get tiles(): TileManager {
    return this._tiles
  }

  public initialize() {
    this.tiles.initialize()
  }

  public update(delta: number) { 
    turnSystem.query(this._activeActors)
    turnSystem.update(delta)       
  }

  addActor(entity: Actor) {
    entity.parent = this
    this._entities.add(entity)
    this._activeActors.add(entity)
  }
  
  isWalkable(position: Vector2D) {
    const tile = this.tiles.getTile(position)
    if (this.findEntity(position)) {
      return false
    }
    if (tile) {
      return tile.passable
    } 
    
    return true
  }

  findEntity(position: Vector2D) {
    for (const entity of this._entities) {
      const positionComponent = entity.getComponent<Position>(Position)
      if (positionComponent.position.x === position.x && positionComponent.position.y === position.y) {
        return entity
      }
    }
    return null
  }

  isInBounds(position: Vector2D) {
    return position.x >= 0 && position.x < this.width && position.y >= 0 && position.y < this.width
  }

  public saveMap(): IMapData {
    return {
      width: this.width,
      height: this.height,
      tiles: this.tiles.tiles
    }
  }
}
 