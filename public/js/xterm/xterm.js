// Make sure to include the necessary Xterm dependencies

// Terminal creation and WebSocket connection
const { Terminal } = window.Xterm;  // Use Xterm from the global window object

// Connect to WebSocket server
let socket = new WebSocket("ws://localhost:8080");

// Create a new Terminal instance with default settings
const term = new Terminal({
  cursorBlink: true,       // Enable blinking cursor
  theme: {                 // Set terminal theme
    background: '#1e1e1e',
    foreground: '#dcdcdc',
  },
  fontFamily: 'Monaco, monospace', // Set font style
  fontSize: 14,            // Set font size
});

// Attach the terminal to the DOM element with ID 'terminal'
term.open(document.getElementById("terminal"));

// On receiving data from WebSocket, write it to the terminal
socket.onmessage = (event) => {
  term.write(event.data);
};

// Handle user input and send it to the backend
term.onData((data) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(data);  // Send terminal data (input) to the backend
  } else {
    console.error("WebSocket not open, unable to send data.");
  }
});

// Optional: Add terminal prompt or other interactive features
term.writeln('Welcome to CloudDock IDE Terminal!');
term.write('> ');

// Handle WebSocket errors
socket.onerror = (error) => {
  console.error("WebSocket error:", error);
  term.writeln("\n⚠️ WebSocket connection error. Retrying...");
  reconnectWebSocket();  // Try to reconnect if there is an error
};

// Handle WebSocket closure
socket.onclose = (event) => {
  if (event.wasClean) {
    console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
  } else {
    console.error("WebSocket connection closed unexpectedly");
    term.writeln("\n⚠️ WebSocket connection lost. Attempting to reconnect...");
    reconnectWebSocket();  // Attempt to reconnect if the connection closes unexpectedly
  }
};

// Reconnection logic for WebSocket
function reconnectWebSocket() {
  setTimeout(() => {
    socket = new WebSocket("ws://localhost:8080");  // Reconnect to WebSocket
    setupWebSocket();  // Reinitialize WebSocket event handlers
  }, 3000);  // Attempt to reconnect after 3 seconds
}

// Re-initialize WebSocket event handlers after reconnection
function setupWebSocket() {
  socket.onmessage = (event) => {
    term.write(event.data);
  };
  
  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
    term.writeln("\n⚠️ WebSocket connection error. Retrying...");
    reconnectWebSocket();  // Retry connection
  };

  socket.onclose = (event) => {
    if (event.wasClean) {
      console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
    } else {
      console.error("WebSocket connection closed unexpectedly");
      term.writeln("\n⚠️ WebSocket connection lost. Attempting to reconnect...");
      reconnectWebSocket();  // Reconnect if the connection is lost
    }
  };
}
