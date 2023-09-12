function getValidLMoves(row : number, column : number, board : number[][], color : number) {

    const validMoves = []

    const ones = [1, -1]
    const twos = [2, -2]

    for (const x of ones) {
        for (const y of twos) {
            if (0 <= row + x && row + x < 8 && 0 <=  column + y && column + y < 8) {
                if (board[row + x][column + y] * color <= 0) {
                    validMoves.push([row + x, column + y])
                }
            }
        }
    }

    for (const x of twos) {
        for (const y of ones) {
            if (0 <= row + x && row + x < 8 && 0 <=  column + y && column + y < 8) {
                if (board[row + x][column + y] * color <= 0) {
                    validMoves.push([row + x, column + y])
                }
            }
        }
    }

    return validMoves
}

function getValidRowMoves(row : number, column : number, board : number[][], color : string) {
    const validMoves = []
    const col = color == "white" ? 1 : -1
    let currentColumn = column + 1
        while (currentColumn < 8) {
            if (board[row][currentColumn] == 0 ) {
                validMoves.push([row, currentColumn])
            } 
            else if (board[row][currentColumn] * col < 0 ) {
                validMoves.unshift([row, currentColumn])
                break
            } 
            else {
                break
            }
            currentColumn += 1
        }
        currentColumn = column - 1
        while (currentColumn >= 0) {
            if (board[row][currentColumn] == 0 ) {
                validMoves.push([row, currentColumn])
            } 
            else if (board[row][currentColumn] * col < 0 ) {
                validMoves.unshift([row, currentColumn])
                break
            } 
            else {
                break
            }
            currentColumn -= 1
        }

    return validMoves
}

function getValidColumnMoves(row : number, column : number, board : number[][]) {
    const validMoves = []
    const color = board[row][column]

    let currentRow = row + 1
    while (currentRow < 8) {
        if (board[currentRow][column] == 0 ) {
            validMoves.unshift([currentRow, column])
        } 
        else if (board[currentRow][column] * color < 0 ) {
            validMoves.push([currentRow, column])
            break
        } 
        else {
            break
        }
        currentRow += 1
    }
    currentRow = row - 1
    while (currentRow >= 0) {
        if (board[currentRow][column] == 0 ) {
            validMoves.push([currentRow, column])
        } 
        else if (board[currentRow][column] * color < 0 ) {
            validMoves.push([currentRow, column])
            break
        } 
        else {
            break
        }
        currentRow -= 1
    }

    return validMoves
}

function getValidDiagonalMoves(row : number, column : number, board : number[][], color : number) {

    const validMoves = []

    let currentRow = row + 1
    let currentColumn = column + 1

    while (currentRow < 8 && currentColumn < 8) {
        if (board[currentRow][currentColumn] == 0) {
            validMoves.push([currentRow, currentColumn])
        }
        else if (board[currentRow][currentColumn] * color < 0) {
            validMoves.push([currentRow, currentColumn])
            break
        }
        else {
            break
        }
        currentRow += 1
        currentColumn += 1
    }

    currentRow = row - 1
    currentColumn = column - 1
    while (currentRow >= 0 && currentColumn >= 0) {
        if (board[currentRow][currentColumn] == 0) {
            validMoves.push([currentRow, currentColumn])
        }
        else if (board[currentRow][currentColumn] * color < 0) {
            validMoves.push([currentRow, currentColumn])
            break
        }
        else {
            break
        }
        currentRow -= 1
        currentColumn -= 1
    }

    currentRow = row + 1
    currentColumn = column - 1
    while (currentRow < 8 && currentColumn >= 0) {
        if (board[currentRow][currentColumn] == 0) {
            validMoves.push([currentRow, currentColumn])
        }
        else if (board[currentRow][currentColumn] * color < 0) {
            validMoves.push([currentRow, currentColumn])
            break
        }
        else {
            break
        }
        currentRow += 1
        currentColumn -= 1

    }

    currentRow = row - 1
    currentColumn = column + 1
    while (currentRow >= 0 && currentColumn < 8) {
        if (board[currentRow][currentColumn] == 0) {
            validMoves.push([currentRow, currentColumn])
        }
        else if (board[currentRow][currentColumn] * color < 0) {
            validMoves.push([currentRow, currentColumn])
            break
        }
        else {
            break
        }
        currentRow -= 1
        currentColumn += 1
    }

    return validMoves
}

