'use client'

import { useState } from "react"
import { Piece } from "./Piece"

type TileProps = {
    selected : boolean
    p : number
    tileColor : "black" | "white"
    onClick : Function
    r : number
    c : number

}

export function Tile({r, c, p, selected, tileColor, onClick} : TileProps) {

    function getPiece() {
        const x = Math.abs(p)
        switch (x) {
            case 0: 
                return null
            case 1:
                return "pawn"
            case 2: 
                return "rook"
            case 3: 
                return "knight"
            case 4: 
                return "bishop"
            case 5: 
                return "queen"
            case 6: 
                return "king"
        }
    }

    function getColor() {
        if (p < 0) {
            return "black"
        } 
        return "white"
    }

    const piece = getPiece()



    return (
        <div onClick={()=>onClick(r, c)} className={`transition-all duration-150 w-16 h-16 ${tileColor == "black" ? "bg-amber-600" : "bg-orange-100"} ${selected && tileColor == "black" ? "bg-yellow-400 border-black" : ""} ${selected && tileColor == "white" ? "bg-yellow-200 border-black" : ""}`}>
            {piece ? <Piece color={getColor()} name={piece}></Piece> : <></>}
            {r} {c}
        </div>
    )
}