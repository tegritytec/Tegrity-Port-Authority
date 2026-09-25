// Tegrity Port Authority (TPA) Web Server for Cloud Run
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = __dirname;

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health Check
app.get('/_health', (req, res) => res.status(200).send('OK'));

// Serve Static Assets
app.use(express.static(PUBLIC_DIR));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Tegrity Port Authority (TPA) server running on port ${PORT}`);
  console.log(`Public dir: ${PUBLIC_DIR}`);
});