function GetValidPawnMoves(row : number, column : number, board : number[][]) {
    
    const validMoves = []

    const color = board[row][column]
    

    if (0 <= row + color && row + color < 8 && board[row + color][column] == 0) {
        validMoves.push([row + color, column])
    }

    if (color == 1 && row == 1) {
        if (row + 2 < 8 && row + 2 >= 0 && board[row + 2][column] == 0 && board[row + 1][column] == 0) {
            validMoves.push([row + 2, column])
        }
    }

    else if (row == 6) {
        if (board[row - 2][column] == 0 && board[row - 1][column] == 0) {
            validMoves.push([row - 2, column])
        }
    }

    
    // the pawn can move diagonally to capture a piece if it has the opposite sign , i.e multiplying the two will result in a negative number
    if (row + color >= 0 && row + color < 8 && column + 1 < 8 && board[row + color][column + 1] * color < 0) {
        validMoves.push([row + color, column + 1])
    }

    if (row + color >= 0 && row + color < 8 && column - 1 >= 0 && board[row + color][column - 1] * color < 0) {
        validMoves.push([row + color, column - 1])
    }

    return validMoves

}

function GetValidRookMoves(row : number, column : number, board : number[][]) {

    const color = board[row][column] < 0 ? "black" : "white"

    const validRowMoves = getValidRowMoves(row, column, board, color)

    const validColumnMoves = getValidColumnMoves(row, column, board)

    return [...validRowMoves, ...validColumnMoves]
    
}




function GetValidKnightMoves(row : number, column : number, board : number[][]) {
    
    const validMoves = []
    const color = board[row][column]

    const ones = [1, -1]
    const twos = [2, -2]

    for (const x of ones) {
        for (const y of twos) {
            if (0 <= row + x && row + x < 8 && 0 <= column + y && column + y < 8) {
                if (board[row + x][column + y] * color <= 0) {
                    validMoves.push([row + x, column + y])
                }
            }
        }
    }

    for (const x of twos) {
        for (const y of ones) {
            if (0 <= row + x && row + x < 8 && 0 <=  column + y && column + y < 8) {
                if (board[row + x][column + y] * color <= 0) {
                    validMoves.push([row + x, column + y])
                }
            }
        }
    }

    return validMoves
}



function GetValidBishopMoves(row : number, column : number, board : number[][]) {

        return getValidDiagonalMoves(row, column, board, board[row][column])

}

function GetValidQueenMoves(row : number, column : number, board : number[][]) {

    const color = board[row][column] < 0 ? "black" : "white"

    const validDiagonalMoves = getValidDiagonalMoves(row, column, board, board[row][column])

    const validRowMoves = getValidRowMoves(row, column, board, color)

    const validColumnMoves = getValidColumnMoves(row, column, board)

    return [...validDiagonalMoves, ...validColumnMoves, ...validRowMoves]
}

export function getValidKingMoves(row : number, column : number, board : number[][]) {

    const validMoves = []
    const color = board[row][column] > 0 ? 1 : -1
    const col = board[row][column] > 0 ? "white" : "black"
    const finalMoves = []

    // all moves in a one ring radius
    for (let i =-1; i<=1; i++) {
        for (let j =-1; j<=1; j++) {
            if (0 <= row + i && row + i < 8 && 0 <= column + j && column + j < 8) {
                if (board[row + i][column + j] * color <= 0) {
                    validMoves.push([row + i, column + j] )
                }
            }
        }
    }

    
    // checking which moves would result in check and remove them
    const b = []
    for (const row of board) {
        b.push(row.slice())
    }
    b[row][column] = 0
    for (const move of validMoves) {
        const capturable = canBeCaptured(move[0], move[1], b, col)
        if (capturable.length == 0) {
            finalMoves.push(move)
        }
    }

    return finalMoves
}

