import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi19() {
  return (
    <MateriLayout title="Multithreading & Multiprocessing">
      <Section title="Threading Basics">
        <CodeBlock language="python">
{`import threading
import time

def worker(name):
    print(f"Thread {name} starting")
    time.sleep(2)
    print(f"Thread {name} finished")

# Create threads
t1 = threading.Thread(target=worker, args=("A",))
t2 = threading.Thread(target=worker, args=("B",))

# Start threads
t1.start()
t2.start()

# Wait for completion
t1.join()
t2.join()

print("All threads done")`}
        </CodeBlock>
      </Section>

      <Section title="Thread with Class">
        <CodeBlock language="python">
{`import threading
import time

class WorkerThread(threading.Thread):
    def __init__(self, name):
        super().__init__()
        self.name = name
    
    def run(self):
        print(f"{self.name} starting")
        time.sleep(1)
        print(f"{self.name} finished")

# Create and start
threads = []
for i in range(3):
    t = WorkerThread(f"Worker-{i}")
    t.start()
    threads.append(t)

for t in threads:
    t.join()`}
        </CodeBlock>
      </Section>

      <Section title="Thread-Safe with Lock">
        <CodeBlock language="python">
{`import threading

counter = 0
lock = threading.Lock()

def increment():
    global counter
    for _ in range(100000):
        with lock:  # Thread-safe
            counter += 1

threads = []
for _ in range(5):
    t = threading.Thread(target=increment)
    t.start()
    threads.append(t)

for t in threads:
    t.join()

print(f"Counter: {counter}")  # 500000 (correct)`}
        </CodeBlock>
      </Section>

      <Section title="Multiprocessing Basics">
        <CodeBlock language="python">
{`from multiprocessing import Process
import time

def worker(name):
    print(f"Process {name} starting")
    time.sleep(2)
    print(f"Process {name} finished")

if __name__ == "__main__":
    processes = []
    
    for i in range(3):
        p = Process(target=worker, args=(f"P{i}",))
        p.start()
        processes.append(p)
    
    for p in processes:
        p.join()
    
    print("All processes done")`}
        </CodeBlock>
      </Section>

      <Section title="Process Pool">
        <CodeBlock language="python">
{`from multiprocessing import Pool

def square(x):
    return x * x

if __name__ == "__main__":
    with Pool(processes=4) as pool:
        numbers = [1, 2, 3, 4, 5]
        results = pool.map(square, numbers)
        print(results)  # [1, 4, 9, 16, 25]`}
        </CodeBlock>
      </Section>

      <Section title="concurrent.futures">
        <CodeBlock language="python">
{`from concurrent.futures import ThreadPoolExecutor, as_completed
import time

def task(n):
    time.sleep(1)
    return n * n

# ThreadPoolExecutor
with ThreadPoolExecutor(max_workers=3) as executor:
    futures = [executor.submit(task, i) for i in range(5)]
    
    for future in as_completed(futures):
        result = future.result()
        print(f"Result: {result}")`}
        </CodeBlock>
      </Section>

      <Section title="When to Use What?">
        <Note type="info">
          <strong>Threading (I/O-bound):</strong>
          <ul>
            <li>Network requests</li>
            <li>File I/O</li>
            <li>Database queries</li>
          </ul>
          <strong>Multiprocessing (CPU-bound):</strong>
          <ul>
            <li>Heavy computations</li>
            <li>Image processing</li>
            <li>Data processing</li>
          </ul>
        </Note>
      </Section>

      <Section title="Summary">
        <ul>
          <li>✅ threading: For I/O-bound tasks</li>
          <li>✅ multiprocessing: For CPU-bound tasks</li>
          <li>✅ Lock: Thread synchronization</li>
          <li>✅ Pool: Easy parallel execution</li>
          <li>✅ concurrent.futures: High-level interface</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
