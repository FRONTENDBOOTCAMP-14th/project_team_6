let terminalContent = [
  { user: '6thSense@Desktop', path: '~/likelion/bootcamp', command: 'Welcome to 6thSense Portfolio' },
  { user: '6thSense@Desktop', path: '~/likelion/bootcamp', command: "Type 'npm run dev' to start the development server" },
  { user: '6thSense@Desktop', path: '~/likelion/bootcamp', command: '', isPrompt: true },
];

// Track the current active input to prevent duplicates
let currentInput = null;

function addTerminalLine(terminal, line) {
  const lineElement = document.createElement('div');
  lineElement.className = 'vscode__terminal-line';
  lineElement.innerHTML = `
    <div class="vscode__terminal-path">
      <span class="vscode__terminal-user">${line.user}</span>:
      <span class="vscode__terminal-path-text">${line.path}</span>
    </div>
    <div class="vscode__terminal-command-line">
      <span class="vscode__terminal-prompt">$</span>
      ${line.isPrompt ? '<input type="text" class="vscode__terminal-input" autofocus />' : `<span class="vscode__terminal-command">${line.command}</span>`}
    </div>
  `
    .split('\n')
    .map((s) => s.trim())
    .join('');

  terminal.appendChild(lineElement);
  return lineElement;
}

function addOutput(terminal, output) {
  const outputElement = document.createElement('div');
  outputElement.className = 'vscode__terminal-output';
  outputElement.textContent = output;
  terminal.appendChild(outputElement);
  return outputElement;
}

function addServerUrlButton(terminal) {
  const button = document.createElement('button');
  button.className = 'vscode__terminal-url-button';
  button.textContent = 'http://localhost:6th-Sense/';
  button.onclick = (e) => {
    e.preventDefault();
    // Open landing_output.html in a new tab
    window.open('/src/utils/landing_output.html', '_blank');
  };
  terminal.appendChild(button);
  return button;
}

function handleCommand(terminal, inputElement) {
  // Prevent multiple command processing
  if (inputElement.dataset.processing === 'true') return;

  const command = inputElement.value.trim();
  if (!command) return;

  // Mark as processing and disable input
  inputElement.dataset.processing = 'true';
  inputElement.disabled = true;

  // Clear current input reference
  if (currentInput === inputElement) {
    currentInput = null;
  }

  // Add command to history without showing it again (it's already visible in the input)
  const newLine = {
    user: '6thSense@Desktop',
    path: '~/likelion/bootcamp',
    command: command,
    isPrompt: false,
  };

  // Update terminal content without re-adding the command line
  terminalContent = [...terminalContent.filter((l) => !l.isPrompt), newLine];

  // Process command
  if (command === 'npm run dev') {
    const outputLines = ['> dev', '> vite', '', '', '  VITE v6.3.5  ready in 222 ms', '', '  ➜  Local:   ', '  ➜  Network: use --host to expose', ''];

    // Add output lines to terminal
    outputLines.forEach((line) => {
      if (line.includes('Local:')) {
        const container = document.createElement('div');
        container.className = 'vscode__terminal-output';
        container.textContent = line;
        addServerUrlButton(container);
        terminal.appendChild(container);
      } else {
        addOutput(terminal, line);
      }
    });

    // Add output to terminalContent for history
    outputLines.forEach(line => {
      terminalContent = [...terminalContent, {
        user: '',
        path: '',
        command: line,
        isPrompt: false
      }];
    });

    // Scroll to bottom after rendering
    setTimeout(() => {
      terminal.scrollTop = terminal.scrollHeight;
    }, 0);
  } else if (command) {
    addOutput(terminal, "hint: type 'npm run dev' accurately");
  }

  // Add a new prompt after command execution, except for 'npm run dev'
  if (command !== 'npm run dev') {
    setTimeout(() => {
      addNewPrompt(terminal);
    }, 0);
  }
}

function addNewPrompt(terminal) {
  // Don't add a new prompt if one already exists
  if (currentInput) return;

  const newPrompt = {
    user: '6thSense@Desktop',
    path: '~/likelion/bootcamp',
    command: '',
    isPrompt: true,
  };

  // Add to history and UI
  terminalContent = [...terminalContent, newPrompt];
  const promptLine = addTerminalLine(terminal, newPrompt);
  const newInput = promptLine.querySelector('.vscode__terminal-input');

  if (newInput) {
    // Store reference to current input
    currentInput = newInput;
    newInput.focus();

    // Add event listener to the new input
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        // Only process if not already processing
        if (newInput.dataset.processing !== 'true') {
          handleCommand(terminal, newInput);
        }
      }
    };

    // Remove any existing listeners and add new one
    newInput.removeEventListener('keydown', handleKeyDown);
    newInput.addEventListener('keydown', handleKeyDown);
  }
}

function renderTerminal(terminal, isInitialRender = false) {
  if (!terminal) {
    console.error('Terminal element is null or undefined');
    return;
  }

  // Only clear and re-render if it's not the initial render
  if (!isInitialRender) {
    terminal.innerHTML = '';
    terminalContent.forEach((line) => addTerminalLine(terminal, line));
  }

  // Set up input handling for the last input
  const inputs = terminal.querySelectorAll('.vscode__terminal-input');
  if (inputs.length > 0) {
    const lastInput = inputs[inputs.length - 1];
    lastInput.focus();

    // Remove any existing event listeners to prevent duplicates
    const newLastInput = lastInput.cloneNode(true);
    lastInput.parentNode.replaceChild(newLastInput, lastInput);

    newLastInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleCommand(terminal, newLastInput);
      }
    });
  }
}

export function initTerminal() {
  try {
    const terminal = document.querySelector('.vscode__terminal');
    if (terminal) {
      // Initial render with isInitialRender flag
      terminal.innerHTML = '';
      terminalContent.forEach((line) => addTerminalLine(terminal, line));

      // Set up initial input handling
      renderTerminal(terminal, true);
      console.log('Terminal initialized successfully');
      return true;
    } else {
      console.warn('Terminal element not found, will retry...');
      // Retry after a short delay
      setTimeout(() => initTerminal(), 100);
      return false;
    }
  } catch (error) {
    console.error('Error initializing terminal:', error);
    return false;
  }
}

// Export for testing or manual initialization
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initTerminal, renderTerminal };
}

document.addEventListener('DOMContentLoaded', initTerminal);
