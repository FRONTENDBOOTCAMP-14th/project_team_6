// Monaco Editor 인스턴스
let monacoEditor = null;

// Default files
const files = {
  'README.md': `# 🛍️ Blue Mall - 식스센스(6조) UI 프로젝트
  (https://github.com/FRONTENDBOOTCAMP-14th/project_team_6/)
  
> VS Code 인터페이스에서 영감을 받아 구성된 컴포넌트 기반 쇼핑몰 UI 웹페이지입니다.  
> 컴포넌트 기반의 페이지 구성, 웹 접근성 전략을 학습하고 구현한 팀 프로젝트입니다.

## 📂 목차

1. [프로젝트 개요](#-프로젝트-개요)
2. [구현 방법](#-구현-방법)
3. [인덱스 페이지 구성](#️-인덱스-페이지-구성)
4. [사용 방법 요약](#-사용-방법-요약)
5. [결과물 기능 리스트](#-결과물-기능-리스트)
6. [컴포넌트 구현 담당자 정리](#-컴포넌트-구현-담당자-정리)

## 📌 프로젝트 개요

- **프로젝트 명**: 식스센스(6조) UI 프로젝트
- **진행 기간**: 2025.05.26 ~ 2025.06.05
- **참여 인원**: 4명
- **목표**: HTML/CSS와 간단한 JavaScript를 활용하여 실전 UI 구조 설계 및 기능 구현

## 🛠 구현 방법

이 프로젝트는 재사용 가능한 UI 컴포넌트 구조를 기반으로 HTML, CSS, JavaScript를 조합하여 구현되었습니다.  
개발 환경은 Vite와 node.js 및 vanilla html, css, js를 기반으로 구성하였습니다.

### 🧪 기술 스택

- **HTML/CSS**: 시맨틱 마크업 + BEM 네이밍, CSS Grid/Flex 조합
- **JavaScript**: Vanilla JS (컴포넌트 별 JS 모듈 분리)
- **개발 환경**: Vite, Node.js 기반 로컬 서버
- **스타일 관리**: \`reset.css\`, \`theme.css\`, \`base.css\` 등 공통 스타일 분리
- **버전 관리**: Git + GitHub

### 🔧 주요 구조 및 컴포넌트

- \`/src/components/...\`  
  → 페이지 단위 구성 폴더 내 UI 컴포넌트 (\`login\`, \`footer\`, \`list-category\`, \`product-list\` 등)

- \`/src/assets\`  
  → 이미지 및 정적 리소스 저장

- \`/src/common\`  
  → 공통 스타일 파일 위치

- \`/index\`  
  → index 페이지 구성요소 위치

- \`/output\`  
  → output 페이지 구성요소 위치

- Production 구조
  → output-index.html이 렌더링 페이지 역할을 하며 main 부분을 output-index.js로 동적으로 import하여 직접DOM을 조작하여 렌더링 하는 형태

### 👩‍🦽‍➡️ 접근성 전략

- 개발 초기에는 ARIA 속성 적용이 미흡,  
  컴포넌트 개발 완료 후 접근성 개선(\`aria-label\`, \`aria-expanded\`, \`aria-hidden\` 등)을 단계적으로 반영할 계획

## 🖥️ 인덱스 페이지 구성

### 🎨 디자인

- VS Code를 본뜬 3분할 인터페이스
  - 사이드바 메뉴
  - 코드 편집 영역
  - 터미널 입력창

### 📂 사이드바

| 메뉴         | 동작                                                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`6th sense\`  | 하위 메뉴 \`Members\`, \`Components\` 표시                                                                                                                                          |
| \`Members\`    | 에디터 창에서 팀원별 자기소개 및 회고 내용을 마크다운 스타일로 확인 가능                                                                                                        |
| \`Components\` | 각 컴포넌트의 HTML 마크업 구조를 코드 스타일로 확인할 수 있으며,<br>원하는 항목을 선택한 뒤 좌측 하단 Preview 버튼을 클릭하면 해당 컴포넌트의 실제 렌더링 결과를 확인할 수 있음 |

### 💻 터미널 창

- 실제 터미널처럼 구현되어 있으며, 사용자 입력을 받을 수 있음
- 아래 명령어를 입력하면 **Blue Mall 완성 페이지로 이동하는 링크가 출력**

\`\`\`bash
npm run dev
\`\`\`

## 📌 사용 방법 요약

1. \`index.html\`을 실행합니다.
2. 사이드바에서 \`6th sense\` 클릭 → \`Members\`, \`Components\` 메뉴 표시
3. \`Members\` 클릭 → 팀원별 \`.md\` 형식 자기소개 및 회고 확인
4. \`Components\` 클릭 → 구현된 컴포넌트 구조 시각적으로 확인
5. 터미널 창에 \`npm run dev\` 입력 → 완성된 쇼핑몰 페이지로 이동

## 🔨 결과물 기능 리스트

### Common

1. header
  - 로고 : home page로 이동
  - 장바구니 로고 : Cart page로 이동
  - 사람모양 로고 : login page로 이동
  - 리스트 카테고리 : Products list page로 이동

2. footer
  - 전화번호 : a 태그로 전화번호로 연결

### HOME

1. Main banner
  - 배너 컨트롤 넘버 : next와 prev 버튼으로 배너 이동
  - Play 버튼 : 배너 자동재생의 실행/중지

2. Product Card
  - 제품이미지 / 제품명 : 제품 상세 페이지로 이동
  - 장바구니 로고 : 장바구니 Modal 실행

### Products list

1. filter
  - 분류 : 클릭 시 해당 분류의 아코디언 펼침 및 타 분류 hidden
  - 초기화 : 모든 체크박스 해제
  
2. list Nav
  - 네비 : 클릭 시 active / inactive 상태 구분 구현

3. Product Card
  - 제품이미지 / 제품명 : 제품 상세 페이지로 이동
  - 장바구니 로고 : 장바구니 Modal 실행

### Product detail

1. 상품 상세
  - 상품 갯수 조정 버튼 : 상품 갯수 변경 및 가격 연동
  - 즐겨찾기 / 알림 버튼 : active / inactive 상태 구분 구현

2. 상세 Nav
  - 네비 : 클릭 시 section 이동 및 active / inactive 상태 구분 구현
  - 스크롤 감지에 따른 네비 active / inactive 상태 구분 구현

3. 상품 리뷰
  - 리뷰 리스트 : 제목 클릭 시 내용 아코디언 펼침 및 타 리뷰 hidden
  - 비밀 리뷰 : 비밀번호 입력 input / 입력 시 비밀번호 오류 메시지 출력

### Cart

1. 장바구니 리스트
  - 체크박스 : 전체 선택 시 모든 체크박스 checked / unchecked
  - 카테고리 제목 : 클릭 시 해당 카테고리의 아코디언 펼침
  - 제품 수량 조정 버튼 : 제품 수량 변경 및 가격 연동

2. 주문 정보
  - 배송지 버튼 : 클릭 시 modal 작동
  - 주문 결제 금액 계산 : 체크박스 체크와 수량을 연동하여 총 금액 출력 / 1만원을 threshold로 배송비 변동

### LOGIN

1. 로그인
  - 로그인 버튼 : 클릭 시 modal 작동
  - 회원가입 버튼 : 클릭 시 register page로 이동

### REGISTER

1. 회원가입 입력
  - 주소검색 버튼 : 클릭 시 modal 작동
  - 약관동의 체크박스 : 전체 동의 체크박스 클릭 시 모든 체크박스의 checked / unchecked
  - 가입하기 버튼 : 클릭 시 modal 작동

## 🧑‍💻 컴포넌트 구현 담당자 정리

| 이름     | 담당 컴포넌트 / 역할 요약                                         |
| -------- | ----------------------------------------------------------------- |
| 김에스더 | \`cart-content\`, \`product-list\`, \`detail\`, \`list-container\`        |
| 심현보   | \`cart\`, \`login\`, \`Register\`                                       |
| 윤동식   | \`item-inquire\`, \`item-review\`, \`list-category\`                    |
| 이수진   | \`banner\`, \`footer\`, \`header\`, \`detail-nav\`, \`detail-product-desc\` |`,
};

