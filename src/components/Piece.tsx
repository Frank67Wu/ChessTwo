'use client'

import { useEffect } from "react"

type PieceProps = {
    name : string
    color : "black" | "white"
}

export function Piece({color, name} : PieceProps) {

    // 1 = pawn, 2 = rook, 3 = knight, 4 = bishop, 5 = queen, 6 = king

    return (
        <img src={"/images/" + color + "-" + name +".png"}></img>
    )
}