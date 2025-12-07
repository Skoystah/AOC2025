import { getInput } from "../input.js";

function processInput(input) {
    const lines = input
        .trim()
        .split("\n")
        .map(line => line.match(/\d+|[+*]/g));

    //Add day code here
    let totalResult = 0;

    for (let i = 0; i < lines[0].length; i++) {
        const oper = lines[lines.length - 1][i];
        let colTotal = oper === "+" ? 0 : 1;
        for (let j = 0; j < lines.length - 1; j++) {
            if (oper === "+") {
                colTotal += parseInt(lines[j][i]);
            } else {
                colTotal *= parseInt(lines[j][i]);
            }
        }
        totalResult += colTotal;
    }
    console.log(totalResult);
}

//Test data
processInput(getInput(true));
//Input data
processInput(getInput(false));
