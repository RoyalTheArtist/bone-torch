import { NoAction } from "@/modules/actors";
import { StandardGameInput } from "bt-engine/input";
import { InputHandler } from "@/apps/handler.base";

export class MainMenuInputHandler extends InputHandler {
    handleInput(_input: StandardGameInput) {
        return new NoAction()
    }
}
