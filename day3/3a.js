import { getInput } from "../input.js";

function processInput(input) {
    const batteries = input.split('\n').slice(0, -1);
    //Add day code here
    let totalJoltage = 0;
    for (const battery of batteries) {
        let joltage = ["0", "0"];

        // example 123454321 => 54
        for (let i = 0; i < battery.length; i++) {
            if (battery[i] > joltage[0] && i < battery.length - 1) {
                joltage[0] = battery[i];
                joltage[1] = "0";
            } else if (battery[i] > joltage[1]) {
                joltage[1] = battery[i];
            }
        }
        console.log(`Joltage for ${battery} is ${joltage.join("")}`);
        totalJoltage += parseInt(joltage.join(""));
    }
    console.log(`Total joltage is ${totalJoltage}`);
}

//Test data
processInput(getInput(true));
//Input data
processInput(getInput(false));
