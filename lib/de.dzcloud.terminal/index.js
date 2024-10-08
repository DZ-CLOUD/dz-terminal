export function processCommand(command) {
    const args = command.split(" ");

    const ourPackage = libs.find(a => a.command === args[0])

    switch (args[1]) {
        case "status":
            printToTerminal("ready")
            break;
        case "-v":
        case "--version":
            printToTerminal(`Console is version: ${ourPackage["package.version"]} in branch ${ourPackage["package.branch"]}`);
            break;
        default:
            printToTerminal("Type: terminal -v to see current console version");
            break;
    }

}