let currentFile = 'README.md';

// Monaco Editor 초기화
async function initMonacoEditor() {
  // Monaco Editor 스크립트 로드
  const monacoLoaderScript = document.createElement('script');
  monacoLoaderScript.src =
    'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs/loader.min.js';

  return new Promise((resolve, reject) => {
    monacoLoaderScript.onload = () => {
      require.config({
        paths: {
          vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs',
        },
        'vs/nls': {
          availableLanguages: { '*': 'ko' },
        },
      });

      // Monaco Editor 로드
      require(['vs/editor/editor.main'], function () {
        try {
          // 커스텀 테마 정의
          monaco.editor.defineTheme('custom-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
              { token: 'markdown', foreground: 'FFFFFF' },
              { token: 'string.md', foreground: 'FFFFFF' },
              { token: 'keyword.md', foreground: 'FFFFFF' },
              { token: 'comment.md', foreground: '6A9955' },
              { token: 'heading.md', foreground: '569CD6', fontStyle: 'bold' },
              { token: 'list.md', foreground: 'D4D4D4' },
              { token: 'table.md', foreground: 'D4D4D4' },
              { token: 'link.md', foreground: '9CDCFE', fontStyle: 'underline' },
              { token: 'code.md', foreground: 'CE9178' },
            ],
            colors: {
              'editor.foreground': '#FFFFFF',
              'editor.background': '#1E1E1E',
            },
          });

          // 에디터 생성
          monacoEditor = monaco.editor.create(document.getElementById('editor-container'), {
            value: '', // Start with empty content, will be set by switchTab
            language: 'plaintext',
            theme: 'custom-dark',
            automaticLayout: true,
            fontSize: 14,
            lineNumbers: 'on',
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            renderWhitespace: 'selection',
            tabSize: 2,
            scrollbar: {
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
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
              showStructs: true,
            },
          });

          // 에디터 스타일 조정
          const editorContainer = document.querySelector('.vscode__editor-content');
          if (editorContainer) {
            editorContainer.style.padding = '0';
            editorContainer.style.overflow = 'hidden';
          }

          // 파일 타입에 따라 언어 모드 설정
          function setLanguageByFileName(fileName) {
            if (!monacoEditor) return;

            const extension = fileName.split('.').pop().toLowerCase();
            let language = 'plaintext';

            switch (extension) {
              case 'md':
                language = 'markdown';
                break;
              case 'html':
              case 'htm':
                language = 'html';
                break;
              case 'js':
                language = 'javascript';
                break;
              case 'css':
                language = 'css';
                break;
              // 필요한 확장자 추가
            }

            const model = monacoEditor.getModel();
            if (model) {
              monaco.editor.setModelLanguage(model, language);
            }
          }

          // Load initial file
          if (currentFile && files[currentFile]) {
            loadFileContent(currentFile, files[currentFile]);
            setLanguageByFileName(currentFile);
          } else if (Object.keys(files).length > 0) {
            const firstFile = Object.keys(files)[0];
            currentFile = firstFile;
            loadFileContent(firstFile, files[firstFile]);
            setLanguageByFileName(firstFile);
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

          // 파일 변경 시 언어 모드 업데이트
          window.addEventListener('fileSelected', e => {
            if (e.detail && e.detail.path) {
              setLanguageByFileName(e.detail.path);
            }
          });

          resolve();
        } catch (error) {
          console.error('Error initializing Monaco Editor:', error);
          reject(error);
        }
      });
    };

    monacoLoaderScript.onerror = error => {
      console.error('Failed to load Monaco Editor:', error);
      reject(new Error('Failed to load Monaco Editor'));
    };

    document.head.appendChild(monacoLoaderScript);
  });
}

