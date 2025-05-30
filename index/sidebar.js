// Default project structure
const defaultProjectStructure = {
  name: '6th Sense',
  type: 'directory',
  children: [
    {
      name: 'Members',
      type: 'directory',
      children: [{ name: 'dongsik.md', type: 'file' }],
    },
    {
      name: 'Components',
      type: 'directory',
      children: [
        { name: 'landing.html', type: 'file' },
        { name: 'landing_copy.html', type: 'file' },
        { name: 'landing_copy_2.html', type: 'file' },
      ],
    },
  ],
};

// Main sidebar initialization
export function initSidebar() {
  console.log('Initializing sidebar...');

  // Initialize project structure
  const projectStructure = { ...defaultProjectStructure };

  // Get sidebar element
  const sidebar = document.querySelector('.vscode__explorer');
  if (!sidebar) {
    console.error('Sidebar element not found');
    return false;
  }

  // Clear existing content
  clearExistingTree(sidebar);

  // Create and render file tree
  const fileTree = createFileTree(projectStructure);

  // Insert file tree into the DOM
  insertFileTree(sidebar, fileTree);

  // Set up event listeners
  setupEventListeners(fileTree);

  console.log('Sidebar initialized successfully');
  return true;

  // ===== Helper Functions =====

  function clearExistingTree(sidebar) {
    const existingTree = sidebar.querySelector('.vscode__file-tree');
    if (existingTree) {
      existingTree.remove();
    }
  }

  function createFileTree(projectStructure) {
    const fileTree = document.createElement('div');
    fileTree.className = 'vscode__file-tree';

    const projectHeader = createProjectHeader(projectStructure.name);
    const fileTreeContainer = createFileTreeContainer(projectStructure);

    fileTree.appendChild(projectHeader);
    fileTree.appendChild(fileTreeContainer);

    return fileTree;
  }

  function createProjectHeader(projectName) {
    const projectHeader = document.createElement('div');
    projectHeader.className = 'vscode__project-header';
    projectHeader.textContent = projectName;
    return projectHeader;
  }

  function createFileTreeContainer(projectStructure) {
    const container = document.createElement('div');
    container.className = 'vscode__file-tree-container';

    projectStructure.children.forEach((item) => {
      container.appendChild(createFileTreeItem(item));
    });

    return container;
  }

  function createFileTreeItem(item, depth = 0, parentPath = '') {
    const itemElement = document.createElement('div');
    itemElement.className = `vscode__file-item ${item.type} depth-${depth}`;
    
    // Construct full path
    const fullPath = parentPath ? `${parentPath}/${item.name}` : item.name;
    itemElement.dataset.path = fullPath;

    // Create content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'file-item-content';

    // Add directory toggle if it's a directory
    if (item.type === 'directory') {
      const toggle = document.createElement('span');
      toggle.className = 'vscode__toggle';
      toggle.textContent = '▶';
      contentWrapper.appendChild(toggle);
    }

    const name = document.createElement('span');
    name.className = 'vscode__file-name';
    name.textContent = item.name;
    contentWrapper.appendChild(name);

    itemElement.appendChild(contentWrapper);

    if (item.type === 'directory') {
      setupDirectoryItem(item, itemElement, depth);
    } else {
      setupFileItem(itemElement);
    }

    return itemElement;
  }

  function setupDirectoryItem(item, itemElement, depth) {
    const toggle = itemElement.querySelector('.vscode__toggle');
    const childrenContainer = document.createElement('div');
    childrenContainer.className = 'vscode__file-children';

    // 자식 요소가 있으면 컨테이너에 추가
    if (item.children && item.children.length > 0) {
      const parentPath = itemElement.dataset.path;
      item.children.forEach(child => {
        childrenContainer.appendChild(createFileTreeItem(child, depth + 1, parentPath));
      });

      // 스타일 설정
      childrenContainer.style.marginLeft = '16px';
      childrenContainer.style.display = 'none'; // 초기에는 숨김

      // 컨테이너를 DOM에 추가
      itemElement.appendChild(childrenContainer);

      // 클릭 핸들러
      const toggleHandler = (e) => {
        e.stopPropagation();
        const isExpanded = childrenContainer.style.display !== 'none';
        childrenContainer.style.display = isExpanded ? 'none' : 'block';
        toggle.textContent = isExpanded ? '▶' : '▼';
      };

      // 토글 버튼과 디렉토리 이름에 클릭 이벤트 연결
      const contentWrapper = itemElement.querySelector('.file-item-content');
      contentWrapper.addEventListener('click', toggleHandler);
    } else {
      // 자식이 없는 경우 토글 화살표 숨기기
      toggle.style.visibility = 'hidden';
    }
  }

  function toggleDirectory(toggle, container) {
    const isExpanded = container.style.display !== 'none';
    container.style.display = isExpanded ? 'none' : 'block';
    toggle.textContent = isExpanded ? '▶' : '▼';
  }

  function setupFileItem(itemElement) {
    itemElement.addEventListener('click', handleFileClick);
  }

  async function handleFileClick() {
    // Remove active class from all items
    document.querySelectorAll('.vscode__file-item').forEach((el) => {
      el.classList.remove('active');
    });

    // Add active class to clicked item
    this.classList.add('active');

    try {
      // Get full path and file name
      const fullPath = this.dataset.path;
      const fileName = fullPath.split('/').pop();

      // Determine the base directory based on the path
      let basePath = '';
      if (fullPath.includes('Members/')) {
        basePath = '../../src/pages/Members/';
      } else if (fullPath.includes('Components/')) {
        basePath = '../../src/pages/Components/';
      } else {
        basePath = '../../';
      }

      // Fetch file content from server
      const response = await fetch(`${basePath}${fileName}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const content = await response.text();

      // Emit custom event for file selection with content
      const event = new CustomEvent('fileSelected', {
        detail: {
          path: fileName,
          type: 'file',
          content: content,
        },
      });
      document.dispatchEvent(event);
    } catch (error) {
      console.error('파일을 불러오는 중 오류가 발생했습니다:', error);
      alert(`파일을 불러올 수 없습니다: ${error.message}`);
    }
  }

  function insertFileTree(sidebar, fileTree) {
    const explorerHeader = sidebar.querySelector('.vscode__explorer-header');
    if (explorerHeader) {
      explorerHeader.insertAdjacentElement('afterend', fileTree);
    } else {
      sidebar.appendChild(fileTree);
    }
  }

  function setupEventListeners(fileTree) {
    const projectHeader = fileTree.querySelector('.vscode__project-header');
    if (projectHeader) {
      const toggle = document.createElement('button');
      toggle.className = 'vscode__toggle';
      toggle.setAttribute('aria-label', 'Toggle directory');
      toggle.textContent = '▼';
      projectHeader.insertBefore(toggle, projectHeader.firstChild);

      const fileTreeContainer = fileTree.querySelector('.vscode__file-tree-container');

      // 초기 상태 설정 (펼쳐진 상태)
      fileTreeContainer.style.display = 'block';

      // 프로젝트 헤더 클릭 이벤트
      const toggleDirectory = (e) => {
        e.stopPropagation();
        const isExpanded = fileTreeContainer.style.display !== 'none';
        fileTreeContainer.style.display = isExpanded ? 'none' : 'block';
        toggle.textContent = isExpanded ? '▶' : '▼';
      };

      // Add click event to both the header and the button
      projectHeader.addEventListener('click', toggleDirectory);
      toggle.addEventListener('click', toggleDirectory);
    }
  }
}

// Listen for file selection events
document.addEventListener('fileSelected', (e) => {
  const { path, type } = e.detail;
  console.log(`File selected: ${path}, Type: ${type}`);
  // Here you can add logic to open the file in the editor
  // For example: openFileInEditor(path);
});

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
  });
} else {
  initSidebar();
}
