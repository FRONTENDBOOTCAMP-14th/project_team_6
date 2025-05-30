// Default files
const files = {
  'welcome.js': `// Welcome to 6thSense Portfolio
// Start coding here...

function hello() {
  console.log('Hello, 6thSense!');
  return 'Welcome to our portfolio!';
}

// Try editing this file and see the changes in real-time
hello();`,
};

let currentFile = 'welcome.js';

// Function to load file content into editor
function loadFileContent(fileName, content) {
  // Add or update the file in the files object
  files[fileName] = content;

  // If this is a new file, create a tab for it
  if (!document.querySelector(`.vscode__tab[data-file="${fileName}"]`)) {
    let tabsContainer = document.querySelector('.vscode__tabs');

    // Create tabs container if it doesn't exist
    if (!tabsContainer) {
      const editorTabs = document.querySelector('.vscode__editor-tabs');
      if (!editorTabs) return; // Exit if we can't find the editor tabs container

      tabsContainer = document.createElement('div');
      tabsContainer.className = 'vscode__tabs';
      editorTabs.appendChild(tabsContainer);
    }

    tabsContainer.appendChild(createTab(fileName, true));
  }

  // Switch to the tab
  switchTab(fileName);
}

// Listen for file selection events from sidebar
document.addEventListener('fileSelected', (e) => {
  const { path, type, content } = e.detail;
  if (type === 'file' && content) {
    loadFileContent(path, content);
  }
});

function createTab(fileName, isActive = false) {
  const tab = document.createElement('div');
  tab.className = `vscode__tab ${isActive ? 'vscode__tab--active' : ''}`;
  tab.dataset.file = fileName;

  const tabTitle = document.createElement('span');
  tabTitle.className = 'vscode__tab-title';
  tabTitle.textContent = fileName;

  const closeBtn = document.createElement('span');
  closeBtn.className = 'vscode__tab-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeTab(fileName);
  });

  tab.appendChild(tabTitle);
  tab.appendChild(closeBtn);

  tab.addEventListener('click', () => switchTab(fileName));

  return tab;
}

function switchTab(fileName) {
  if (!files[fileName]) return;

  // Update active tab
  document.querySelectorAll('.vscode__tab').forEach((tab) => {
    tab.classList.toggle('vscode__tab--active', tab.dataset.file === fileName);
  });

  // Update editor content
  const editorContent = document.querySelector('.vscode__editor-content');
  editorContent.textContent = files[fileName];

  currentFile = fileName;
  updateLineNumbers(editorContent, document.querySelector('.vscode__editor-line-numbers'));
}

function closeTab(fileName) {
  if (Object.keys(files).length <= 1) return; // Don't close the last tab

  const tab = document.querySelector(`.vscode__tab[data-file="${fileName}"]`);
  if (!tab) return;

  delete files[fileName];
  tab.remove();

  // Switch to another tab if closing the active one
  if (currentFile === fileName) {
    const remainingFiles = Object.keys(files);
    if (remainingFiles.length > 0) {
      switchTab(remainingFiles[0]);
    }
  }
}

export function initEditor() {
  const editorContent = document.querySelector('.vscode__editor-content');
  const tabsContainer = document.querySelector('.vscode__editor-tabs');
  if (!editorContent || !tabsContainer) return;

  // Create tabs for each file
  Object.keys(files).forEach((fileName, index) => {
    const tab = createTab(fileName, index === 0);
    tabsContainer.appendChild(tab);
  });

  // Set initial content
  editorContent.contentEditable = true;
  editorContent.spellcheck = false;
  editorContent.textContent = files[currentFile];

  // Create line numbers container
  const lineNumbers = document.createElement('div');
  lineNumbers.className = 'vscode__editor-line-numbers';

  // Insert line numbers before the editor content
  editorContent.parentNode.insertBefore(lineNumbers, editorContent);

  // Update line numbers
  updateLineNumbers(editorContent, lineNumbers);

  // Update line numbers and file content on input
  editorContent.addEventListener('input', (e) => {
    files[currentFile] = e.target.textContent;
    updateLineNumbers(editorContent, lineNumbers);
  });

  // Handle tab key for indentation
  editorContent.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertText', false, '  ');
    }
  });

  // Add tab button has been removed
}

function updateLineNumbers(editor, lineNumbers) {
  const lineCount = Math.max(1, editor.textContent.split('\n').length);
  const currentLineCount = lineNumbers.children.length;

  // Add or remove line numbers as needed
  if (lineCount > currentLineCount) {
    for (let i = currentLineCount + 1; i <= lineCount; i++) {
      const lineNumber = document.createElement('div');
      lineNumber.className = 'vscode__editor-line-number';
      lineNumber.textContent = i;
      lineNumbers.appendChild(lineNumber);
    }
  } else if (lineCount < currentLineCount) {
    while (lineNumbers.children.length > lineCount) {
      lineNumbers.removeChild(lineNumbers.lastChild);
    }
  }
}
