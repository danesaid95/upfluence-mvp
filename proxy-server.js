const http = require('http');

// First, let's just create a simple server that responds
const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  
  // For now, just send a simple response to test
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <body>
        <h1>Node.js Server Working!</h1>
        <p>If you see this, Node.js HTTP is working.</p>
        <p>Requested URL: ${req.url}</p>
        <a href="/">Home</a> | 
        <a href="/auth/signin">Sign In</a> | 
        <a href="/dashboard">Dashboard</a>
      </body>
    </html>
  `);
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Simple server listening on http://0.0.0.0:3000');
  console.log('Try accessing http://localhost:3000 or http://127.0.0.1:3000');
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});