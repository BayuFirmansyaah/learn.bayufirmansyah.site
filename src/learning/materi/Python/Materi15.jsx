import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi15() {
  return (
    <MateriLayout title="Iterators & Generators">
      <Section title="Iterators">
        <p>Iterator adalah object yang dapat di-loop. Implements __iter__() dan __next__()</p>
        <CodeBlock language="python">
{`# Any iterable can create iterator
my_list = [1, 2, 3]
my_iter = iter(my_list)

print(next(my_iter))  # 1
print(next(my_iter))  # 2
print(next(my_iter))  # 3
# print(next(my_iter))  # StopIteration

# for loop uses iterators internally
for item in my_list:
    print(item)`}
        </CodeBlock>
      </Section>

      <Section title="Creating Custom Iterator">
        <CodeBlock language="python">
{`class Counter:
    def __init__(self, start, end):
        self.current = start
        self.end = end
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current > self.end:
            raise StopIteration
        current = self.current
        self.current += 1
        return current

counter = Counter(1, 5)
for num in counter:
    print(num)  # 1, 2, 3, 4, 5`}
        </CodeBlock>
      </Section>

      <Section title="Generators with yield">
        <p>Generator adalah function yang menggunakan yield untuk return values one at a time:</p>
        <CodeBlock language="python">
{`def count_up_to(n):
    count = 1
    while count <= n:
        yield count
        count += 1

# Generator object
counter = count_up_to(5)
for num in counter:
    print(num)  # 1, 2, 3, 4, 5

# Or use next()
counter = count_up_to(3)
print(next(counter))  # 1
print(next(counter))  # 2`}
        </CodeBlock>
      </Section>

      <Section title="Generator Benefits">
        <CodeBlock language="python">
{`# Memory efficient - generates values on-demand
def read_large_file(file_path):
    with open(file_path, 'r') as file:
        for line in file:
            yield line.strip()

# Process huge file without loading all into memory
for line in read_large_file('huge.txt'):
    process(line)

# Infinite sequence
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
for _ in range(10):
    print(next(fib))  # First 10 Fibonacci numbers`}
        </CodeBlock>
      </Section>

      <Section title="Generator Expressions">
        <CodeBlock language="python">
{`# Generator expression (like list comprehension but lazy)
squares_gen = (x**2 for x in range(1000000))

# Use with functions that accept iterables
total = sum(x**2 for x in range(1000))
max_val = max(x**2 for x in range(100))`}
        </CodeBlock>
      </Section>

      <Section title="itertools Module">
        <CodeBlock language="python">
{`import itertools

# count - infinite counter
counter = itertools.count(start=10, step=2)
for i in counter:
    if i > 20:
        break
    print(i)  # 10, 12, 14, 16, 18, 20

# cycle - infinite cycle
colors = itertools.cycle(['red', 'green', 'blue'])
for _ in range(6):
    print(next(colors))  # red, green, blue, red, green, blue

# chain - combine iterables
combined = itertools.chain([1, 2], [3, 4], [5, 6])
print(list(combined))  # [1, 2, 3, 4, 5, 6]

# islice - slice iterator
nums = range(100)
first_10 = itertools.islice(nums, 10)
print(list(first_10))  # [0, 1, 2, ..., 9]`}
        </CodeBlock>
      </Section>

      <Section title="Summary">
        <ul>
          <li>✅ Iterator: Object dengan __iter__() dan __next__()</li>
          <li>✅ Generator: Function dengan yield keyword</li>
          <li>✅ Generators are memory efficient (lazy evaluation)</li>
          <li>✅ Generator expression: (expr for x in iterable)</li>
          <li>✅ itertools: Built-in tools untuk iterators</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
