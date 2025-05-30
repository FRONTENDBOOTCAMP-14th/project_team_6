let terminalContent = [
  { user: '6thSense@Desktop', path: '~/likelion/bootcamp', command: 'Welcome to 6thSense Portfolio' },
  { user: '6thSense@Desktop', path: '~/likelion/bootcamp', command: "Type 'npm run dev' to start the development server" },
  { user: '6thSense@Desktop', path: '~/likelion/bootcamp', command: '', isPrompt: true },
];

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
  button.onclick = () => {
    // Additional functionality can be added here
    console.log('Server URL clicked');
  };
  terminal.appendChild(button);
  return button;
}

function handleCommand(terminal, inputElement) {
  const command = inputElement.value.trim();
  if (!command) return;

  // Disable current input
  inputElement.disabled = true;

  // Add command to history
  const newLine = {
    user: '6thSense@Desktop',
    path: '~/likelion/bootcamp',
    command: command,
    isPrompt: false,
  };

  // Add command to terminal
  addTerminalLine(terminal, newLine);
  terminalContent = [...terminalContent.filter(l => !l.isPrompt), newLine];

  // Process command
  if (command === 'npm run dev') {
    const outputLines = [
      '> dev',
      '> vite',
      '',
      '',
      '  VITE v6.3.5  ready in 222 ms',
      '',
      '  ➜  Local:   ',
      '  ➜  Network: use --host to expose',
      ''
    ];

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
  } else if (command) {
    addOutput(terminal, "hint: type 'npm run dev' accurately");
  }

  // Add new prompt only if not 'npm run dev'
  if (command !== 'npm run dev') {
    addNewPrompt(terminal);
  }
}

function addNewPrompt(terminal) {
  const newPrompt = {
    user: '6thSense@Desktop',
    path: '~/likelion/bootcamp',
    command: '',
    isPrompt: true
  };
  
  // Add to history and UI
  terminalContent = [...terminalContent, newPrompt];
  const promptLine = addTerminalLine(terminal, newPrompt);
  const newInput = promptLine.querySelector('.vscode__terminal-input');
  
  if (newInput) {
    newInput.focus();
    
    // Add event listener to the new input
    newInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleCommand(terminal, newInput);
      }
    });
  }
}

function renderTerminal(terminal) {
  if (!terminal) {
    console.error('Terminal element is null or undefined');
    return;
  }

  terminal.innerHTML = '';
  terminalContent.forEach((line) => addTerminalLine(terminal, line));

  // Set up input handling for the last input
  const inputs = terminal.querySelectorAll('.vscode__terminal-input');
  if (inputs.length > 0) {
    const lastInput = inputs[inputs.length - 1];
    lastInput.focus();

    lastInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleCommand(terminal, lastInput);
      }
    });
  }
}

export function initTerminal() {
  try {
    const terminal = document.querySelector('.vscode__terminal');
    if (terminal) {
      renderTerminal(terminal);
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
