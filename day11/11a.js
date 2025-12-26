import { getInput } from "../input.js";

function processInput(input) {
    const ipt = input
        .trim()
        .split("\n")
        .map(line => line.match(/\w{3}/g));

    const devices = new Map();
    for (const line of ipt) {
        devices.set(line[0], line.slice(1));
    }
    //Add day code here
    console.log(`There are in total ${findPaths("svr", devices)} paths`);
}

function findPaths(ipt, devices, visited = new Set()) {
    if (ipt === "out") {
        return 1;
    }
    if (visited.has(ipt) || !devices.has(ipt)) {
        console.log("Already been!");
        return 0;
    }

    visited.add(ipt);

    let paths = 0;
    // console.log(`Checking from ${ipt} to ${devices.get(ipt)} `);
    for (const opt of devices.get(ipt)) {
        paths += findPaths(opt, devices, visited);
    }

    visited.delete(ipt);
    return paths;
}

//Test data
processInput(getInput(true));
//Input data
processInput(getInput(false));
