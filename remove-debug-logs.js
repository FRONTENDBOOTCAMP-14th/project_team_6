const fs = require('fs');
const path = require('path');

// Remove console logs and debug statements from a file
function cleanFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove console.log, console.warn, console.error, console.debug, and debugger statements
    const cleanedContent = content
      .replace(/\bconsole\.(log|warn|error|debug|info|time|timeEnd|group|groupEnd)\([\s\S]*?\);?\n?/g, '')
      .replace(/\bdebugger;?\n?/g, '')
      .replace(/\/\*\s*DEBUG[\s\S]*?\*\//g, '')
      .replace(/\/\/\s*DEBUG[^\n]*\n/g, '');
    
    if (content !== cleanedContent) {
      fs.writeFileSync(filePath, cleanedContent, 'utf8');
      console.log(`Cleaned: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Recursively process all JS files in a directory
function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.js')) {
      cleanFile(fullPath);
    }
  });
}

// Start processing from the current directory
processDirectory(__dirname);

console.log('Debug logs cleanup complete!');