function getPiecePositions(color : string, board : number[][]) {
    const piecePositions = new Map()

        if (color == "white") {
            for (let i = 1; i < 7; i ++) {
                const x = []
                for (let j = 0; j < 8; j++) {
                    for (let k = 0; k < 8; k++) {
                        if (board[j][k] == i) {
                            x.push(j.toString() + k.toString())
                        }
                    }
                }
                piecePositions.set(i, x)
            }
        }
        else {
            for (let i = -1; i > -7; i--) {
                const x = []
                for (let j = 0; j < 8; j++) {
                    for (let k = 0; k < 8; k++) {
                        if (board[j][k] == i) {
                            x.push(j.toString() + k.toString())
                        }
                    }
                }
                piecePositions.set(i, x)
            }
        }

        return piecePositions
}


export function getValidMoves(row : number, column : number, board : number[][]) {
    let p = Math.abs(board[row][column])
    switch (p) {
        case 1 : 
            return GetValidPawnMoves(row, column, board)
        case 2 : 
            return GetValidRookMoves(row, column, board)
        case 3 : 
            return GetValidKnightMoves(row, column, board)
        case 4: 
            return GetValidBishopMoves(row, column, board)
        case 5 : 
            return GetValidQueenMoves(row, column, board)
        case 6 : 
            return getValidKingMoves(row, column, board)
    }
}

export function canBeCaptured(row : number, column : number, board : number[][], col : string) {
    const color = col == "white" ? 1 : -1

    const rowMoves = getValidRowMoves(row, column, board, col)
    const columnMoves = getValidColumnMoves(row, column, board)
    const diagonalMoves = getValidDiagonalMoves(row, column, board, board[row][column])
    const lMoves = getValidLMoves(row, column, board, board[row][column])

    const pieces = []

    console.log(rowMoves, "row",)

    for (const tile of rowMoves) {
        if (board[tile[0]][tile[1]] == -2 * color || board[tile[0]][tile[1]] == -5) {
            pieces.push([tile[0], tile[1]])
        }
    }

    for (const tile of columnMoves) {
        if (board[tile[0]][tile[1]] == -2 * color || board[tile[0]][tile[1]] == -5) {
            pieces.push([tile[0], tile[1]])
        }
    }

    for (const tile of diagonalMoves) {
        if (board[tile[0]][tile[1]] == -4 * color || board[tile[0]][tile[1]] == -5) {
            pieces.push([tile[0], tile[1]])
        }
    }

    for (const tile of lMoves) {
        if (board[tile[0]][tile[1]] == -3 * color) {
            pieces.push([tile[0], tile[1]])
        }
    }

    if (row + color >= 0 && row + color < 8 && column - 1 >= 0) {
        if (board[row + color][column - 1] * color == -1) {
            pieces.push([row + color, column - 1])
        } 
    }
    if (row + color >= 0 && row + color < 8 && column + 1 < 8) {
        if (board[row + color][column + 1] * color == -1) {
            pieces.push([row + color, column + 1])
        } 
    }

    return pieces
}

