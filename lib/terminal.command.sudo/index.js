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
                if (passphase == deDzcloudoptionsPassword) {
                    libs.find(a => a["package.name"] === "de.dzcloud.options").option["is-sudo"] = true;
                    saveChanges();
                } else {
                    printToTerminal(`${lang["terminal.error.passphase.invalid"]}`)
                }
            }
            break;
    }
}