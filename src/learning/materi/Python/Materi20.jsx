import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi20() {
  return (
    <MateriLayout title="Async Programming (asyncio)">
      <Section id="asyncawait-basics" heading="Async/Await Basics">
        <CodeBlock language="python">
{`import asyncio

async def say_hello():
    print("Hello")
    await asyncio.sleep(1)  # Non-blocking sleep
    print("World")

# Run async function
asyncio.run(say_hello())`}
        </CodeBlock>
      </Section>

      <Section id="multiple-async-tasks" heading="Multiple Async Tasks">
        <CodeBlock language="python">
{`import asyncio

async def fetch_data(name, delay):
    print(f"Fetching {name}...")
    await asyncio.sleep(delay)
    print(f"{name} fetched!")
    return f"Data from {name}"

async def main():
    # Run tasks concurrently
    results = await asyncio.gather(
        fetch_data("API-1", 2),
        fetch_data("API-2", 1),
        fetch_data("API-3", 3)
    )
    print(results)

asyncio.run(main())
# Output shows concurrent execution`}
        </CodeBlock>
      </Section>

      <Section id="creating-tasks" heading="Creating Tasks">
        <CodeBlock language="python">
{`import asyncio

async def work(name, duration):
    print(f"{name} starting")
    await asyncio.sleep(duration)
    print(f"{name} done")
    return name

async def main():
    # Create tasks
    task1 = asyncio.create_task(work("Task-1", 2))
    task2 = asyncio.create_task(work("Task-2", 1))
    
    # Wait for completion
    result1 = await task1
    result2 = await task2
    
    print(f"Results: {result1}, {result2}")

asyncio.run(main())`}
        </CodeBlock>
      </Section>

      <Section id="async-http-with-aiohttp" heading="Async HTTP with aiohttp">
        <CodeBlock language="python">
{`import asyncio
import aiohttp

async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    urls = [
        'https://api.github.com/users/github',
        'https://api.github.com/users/python',
    ]
    
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        
        for result in results:
            print(len(result))  # Print response length

# asyncio.run(main())`}
        </CodeBlock>
      </Section>

      <Section id="timeout-and-exception-handling" heading="Timeout and Exception Handling">
        <CodeBlock language="python">
{`import asyncio

async def slow_operation():
    await asyncio.sleep(5)
    return "Done"

async def main():
    try:
        # Set timeout
        result = await asyncio.wait_for(
            slow_operation(),
            timeout=2.0
        )
    except asyncio.TimeoutError:
        print("Operation timed out!")
    except Exception as e:
        print(f"Error: {e}")

asyncio.run(main())`}
        </CodeBlock>
      </Section>

      <Section id="async-generators" heading="Async Generators">
        <CodeBlock language="python">
{`import asyncio

async def async_range(count):
    for i in range(count):
        await asyncio.sleep(0.5)
        yield i

async def main():
    async for number in async_range(5):
        print(number)  # 0, 1, 2, 3, 4 (with delays)

asyncio.run(main())`}
        </CodeBlock>
      </Section>

      <Section id="practical-concurrent-api-calls" heading="Practical: Concurrent API Calls">
        <CodeBlock language="python">
{`import asyncio
import time

async def fetch_user(user_id):
    await asyncio.sleep(1)  # Simulate API call
    return {"id": user_id, "name": f"User{user_id}"}

async def main():
    start = time.time()
    
    # Fetch 10 users concurrently
    user_ids = range(1, 11)
    tasks = [fetch_user(uid) for uid in user_ids]
    users = await asyncio.gather(*tasks)
    
    end = time.time()
    print(f"Fetched {len(users)} users in {end-start:.2f}s")
    # ~1 second (concurrent) vs 10 seconds (sequential)

asyncio.run(main())`}
        </CodeBlock>
      </Section>

      <Section id="summary" heading="Summary">
        <ul>
          <li>async/await: Define and call async functions</li>
          <li>asyncio.run(): Run async main function</li>
          <li>asyncio.gather(): Run multiple tasks concurrently</li>
          <li>asyncio.create_task(): Create background tasks</li>
          <li>aiohttp: Async HTTP requests</li>
          <li>Perfect untuk I/O-bound operations</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