export function canMoveTo(row : number, column : number, board : number[][], col : string) {
    const color = col == "white" ? 1 : -1
    const lMoves = getValidLMoves(row, column, board, color)

    const pieces = []


    for (let i = row + 1; i < 8; i++) {
        if (board[i][column] == 2 || board[i][column] == 5) {
            pieces.push([i, column])
            break
        }
        if (board[i][column] != 0) {
            break
        }
        
    }
    for (let i = row - 1;i >=0; i--) {
        if (board[i][column] == 2 || board[i][column] == 5) {
            pieces.push([i, column])
            break
        }
        if (board[i][column] != 0) {
            break
        }
    }
    for (let i = column + 1; i < 8; i++) {
        if (board[row][i] == 2 || board[row][i] == 5) {
            pieces.push([row, i])
            break
        }
        if (board[row][i] != 0) {
            break
        }
    }
    for (let i = column - 1; i >= 0; i--) {
        if (board[row][i] == 2 || board[row][i] == 5) {
            pieces.push([row, i])
            break
        }
        if (board[row][i] != 0) {
            break
        }
    }
    let currentRow = row + 1
    let currentColumn = column + 1
    while (currentRow < 8 && currentColumn < 8) {
        if (board[currentRow][currentColumn] == 4 || board[currentRow][currentColumn] == 5) {
            pieces.push([currentRow, currentColumn])
            break
        }
        if (board[currentRow][currentColumn] != 0) {
            break
        }
        currentRow += 1
        currentColumn += 1
    }
    currentRow = row + 1
    currentColumn = column - 1
    while (currentRow < 8 && currentColumn >= 0) {
        if (board[currentRow][currentColumn] == 4 || board[currentRow][currentColumn] == 5) {
            pieces.push([currentRow, currentColumn])
            break
        }
        if (board[currentRow][currentColumn] != 0) {
            break
        }
        currentRow += 1
        currentColumn -= 1
    }
    currentRow = row - 1
    currentColumn = column + 1
    while (currentRow >= 0 && currentColumn < 8) {
        if (board[currentRow][currentColumn] == 4 || board[currentRow][currentColumn] == 5) {
            pieces.push([currentRow, currentColumn])
            break
        }
        if (board[currentRow][currentColumn] != 0) {
            break
        }
        currentRow -= 1
        currentColumn += 1
    }
    currentRow = row - 1
    currentColumn = column - 1
    while (currentRow >= 0 && currentColumn >= 0) {
        if (board[currentRow][currentColumn] == 4 || board[currentRow][currentColumn] == 5) {
            pieces.push([currentRow, currentColumn])
            break
        }
        if (board[currentRow][currentColumn] != 0) {
            break
        }
        currentRow -= 1
        currentColumn -= 1
    }

    for (const tile of lMoves) {
        if (board[tile[0]][tile[1]] == 3 * color) {
            pieces.push([tile[0], tile[1]])
        }
    }

    if (row - color >= 0 && row - color < 8) {
        if (board[row + color][column] * color == 1) {
            pieces.push([row - color, column])
        } 
    }
    if ((col == "white" && row == 2) || (col == "black" && row == 6)) {
        if (board[row - 2 * color][column] * color == -1 && board[row - color][column] == 0) {
            pieces.push([row - 2 * color, column])
        } 
    }

    return pieces
}


export function isCheck(board : number[][], color : string) {
    if (color == "white") {
        const piecePositions = getPiecePositions("white", board)
        const king = piecePositions.get(6)[0]
        const capturingPieces = canBeCaptured(parseInt(king[0]), parseInt(king[1]), board, "white")
        if (capturingPieces.length == 0) {
            return false
        }
    }
    else {
        const piecePositions = getPiecePositions("black", board)
        const king = piecePositions.get(-6)[0]
        const capturingPieces =  canBeCaptured(parseInt(king[0]), parseInt(king[1]), board, "black")
        if (capturingPieces.length == 0) {
            return false
        }
    }
    return true
}

