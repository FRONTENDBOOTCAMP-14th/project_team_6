// Global variable to store project structure
window.projectStructure = {
  name: '6th Sense',
  type: 'directory',
  children: [
    {
      name: 'Members',
      type: 'directory',
      children: [
        { name: 'dongsik.md', type: 'file', actualPath: 'src/pages/Members/dongsik.html' },
        { name: 'esther.md', type: 'file', actualPath: 'src/pages/Members/esther.html' },
        { name: 'hyenbo.md', type: 'file', actualPath: 'src/pages/Members/hyenbo.html' },
        { name: 'sujin.md', type: 'file', actualPath: 'src/pages/Members/sujin.html' },
      ],
    },
    {
      name: 'Components',
      type: 'directory',
      children: [
        // 1. Product-list
        {
          name: 'Product-list',
          type: 'directory',
          children: [
            {
              name: 'list-category.html',
              type: 'file',
              actualPath: 'src/components/Product-list/list-category.html',
            },
            {
              name: 'list-container.html',
              type: 'file',
              actualPath: 'src/components/Product-list/list-container.html',
            },
          ],
        },
        // 2. Banner
        {
          name: 'banner.html',
          type: 'file',
          actualPath: 'src/components/banner/banner.html',
        },
        // 3. Cart
        {
          name: 'cart',
          type: 'directory',
          children: [
            {
              name: 'cart.html',
              type: 'file',
              actualPath: 'src/components/cart/cart.html',
            },
            {
              name: 'cart-content.html',
              type: 'file',
              actualPath: 'src/components/cart/cart-content.html',
            },
          ],
        },
        // 4. Detail Navigation
        {
          name: 'detail-nav.html',
          type: 'file',
          actualPath: 'src/components/detail-nav/detail-nav.html',
        },
        // 5. Product Detail
        {
          name: 'product-detail',
          type: 'directory',
          children: [
            {
              name: 'item-inquire.html',
              type: 'file',
              actualPath: 'src/components/product-detail/item-inquire.html',
            },
            {
              name: 'item-review.html',
              type: 'file',
              actualPath: 'src/components/product-detail/item-review.html',
            },
          ],
        },
        // 6. Footer
        {
          name: 'footer.html',
          type: 'file',
          actualPath: 'src/components/footer/footer.html',
        },
        // 7. Header
        {
          name: 'header.html',
          type: 'file',
          actualPath: 'src/components/header/header.html',
        },
        // 8. Home
        {
          name: 'home',
          type: 'directory',
          children: [
            {
              name: 'product-list.html',
              type: 'file',
              actualPath: 'src/components/home/product-list.html',
            },
          ],
        },
        // 9. Login
        {
          name: 'login.html',
          type: 'file',
          actualPath: 'src/components/login/login.html',
        },
        // 10. Register
        {
          name: 'register.html',
          type: 'file',
          actualPath: 'src/components/register/register.html',
        },
      ],
    },
  ],
};

// Main sidebar initialization
export function initSidebar() {
  // Initialize project structure if not already set
  if (!window.projectStructure) {
    window.projectStructure = {
      name: '6th Sense',
      type: 'directory',
      children: [
        {
          name: 'Members',
          type: 'directory',
          children: [
            { name: 'dongsik.md', type: 'file', actualPath: 'src/pages/Members/dongsik.html' },
            { name: 'esther.md', type: 'file', actualPath: 'src/pages/Members/esther.html' },
            { name: 'hyenbo.md', type: 'file', actualPath: 'src/pages/Members/hyenbo.html' },
            { name: 'sujin.md', type: 'file', actualPath: 'src/pages/Members/sujin.html' },
          ],
        },
        {
          name: 'Components',
          type: 'directory',
          children: [
            { name: 'footer.html', type: 'file', actualPath: 'src/components/footer/footer.html' },
            { name: 'header.html', type: 'file', actualPath: 'src/components/header/header.html' },
            { name: 'login.html', type: 'file', actualPath: 'src/components/login/login.html' },
            {
              name: 'register.html',
              type: 'file',
              actualPath: 'src/components/Register/Register.html',
            },
            {
              name: 'product-list.html',
              type: 'file',
              actualPath: 'src/components/Product-list/list-category.html',
            },
            {
              name: 'item-inquire.html',
              type: 'file',
              actualPath: 'src/components/product-detail/item-inquire.html',
            },
            {
              name: 'item-review.html',
              type: 'file',
              actualPath: 'src/components/product-detail/item-review.html',
            },
          ],
        },
      ],
    };
  }

  // Get sidebar element
  const sidebar = document.querySelector('.vscode__explorer');
  if (!sidebar) {
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

    projectStructure.children.forEach(item => {
      container.appendChild(createFileTreeItem(item));
    });

    return container;
  }

  function createFileTreeItem(item, depth = 0, parentPath = '') {
    const itemElement = document.createElement('div');
    itemElement.className = `vscode__file-item ${item.type} depth-${depth}`;

    // Construct full path
    const displayName = item.name;
    const fullPath = parentPath ? `${parentPath}/${displayName}` : displayName;
    itemElement.dataset.path = fullPath;

    // Add actualPath if it exists
    if (item.actualPath) {
      itemElement.dataset.actualPath = item.actualPath;
    }

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
      const toggleHandler = e => {
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
    // Add click event to the file name
    const fileNameElement = itemElement.querySelector('.vscode__file-name');
    if (fileNameElement) {
      fileNameElement.style.cursor = 'pointer';
      fileNameElement.addEventListener('click', e => {
        e.stopPropagation();
        handleFileClick.call(itemElement, e);
      });
    }

    // Also add click handler to the container for better UX
    itemElement.style.cursor = 'pointer';
    itemElement.addEventListener('click', e => {
      // Only handle if the click is directly on the item, not on child elements
      if (e.target === itemElement) {
        handleFileClick.call(itemElement, e);
      }
    });
  }

  async function handleFileClick(e) {
    e.preventDefault();
    e.stopPropagation();

    console.log('File item clicked');

    // Remove active class from all items
    document.querySelectorAll('.vscode__file-item').forEach(el => {
      el.classList.remove('active');
    });

    // Add active class to clicked item
    this.classList.add('active');

    try {
      console.log('Handling file click for:', this.dataset.path);

      // Get the actual path from data-actual-path or use the displayed path
      const actualPath = this.dataset.actualPath || this.dataset.path;
      const fileName = actualPath.split('/').pop();

      // Use the actualPath directly for fetching
      const response = await fetch(actualPath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const content = await response.text();
      // Dispatch file selected event with actualPath
      const event = new CustomEvent('fileSelected', {
        detail: {
          path: this.dataset.path.split('/').pop(),
          type: 'file',
          content: content,
          actualPath: this.dataset.actualPath || '',
        },
      });
      document.dispatchEvent(event);
    } catch (error) {
      console.error('Error loading file:', error);
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
      const toggleDirectory = e => {
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
document.addEventListener('fileSelected', e => {
  const { path, type } = e.detail;
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
