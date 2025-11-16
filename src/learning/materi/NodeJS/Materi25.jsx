import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi25() {
  return (
    <MateriLayout title="Socket.io & Real-time Features">
      <Section id="intro" heading="What is Socket.io?">
        <p>Socket.io adalah library yang enables real-time, bidirectional communication between web clients and servers. Built on top of WebSockets dengan fallback options.</p>
        
        <h3>Use Cases:</h3>
        <ul>
          <li><strong>Chat Applications:</strong> Real-time messaging</li>
          <li><strong>Live Notifications:</strong> Push notifications to users</li>
          <li><strong>Collaborative Tools:</strong> Google Docs-style editing</li>
          <li><strong>Live Dashboards:</strong> Real-time analytics</li>
          <li><strong>Gaming:</strong> Multiplayer games</li>
          <li><strong>Live Tracking:</strong> Delivery tracking, location sharing</li>
        </ul>
      </Section>

      <Section id="websockets-vs-http" heading="WebSockets vs HTTP">
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>HTTP</th>
              <th>WebSockets</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Communication</td>
              <td>Request-Response</td>
              <td>Bidirectional</td>
            </tr>
            <tr>
              <td>Connection</td>
              <td>Short-lived</td>
              <td>Persistent</td>
            </tr>
            <tr>
              <td>Overhead</td>
              <td>High (headers every request)</td>
              <td>Low (minimal overhead)</td>
            </tr>
            <tr>
              <td>Real-time</td>
              <td>Polling required</td>
              <td>Native support</td>
            </tr>
            <tr>
              <td>Server Push</td>
              <td>Not supported</td>
              <td>Supported</td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section id="setup" heading="Setup Socket.io">
        <CodeBlock language="bash">
{`npm install socket.io`}
        </CodeBlock>

        <p><strong>Server (app.js):</strong></p>
        <CodeBlock language="javascript">
{`const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});`}
        </CodeBlock>

        <p><strong>Client (HTML):</strong></p>
        <CodeBlock language="html">
{`<!DOCTYPE html>
<html>
<head>
  <title>Socket.io Client</title>
  <script src="/socket.io/socket.io.js"></script>
</head>
<body>
  <script>
    const socket = io('http://localhost:3000');
    
    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
    });
    
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  </script>
</body>
</html>`}
        </CodeBlock>
      </Section>

      <Section id="events" heading="Events">
        <h3>Emitting Events</h3>
        <CodeBlock language="javascript">
{`// Server
io.on('connection', (socket) => {
  // Send to specific client
  socket.emit('welcome', 'Welcome to the server!');
  
  // Send to all clients except sender
  socket.broadcast.emit('user-joined', socket.id);
  
  // Send to all clients including sender
  io.emit('message', 'Hello everyone!');
  
  // Send to specific room
  io.to('room1').emit('room-message', 'Message for room1');
  
  // Send to multiple rooms
  io.to('room1').to('room2').emit('message', 'Hello rooms!');
});

// Client
socket.emit('chat-message', 'Hello server!');
socket.emit('typing', { user: 'John', isTyping: true });`}
        </CodeBlock>

        <h3>Listening to Events</h3>
        <CodeBlock language="javascript">
{`// Server
io.on('connection', (socket) => {
  socket.on('chat-message', (message) => {
    console.log('Message received:', message);
    io.emit('chat-message', message);
  });
  
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});

// Client
socket.on('welcome', (message) => {
  console.log(message);
});

socket.on('chat-message', (message) => {
  displayMessage(message);
});`}
        </CodeBlock>
      </Section>

      <Section id="rooms" heading="Rooms & Namespaces">
        <h3>Rooms</h3>
        <CodeBlock language="javascript">
{`// Join room
socket.on('join-room', (roomName) => {
  socket.join(roomName);
  console.log(\`\${socket.id} joined \${roomName}\`);
  
  // Notify room members
  socket.to(roomName).emit('user-joined', {
    userId: socket.id,
    room: roomName
  });
});

// Leave room
socket.on('leave-room', (roomName) => {
  socket.leave(roomName);
  console.log(\`\${socket.id} left \${roomName}\`);
});

// Send message to room
socket.on('room-message', ({ room, message }) => {
  io.to(room).emit('room-message', {
    userId: socket.id,
    message: message
  });
});

// Get rooms a socket is in
const rooms = Array.from(socket.rooms);

// Get all sockets in a room
const socketsInRoom = await io.in('room1').fetchSockets();`}
        </CodeBlock>

        <h3>Namespaces</h3>
        <CodeBlock language="javascript">
{`// Create namespaces
const chatNamespace = io.of('/chat');
const adminNamespace = io.of('/admin');

// Chat namespace
chatNamespace.on('connection', (socket) => {
  console.log('User connected to chat:', socket.id);
  
  socket.on('message', (msg) => {
    chatNamespace.emit('message', msg);
  });
});

// Admin namespace
adminNamespace.on('connection', (socket) => {
  console.log('Admin connected:', socket.id);
  
  socket.on('admin-action', (action) => {
    // Handle admin action
  });
});

// Client
const chatSocket = io('http://localhost:3000/chat');
const adminSocket = io('http://localhost:3000/admin');`}
        </CodeBlock>
      </Section>

      <Section id="chat-app" heading="Complete Chat Application">
        <p><strong>Server (server.js):</strong></p>
        <CodeBlock language="javascript">
{`const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

const users = new Map(); // socketId -> username

io.on('connection', (socket) => {
  console.log('New connection:', socket.id);
  
  // User joins
  socket.on('join', (username) => {
    users.set(socket.id, username);
    
    // Notify everyone
    io.emit('user-joined', {
      userId: socket.id,
      username: username,
      userCount: users.size
    });
    
    // Send user list to new user
    socket.emit('user-list', Array.from(users.values()));
  });
  
  // Chat message
  socket.on('chat-message', (message) => {
    const username = users.get(socket.id);
    
    io.emit('chat-message', {
      userId: socket.id,
      username: username,
      message: message,
      timestamp: new Date()
    });
  });
  
  // Typing indicator
  socket.on('typing', (isTyping) => {
    const username = users.get(socket.id);
    
    socket.broadcast.emit('typing', {
      userId: socket.id,
      username: username,
      isTyping: isTyping
    });
  });
  
  // Private message
  socket.on('private-message', ({ toUserId, message }) => {
    const fromUsername = users.get(socket.id);
    
    io.to(toUserId).emit('private-message', {
      fromUserId: socket.id,
      fromUsername: fromUsername,
      message: message,
      timestamp: new Date()
    });
  });
  
  // Disconnect
  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    
    io.emit('user-left', {
      userId: socket.id,
      username: username,
      userCount: users.size
    });
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});`}
        </CodeBlock>

        <p><strong>Client (public/index.html):</strong></p>
        <CodeBlock language="html">
{`<!DOCTYPE html>
<html>
<head>
  <title>Chat App</title>
  <style>
    #messages { list-style: none; padding: 0; }
    #messages li { padding: 5px 10px; }
    #messages li:nth-child(odd) { background: #eee; }
    #input { width: 80%; padding: 10px; }
    #send { width: 15%; padding: 10px; }
  </style>
</head>
<body>
  <div id="login">
    <input id="username" placeholder="Enter username">
    <button onclick="join()">Join</button>
  </div>
  
  <div id="chat" style="display:none;">
    <div id="users"></div>
    <ul id="messages"></ul>
    <div id="typing"></div>
    <form id="form">
      <input id="input" autocomplete="off" placeholder="Type a message...">
      <button id="send">Send</button>
    </form>
  </div>
  
  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io();
    let username = '';
    
    function join() {
      username = document.getElementById('username').value.trim();
      if (username) {
        socket.emit('join', username);
        document.getElementById('login').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
      }
    }
    
    // Send message
    document.getElementById('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('input');
      const message = input.value.trim();
      
      if (message) {
        socket.emit('chat-message', message);
        input.value = '';
      }
    });
    
    // Typing indicator
    let typingTimeout;
    document.getElementById('input').addEventListener('input', () => {
      socket.emit('typing', true);
      
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        socket.emit('typing', false);
      }, 1000);
    });
    
    // Receive messages
    socket.on('chat-message', (data) => {
      const messages = document.getElementById('messages');
      const li = document.createElement('li');
      li.textContent = \`\${data.username}: \${data.message}\`;
      messages.appendChild(li);
      window.scrollTo(0, document.body.scrollHeight);
    });
    
    // User joined
    socket.on('user-joined', (data) => {
      const messages = document.getElementById('messages');
      const li = document.createElement('li');
      li.textContent = \`\${data.username} joined the chat\`;
      li.style.fontStyle = 'italic';
      messages.appendChild(li);
    });
    
    // User left
    socket.on('user-left', (data) => {
      const messages = document.getElementById('messages');
      const li = document.createElement('li');
      li.textContent = \`\${data.username} left the chat\`;
      li.style.fontStyle = 'italic';
      messages.appendChild(li);
    });
    
    // Typing indicator
    socket.on('typing', (data) => {
      const typingDiv = document.getElementById('typing');
      if (data.isTyping) {
        typingDiv.textContent = \`\${data.username} is typing...\`;
      } else {
        typingDiv.textContent = '';
      }
    });
  </script>
</body>
</html>`}
        </CodeBlock>
      </Section>

      <Section id="authentication" heading="Authentication">
        <CodeBlock language="javascript">
{`const jwt = require('jsonwebtoken');

// Server - Middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  
  if (!token) {
    return next(new Error('Authentication error'));
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    next();
  } catch (error) {
    next(new Error('Invalid token'));
  }
});

io.on('connection', (socket) => {
  console.log('Authenticated user:', socket.userId);
});

// Client
const token = localStorage.getItem('token');

const socket = io('http://localhost:3000', {
  auth: {
    token: token
  }
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error.message);
});`}
        </CodeBlock>
      </Section>

      <Section id="scaling" heading="Scaling Socket.io">
        <p>When running multiple server instances, use Redis adapter:</p>
        <CodeBlock language="bash">
{`npm install @socket.io/redis-adapter redis`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');

const io = new Server(server);

// Create Redis clients
const pubClient = createClient({ host: 'localhost', port: 6379 });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
  console.log('Socket.io connected to Redis');
});

// Now events work across multiple servers
io.emit('message', 'This reaches all connected clients on all servers');`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Use namespaces</strong> untuk separate concerns</li>
          <li><strong>Implement authentication</strong> untuk secure connections</li>
          <li><strong>Use rooms</strong> untuk targeted communication</li>
          <li><strong>Handle disconnections gracefully</strong></li>
          <li><strong>Implement reconnection logic</strong> on client</li>
          <li><strong>Validate all incoming data</strong></li>
          <li><strong>Rate limit events</strong> untuk prevent abuse</li>
          <li><strong>Use Redis adapter</strong> untuk horizontal scaling</li>
          <li><strong>Log important events</strong></li>
          <li><strong>Monitor connection count</strong></li>
          <li><strong>Clean up listeners</strong> on disconnect</li>
          <li><strong>Use acknowledgements</strong> untuk critical messages</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Socket.io enables real-time bidirectional communication</li>
          <li>Built on WebSockets dengan automatic fallback options</li>
          <li>Events system untuk sending dan receiving messages</li>
          <li>Rooms untuk grouping sockets together</li>
          <li>Namespaces untuk creating separate communication channels</li>
          <li>Authentication middleware untuk secure connections</li>
          <li>Redis adapter untuk scaling across multiple servers</li>
          <li>Perfect untuk chat, notifications, live updates</li>
          <li>Handle disconnections dan implement reconnection logic</li>
          <li>Always validate and sanitize incoming data</li>
          <li>Monitor performance dan connection counts</li>
        </ul>
        
        <Note type="success">
          <strong>Selamat! 🎉</strong> Anda telah menyelesaikan 25 materi Node.js & Express.js. Dari dasar Node.js hingga deployment dan real-time features, Anda sekarang memiliki foundation yang kuat untuk membangun production-ready web applications!
        </Note>
      </Section>
    </MateriLayout>
  );
}
