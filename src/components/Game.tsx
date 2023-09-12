import { Board } from "./Board"

export function Game() {


    class Game {
        playerOne : string
        playerTwo : string
        movelist : string[]
        currentTurnColor : "white" | "black"
        // false for black true for white

        constructor(p1 : string, p2 : string) {
            this.playerOne = p1
            this.playerTwo = p2
            this.movelist = []
            this.currentTurnColor = "white"
        }
    }

    return (
        <Board></Board>
    )
}