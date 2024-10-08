export function processCommand(command) {
    const args = command.split(" ");
    const isSudo = libs.find(a => a["package.name"] === "de.dzcloud.options").option["is-sudo"];

    if (args >= 3) {
        if (args[3].includes("sudo") && !isSudo) {
            printToTerminal(`Can't change sudo variables. Access denied!`);
            return;
        }
        if (args[3].includes("passowrd") && !isSudo) {
            printToTerminal(`Can't change password variables. Access denied!`);
            return;
        }
    }

    const ourPackage = libs.find(a => a.command === args[0]);

    switch (args[1]) {
        case "set":
            setVariable(command, args[2], args[3], args[4]);
            break;
        case "get":
            getVariable(args[2], args[3]);
            break;
        case "list-key":
            listPackageKeys(args[2]);
            break;
        case "list-value":
            listPackageValues(args[2]);
            break;
        case "help":
            printHelp();
            break;
        case "-v":
            printToTerminal(`Setenv is version: ${ourPackage["package.version"]} in branch ${ourPackage["package.branch"]}`);
            break;
        default:
            printToTerminal("Type setenv help for help");
            break;
    }

}

function setVariable(command, lib, key, value) {
    const args = command.split(" ");
    const isSudo = libs.find(a => a["package.name"] === "de.dzcloud.options").option["is-sudo"];

    if (!lib || !key || !value) {
        printToTerminal(`You are missing one or more arguments.`);
        return;
    }

    if (key.includes("sudo") && !isSudo) {
        printToTerminal(`Can't change sudo variables. Access denied!`);
        return;
    }
    if (key.includes("password") && !isSudo) {
        printToTerminal(`Can't change sudo variables. Access denied!`);
        return;
    }

    const library = libs.find(a => a["package.name"] === lib);
    if (!library) {
        printToTerminal(`This package does not exist.`);
        return;
    }
    if (!library.option) {
        printToTerminal(`This package does not have any variables.`);
        return;
    }
    if (!library.option[key]) {
        printToTerminal(`Unable to locate ${key} key in ${lib}.`);
        return;
    }

    const svalue = args.slice(4).join(" ");
    library.option[key] = svalue;
    saveChanges()
}

function getVariable(lib, key) {
    if (!lib || !key) {
        printToTerminal(`You are missing one or more arguments.`);
    }

    const library = libs.find(a => a["package.name"] === lib);
    if (!library) {
        printToTerminal(`This package does not exist.`);
        return;
    }
    if (!library.option) {
        printToTerminal(`This package does not have any variables.`);
        return;
    }
    if (!library.option[key]) {
        printToTerminal(`Unable to locate ${key} key in ${lib}.`);
        return;
    }
    printToTerminal(library.option[key]);
}

function listPackageKeys(lib) {
    if (!lib) {
        printToTerminal(`You are missing one or more arguments.`)
        return;
    }

    const library = libs.find(a => a["package.name"] === lib);
    if (!library) {
        printToTerminal(`This package does not exist.`);
        return;
    }
    if (!library.option) {
        printToTerminal(`This package does not have any variables.`);
        return;
    }
    const optionKeys = Object.keys(library.option);
    optionKeys.forEach(key => {
        printToTerminal(key);
    });
}

function listPackageValues(lib) {
    if (!lib) {
        printToTerminal(`You are missing one or more arguments.`);
        return;
    }

    const library = libs.find(a => a["package.name"] === lib);
    if (!library) {
        printToTerminal(`This package does not exist.`);
        return;
    }
    if (!library.option) {
        printToTerminal(`This package does not have any variables.`);
        return;
    }
    const optionsValues = Object.values(library.option);
    optionsValues.forEach(value => {
        printToTerminal(value);
    });
}

function printHelp() {
    printToTerminal(`Help all commands you can use with setenv:`);
    printToTerminal(` -  setenv set <package> <key> <value>     (Set a package variable)`);
    printToTerminal(` -  setenv get <package> <key>             (Get a value from a package key)`);
    printToTerminal(` -  setenv list-key <package>              (List all package keys)`);
    printToTerminal(` -  setenv list-value <package>            (List all values from the package keys)`);
}

function saveChanges() {
    localStorage.setItem("terminalrc", JSON.stringify(libs))
}
