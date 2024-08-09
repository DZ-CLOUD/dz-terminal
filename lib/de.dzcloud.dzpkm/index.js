export function processCommand(command) {
    const args = command.split(" ");

    const ourPackage = libs.find(a => a.command === args[0])

    switch (args[1]) {
        case "install":
            findPackage(args[2])
            break;
        case "uninstall":
            deletePackage(args[2])
            break;
        case "list":
            listPackages()
            break;
        case "help":
            printHelp()
            break;
        case "-v":
            printToTerminal(`DZ CLOUD Package Menager is version: ${ourPackage["package.version"]} in branch ${ourPackage.branch}`);
            break;
        default:
            printToTerminal("Type dzpkm help for help");
            break;
    }

}

function findPackage(lib) {
    printToTerminal(`Connecting...`);
    printToTerminal(`Locate package ${lib}...`);
    fetch(`../../../apt.json`)
        .then(res => res.json())
        .then(data => {
            printToTerminal(`Data fetched successfully`);
            printToTerminal(`Finding package with package name ${lib}`);
            const libraries = data.libs;
            const library = libraries.find(a => a["package.name"] === lib);
            if (!library) {
                printToTerminal(`Could not find package ${lib}`);
                return null;
            }
            printToTerminal(`Install package...`);
            for (let i = 0; i < 101; i++) {
                printToTerminal(`Installing package: Downloading ${i}%`);
            }
            for (let i = 0; i < 101; i++) {
                printToTerminal(`Extrackting package: Extracting ${i}%`);
            }
            installLibrary(library);
        })

}

function installLibrary(lib) {
    printToTerminal(`Pushing changes...`);
    libs.push(lib);
    printToTerminal(`Updateing changes...`);
    printToTerminal(`done`);
}

function deletePackage(lib) {
    for (let i = 0; i <= 100; i += 25) {
        printToTerminal(`Finding package: Locate files ${i}%`);
    }

    for (let i = 0; i <= 100; i += 10) {
        printToTerminal(`Deleting package: Delete files ${i}%`);
    }

    const libraryIndex = libs.findIndex(a => a["package.name"] === lib);

    if (libraryIndex !== -1) {
        libs.splice(libraryIndex, 1);
        printToTerminal(`Package ${lib} deleted successfully.`);
    } else {
        printToTerminal(`Package ${lib} not found.`);
    }
}

function listPackages() {
    for (let l = 0; l < libs.length; l++) {
        const lib = libs[l];
        printToTerminal(`${l + 1}. ${lib["package.name"]} - ${lib["package.version"]}`)
    }
}

function printHelp() {
    printToTerminal(`Help all commands you can use with dzpkm:`);
    printToTerminal(` -  dzpkm install <package>    (Install a package)`);
    printToTerminal(` -  dzpkm uninstall <package>  (Uninstall a package)`);
    printToTerminal(` -  dzpkm list                 (List all packages)`);
    printToTerminal(` -  dzpkm help                 (Shows this)`);
    printToTerminal(` -  dzpkm -v                   (Shows the current version of the lib)`);
}
