import { getInput } from "../input.js";

function processInput(input) {
    const tiles = input
        .trim()
        .split("\n")
        .map(row => row.split(","))
        .map(tile => tile.map(coord => parseInt(coord)));


    const outline = new Map(tiles.map(tile => [tile[0], new Array()]));
    let prev = tiles[tiles.length - 1];

    for (const tile of tiles) {
        const [col, row] = tile;
        const [prevCol, prevRow] = prev;

        if (col === prevCol) {
            const [start, end] = [Math.min(row, prevRow), Math.max(row, prevRow)];
            for (let i = start; i <= end; i++) {
                if (!outline.get(col).includes(i)) {
                    outline.get(col).push(i);
                }
            }
        } else {
            const [start, end] = [Math.min(col, prevCol), Math.max(col, prevCol)];
            for (let i = start; i <= end; i++) {
                if (outline.has(i)) {
                    if (!outline.get(i).includes(row)) {
                        outline.get(i).push(row);
                    }
                } else {
                    outline.set(i, [row]);
                }
            }
        }

        prev = tile;
    }
    outline.forEach((row) => row.sort((a, b) => a - b))

    let maxArea = 0;
    let maxTile1, maxTile2;
    for (let i = 0; i < tiles.length; i++) {
        for (let j = i + 1; j < tiles.length; j++) {
            if (i === j) continue;

            const [tile1, tile2] = [tiles[i], tiles[j]];
            const area = getAreaRectangle(tile1, tile2);
            if (area > maxArea && isValidRectangle(outline, tile1, tile2) &&
                !checkOutlineIntersectRectangle(outline, tile1, tile2)) {
                maxArea = area;
                [maxTile1, maxTile2] = [tile1, tile2];
            }
        }
    }
    console.log(`The max area is ${maxArea} for tiles ${maxTile1} and ${maxTile2}`);
}

function getAreaRectangle(tile1, tile2) {
    const area = (Math.abs(tile1[0] - tile2[0]) + 1) *
        (Math.abs(tile1[1] - tile2[1]) + 1);
    return area;
}

function isValidRectangle(outline, tile1, tile2) {
    const tile3 = [tile1[0], tile2[1]];
    const tile4 = [tile2[0], tile1[1]];

    return validTile(outline, tile3) && validTile(outline, tile4);
}

function checkOutlineIntersectRectangle(outline, tile1, tile2) {
    const [colMin, colMax] = [Math.min(tile1[0], tile2[0]), Math.max(tile1[0], tile2[0])]
    const [rowMin, rowMax] = [Math.min(tile1[1], tile2[1]), Math.max(tile1[1], tile2[1])]

    for (const [col, row] of outline.entries()) {
        if (col <= colMin || col >= colMax) continue;

        for (const r of row) {
            if (r > rowMin && r < rowMax) {
                return true;
            }
        }
    }
    return false
}

function validTile(outline, tile) {
    const [col, row] = tile;
    // tile is ON the outline
    if (outline.get(col).includes(row)) return true;

    //check if on both sides col there are lines, otherwise the tile is outside the figure
    const colTiles = outline.get(col)
        .sort((a, b) => a - b);
    if (row < colTiles[0] || row > colTiles[colTiles.length - 1]) return false;

    const rowTiles = [...outline.keys()]
        .filter(key => outline.get(key).includes(row))
        .sort((a, b) => a - b);
    if (col < rowTiles[0] || col > rowTiles[rowTiles.length - 1]) return false;

    return true;
}

//Test data
processInput(getInput(true));
//Input data
processInput(getInput(false));
