const terminal = document.getElementById('terminal');
const input = document.getElementById('input');

var username = "user";
var computername = "Ubuntu2404LTS"

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
    const output = document.createElement('div');
    output.textContent = `${username}@${computername} ~ $ ${command}`;
    terminal.appendChild(output);

    // Basic command handling
    switch (command) {
        case 'help':
            printToTerminal('Available commands: help, clear, echo');
            break;
        case 'clear':
            terminal.innerHTML = '';
            break;
        default:
            if (command.startsWith('echo ')) {
                printToTerminal(command.slice(5));
            } else {
                printToTerminal(`Command not found: ${command}`);
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
}