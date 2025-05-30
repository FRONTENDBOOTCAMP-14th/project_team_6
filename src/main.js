// Import functionality
import { initTerminal } from '../index/terminal.js';
import { initEditor } from '../index/editor.js';
import { initSidebar } from '../index/sidebar.js';
import '../index/vscode.js'; // Import vscode.js

console.log('main.js: Starting initialization...');

// Function to initialize the app
async function initApp() {
  console.log('main.js: Starting app initialization...');

  try {
    // Initialize terminal
    if (typeof initTerminal === 'function') {
      console.log('main.js: Initializing terminal...');
      initTerminal();
    } else {
      console.error('main.js: initTerminal function not found');
    }

    // Initialize editor (async)
    if (typeof initEditor === 'function') {
      console.log('main.js: Initializing editor...');
      await initEditor();
      console.log('main.js: Editor initialization complete');
    } else {
      console.error('main.js: initEditor function not found');
    }

    // Initialize sidebar
    if (typeof initSidebar === 'function') {
      console.log('main.js: Initializing sidebar...');
      initSidebar();
    } else {
      console.error('main.js: initSidebar function not found');
    }

    console.log('main.js: App initialization complete');
  } catch (error) {
    console.error('main.js: Error during initialization:', error);
  }
}

// Export the initApp function
export { initApp };

// The app is initialized from index.html
