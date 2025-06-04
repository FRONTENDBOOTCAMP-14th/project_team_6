import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files from the output directory
app.use(express.static(path.join(__dirname, 'output')));

// Route for the output index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'output', 'output-index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Access the output at: http://localhost:${PORT}/output-index.html`);
});
