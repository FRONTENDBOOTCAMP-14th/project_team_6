// Initialize preview functionality
function initVSCode() {
  console.log('Initializing VSCode preview...');
  const previewButton = document.getElementById('previewButton');
  
  if (!previewButton) {
    console.error('Preview button not found');
    return;
  }

  // Helper function to find file in project structure
  function findFileInStructure(structure, targetName) {
    if (!structure) return null;
    
    // If this is a file, check if it matches
    if (structure.type === 'file' && structure.name === targetName) {
      return structure;
    }
    
    // If it's a directory, search its children
    if (structure.children && Array.isArray(structure.children)) {
      for (const child of structure.children) {
        const found = findFileInStructure(child, targetName);
        if (found) return found;
      }
    }
    
    return null;
  }

  // Add click event to the preview button
  previewButton.addEventListener('click', () => {
    // Get the active tab
    const activeTab = document.querySelector('.vscode__tab--active');
    if (!activeTab) {
      console.warn('No active tab found');
      return;
    }

    // Get the file path from the active tab
    const fileName = activeTab.dataset.file;
    if (!fileName) {
      console.warn('No file associated with the active tab');
      return;
    }

    // Check if it's an HTML file
    if (!fileName.endsWith('.html') && !fileName.endsWith('.htm')) {
      alert('Preview is only available for HTML files');
      return;
    }

    try {
      // Try to find the file in the project structure
      const fileData = findFileInStructure(window.projectStructure, fileName);
      let previewPath = fileData?.actualPath;
      
      if (!previewPath) {
        throw new Error(`No actualPath found for file: ${fileName}`);
      }
      
      // Ensure the path starts with 'src/' for Vite
      if (!previewPath.startsWith('src/')) {
        previewPath = `src/${previewPath}`;
      }
      
      // Remove any leading slashes
      if (previewPath.startsWith('/')) {
        previewPath = previewPath.substring(1);
      }
      
      console.log('Opening preview:', previewPath);
      const previewWindow = window.open(previewPath, '_blank');
      
      // Focus the new window
      previewWindow.focus();
      
    } catch (error) {
      console.error('Error opening preview:', error);
      alert(`Failed to open preview: ${error.message}`);
    }
  });
}

// Initialize when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVSCode);
} else {
  initVSCode();
}

// Export for main.js
export default initVSCode;