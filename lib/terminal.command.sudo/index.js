export function processCommand(command) {
    const args = command.split(" ");
    const deDzcloudoptionsSudo = libs.find(a => a["package.name"] === "de.dzcloud.options").option["is-sudo"];
    const deDzcloudoptionsPassword = libs.find(a => a["package.name"] === "de.dzcloud.options").option["password"];
    const userInput = document.getElementById("user-input-parent-element");

    // Hide the input field while entering the password
    userInput.style.display = "none";

    // Remove the previous 'keydown' event listener for the input element
    input.removeEventListener("keydown", commandKeyListener);

    // Check if the password input already exists and remove it
    let passphaseInputElement = document.getElementById("passphaseInput");
    if (passphaseInputElement) {
        passphaseInputElement.parentElement.remove(); // Remove the previous password input container
    }

    // Prompt for password input
    const passphaseInputHTML = `
        <div>
            <span>${lang["terminal.promt.enter.passphase"]}:</span>
            <input type="password" id="passphaseInput" spellcheck="false" autocomplete="off" autofocus>
        </div>`;
    terminal.innerHTML += passphaseInputHTML;

    passphaseInputElement = document.getElementById("passphaseInput");

    // Add a new 'keydown' event listener to handle password verification
    passphaseInputElement.addEventListener('keydown', handlePassphaseVerification);

    function handlePassphaseVerification(event) {
        if (event.key === 'Enter') {
            const passphase = passphaseInputElement.value;
            if (passphase === deDzcloudoptionsPassword) {
                deDzcloudoptionsSudo = "true";
                printToTerminal(`Sudo mode activated.`);
            } else {
                printToTerminal(`Access denied: Wrong passphase.`);
            }

            // Clean up: remove the event listener and the entire password input container
            passphaseInputElement.removeEventListener('keydown', handlePassphaseVerification);
            passphaseInputElement.parentElement.remove(); // Remove the entire div containing the password input

            // Show the input field again
            userInput.style.display = "block";

            // Re-add the original 'keydown' event listener for normal command processing
            input.addEventListener("keydown", commandKeyListener);
        }
    }

    // Original 'keydown' event listener for processing commands
    function commandKeyListener(event) {
        if (event.key === 'Enter') {
            const command = input.value;
            processCommand(command);
            input.value = '';
        }
    }

    // Ensure the original event listener is attached if not processing a password
    input.addEventListener("keydown", commandKeyListener);
}