// Function to get language from file extension
function getLanguageFromFileName(fileName) {
  const extension = fileName.split('.').pop().toLowerCase();
  switch (extension) {
    case 'js':
      return 'javascript';
    case 'jsx':
      return 'javascript';
    case 'ts':
      return 'typescript';
    case 'tsx':
      return 'typescript';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'scss':
    case 'sass':
      return 'scss';
    case 'less':
      return 'less';
    case 'json':
      return 'json';
    case 'md':
      return 'markdown';
    case 'py':
      return 'python';
    case 'java':
      return 'java';
    case 'c':
      return 'c';
    case 'cpp':
    case 'cc':
    case 'h':
    case 'hpp':
      return 'cpp';
    case 'cs':
      return 'csharp';
    case 'php':
      return 'php';
    case 'rb':
      return 'ruby';
    case 'go':
      return 'go';
    case 'rs':
      return 'rust';
    case 'sh':
      return 'shell';
    case 'sql':
      return 'sql';
    case 'xml':
      return 'xml';
    case 'yaml':
    case 'yml':
      return 'yaml';
    default:
      return 'plaintext';
  }
}

// Function to load file content into editor
function loadFileContent(fileName, content, actualPath) {
  // Add or update the file in the files object
  files[fileName] = content;

  // Add/remove readme class based on file name
  const editorElement = document.querySelector('.vscode__editor-content');
  if (editorElement) {
    if (fileName.toLowerCase() === 'readme.md') {
      editorElement.classList.add('readme-content');
    } else {
      editorElement.classList.remove('readme-content');
    }
  }

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

    tab = createTab(fileName, true, actualPath);
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
document.addEventListener('fileSelected', e => {
  const { path, type, content, actualPath } = e.detail;
  if (type === 'file' && content) {
    loadFileContent(path, content, actualPath);
  }
});

function createTab(fileName, isActive = false, actualPath = '') {
  const tab = document.createElement('div');
  tab.className = `vscode__tab ${isActive ? 'vscode__tab--active' : ''}`;
  tab.dataset.file = fileName;
  if (actualPath) {
    tab.dataset.actualPath = actualPath;
  }

  const tabTitle = document.createElement('span');
  tabTitle.className = 'vscode__tab-title';
  tabTitle.textContent = fileName;

  const closeBtn = document.createElement('span');
  closeBtn.className = 'vscode__tab-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', e => {
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
  document.querySelectorAll('.vscode__tab').forEach(tab => {
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

    editorContent.addEventListener('input', e => {
      files[currentFile] = e.target.textContent;
      updateLineNumbers(editorContent, lineNumbers);
    });

    editorContent.addEventListener('keydown', e => {
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
