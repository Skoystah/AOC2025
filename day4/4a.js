import { getInput } from "../input.js";

function processInput(input) {
    let totalAccessibleRolls = 0;
    const rollsGrid = input.split('\n').slice(0, -1).map(row => row.split(""));

    while (true) {
        let accessibleRolls = countRolls(rollsGrid);
        if (accessibleRolls === 0) {
            break
        }
        console.log(accessibleRolls);
        totalAccessibleRolls += accessibleRolls;
    }
    console.log(totalAccessibleRolls);
}

function countRolls(rollsGrid) {
    let accessibleRolls = 0;
    for (let i = 0; i < rollsGrid.length; i++) {
        for (let j = 0; j < rollsGrid[i].length; j++) {
            if (["@", "X"].includes(rollsGrid[i][j]) && isAccessible(rollsGrid, i, j)) {
                accessibleRolls++;
                rollsGrid[i][j] = "X"
            }
        }
    }
    removeRolls(rollsGrid);
    return accessibleRolls;
}

function removeRolls(rollsGrid) {
    for (let i = 0; i < rollsGrid.length; i++) {
        for (let j = 0; j < rollsGrid[i].length; j++) {
            if (rollsGrid[i][j] === "X") {
                rollsGrid[i][j] = ".";
            }
        }
    }
}

function isAccessible(rollsGrid, x, y) {
    let neighbours = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            if (x + i < 0 || x + i >= rollsGrid.length ||
                y + j < 0 || y + j >= rollsGrid[x + i].length) continue;
            if (rollsGrid[x + i][y + j] === "@") neighbours++;
            if (neighbours >= 4) return false;
        }
    }
    return true;
}

//Test data
processInput(getInput(true));
//Input data
processInput(getInput(false));
