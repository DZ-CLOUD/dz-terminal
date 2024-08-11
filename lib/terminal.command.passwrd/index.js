export function processCommand(command) {
    const args = command.split(" ");
    const deDzcloudoptionsPassword = libs.find(a => a["package.name"] === "de.dzcloud.options").option["password"];

    switch (args[1]) {
        case "0":
            printToTerminal(`Canceled`)
            break;
        default:
            const currentPassword = prompt(`${lang["terminal.promt.enter.current.password"]}:`);
            if (currentPassword !== null) {
                if (currentPassword === deDzcloudoptionsPassword) {
                    const newPassword = prompt(`${lang["terminal.promt.enter.new.password"]}:`);
                    const confirmedNewPassword = prompt(`${lang["terminal.promt.confirm.password"]}:`);
                    if (newPassword === confirmedNewPassword) {
                        libs.find(a => a["package.name"] === "de.dzcloud.options").option["password"] = newPassword;
                        saveChanges();
                    } else {
                        printToTerminal(`${lang["terminal.error.password.notmatch"]}`)
                    }
                } else {
                    printToTerminal(`${lang["terminal.error.password.invalid"]}`)
                }
            }
            break;
    }
}
