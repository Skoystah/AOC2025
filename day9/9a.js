import { getInput } from "../input.js";

function processInput(input) {
    const tiles = input
        .trim()
        .split("\n")
        .map(row => row.split(","))
        .map(tile => tile.map(coord => parseInt(coord)));

    console.log(tiles);
    //Add day code here
    let maxArea = 0;
    let maxTile1, maxTile2;
    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles.length; j++) {
            if (i === j) continue;

            maxArea = Math.max(maxArea, getAreaRectangle(tiles[i], tiles[j]));
            maxTile1 = tiles[i];
            maxTile2 = tiles[j];
        }
    }
    console.log(`The max area is ${maxArea} for tiles ${maxTile1} and ${maxTile2}`);
}

function getAreaRectangle(tile1, tile2) {
    const area = (Math.abs(tile1[0] - tile2[0]) + 1) *
        (Math.abs(tile1[1] - tile2[1]) + 1);
    // console.log(`Calculated ${area} for ${tile1} and ${tile2}`);
    return area;
}

//Test data
processInput(getInput(true));
//Input data
processInput(getInput(false));
