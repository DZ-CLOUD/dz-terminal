export function processCommand(command) {
    const args = command.split(" ");
    const deDzcloudoptionsPassword = libs.find(a => a["package.name"] === "de.dzcloud.options").option["password"];

    switch (args[1]) {
        case "-p":
            switch (args[2]) {
                case deDzcloudoptionsPassword:
                    libs.find(a => a["package.name"] === "de.dzcloud.options").option["is-sudo"] = true;
                    saveChanges();
                    break;
                default:
                    printToTerminal(`${lang["terminal.error.passphase.invalid"]}`)
                    break;
            }
            break;
        case "-rm":
            libs.find(a => a["package.name"] === "de.dzcloud.options").option["is-sudo"] = false;
            saveChanges();
            break;
        case "--status":
        case "-s":
            printToTerminal(libs.find(a => a["package.name"] === "de.dzcloud.options").option["is-sudo"]);
            break;
        default:
            const passphase = prompt(`${lang["terminal.promt.enter.passphase"]}:`);
            if (passphase !== null) {
                if (passphase === deDzcloudoptionsPassword) {
                    libs.find(a => a["package.name"] === "de.dzcloud.options").option["is-sudo"] = true;
                    saveChanges();
                    if(args.length >= 2){
                        executeLib(libs.find(a => a["command"] === args[1])["package.name"], command)
                    }
                } else {
                    printToTerminal(`${lang["terminal.error.passphase.invalid"]}`)
                }
            }
            break;
    }
}

async function executeLib(libPackageName, command) {
    const module = await import(`./../../lib/${libPackageName}/index.js`);
        if (module && typeof module.processCommand === 'function') {
            const result = module.processCommand(command);
            printToTerminal(result);
        } else {
            printToTerminal(`${libPackageName}: Error package doesn't export processCommand.`);
        }
}