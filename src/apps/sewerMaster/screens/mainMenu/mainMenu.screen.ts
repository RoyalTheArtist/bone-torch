
import { GameScreen } from "../gameScreen"

import { InputManager } from "bt-engine/input"
import { SurfaceLayer } from "bt-engine/render"
import { BaseScreen } from "bt-engine/screen.base"
import { Color, Vector2D } from "bt-engine/utils"

import { Settings } from "@/sewerMaster/settings"

export class MainMenuScreen extends BaseScreen {
    initialize() {
        
    }
    update(_delta: number) {
        const inputs = InputManager.getInputs(Settings.keyboardMappings.mainMenu)
        if (inputs.actions.has("new_game") && inputs.actions.get("new_game") === "pressed") {
            return new GameScreen().initialize()
        }
        
        SurfaceLayer.background.clear()
        SurfaceLayer.foreground.clear()

        const white = new Color(255, 255, 255)

        SurfaceLayer.background.surface.drawText('Sewer Master', new Vector2D(400, 200), white, 32)
        SurfaceLayer.background.surface.drawText('(N) New Game', new Vector2D(400, 250), white, 16)
        SurfaceLayer.background.surface.drawText('(T) Test Chamber', new Vector2D(400, 275), white, 16)
        SurfaceLayer.background.surface.drawText('(Q) Quit', new Vector2D(400, 300), white, 16)
        
        return this
    }
}