export function isCheckMate(board : number[][], color : string) {
    const piecePositions =  (color == "white") ? getPiecePositions("white", board) : getPiecePositions("black", board)
    const king = (color == "white") ? piecePositions.get(6)[0] : piecePositions.get(-6)[0]

    const row = parseInt(king[0])
    const column = parseInt(king[1])

    const threatPieces = canBeCaptured(row, column, board, color)

    const kingMoves = getValidKingMoves(row, column, board)
    if (kingMoves.length > 0) {
        console.log("king can move")
        return false
    }
    if (threatPieces.length > 1) {
        console.log("too many threats and can not move ")
        return true
    }
    const possibleDefense = canBeCaptured(threatPieces[0][0], threatPieces[0][1], board, color == "white" ? "black" : "white")  
    if (possibleDefense.length == 0) {
        console.log("unable to capture threat or move")
        return true
    }
    if (possibleDefense.length == 1) {
        if (possibleDefense[0][0] == row && possibleDefense[0][1] == column) {
            console.log("king can not capture defended piece")
            return true
        }
    }
    const p = Math.abs(board[threatPieces[0][0]][threatPieces[0][1]])
    if (p == 2 || p == 4 || p == 5) {
        if (threatPieces[0][0] == row) {
            for (let i = Math.min(column, threatPieces[0][1]) + 1; i < Math.max(column, threatPieces[0][1]); i++) {
                const possibleBlock = canMoveTo(row, i, board, color)
                if (possibleBlock.length > 0) {
                    console.log("can block")
                    return false
                }
            }
        }
        else if (threatPieces[0][1] == column) {
            for (let i = Math.min(row, threatPieces[0][0]) + 1; i < Math.max(row, threatPieces[0][0]); i++) {
                const possibleBlock = canMoveTo(i, column, board, color)
                if (possibleBlock.length > 0) {
                    console.log("can block")
                    return false
                }
            }
        } 
        else {
            let currentRow = Math.min(row, threatPieces[0][0]) + 1
            let currentColumn = Math.min(column, threatPieces[0][1]) + 1
            while (currentRow < Math.max(row, threatPieces[0][0])) {
                const possibleBlock = canMoveTo(currentRow, currentColumn, board, color)
                if (possibleBlock.length > 0) {
                    console.log("can block")
                    return false
                }
                currentRow += 1
                currentColumn += 1
            }
        }

    }
    console.log("there is a possible move")
    return false
}   

export function getAllValidMoves(board : number[][], color : string) {
    const piecePositions =  (color == "white") ? getPiecePositions("white", board) : getPiecePositions("black", board)
    const keys = Array.from(piecePositions.keys())
    const validMoves = []
    for (const key of keys) {
        const pieces = piecePositions.get(key)
        for (const piece of pieces) {
            const row = parseInt(piece[0])
            const column = parseInt(piece[1])
            const moves = getValidMoves(row, column, board)
            if (moves) {
                for (const move of moves) {
                    validMoves.push(piece + move[0].toString() + move[1].toString())
                }
            }
        }
    }

    return validMoves
}

export function getValidMovesInCheck(board : number[][], color : string) {
    console.log("///////////////////")
    const piecePositions =  (color == "white") ? getPiecePositions("white", board) : getPiecePositions("black", board)
    const king = (color == "white") ? piecePositions.get(6)[0] : piecePositions.get(-6)[0]
    const row = parseInt(king[0])
    const column = parseInt(king[1])
    const validMoves = []

    const threatPieces = canBeCaptured(row, column, board, color)
    console.log(threatPieces)
    const kingMoves = getValidKingMoves(row, column, board)
    const defenseMoves = canBeCaptured(threatPieces[0][0], threatPieces[0][1], board, color == "white" ? "black" : "white")
    console.log(defenseMoves)
    for (const move of defenseMoves) {
        if (move[0] == row && move[1] == column) {
            defenseMoves.splice(defenseMoves.indexOf(move), 1)
        }
    }
    const blockMoves = []
    const p = Math.abs(board[threatPieces[0][0]][threatPieces[0][1]])
    if (p == 2 || p == 4 || p == 5) {
        if (threatPieces[0][0] == row) {
            for (let i = Math.min(column, threatPieces[0][1]) + 1; i < Math.max(column, threatPieces[0][1]); i++) {
                const possibleBlock = canMoveTo(row, i, board, color)
                if (possibleBlock.length > 0) {
                    for (const m of possibleBlock) {
                        validMoves.push(m[0].toString() + m[1].toString() + row.toString() + i.toString())
                    }
                    blockMoves.push(...possibleBlock)
                }
            }
        }
        else if (threatPieces[0][1] == column) {
            for (let i = Math.min(row, threatPieces[0][0]) + 1; i < Math.max(row, threatPieces[0][0]); i++) {
                const possibleBlock = canMoveTo(i, column, board, color)
                if (possibleBlock.length > 0) {
                    for (const m of possibleBlock) {
                        validMoves.push(m[0].toString() + m[1].toString() + i.toString() + column.toString())
                    }
                    blockMoves.push(...possibleBlock)
                }
            }
        } 
        else {
            let currentRow = Math.min(row, threatPieces[0][0]) + 1
            let currentColumn = Math.min(column, threatPieces[0][1]) + 1
            while (currentRow < Math.max(row, threatPieces[0][0])) {
                const possibleBlock = canMoveTo(currentRow, currentColumn, board, color)
                if (possibleBlock.length > 0) {
                    for (const m of possibleBlock) {
                        validMoves.push(m[0].toString() + m[1].toString() + currentRow.toString() + currentColumn.toString())
                    }
                    blockMoves.push(...possibleBlock)
                }
                currentRow += 1
                currentColumn += 1
            }
        }
    }

    console.log("block", blockMoves)
    console.log("king", kingMoves)

    for (const m of kingMoves) {
        validMoves.push(king + m[0].toString() + m[1].toString())
    }
    for (const m of defenseMoves) {
        validMoves.push(m[0].toString() + m[1].toString() + threatPieces[0][0].toString() + threatPieces[0][1].toString())
    }
    return validMoves



}

