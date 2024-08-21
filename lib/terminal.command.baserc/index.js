export function processCommand(command) {
    const args = command.split(" ");

    switch (args[1]) {
        case "-e":
        case "--encode":
        case "encode":
            processEncode(command);
            break;
        case "-d":
        case "--decode":
        case "decode":
            processDecode(command);
            break;
        case "-h":
        case "--help":
        case "help":
            printHelp();
            break;
        case "-v":
        case "--version":
            printToTerminal(`Baserc is version: ${ourPackage["package.version"]} in branch ${ourPackage["package.branch"]}`)
            break;
        default:
            printToTerminal(`To see which commands are available, type: baserc help`);
            break;
    }
}

function processEncode(command) {
    const args = command.split(" ");
    const text = args.slice(3).join(" ");
    try {
        let encodedText;
        switch (args[2]) {
            case "base64":
                encodedText = btoa(text);
                break;
            case "url":
                encodedText = encodeURIComponent(text);
                break;
            default:
                printToTerminal(`Unable to encode text. With the ${args[2]} encoding method.`);
                return;
        }
            printToTerminal(encodedText);
    } catch (error) {
        printToTerminal(`Unable to encode text. With the ${args[2]} encoding method. Invalid text.`)
    }


}

function processDecode(command) {
    const args = command.split(" ");
    const text = args.slice(3).join(" ");
    try {
        let decodedText;
        switch (args[2]) {
            case "base64":
                decodedText = atob(text);
                break;
            case "url":
                decodedText = decodeURIComponent(text);
                break;
            default:
                printToTerminal(`Unable to decode text. With the ${args[2]} encoding method.`);
                return;
        }
            printToTerminal(decodedText);
    } catch (error) {
        printToTerminal(`Unable to decode text. With the ${args[2]} encoding method. Invalid text.`);
        return;
    }
}

function printHelp() {
    printToTerminal(`Help all commands you can use with baserc:`);
    printToTerminal(` -  baserc encode <encoding> <text>     (Encode text)`);
    printToTerminal(` -  baserc decode <encoding> <text>     (Decode text)`);
    printToTerminal(` -  baserc help                         (Shows this) `);
    printToTerminal(`-----------------------------------------------------`);
    printToTerminal(`Endcode and Decodings:                               `);
    printToTerminal(` -  base64                                           `);
    printToTerminal(` -  url                                              `);
}