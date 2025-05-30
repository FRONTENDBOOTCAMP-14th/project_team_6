// Monaco Editor 인스턴스
let monacoEditor = null;

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

// Monaco Editor 초기화
async function initMonacoEditor() {
  // Monaco Editor 스크립트 로드
  const monacoLoaderScript = document.createElement('script');
  monacoLoaderScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs/loader.min.js';
  
  return new Promise((resolve, reject) => {
    monacoLoaderScript.onload = () => {
      require.config({ 
        paths: { 
          'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs',
        },
        'vs/nls': {
          availableLanguages: { '*': 'ko' }
        }
      });
      
      // Monaco Editor 로드
      require(['vs/editor/editor.main'], function() {
        try {
          // 에디터 생성
          monacoEditor = monaco.editor.create(document.getElementById('editor-container'), {
            value: '', // Start with empty content, will be set by switchTab
            language: 'plaintext',
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 14,
            lineNumbers: 'on',
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            renderWhitespace: 'selection',
            tabSize: 2,
            scrollbar: {
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10
            },
            wordWrap: 'on',
            wrappingIndent: 'indent',
            autoIndent: 'full',
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showClasses: true,
              showFunctions: true,
              showVariables: true,
              showModules: true,
              showFiles: true,
              showReferences: true,
              showFolders: true,
              showTypeParameters: true,
              showConstants: true,
              showConstructors: true,
              showProperties: true,
              showEvents: true,
              showOperators: true,
              showUnits: true,
              showValues: true,
              showIssues: true,
              showUsers: true,
              showColors: true,
              showFilesInFileList: true,
              showInlineDetails: true,
              showMethodSuggestions: true,
              showStructs: true
            }
          });
          
          // 에디터 스타일 조정
          const editorContainer = document.querySelector('.vscode__editor-content');
          if (editorContainer) {
            editorContainer.style.padding = '0';
            editorContainer.style.overflow = 'hidden';
          }
          
          // Load initial file
          if (currentFile && files[currentFile]) {
            loadFileContent(currentFile, files[currentFile]);
          } else if (Object.keys(files).length > 0) {
            // If no current file but we have files, load the first one
            const firstFile = Object.keys(files)[0];
            currentFile = firstFile;
            loadFileContent(firstFile, files[firstFile]);
          }
          
          // Set up model change listener
          monacoEditor.onDidChangeModelContent(() => {
            if (currentFile && monacoEditor) {
              const model = monacoEditor.getModel();
              if (model) {
                files[currentFile] = model.getValue();
              }
            }
          });
          
          resolve();
        } catch (error) {
          console.error('Error initializing Monaco Editor:', error);
          reject(error);
        }
      });
    };
    
    monacoLoaderScript.onerror = (error) => {
      console.error('Failed to load Monaco Editor:', error);
      reject(new Error('Failed to load Monaco Editor'));
    };
    
    document.head.appendChild(monacoLoaderScript);
  });
}

// Function to get language from file extension
function getLanguageFromFileName(fileName) {
  const extension = fileName.split('.').pop().toLowerCase();
  switch(extension) {
    case 'js': return 'javascript';
    case 'jsx': return 'javascript';
    case 'ts': return 'typescript';
    case 'tsx': return 'typescript';
    case 'html': return 'html';
    case 'css': return 'css';
    case 'scss':
    case 'sass': return 'scss';
    case 'less': return 'less';
    case 'json': return 'json';
    case 'md': return 'markdown';
    case 'py': return 'python';
    case 'java': return 'java';
    case 'c': return 'c';
    case 'cpp':
    case 'cc':
    case 'h':
    case 'hpp': return 'cpp';
    case 'cs': return 'csharp';
    case 'php': return 'php';
    case 'rb': return 'ruby';
    case 'go': return 'go';
    case 'rs': return 'rust';
    case 'sh': return 'shell';
    case 'sql': return 'sql';
    case 'xml': return 'xml';
    case 'yaml':
    case 'yml': return 'yaml';
    default: return 'plaintext';
  }
}

