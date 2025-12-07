import { getInput } from "../input.js";

function processInput(input) {
    const grid = input
        .trim()
        .split("\n")
        .map(row => row.split(""));

    const solutions = new Array(grid.length);
    for (let i = 0; i < grid.length; i++) {
        solutions[i] = new Array(grid[0].length).fill(0);
    }

    console.log(processBeam(grid[0].indexOf('S'), 0, grid, solutions));
}

// x, y = coordinates of beam origin (= S or square of last beam)
function processBeam(x, y, grid, solutions) {
    //bottom row or column out of bounds - stop
    if (x < 0 || x >= grid[0].length) {
        return 0;
    }

    if (y >= grid.length - 1) {
        return 1;
    }

    if (solutions[y][x]) {
        return solutions[y][x];
    }

    // empty square or start, continue downwards
    if (grid[y][x] === "." || grid[y][x] === "S") {
        grid[y][x] = "|";
        let splits = processBeam(x, y + 1, grid, solutions);
        grid[y][x] = ".";
        solutions[y][x] = splits;
        return splits;

    }

    if (grid[y][x] === "^") {
        return processBeam(x - 1, y, grid, solutions) + processBeam(x + 1, y, grid, solutions);
    }
}


//Test data
processInput(getInput(true));
//Input data
processInput(getInput(false));
