import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi10() {
  return (
    <MateriLayout title="Exception Handling">
      <Section title="What are Exceptions?">
        <p>
          Exception adalah error yang terjadi saat program running. Tanpa handling, 
          program akan crash. Python menyediakan try-except untuk handle exceptions.
        </p>

        <CodeBlock language="python">
{`# Without exception handling - program crashes
number = int("abc")  # ValueError!

# With exception handling
try:
    number = int("abc")
except ValueError:
    print("Invalid number!")
    number = 0`}
        </CodeBlock>
      </Section>

      <Section title="try-except Basic">
        <CodeBlock language="python">
{`# Basic try-except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Catch multiple exceptions
try:
    number = int(input("Enter number: "))
    result = 10 / number
except ValueError:
    print("Invalid input!")
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Catch multiple exceptions (same handler)
try:
    # some code
    pass
except (ValueError, TypeError, KeyError):
    print("One of these errors occurred")

# Catch all exceptions (not recommended)
try:
    # some code
    pass
except Exception as e:
    print(f"Error: {e}")`}
        </CodeBlock>

        <Note type="warning">
          Avoid catching <code>Exception</code> tanpa specific handling - makes debugging harder!
        </Note>
      </Section>

      <Section title="try-except-else-finally">
        <CodeBlock language="python">
{`# else: runs if NO exception
try:
    number = int("123")
except ValueError:
    print("Invalid!")
else:
    print("Success! Number is:", number)

# finally: always runs (cleanup)
file = None
try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found!")
finally:
    if file:
        file.close()
    print("Cleanup done")

# Complete example
try:
    result = 10 / 2
except ZeroDivisionError:
    print("Division error")
else:
    print("Division successful:", result)
finally:
    print("This always runs")`}
        </CodeBlock>
      </Section>

      <Section title="Getting Exception Details">
        <CodeBlock language="python">
{`# Capture exception object
try:
    number = int("abc")
except ValueError as e:
    print(f"Error: {e}")
    print(f"Type: {type(e)}")

# Get traceback
import traceback

try:
    result = 10 / 0
except ZeroDivisionError:
    print("Error occurred:")
    traceback.print_exc()`}
        </CodeBlock>
      </Section>

      <Section title="Common Built-in Exceptions">
        <CodeBlock language="python">
{`# ValueError - Invalid value
try:
    int("abc")
except ValueError:
    print("Invalid value")

# TypeError - Wrong type
try:
    "2" + 2
except TypeError:
    print("Type mismatch")

# KeyError - Dict key not found
try:
    d = {"name": "Budi"}
    print(d["age"])
except KeyError:
    print("Key not found")

# IndexError - List index out of range
try:
    lst = [1, 2, 3]
    print(lst[10])
except IndexError:
    print("Index out of range")

# FileNotFoundError
try:
    open("nonexistent.txt")
except FileNotFoundError:
    print("File not found")

# ZeroDivisionError
try:
    10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")

# AttributeError - Attribute doesn't exist
try:
    "hello".nonexistent_method()
except AttributeError:
    print("Attribute not found")

# NameError - Variable not defined
try:
    print(undefined_variable)
except NameError:
    print("Variable not defined")`}
        </CodeBlock>
      </Section>

      <Section title="Raising Exceptions">
        <CodeBlock language="python">
{`# Raise exception manually
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age seems invalid")
    return age

try:
    validate_age(-5)
except ValueError as e:
    print(e)

# Re-raise exception
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Logging error...")
    raise  # Re-raise same exception

# Raise different exception
try:
    data = {"name": "Budi"}
    age = data["age"]
except KeyError:
    raise ValueError("Required field 'age' missing")`}
        </CodeBlock>
      </Section>

      <Section title="Custom Exceptions">
        <CodeBlock language="python">
{`# Define custom exception
class InvalidEmailError(Exception):
    pass

class InvalidPasswordError(Exception):
    def __init__(self, message="Password must be at least 8 characters"):
        self.message = message
        super().__init__(self.message)

# Use custom exceptions
def validate_email(email):
    if "@" not in email:
        raise InvalidEmailError("Email must contain @")

def validate_password(password):
    if len(password) < 8:
        raise InvalidPasswordError()

try:
    validate_email("invalidemail")
except InvalidEmailError as e:
    print(f"Email Error: {e}")

try:
    validate_password("short")
except InvalidPasswordError as e:
    print(f"Password Error: {e}")`}
        </CodeBlock>
      </Section>

      <Section title="Exception Hierarchy">
        <CodeBlock language="python">
{`# Catch from most specific to most general
try:
    # some code
    pass
except ValueError:
    print("Value error")
except Exception:
    print("Other error")

# Wrong order (ValueError never caught!)
try:
    # some code
    pass
except Exception:  # Catches everything
    print("Error")
except ValueError:  # Never reached!
    print("Value error")`}
        </CodeBlock>

        <Note type="info">
          Order matters! Catch specific exceptions before general ones.
        </Note>
      </Section>

      <Section title="Practical Examples">
        <h3>1. Safe Input Validator</h3>
        <CodeBlock language="python">
{`def get_integer(prompt, min_val=None, max_val=None):
    while True:
        try:
            value = int(input(prompt))
            
            if min_val is not None and value < min_val:
                print(f"Must be >= {min_val}")
                continue
            
            if max_val is not None and value > max_val:
                print(f"Must be <= {max_val}")
                continue
            
            return value
        except ValueError:
            print("Please enter a valid integer")

age = get_integer("Enter age (0-150): ", 0, 150)
print(f"Age: {age}")`}
        </CodeBlock>

        <h3>2. Safe File Reader</h3>
        <CodeBlock language="python">
{`def read_file_safe(filename):
    try:
        with open(filename, 'r') as file:
            return file.read()
    except FileNotFoundError:
        print(f"File '{filename}' not found")
        return None
    except PermissionError:
        print(f"No permission to read '{filename}'")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

content = read_file_safe("data.txt")
if content:
    print(content)`}
        </CodeBlock>

        <h3>3. Retry Decorator</h3>
        <CodeBlock language="python">
{`import time

def retry(max_attempts=3, delay=1):
    def decorator(func):
        def wrapper(*args, **kwargs):
            attempts = 0
            while attempts < max_attempts:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    attempts += 1
                    if attempts >= max_attempts:
                        raise
                    print(f"Attempt {attempts} failed: {e}")
                    print(f"Retrying in {delay} seconds...")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=2)
def unreliable_function():
    import random
    if random.random() < 0.7:
        raise ConnectionError("Network error")
    return "Success!"

try:
    result = unreliable_function()
    print(result)
except ConnectionError:
    print("Failed after all retries")`}
        </CodeBlock>

        <h3>4. Transaction Manager</h3>
        <CodeBlock language="python">
{`class DatabaseTransaction:
    def __init__(self):
        self.committed = False
    
    def __enter__(self):
        print("BEGIN TRANSACTION")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is None:
            print("COMMIT")
            self.committed = True
        else:
            print(f"ROLLBACK: {exc_val}")
        return False  # Propagate exception

# Usage
try:
    with DatabaseTransaction() as transaction:
        print("Inserting data...")
        print("Updating records...")
        # raise Exception("Error!")  # Will trigger rollback
        print("Transaction successful")
except Exception as e:
    print(f"Transaction failed: {e}")`}
        </CodeBlock>

        <h3>5. Error Logger</h3>
        <CodeBlock language="python">
{`import logging
from datetime import datetime

# Setup logger
logging.basicConfig(
    filename='errors.log',
    level=logging.ERROR,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError as e:
        logging.error(f"Division by zero: {a} / {b}")
        return None
    except TypeError as e:
        logging.error(f"Type error: {e}")
        return None

result = safe_divide(10, 0)
result = safe_divide(10, "2")`}
        </CodeBlock>
      </Section>

      <Section title="Best Practices">
        <ul>
          <li>Catch specific exceptions, avoid bare <code>except:</code></li>
          <li>Don't silently ignore exceptions - log or handle properly</li>
          <li>Use <code>finally</code> untuk cleanup (close files, connections)</li>
          <li>Use <code>with</code> statement instead of try-finally for resources</li>
          <li>Raise exceptions early, handle late</li>
          <li>Custom exceptions untuk domain-specific errors</li>
          <li>Document what exceptions your functions can raise</li>
          <li>Order exception handlers from specific to general</li>
        </ul>
      </Section>

      <Section title="Anti-patterns to Avoid">
        <CodeBlock language="python">
{`# ❌ Catching everything
try:
    # code
    pass
except:
    pass  # What error? Can't debug!

# ❌ Using exceptions for control flow
try:
    value = mydict["key"]
except KeyError:
    value = None
# Better: use get()
value = mydict.get("key")

# ❌ Too broad exception
try:
    # code
    pass
except Exception:
    pass
# Better: specific exceptions
try:
    # code
    pass
except (ValueError, TypeError):
    pass`}
        </CodeBlock>
      </Section>

      <Section title="Summary">
        <ul>
          <li><code>try-except</code> untuk handle exceptions</li>
          <li><code>else</code> runs jika no exception</li>
          <li><code>finally</code> always runs (cleanup)</li>
          <li><code>raise</code> untuk throw exceptions</li>
          <li>Custom exceptions: inherit from <code>Exception</code></li>
          <li>Common exceptions: ValueError, TypeError, KeyError, IndexError, etc.</li>
          <li>Catch specific exceptions, order from specific to general</li>
          <li>Use <code>with</code> untuk resource management</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
