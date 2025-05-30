const terminalContent = [
  { user: '6thSense@Desktop', path: '~/likelion/bootcamp', command: 'Welcome to 6thSense Portfolio' },
  { user: '6thSense@Desktop', path: '~/likelion/bootcamp', command: "Type 'npm run dev' to enjoy our output" },
  { user: '6thSense@Desktop', path: '~/likelion/bootcamp', command: '', isPrompt: true },
];

function renderTerminal(terminal) {
  if (!terminal) {
    console.error('Terminal element is null or undefined');
    return;
  }

  terminal.innerHTML = '';

  terminalContent.forEach((line, index) => {
    const lineElement = document.createElement('div');
    lineElement.className = 'vscode__terminal-line';

    const isLastLine = index === terminalContent.length - 1;

    let lineHTML = `
      <div class="vscode__terminal-path">
        <span class="vscode__terminal-user">${line.user}</span>:
        <span class="vscode__terminal-path-text">${line.path}</span>
      </div>
      <div class="vscode__terminal-command-line">
        <span class="vscode__terminal-prompt">$</span>
        ${isLastLine ? '<input type="text" class="vscode__terminal-input" autofocus />' : `<span class="vscode__terminal-command">${line.command}</span>`}
      </div>
    `
      .split('\n')
      .map((s) => s.trim())
      .join('');

    lineElement.innerHTML = lineHTML;
    terminal.appendChild(lineElement);
  });

  // Focus the input field
  const input = terminal.querySelector('.vscode__terminal-input');
  if (input) {
    input.focus();
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
