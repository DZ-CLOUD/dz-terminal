export function processCommand(command) {

    const args = command.split(" ");

    switch (args[1]) {
        case "status":
            printToTerminal("No git directory found.")
            break;
        case "branch":
            switch (args[2]) {
                case value:
                    
                    break;
            
                default:
                    break;
            }
            printToTerminal("Setts a branch of a dir")
            break;
        case "-v":
        case "--version":
            console.log(libs);
            printToTerminal("Git version " + libs.find(a => a.command === "git").version);
            break;

        default:
            printToTerminal("If you need help then type git help")
            break;
    }

}