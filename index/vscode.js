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

    // Get the file name from the active tab
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
      // Get the file content from the editor
      const editor = document.querySelector('.vscode__editor-content');
      if (!editor) {
        throw new Error('Editor content not found');
      }
      
      const content = editor.textContent || '';
      
      // Open a new window and write the content
      const previewWindow = window.open('about:blank', '_blank');
      if (!previewWindow) {
        throw new Error('Popup was blocked. Please allow popups for this site.');
      }
      
      previewWindow.document.open();
      previewWindow.document.write(content);
      previewWindow.document.close();
      
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