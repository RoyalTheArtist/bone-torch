import { BoneTorch } from "./apps/sewerMaster"
function main() {
    const game = new BoneTorch()

    game.start()
}

window.onload = () => {
  main()
}