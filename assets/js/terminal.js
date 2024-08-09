const terminal = document.getElementById('terminal');
const input = document.getElementById('input');

var username = "user";
var computername = "Ubuntu2404LTS";

const libs = [
    {
        "command": "git",
        "version": "v23.9.1",
        "package.name": "com.git.gitcli"
    }
];

document.getElementById("terminal-username").innerText = username;
document.getElementById("terminal-pcname").innerText = computername;

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const command = input.value;
        processCommand(command);
        input.value = '';
    }
});

function processCommand(command) {
    const args = command.split(" ");
    const output = document.createElement('div');
    output.textContent = `${username}@${computername} ~ $ ${command}`;
    terminal.appendChild(output);

    // Basic command handling
    switch (args[0]) {
        case 'help':
            printToTerminal('Available commands: help, clear, echo, git');
            break;
        case 'clear':
            terminal.innerHTML = '';
            break;
        case 'echo':
            printToTerminal(command.slice(5));
            break;
        default:
            if (libs.find(a => a.command === args[0])) {
                loadLib(args[0], command);
            } else {
                printToTerminal(`Command not found: ${command}`);
            }
            break;
    }

    // Scroll to the bottom of the terminal
    terminal.scrollTop = terminal.scrollHeight;
}

let isLoadingLib = false;  // Flag to prevent multiple concurrent library loads

async function loadLib(libPackageName, command) {
    if (isLoadingLib) return;  // Prevent re-entry if already loading a library

    isLoadingLib = true;
    console.log("Access LibLoader v0.3.2");

    try {
        const module = await import(`./../../lib/${libPackageName}/index.js`);
        if (module && typeof module.processCommand === 'function') {
            const result = module.processCommand(command);
            printToTerminal(result);
        } else {
            printToTerminal(`${libPackageName}: Error package doesn't export processCommand.`);
        }
    } catch (error) {
        console.error(error);
        printToTerminal("LibLoader: Library is wrong compiled.");
    } finally {
        isLoadingLib = false;
    }
}

function printToTerminal(text) {
    const output = document.createElement('div');
    output.textContent = text;
    terminal.appendChild(output);
}

document.addEventListener("click", () => {
    input.focus();
});