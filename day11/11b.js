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

    const paths = (findPaths("svr", devices, "dac") * findPaths("dac", devices, "fft") * findPaths("fft", devices, "out")) +
        (findPaths("svr", devices, "fft") * findPaths("fft", devices, "dac") * findPaths("dac", devices, "out"));
    console.log(paths);
}

function findPaths(ipt, devices, opt, paths = new Map()) {
    if (ipt === opt) {
        return 1;
    }

    if (!devices.has(ipt)) {
        return 0;
    }

    let pathsCount = 0;

    if (paths.has(ipt)) {
        return paths.get(ipt);
    }
    for (const neighb of devices.get(ipt)) {
        const newPathsCount = findPaths(neighb, devices, opt, paths);
        pathsCount += newPathsCount;
    }

    paths.set(ipt, pathsCount);

    return pathsCount;
}

//Test data
processInput(getInput(true, 'testb'));
//Input data
processInput(getInput(false));
