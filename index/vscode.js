// Initialize preview functionality
function initVSCode() {
  console.log('Initializing VSCode preview...');
  const previewButton = document.getElementById('previewButton');
  
  if (!previewButton) {
    console.error('Preview button not found');
    return;
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
      // Get the current active file's full path
      // First check if we have a data-fullpath, otherwise construct the path
      let fullPath = activeTab.dataset.fullpath || `src/pages/Components/${fileName}`;
      
      // Ensure the path starts with 'src/'
      if (!fullPath.startsWith('src/') && !fullPath.startsWith('/src/')) {
        fullPath = `src/${fullPath}`;
      }
      
      // Remove leading slash if present
      if (fullPath.startsWith('/')) {
        fullPath = fullPath.substring(1);
      }
      
      // For Vite, we need to keep the 'src/' in the path
      // as Vite serves files from the project root
      let previewPath = fullPath;
      
      // Ensure the path starts with 'src/'
      if (!previewPath.startsWith('src/')) {
        previewPath = `src/${previewPath}`;
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