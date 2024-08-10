export function processCommand(command) {
    const args = command.split(" ");

    const rmLib = libs.find(a => a.command === args[0])

    switch (args[1]) {
        case "status":
            printToTerminal("ready")
            break;
        default:
            break;
    }

}
