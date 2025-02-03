document.getElementById("terminal-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        let command = this.value.trim();
        let outputDiv = document.getElementById("terminal-output");

        // Display the command entered
        outputDiv.innerHTML += `<p><span class="terminal-prompt">$</span> ${command}</p>`;

        // Simulate some basic terminal commands
        if (command.toLowerCase() === "help") {
            outputDiv.innerHTML += `<p>Available commands: echo, help, clear</p>`;
        } else if (command.toLowerCase().startsWith("echo ")) {
            outputDiv.innerHTML += `<p>${command.slice(5)}</p>`; // Output after "echo"
        } else if (command.toLowerCase() === "clear") {
            outputDiv.innerHTML = ""; // Clear terminal output
        } else {
            outputDiv.innerHTML += `<p>Command not found: ${command}</p>`;
        }

        // Scroll to the bottom of the terminal for new input/output
        outputDiv.scrollTop = outputDiv.scrollHeight;

        // Clear the input field for next command
        this.value = "";
    }
});
