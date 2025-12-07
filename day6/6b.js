import { getInput } from "../input.js";

function processInput(input) {
    const lines = input
        .replace(/\n+$/g,)
        .split("\n");

    const operands = lines.slice(0, -1);
    const operators = lines[lines.length - 1]
        .match(/[+*]\s+/g);

    console.log(operands);
    console.log(operators);

    let totalResult = 0;
    let pos = 0;
    for (let i = 0; i < operators.length; i++) {
        const oper = operators[i];
        console.log("oper: ", oper, i)

        let colTotal = oper.startsWith("+") ? 0 : 1;
        const numLength = i === operators.length - 1 ? oper.length : oper.length - 1;
        for (let j = 0; j < numLength; j++) {
            let number = "";
            for (let k = 0; k < operands.length; k++) {
                number += operands[k][pos + j];
            }
            console.log("Number", number, "Length ", numLength);
            if (oper.startsWith("+")) {
                colTotal += parseInt(number);
            } else {
                colTotal *= parseInt(number);
            }
        }
        console.log("Operation total ", colTotal);
        totalResult += colTotal;
        pos += oper.length;
    }
    console.log(totalResult);
}

//Test data
processInput(getInput(true));
//Input data
processInput(getInput(false));
