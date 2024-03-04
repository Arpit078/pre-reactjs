import http from 'http';
import fs from 'fs/promises';
import {
	fileURLToPath
} from 'url';
import {
	dirname
} from 'path';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import compiler from './scripts/compile.js';

await compiler();

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    // Map file extensions to MIME types
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        // Add more as needed
    };

    // Function to send a response with a specific status code and content type
    const sendResponse = (statusCode, contentType, content) => {
        res.writeHead(statusCode, { 'Content-Type': contentType });
        res.end(content);
    };

    // Function to serve static files
    const serveStaticFile = async (filePath) => {
        try {
            const fileContent = await fs.readFile(filePath);
            const ext = path.extname(filePath);
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            sendResponse(200, contentType, fileContent);
        } catch (error) {
            sendResponse(404, 'text/plain', 'Not Found');
        }
    };

    // Function to handle routes
    const handleRoutes = async () => {
        const indexPath = path.join(__dirname, 'index.html');
        await serveStaticFile(indexPath);
    };

    // Routing logic
    if (method === 'GET') {
        if (url === '/') {
            await handleRoutes();
        } else {
            const filePath = path.join(__dirname, url);
            await serveStaticFile(filePath);
        }
    } else {
        sendResponse(405, 'text/plain', 'Method Not Allowed');
    }
});

const PORT = process.env.PORT || 8181;

// Start the server
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});

