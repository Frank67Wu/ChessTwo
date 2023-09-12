import * as logic from "./Logic"

class Node {
    move : string
    children : Node[] | null
    constructor(move : string) {
        this.move = move
        this.children = null
    }
}

export function chooseRandomMove(board : number[][], color : string) {
    const moves = logic.getAllValidMoves(board, color)
    const move = moves[Math.floor(Math.random() * 100) % moves.length]
    return [parseInt(move[0]), parseInt(move[1]), parseInt(move[2]), parseInt(move[3])]

}

export function chooseFirstMove(board : number[][], color : string) {
    const inCheck = logic.isCheck(board, color)

    if (inCheck) {
        const moves = logic.getValidMovesInCheck(board, color)
        const move = moves[0]
        return [parseInt(move[0]), parseInt(move[1]), parseInt(move[2]), parseInt(move[3])]
    }
    else {
        const moves = logic.getAllValidMoves(board, color)
        const move = moves[0]
        return [parseInt(move[0]), parseInt(move[1]), parseInt(move[2]), parseInt(move[3])]
    }
}

