const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Simple file server to serve our built Next.js files
const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;
  
  // Default to index.html for root
  if (pathname === '/') {
    pathname = '/upfluence-static.html';
  }
  
  // Remove leading slash and resolve file path
  const filePath = path.join(__dirname, pathname.substring(1));
  
  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <body>
            <h1>404 - Page Not Found</h1>
            <p>Available pages:</p>
            <ul>
              <li><a href="/upfluence-static.html">Home (Landing Page)</a></li>
              <li><a href="/signin-static.html">Sign In</a></li>
              <li><a href="/dashboard-static.html">Brand Dashboard</a></li>
              <li><a href="/search-static.html">Influencer Search</a></li>
            </ul>
          </body>
        </html>
      `);
      return;
    }
    
    // Determine content type
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml'
    };
    
    const contentType = mimeTypes[ext] || 'text/plain';
    
    // Read and serve file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

// Try different binding strategies
const PORT = 3000;
const HOST = '0.0.0.0';

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy, trying ${PORT + 1}...`);
    server.listen(PORT + 1, HOST);
  } else {
    console.error('Server error:', err);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`🚀 Upfluence MVP Server running!`);
  console.log(`📱 Local:    http://localhost:${server.address().port}`);
  console.log(`🌐 Network:  http://${HOST}:${server.address().port}`);
  console.log(`\n📄 Available pages:`);
  console.log(`   • http://localhost:${server.address().port}/upfluence-static.html (Home)`);
  console.log(`   • http://localhost:${server.address().port}/signin-static.html (Sign In)`);
  console.log(`   • http://localhost:${server.address().port}/dashboard-static.html (Dashboard)`);
  console.log(`   • http://localhost:${server.address().port}/search-static.html (Search)`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});