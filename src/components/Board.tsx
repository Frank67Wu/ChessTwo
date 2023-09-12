'use client'

import { useEffect, useMemo, useState } from "react"
import * as logic from "./Logic"
import * as AI from "./Ai"
import { Tile } from "./Tile"

export function Board() {

    const [boardState, setBoardState] = useState<number[][]>([[2, 3, 4, 0, 6, 4, 3, 0],
        [1, 1, 1, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0] ,
        [0, 0, 0, 0, -1, 0, 0, 0] ,
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [-1, -1, -1, -3, 0, 0, -1, 0],
        [-2, 0, -4, 0, -6, 0, 2, 0]])
    const [selectedPieces, setSelectedPieces] = useState<number[][]>([])
    const [boardElements ,setBoardElements] = useState<React.ReactElement[]>()
    const [currentColor, setCurrentColor] = useState("white")
    const [userColor, setUserColor] = useState("black")
    const [computerColor, setComputerColor] = useState("white")
    const [moveList, setMoveList] = useState<string[]>([])
    const [moveCount, setMoveCount] = useState(0)
    const [whiteInCheck, setWhiteInCheck] = useState(false)
    const [blackInCheck, setBlackInCheck] = useState(false)

    const board = [ [2, 3, 4, 5, 6, 4, 3, 2],
                    [1, 1, 1, 0, 0, 1, 1, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0, 0],
                    [0, 0, 0, -5, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [-1, -1, -1, 0, -1, -1, -1, -1],
                    [-2, -3, -4, 0, -6, -4, -3, -2]]

    useEffect(()=> {
       for (let i = 0; i < 0; i++) {
        whiteMove()
        blackMove()
       }
    }, [])

    useEffect(() => {
        setBoardElements(renderBoard())
    }, [selectedPieces, boardState])

    // useEffect(() => {
    //     if ((computerColor == currentColor)) {
    //         const inCheck = userColor == "white" ? blackInCheck : whiteInCheck
    //         const moveInfo = AI.chooseFirstMove(boardState, computerColor)
    //         makeMove(moveInfo[0], moveInfo[1], moveInfo[2], moveInfo[3], userColor == "white" ? "black" : "white")
    //     }
    // }, [currentColor])

    function onClick(row : number, column : number) {

        // clicking on a empty tile does nothing
        if (selectedPieces.length == 0 && boardState[row][column] == 0) {
            return
        }

        // cant make move if color is different 
        if (userColor != currentColor) {
            return
        }

        if (selectedPieces.length != 0) {

            // clicking on the same tile unselects it
            if (selectedPieces[0][0] == row && selectedPieces[0][1] == column) {
                setSelectedPieces([])
                return
            }

            // checking whether the tile clicked is valid
            else {
                let check = selectedPieces.filter(p => p[0] == (row))
                check = check.filter(p => p[1] == column)

                if (check.length != 0 && check[0][0] == row) {
                    makeMove(selectedPieces[0][0], selectedPieces[0][1], row, column, userColor)
                    setSelectedPieces([])
                    return
                }
            }
        }

        if ((userColor == "white" && boardState[row][column] > 0) || (userColor == "black" && boardState[row][column] < 0)) {

            const valid = (logic.getValidMoves(row, column, boardState))

            if (valid) {
                setSelectedPieces([[row, column], ...valid,])
            }
        }

    }

    function renderBoard() {
        const b : React.ReactElement[] = []
        for (let i=0; i<8; i++) {
            const temp : React.ReactElement[] = []
            for (let j=0;j<8; j++) {
                if (userColor == "white") {
                    temp.push(<Tile key={i*8 + j} r={i} c={j} onClick={onClick} p={boardState [i][j]} selected={false} tileColor={(i + j) % 2 == 1 ? "black" : "white"} ></Tile>)
                }
                else {
                    temp.unshift(<Tile key={i*8 + j} r={i} c={j} onClick={onClick} p={boardState [i][j]} selected={false} tileColor={(i + j) % 2 == 1 ? "black" : "white"} ></Tile>)
                }
            }
            if (userColor == "white") {
                b.unshift(<div key={i} className="flex">{temp}</div>)
            }
            else {
                b.push(<div key={i} className="flex">{temp}</div>)
            }
        }
        select(b)

        return b
    }


    function select(b : React.ReactElement[]) {

        for (const s of selectedPieces) {
            if (userColor == "white") {
                b[7-s[0]].props.children[s[1]] = <Tile key={s[0]*8 + s[1]} r={s[0]} c={s[1]} onClick={onClick} p={boardState [s[0]][s[1]]} selected={true} tileColor={(s[0] + s[1]) % 2 == 1 ? "black" : "white"} ></Tile>
            }
            else {
                b[s[0]].props.children[7-s[1]] = <Tile key={s[0]*8 + s[1]} r={s[0]} c={s[1]} onClick={onClick} p={boardState [s[0]][s[1]]} selected={true} tileColor={(s[0] + s[1]) % 2 == 1 ? "black" : "white"} ></Tile>
            }
        }
    
    }


    function makeMove(oldRow : number, oldColumn : number, newRow : number, newColumn : number, color : string) {
        // slice on 2d array doesnt copy by value so i don't think this does anything
        const b = boardState.slice()
        const oppColor = color == "white" ? "black" : "white"
        
        const p = b[oldRow][oldColumn]

        if (color == "white" && whiteInCheck == true) {
            setWhiteInCheck(false)
        } 
        else if (color == "black" && blackInCheck == true) {
            setBlackInCheck(false)
        }

        // updating pieces on board 
        b[newRow][newColumn] = b[oldRow][oldColumn]
        b[oldRow][oldColumn] = 0
        
        setBoardState(b)
        setSelectedPieces([])
        setMoveList([...moveList, p.toString() + newRow.toString() + newColumn.toString()])
        setCurrentColor(currentColor == "black" ? "white" : "black")


        // checking if opponent is now in check/mate
        const inCheck = logic.isCheck(b, oppColor)
        if (inCheck == true) {
            if (color == "white") {
                setBlackInCheck(true)
            } 
            else {
                setWhiteInCheck(true)
            }
        }
    }

    function blackMove() {
        const move = logic.miniMax(boardState, "black", 3)
        if (move) {
            makeMove(parseInt(move[0]), parseInt(move[1]), parseInt(move[2]), parseInt(move[3]), "black")
        }
    }

    function whiteMove() {
        const move = logic.miniMax(boardState, "white", 3)
        if (move) {
            makeMove(parseInt(move[0]), parseInt(move[1]), parseInt(move[2]), parseInt(move[3]), "white")
        }
    }

    return (
        <div className="w-fit border-2">
            {boardElements}
            <div>ASDFASD</div>
            <button onClick={()=>blackMove()}>Black MOve</button>
            <button onClick={()=> whiteMove()}>White MOve</button>
            <button onClick={()=>console.log(logic.getValidKingMoves(7, 4, boardState))}>Board</button>
            
        </div>
    )
}
