const socket = new WebSocket("ws://localhost:8080"); // Change to "wss://" for secure connection

const term = new Terminal();
term.open(document.getElementById("terminal"));

// Handle WebSocket connection
socket.onopen = () => {
    console.log("WebSocket connection established");
    // Optionally update the UI with the connection status
    document.getElementById("status").innerText = "Connected to terminal";
};

// Handle incoming data from the WebSocket server
socket.onmessage = (event) => {
    term.write(event.data);
};

// Handle WebSocket errors
socket.onerror = (error) => {
    console.error("WebSocket error:", error);
    // Display an error message to the user
    document.getElementById("status").innerText = "WebSocket connection error!";
};

// Handle WebSocket closure
socket.onclose = (event) => {
    if (event.wasClean) {
        console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
        document.getElementById("status").innerText = "Disconnected from terminal";
    } else {
        console.error("WebSocket connection closed unexpectedly");
        document.getElementById("status").innerText = "Disconnected (unexpected closure)";
    }
};

// Send data from terminal to WebSocket server
term.onData((data) => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(data); // Send terminal input to server via WebSocket
    } else {
        console.warn("WebSocket not open, cannot send data");
    }
});