function returnPoints(p : number, row : number, column : number) {
    const pawnPoints = [[0,  0,  0,  0,  0,  0,  0,  0],
                        [50, 50, 50, 50, 50, 50, 50, 50],
                        [10, 10, 20, 30, 30, 20, 10, 10],
                        [5,  5, 10, 25, 25, 10,  5,  5],
                        [0,  0,  0, 20, 20,  0,  0,  0],
                        [5, -5,-10,  0,  0,-10, -5,  5],
                        [5, 10, 10,-20,-20, 10, 10,  5],
                        [0,  0,  0,  0,  0,  0,  0,  0]]
    const knightPoints = [  [-50,-40,-30,-30,-30,-30,-40,-50],
                            [-40,-20,  0,  0,  0,  0,-20,-40],
                            [-30,  0, 10, 15, 15, 10,  0,-30],
                            [-30,  5, 15, 20, 20, 15,  5,-30],
                            [-30,  0, 15, 20, 20, 15,  0,-30],
                            [-30,  5, 10, 15, 15, 10,  5,-30],
                            [-40,-20,  0,  5,  5,  0,-20,-40],
                            [-50,-40,-30,-30,-30,-30,-40,-50,]]
    const bishopPoints = [  [-20,-10,-10,-10,-10,-10,-10,-20],
                            [-10,  0,  0,  0,  0,  0,  0,-10],
                            [-10,  0,  5, 10, 10,  5,  0,-10],
                            [-10,  5,  5, 10, 10,  5,  5,-10],
                            [-10,  0, 10, 10, 10, 10,  0,-10],
                            [-10, 10, 10, 10, 10, 10, 10,-10],
                            [-10,  5,  0,  0,  0,  0,  5,-10],
                            [-20,-10,-10,-10,-10,-10,-10,-20]]

    const rookMoves = [  [0,  0,  0,  0,  0,  0,  0,  0],
                         [5, 10, 10, 10, 10, 10, 10,  5],
                         [-5,  0,  0,  0,  0,  0,  0, -5],
                         [-5,  0,  0,  0,  0,  0,  0, -5],
                         [-5,  0,  0,  0,  0,  0,  0, -5],
                         [-5,  0,  0,  0,  0,  0,  0, -5],
                         [-5,  0,  0,  0,  0,  0,  0, -5],
                         [0,  0,  0,  5,  5,  0,  0,  0]]
    const queenMoves = [[-20,-10,-10, -5, -5,-10,-10,-20],
                        [-10,  0,  0,  0,  0,  0,  0,-10],
                        [-10,  0,  5,  5,  5,  5,  0,-10],
                        [-5,  0,  5,  5,  5,  5,  0, -5],
                        [0,  0,  5,  5,  5,  5,  0, -5],
                        [-10,  5,  5,  5,  5,  5,  0,-10],
                        [-10,  0,  5,  0,  0,  0,  0,-10],
                        [-20,-10,-10, -5, -5,-10,-10,-20]]

    const kingMoves =  [[-30,-40,-40,-50,-50,-40,-40,-30],
                        [-30,-40,-40,-50,-50,-40,-40,-30],
                        [-30,-40,-40,-50,-50,-40,-40,-30],
                        [-30,-40,-40,-50,-50,-40,-40,-30],
                        [-20,-30,-30,-40,-40,-30,-30,-20],
                        [-10,-20,-20,-20,-20,-20,-20,-10],
                        [20, 20,  0,  0,  0,  0, 20, 20],
                        [20, 30, 10,  0,  0, 10, 30, 20]]  
    let r = row
    if (p > 0) {
        r = 7-row
    }      
    switch (Math.abs(p)) {
        case 1:
            return 100 + pawnPoints[r][column]
        case 2: 
            return 500 + rookMoves[r][column] 
        case 3:
            return 320 + knightPoints[r][column]
        case 4: 
            return 330 + bishopPoints[r][column]
        case 5:
            return 900 + queenMoves[r][column]
        case 6: 
            return 20000 + kingMoves[r][column]
    }
    return 0
}


