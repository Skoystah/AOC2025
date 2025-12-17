import { getInput } from "../input.js";

function processInput(input) {
    const ipt = input
        .trim()
        .split("\n")
        .map(row => row.split(" "));

    let buttonPresses = 0;
    for (const row of ipt) {
        const [_, button, joltage] = [row[0].slice(1, -1), row.slice(1, -1), row.slice(-1)];
        const targetJoltage = joltage[0].match(/\d+/g).map(s => parseInt(s));
        const buttons = button.map(b => b.match(/\d+/g).map(s => parseInt(s)));
        const patterns = getPatterns(buttons);
        // solution for part A
        // buttonPresses += patterns.sort((a, b) => a.length - b.length)[0].length;
        buttonPresses += countButtons(patterns, targetJoltage, buttons);
        console.log(buttonPresses)
    }
    console.log(`Amount of button presses needed is ${buttonPresses}`);

}

function getPatterns(buttons) {
    const patterns = [[]];

    for (let i = 0; i < buttons.length; i++) {
        // console.log(patterns);
        // console.log(i);
        const last = patterns.length
        for (let j = 0; j < last; j++) {
            patterns.push([...patterns[j], i]);
        }
    }
    return patterns;
}

function countButtons(patterns, targetJoltage, buttons) {

    let lowestCount = Infinity;

    function countButtonsAux(targetJoltage) {
        if (targetJoltage.every(num => num === 0)) { return 0 };


        for (const pattern of patterns) {
            const newCombo = toggleJoltage(targetJoltage, pattern, buttons, true);

            // console.log(targetJoltage, pattern, newCombo);
            if (newCombo.every(num => num % 2 === 0 && num >= 0)) {
                lowestCount = Math.min(lowestCount, 2 * countButtonsAux(newCombo.map(num => num / 2)) + pattern.length);
            } else {
            }
            // console.log(lowestCount)
        }
        return lowestCount;
    }

    return countButtonsAux(targetJoltage);
}

function toggleJoltage(curJoltage, pattern, buttons, decrease = false) {
    const joltage = [...curJoltage];
    for (const button of pattern) {
        for (const s of buttons[button]) {
            if (decrease) {
                joltage[s] = joltage[s] - 1;
            } else {
                joltage[s] = joltage[s] + 1;
            }
        }
    }
    return joltage;
}


//Test data
processInput(getInput(true));
//Input data
processInput(getInput(false));
