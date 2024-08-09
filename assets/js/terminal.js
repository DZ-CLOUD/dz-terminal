const terminal = document.getElementById('terminal');
const input = document.getElementById('input');

const lang = {}
var username = "user";


const libs = [
    {
        "command": "self",
        "package.version": "v1.0.0",
        "package.name": "de.dzcloud.terminal",
        "branch": "feature/DZT-0001"
    }
];
var computername = "Ubuntu2404LTS"
var userLang = "en";

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
        case 'restart':
            location.reload();
            break;
        case 'ls':
        case 'dir':
            printToTerminal('');
            break;
        case '<':
        case '>':
            printToTerminal("bash: syntax error near unexpected token `newline'");
            break;
        case '':
            printToTerminal("");
            break;
        default:
            if (libs.find(a => a.command === args[0])) {
                loadLib(libs.find(a => a.command === args[0])["package.name"], command);
            } else {
                printToTerminal(`${command.split(" ")[0]}: command not found`);
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
   window.scrollTo(0, document.body.scrollHeight)
}

document.addEventListener("click", () => {
    input.focus();
});

function init() {
    fetch(`../assets/lang/${userLang || "en"}.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

        })
}
