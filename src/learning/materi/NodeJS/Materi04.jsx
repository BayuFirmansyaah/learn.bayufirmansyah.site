import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi04() {
  return (
    <MateriLayout title="Events & Event Emitter">
      <Section id="event-driven-architecture" heading="Event-Driven Architecture">
        <p>
          Node.js dibangun berdasarkan event-driven architecture. Banyak core modules 
          (seperti HTTP, streams, fs) menggunakan events untuk notify ketika sesuatu terjadi.
        </p>
        
        <Note type="info">
          <strong>Event Emitter:</strong> Pattern dimana objects emit named events yang 
          cause functions (listeners) to be called.
        </Note>
      </Section>

      <Section id="events-module" heading="Events Module">
        <CodeBlock language="javascript">
{`const EventEmitter = require('events');

// Create instance
const emitter = new EventEmitter();

// Register event listener
emitter.on('greet', () => {
  console.log('Hello there!');
});

// Emit event
emitter.emit('greet');
// Output: Hello there!

// Listener with parameters
emitter.on('user:login', (username) => {
  console.log(\`User \${username} logged in\`);
});

emitter.emit('user:login', 'john_doe');
// Output: User john_doe logged in`}
        </CodeBlock>
      </Section>

      <Section id="multiple-listeners" heading="Multiple Listeners">
        <CodeBlock language="javascript">
{`const EventEmitter = require('events');
const emitter = new EventEmitter();

// Multiple listeners for same event
emitter.on('data', (data) => {
  console.log('Listener 1:', data);
});

emitter.on('data', (data) => {
  console.log('Listener 2:', data);
});

emitter.on('data', (data) => {
  console.log('Listener 3:', data);
});

// Emit event - all listeners will be called
emitter.emit('data', 'Hello');
// Output:
// Listener 1: Hello
// Listener 2: Hello
// Listener 3: Hello

// Check listener count
console.log('Listener count:', emitter.listenerCount('data'));
// Output: Listener count: 3`}
        </CodeBlock>
      </Section>

      <Section id="once-listener" heading="One-Time Listeners">
        <CodeBlock language="javascript">
{`const EventEmitter = require('events');
const emitter = new EventEmitter();

// Listener that fires only once
emitter.once('connect', () => {
  console.log('Connected!');
});

emitter.emit('connect');  // Output: Connected!
emitter.emit('connect');  // Nothing happens (listener removed after first call)

// Compare with regular listener
emitter.on('message', () => {
  console.log('Message received');
});

emitter.emit('message');  // Output: Message received
emitter.emit('message');  // Output: Message received (fires every time)`}
        </CodeBlock>
      </Section>

      <Section id="removing-listeners" heading="Removing Listeners">
        <CodeBlock language="javascript">
{`const EventEmitter = require('events');
const emitter = new EventEmitter();

// Named function (required for removal)
function onError(err) {
  console.log('Error:', err);
}

// Add listener
emitter.on('error', onError);

// Emit
emitter.emit('error', 'Something went wrong');
// Output: Error: Something went wrong

// Remove specific listener
emitter.removeListener('error', onError);
// or
emitter.off('error', onError);

// Remove all listeners for event
emitter.removeAllListeners('error');

// Remove all listeners for all events
emitter.removeAllListeners();

// Warning: Can't remove anonymous functions!
emitter.on('data', () => console.log('Data'));
// emitter.removeListener('data', ???) // Can't reference anonymous function`}
        </CodeBlock>
      </Section>

      <Section id="error-events" heading="Error Events">
        <CodeBlock language="javascript">
{`const EventEmitter = require('events');
const emitter = new EventEmitter();

// Error events are special
// If emitted without listener, Node.js will throw error and crash!

// BAD - No error listener
// emitter.emit('error', new Error('Something failed'));
// This will crash the application!

// GOOD - Handle error events
emitter.on('error', (err) => {
  console.error('An error occurred:', err.message);
});

emitter.emit('error', new Error('Something failed'));
// Output: An error occurred: Something failed

// Best practice: Always add error listener
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('error', (err) => {
  console.error('Error:', err);
});

// Now safe to emit errors
myEmitter.emit('error', new Error('Oops!'));`}
        </CodeBlock>

        <Note type="warning">
          <strong>Important:</strong> Always add error listeners! Unhandled error events 
          akan crash aplikasi.
        </Note>
      </Section>

      <Section id="extending-event-emitter" heading="Extending EventEmitter">
        <CodeBlock language="javascript">
{`const EventEmitter = require('events');

// Create custom class that extends EventEmitter
class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    // Emit event after logging
    this.emit('logged', { message, timestamp: new Date() });
  }
}

// Use custom emitter
const logger = new Logger();

// Listen to custom events
logger.on('logged', (data) => {
  console.log(\`Log event: \${data.message} at \${data.timestamp}\`);
});

logger.log('Application started');
// Output:
// Application started
// Log event: Application started at [timestamp]

// Another example: User class
class User extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
  }

  login() {
    console.log(\`\${this.name} logged in\`);
    this.emit('login', this.name);
  }

  logout() {
    console.log(\`\${this.name} logged out\`);
    this.emit('logout', this.name);
  }
}

const user = new User('Alice');

user.on('login', (name) => {
  console.log(\`Event: \${name} is now online\`);
});

user.on('logout', (name) => {
  console.log(\`Event: \${name} is now offline\`);
});

user.login();
// Output:
// Alice logged in
// Event: Alice is now online

user.logout();
// Output:
// Alice logged out
// Event: Alice is now offline`}
        </CodeBlock>
      </Section>

      <Section id="event-arguments" heading="Event Arguments">
        <CodeBlock language="javascript">
{`const EventEmitter = require('events');
const emitter = new EventEmitter();

// Single argument
emitter.on('greet', (name) => {
  console.log(\`Hello, \${name}!\`);
});
emitter.emit('greet', 'Alice');

// Multiple arguments
emitter.on('user:register', (username, email, age) => {
  console.log(\`User registered: \${username}, \${email}, \${age}\`);
});
emitter.emit('user:register', 'john_doe', 'john@example.com', 25);

// Object as argument (recommended for many parameters)
emitter.on('order:created', (order) => {
  console.log(\`Order \${order.id} for \${order.product} by \${order.user}\`);
});

emitter.emit('order:created', {
  id: 123,
  product: 'Laptop',
  user: 'alice',
  price: 1000
});`}
        </CodeBlock>
      </Section>

      <Section id="practical-examples" heading="Practical Examples">
        <h3 className="text-lg font-semibold mb-2">1. Simple Notification System</h3>
        <CodeBlock language="javascript">
{`const EventEmitter = require('events');

class NotificationService extends EventEmitter {
  sendEmail(to, subject, body) {
    console.log(\`Sending email to \${to}...\`);
    // Simulate sending email
    setTimeout(() => {
      console.log('Email sent successfully');
      this.emit('email:sent', { to, subject });
    }, 1000);
  }

  sendSMS(to, message) {
    console.log(\`Sending SMS to \${to}...\`);
    setTimeout(() => {
      console.log('SMS sent successfully');
      this.emit('sms:sent', { to, message });
    }, 500);
  }
}

// Usage
const notifications = new NotificationService();

notifications.on('email:sent', (data) => {
  console.log(\`[LOG] Email sent to \${data.to}: "\${data.subject}"\`);
});

notifications.on('sms:sent', (data) => {
  console.log(\`[LOG] SMS sent to \${data.to}\`);
});

notifications.sendEmail('user@example.com', 'Welcome', 'Welcome to our app!');
notifications.sendSMS('+1234567890', 'Your code is 1234');`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">2. Task Queue System</h3>
        <CodeBlock language="javascript">
{`const EventEmitter = require('events');

class TaskQueue extends EventEmitter {
  constructor() {
    super();
    this.queue = [];
    this.processing = false;
  }

  addTask(task) {
    this.queue.push(task);
    this.emit('task:added', task);
    
    if (!this.processing) {
      this.processQueue();
    }
  }

  async processQueue() {
    if (this.queue.length === 0) {
      this.processing = false;
      this.emit('queue:empty');
      return;
    }

    this.processing = true;
    const task = this.queue.shift();
    
    this.emit('task:start', task);
    
    try {
      await task.execute();
      this.emit('task:complete', task);
    } catch (error) {
      this.emit('task:error', { task, error });
    }
    
    // Process next task
    this.processQueue();
  }
}

// Usage
const queue = new TaskQueue();

queue.on('task:added', (task) => {
  console.log(\`Task added: \${task.name}\`);
});

queue.on('task:start', (task) => {
  console.log(\`Processing: \${task.name}\`);
});

queue.on('task:complete', (task) => {
  console.log(\`Completed: \${task.name}\`);
});

queue.on('queue:empty', () => {
  console.log('All tasks completed!');
});

// Add tasks
queue.addTask({
  name: 'Send Email',
  execute: () => new Promise(resolve => setTimeout(resolve, 1000))
});

queue.addTask({
  name: 'Process Payment',
  execute: () => new Promise(resolve => setTimeout(resolve, 1500))
});

queue.addTask({
  name: 'Update Database',
  execute: () => new Promise(resolve => setTimeout(resolve, 800))
});`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">3. Real-time Chat Room</h3>
        <CodeBlock language="javascript">
{`const EventEmitter = require('events');

class ChatRoom extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
    this.users = new Set();
  }

  join(username) {
    this.users.add(username);
    this.emit('user:join', { room: this.name, username });
  }

  leave(username) {
    this.users.delete(username);
    this.emit('user:leave', { room: this.name, username });
  }

  sendMessage(username, message) {
    if (!this.users.has(username)) {
      throw new Error(\`User \${username} not in room\`);
    }
    
    this.emit('message', {
      room: this.name,
      username,
      message,
      timestamp: new Date()
    });
  }

  getUserCount() {
    return this.users.size;
  }
}

// Usage
const generalRoom = new ChatRoom('General');

generalRoom.on('user:join', (data) => {
  console.log(\`[\${data.room}] \${data.username} joined the room\`);
});

generalRoom.on('user:leave', (data) => {
  console.log(\`[\${data.room}] \${data.username} left the room\`);
});

generalRoom.on('message', (data) => {
  console.log(\`[\${data.room}] \${data.username}: \${data.message}\`);
});

generalRoom.join('Alice');
generalRoom.join('Bob');
generalRoom.sendMessage('Alice', 'Hello everyone!');
generalRoom.sendMessage('Bob', 'Hi Alice!');
generalRoom.leave('Alice');

console.log('Users in room:', generalRoom.getUserCount());`}
        </CodeBlock>
      </Section>

      <Section id="max-listeners" heading="Max Listeners Warning">
        <CodeBlock language="javascript">
{`const EventEmitter = require('events');
const emitter = new EventEmitter();

// Default max listeners: 10
// Adding more will show warning

for (let i = 0; i < 12; i++) {
  emitter.on('data', () => {
    console.log(\`Listener \${i}\`);
  });
}
// Warning: Possible EventEmitter memory leak detected...

// Increase max listeners if needed
emitter.setMaxListeners(20);

// Or set to unlimited (0 = unlimited)
emitter.setMaxListeners(0);

// Check max listeners
console.log('Max listeners:', emitter.getMaxListeners());

// Get current listeners
const listeners = emitter.listeners('data');
console.log('Number of listeners:', listeners.length);`}
        </CodeBlock>

        <Note type="warning">
          Banyak listeners bisa indicate memory leak. Pastikan remove listeners yang 
          tidak digunakan.
        </Note>
      </Section>

      <Section id="prepend-listener" heading="Prepend Listeners">
        <CodeBlock language="javascript">
{`const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('test', () => console.log('Second'));
emitter.on('test', () => console.log('Third'));

// Add listener at the beginning
emitter.prependListener('test', () => console.log('First'));

emitter.emit('test');
// Output:
// First
// Second
// Third

// prependOnceListener
emitter.prependOnceListener('test', () => console.log('Only once at start'));`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Always handle error events</strong> untuk prevent crashes</li>
          <li><strong>Use named functions</strong> if you need to remove listeners</li>
          <li><strong>Remove listeners</strong> when no longer needed untuk avoid memory leaks</li>
          <li><strong>Use once()</strong> for one-time operations</li>
          <li><strong>Extend EventEmitter</strong> untuk custom event-driven classes</li>
          <li><strong>Use meaningful event names</strong> (e.g., 'user:login', 'order:created')</li>
          <li><strong>Keep listeners simple</strong> - delegate complex logic to other functions</li>
          <li><strong>Monitor listener count</strong> untuk detect potential memory leaks</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>EventEmitter adalah core pattern di Node.js untuk event-driven programming</li>
          <li><code>on()</code> untuk add listeners, <code>emit()</code> untuk trigger events</li>
          <li><code>once()</code> untuk one-time listeners</li>
          <li><code>removeListener()</code> atau <code>off()</code> untuk remove listeners</li>
          <li>Error events special - always add error listeners!</li>
          <li>Extend EventEmitter untuk create custom event-driven classes</li>
          <li>Multiple listeners dapat listen to same event</li>
          <li>Monitor max listeners untuk prevent memory leaks</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
