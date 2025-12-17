import { getInput } from "../input.js";

function processInput(input) {
    const ipt = input
        .trim()
        .split("\n")
        .map(row => row.split(" "));

    let buttonPresses = 0;
    for (const row of ipt) {
        const [lights, buttons, joltage] = [row[0].slice(1, -1), row.slice(1, -1), row.slice(-1)];
        const initLights = lights.replaceAll("#", ".");
        buttonPresses += countButtons(initLights, lights, buttons);
    }
    console.log(`Amount of button presses needed is ${buttonPresses}`);

}

function countButtons(initLights, targetLights, buttons) {
    const queue = [];
    const configs = new Set();
    let count = 0;

    queue.push(initLights);
    configs.add(initLights);
    while (true) {
        const newCombos = [];
        count++;
        while (queue.length) {
            const lights = queue.shift();

            for (const button of buttons) {
                const newCombo = toggleLights(lights, button)
                if (newCombo === targetLights) return count;
                if (configs.has(newCombo)) continue;

                newCombos.push(newCombo);
                configs.add(newCombo);
            }
        }
        queue.push(...newCombos);
    }
}

function toggleLights(curLights, button) {

    const switches = button.match(/\d+/g).map(s => parseInt(s));

    let switchedLights = "";
    for (let i = 0; i < curLights.length; i++) {
        const curLight = curLights[i];
        if (switches.includes(i)) {
            switchedLights += toggle(curLight);
        } else {
            switchedLights += curLight;
        }
    }
    return `${switchedLights}`;
}

function toggle(light) {
    return (light === ".") ? "#" : ".";
}

//Test data
processInput(getInput(true));
//Input data
processInput(getInput(false));
