const terminal = document.getElementById('terminal');
const input = document.getElementById('input');

const libs = JSON.parse(localStorage.getItem("terminalrc"));
if (!libs) {
    init();
    location.reload();
}

var lang = {}
var username = libs.find(a => a["package.name"] === "de.dzcloud.options").option.username || "user";
var computername = libs.find(a => a["package.name"] === "de.dzcloud.options").option["pc-name"] || "Unloaded"
var userLang = libs.find(a => a["package.name"] === "de.dzcloud.terminal").option.language || "en";

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
            printToTerminal('Available commands: help, clear, echo');
            break;
        case 'clear':
            terminal.innerHTML = '';
            break;
        case 'echo':
            printToTerminal(command.slice(5));//Dont slice the command slice the args
            break;
        case 'exit':
            window.close();
            break;
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
        case 'source':
            loadTerminalVariables();
            break;
        case '':
            printToTerminal("");
            break;
        default:
            if (libs.find(a => a.command === args[0])) {
                loadLib(libs.find(a => a.command === args[0])["package.name"], command);
            } else {
                printToTerminal(`${lang["terminal.error.command.notfound"].replace("%s", args[0])}`);
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

function init() {
    const libslocal = localStorage.getItem("terminalrc");
    if (!libslocal) {
        fetch(`../../lib.json`)
            .then(res => res.json())
            .then(data => [
                localStorage.setItem("terminalrc", JSON.stringify(data.libs))
            ])
            .catch(err => {
                printToTerminal(`${err}`)
            })

    }

    lang = {};
    fetch(`../assets/lang/${userLang || "en"}.json`)
        .then(res => res.json())
        .then(data => {
            lang = data
        }).catch(err => {
            printToTerminal(`${err}`)
        })

    loadTerminalVariables()

}

function loadTerminalVariables() {
    const tlibo = libs.find(a => a["package.name"] === "de.dzcloud.terminal").option
    // In your JavaScript file
    document.documentElement.style.setProperty('--terminal-font-name', tlibo["font-name"].split(" ")[0]);
    document.documentElement.style.setProperty('--terminal-font-size', tlibo["font-name"].split(" ")[1] + "pt");
    document.documentElement.style.setProperty('--terminal-color', tlibo["color"]);
    document.documentElement.style.setProperty('--terminal-bg', tlibo["background-color"]);
    libs.find(a => a["package.name"] === "de.dzcloud.options").option["is-sudo"] = false;
    saveChanges();
}

function saveChanges() {
    localStorage.setItem("terminalrc", JSON.stringify(libs))
}

document.addEventListener("click", () => {
    input.focus();
});

init()