export function totalPoints(board : number[][], color : string) {

    let blackPoints = 0
    let whitePoints = 0
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] > 0) {
                whitePoints += returnPoints(board[i][j], i, j)
            }
            else if (board[i][j] < 0) {
                blackPoints += returnPoints(board[i][j], i, j)
            }
        }
    }
    return color == "white" ? whitePoints - blackPoints : blackPoints - whitePoints
}

function max(board : number[][], color : string, depth : number, move : string, beta : number) {
    const b = []
    for (const row of board) {
        b.push(row.slice())
    }
    b[parseInt(move[2])][parseInt(move[3])] = b[parseInt(move[0])][parseInt(move[1])]
    b[parseInt(move[0])][parseInt(move[1])] = 0
    if (depth == 0) {
        return totalPoints(b, color)
    }
    else {
        const inCheck = isCheck(b, color)
        const moves = inCheck ? getValidMovesInCheck(b, color) : getAllValidMoves(b, color)
        let maxScore = -99999999
        let alpha = -9999999
        for (const m of moves) {
            const possibleMax = mini(b, color == "white" ? "black" : "white", depth - 1, m, alpha)
            alpha = Math.max(possibleMax, alpha)
            if (possibleMax > beta) {
                return 10000000
            }
            if (possibleMax > maxScore) {
                maxScore = possibleMax
            }
        } 
        return maxScore
    }
}

function mini(board : number[][], color : string, depth : number, move : string, alpha : number) {
    const oppositeColor = color == "white" ? "black" : "white"
    const b = []
    for (const row of board) {
        b.push(row.slice())
    }
    b[parseInt(move[2])][parseInt(move[3])] = b[parseInt(move[0])][parseInt(move[1])]
    b[parseInt(move[0])][parseInt(move[1])] = 0
    if (depth == 0) {
        const points = totalPoints(b, oppositeColor)
        return points
    }
    else {
        const inCheck = isCheck(b, oppositeColor)
        const moves = inCheck ? getValidMovesInCheck(b, oppositeColor) :  getAllValidMoves(b, oppositeColor)
        let minScore = 99999999
        let beta = 10000000
        for (const m of moves) {
            const possibleMin = max(b, oppositeColor, depth - 1, m, beta)
            beta = Math.min(beta, possibleMin)
            if (possibleMin < minScore) {
                minScore = possibleMin
            }
            if (possibleMin < alpha) {
                return -10000000
            }
        } 
        return minScore
    }
}

export function miniMax(board : number[][], color : string, depth : number) {
    const start = performance.now()
    const b = board.slice()
    const scores = []
    const inCheck = isCheck(b, color)
    const moves = inCheck ? getValidMovesInCheck(board, color) : getAllValidMoves(board, color)
    if (inCheck) console.log(moves)
    let alpha = -9999999
    let maxScore = -1000000
    let bestMove = null
    
    for (const m of moves) {
        const score = (mini(b, color == "white" ? "black" : "white", depth - 1, m, alpha))
        alpha = Math.max(score, alpha)
        scores.push(score)
        if (score > maxScore) {
            maxScore = score
            bestMove = m
        }
    }
    const end = performance.now()
    return bestMove
}
