// Import functionality
import { initTerminal } from '../index/terminal.js';
import { initEditor } from '../index/editor.js';
import { initSidebar } from '../index/sidebar.js';
import '../index/vscode.js';

// Function to initialize the app
async function initApp() {
  try {
    // Initialize terminal
    if (typeof initTerminal === 'function') {
      initTerminal();
    }

    // Initialize editor (async)
    if (typeof initEditor === 'function') {
      await initEditor();
    }

    // Initialize sidebar
    if (typeof initSidebar === 'function') {
      initSidebar();
    }
  } catch (error) {
    // Error handling without console.log
  }
}

// Export the initApp function
export { initApp };

// The app is initialized from index.html
