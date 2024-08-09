const terminal = document.getElementById('terminal');
const input = document.getElementById('input');

const lang = {}
var username = "user";
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
            printToTerminal('Available commands: help, clear, echo');
            break;
        case 'clear':
            terminal.innerHTML = '';
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
        case '':
            printToTerminal("");
            break;
        default:
            if (command.startsWith('echo ')) {
                printToTerminal(command.slice(5));
            } else {
                printToTerminal(`${command.split(" ")[0]}: command not found`);
            }
            break;
    }

    // Scroll to the bottom of the terminal
    terminal.scrollTop = terminal.scrollHeight;
}

function printToTerminal(text) {
    const output = document.createElement('div');
    output.textContent = text;
    terminal.appendChild(output);
    window.scrollTo(0, document.body.scrollHeight)
}

function init() {
    fetch(`../assets/lang/${userLang || "en"}.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

        })
}