// Function to load file content into editor
function loadFileContent(fileName, content) {
  // Add or update the file in the files object
  files[fileName] = content;
  
  // If Monaco Editor is not initialized yet, store the file and wait for initialization
  if (!monacoEditor) {
    console.log('Monaco Editor not initialized yet, storing file:', fileName);
    return;
  }

  // Check if tab already exists
  let tab = document.querySelector(`.vscode__tab[data-file="${fileName}"]`);
  const isNewTab = !tab;
  
  // If this is a new file, create a tab for it
  if (isNewTab) {
    let tabsContainer = document.querySelector('.vscode__tabs');

    // Create tabs container if it doesn't exist
    if (!tabsContainer) {
      const editorTabs = document.querySelector('.vscode__editor-tabs');
      if (!editorTabs) {
        console.error('Editor tabs container not found');
        return;
      }

      tabsContainer = document.createElement('div');
      tabsContainer.className = 'vscode__tabs';
      editorTabs.appendChild(tabsContainer);
    }

    tab = createTab(fileName, true);
    tabsContainer.appendChild(tab);
  }

  // Switch to the tab
  switchTab(fileName);

  // Update editor content
  if (monacoEditor) {
    const language = getLanguageFromFileName(fileName);
    let model = monacoEditor.getModel();
    
    // Create a new model if this is a new file or if we don't have a model yet
    if (!model || (model.uri && model.uri.path !== `/${fileName}`)) {
      // Dispose old model if it exists
      if (model) {
        model.dispose();
      }
      
      // Create new model with proper URI and language
      model = monaco.editor.createModel(
        content,
        language,
        monaco.Uri.parse(`inmemory://model/${fileName}`)
      );
      
      // Set the new model to the editor
      monacoEditor.setModel(model);
    } else {
      // Update existing model
      model.setValue(content);
      monaco.editor.setModelLanguage(model, language);
    }
    
    // Update current file
    currentFile = fileName;
    
    // Update tab title if needed
    const tabTitle = tab.querySelector('.vscode__tab-title');
    if (tabTitle && tabTitle.textContent !== fileName) {
      tabTitle.textContent = fileName;
    }
  }
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
  if (!files[fileName]) {
    console.error(`File not found: ${fileName}`);
    return;
  }

  // Update active tab
  document.querySelectorAll('.vscode__tab').forEach((tab) => {
    tab.classList.toggle('vscode__tab--active', tab.dataset.file === fileName);
  });

  // Update editor content if Monaco is initialized
  if (monacoEditor) {
    const language = getLanguageFromFileName(fileName);
    let model = monaco.editor.getModel(monaco.Uri.parse(`inmemory://model/${fileName}`));
    
    if (!model) {
      // Create new model if it doesn't exist
      model = monaco.editor.createModel(
        files[fileName],
        language,
        monaco.Uri.parse(`inmemory://model/${fileName}`)
      );
    }
    
    // Set the model to the editor
    monacoEditor.setModel(model);
    
    // Update current file
    currentFile = fileName;
    
    console.log(`Switched to tab: ${fileName} (${language})`);
  } else {
    // Fallback for when Monaco is not initialized
    const editorContent = document.querySelector('.vscode__editor-content');
    if (editorContent) {
      editorContent.textContent = files[fileName];
      updateLineNumbers(editorContent, document.querySelector('.vscode__editor-line-numbers'));
    }
  }
  
  // Update status bar
  updateStatusBar(fileName);
}

// Update status bar with file information
function updateStatusBar(fileName) {
  const statusBar = document.querySelector('.vscode__status-bar');
  if (!statusBar) return;
  
  // Update file type indicator
  const fileType = document.querySelector('.vscode__status-bar-item:last-child');
  if (fileType) {
    const extension = fileName.split('.').pop().toUpperCase();
    fileType.textContent = extension;
  }
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

export async function initEditor() {
  const editorContent = document.querySelector('.vscode__editor-content');
  const tabsContainer = document.querySelector('.vscode__editor-tabs');
  if (!editorContent || !tabsContainer) return;

  // Create tabs for each file
  Object.keys(files).forEach((fileName, index) => {
    const tab = createTab(fileName, index === 0);
    tabsContainer.appendChild(tab);
  });

  // Initialize Monaco Editor
  try {
    await initMonacoEditor();
    
    // Load initial content
    if (monacoEditor) {
      const model = monacoEditor.getModel();
      model.setValue(files[currentFile]);
      monaco.editor.setModelLanguage(model, 'javascript');
    }
  } catch (error) {
    console.error('Failed to initialize Monaco Editor:', error);
    
    // Fallback to simple editor if Monaco fails to load
    editorContent.contentEditable = true;
    editorContent.spellcheck = false;
    editorContent.textContent = files[currentFile];
    
    const lineNumbers = document.createElement('div');
    lineNumbers.className = 'vscode__editor-line-numbers';
    editorContent.parentNode.insertBefore(lineNumbers, editorContent);
    updateLineNumbers(editorContent, lineNumbers);
    
    editorContent.addEventListener('input', (e) => {
      files[currentFile] = e.target.textContent;
      updateLineNumbers(editorContent, lineNumbers);
    });
    
    editorContent.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        document.execCommand('insertText', false, '  ');
      }
    });
  }
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
