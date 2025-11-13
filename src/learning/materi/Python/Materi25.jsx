import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi25() {
  return (
    <MateriLayout title="Testing & Deployment">
      <Section id="testing-with-pytest" heading="Testing with pytest">
        <CodeBlock language="bash">
{`# Install pytest
pip install pytest`}
        </CodeBlock>
        
        <CodeBlock language="python">
{`# test_calculator.py
def add(a, b):
    return a + b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# Test functions
def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0

def test_divide():
    assert divide(10, 2) == 5
    
    # Test exception
    import pytest
    with pytest.raises(ValueError):
        divide(10, 0)

# Run: pytest test_calculator.py`}
        </CodeBlock>
      </Section>

      <Section id="pytest-fixtures" heading="pytest Fixtures">
        <CodeBlock language="python">
{`import pytest

# Fixture - setup for tests
@pytest.fixture
def sample_data():
    return {"name": "Budi", "age": 25}

def test_user_name(sample_data):
    assert sample_data["name"] == "Budi"

def test_user_age(sample_data):
    assert sample_data["age"] == 25

# Fixture with cleanup
@pytest.fixture
def database():
    # Setup
    db = create_test_database()
    yield db
    # Teardown
    db.close()`}
        </CodeBlock>
      </Section>

      <Section id="mocking" heading="Mocking">
        <CodeBlock language="python">
{`from unittest.mock import Mock, patch

# Mock object
def test_api_call():
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {"data": "test"}
    
    # Use mock
    assert mock_response.status_code == 200
    assert mock_response.json() == {"data": "test"}

# Patch function
@patch('requests.get')
def test_fetch_data(mock_get):
    mock_get.return_value.json.return_value = {"result": "success"}
    
    # Call function that uses requests.get
    result = fetch_data_from_api()
    assert result == {"result": "success"}`}
        </CodeBlock>
      </Section>

      <Section id="code-coverage" heading="Code Coverage">
        <CodeBlock language="bash">
{`# Install coverage
pip install pytest-cov

# Run tests with coverage
pytest --cov=myapp tests/

# Generate HTML report
pytest --cov=myapp --cov-report=html tests/`}
        </CodeBlock>
      </Section>

      <Section id="requirements-file" heading="Requirements File">
        <CodeBlock language="bash">
{`# Generate requirements.txt
pip freeze > requirements.txt

# Install from requirements
pip install -r requirements.txt`}
        </CodeBlock>
        
        <CodeBlock language="text">
{`# requirements.txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
pytest==7.4.3
python-dotenv==1.0.0`}
        </CodeBlock>
      </Section>

      <Section id="environment-variables" heading="Environment Variables">
        <CodeBlock language="python">
{`# .env file
DATABASE_URL=postgresql://user:pass@localhost/db
SECRET_KEY=your-secret-key
DEBUG=True

# Load with python-dotenv
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')
SECRET_KEY = os.getenv('SECRET_KEY')
DEBUG = os.getenv('DEBUG', 'False') == 'True'`}
        </CodeBlock>
      </Section>

      <Section id="docker-deployment" heading="Docker Deployment">
        <CodeBlock language="dockerfile">
{`# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`}
        </CodeBlock>
        
        <CodeBlock language="yaml">
{`# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db/mydb
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`}
        </CodeBlock>
        
        <CodeBlock language="bash">
{`# Build and run
docker-compose up --build

# Stop
docker-compose down`}
        </CodeBlock>
      </Section>

      <Section id="cicd-with-github-actions" heading="CI/CD with GitHub Actions">
        <CodeBlock language="yaml">
{`# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: |
        pip install -r requirements.txt
        pip install pytest pytest-cov
    
    - name: Run tests
      run: pytest --cov=app tests/
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3`}
        </CodeBlock>
      </Section>

      <Section id="deployment-platforms" heading="Deployment Platforms">
        <Note type="info">
          <strong>Popular Python Deployment Options:</strong>
          <ul>
            <li>Heroku: Simple, good for beginners</li>
            <li>Railway: Modern, easy setup</li>
            <li>Render: Free tier available</li>
            <li>AWS EC2: Full control</li>
            <li>Google Cloud Run: Serverless containers</li>
            <li>DigitalOcean: Affordable VPS</li>
          </ul>
        </Note>
      </Section>

      <Section id="production-checklist" heading="Production Checklist">
        <ul>
          <li>Write comprehensive tests (aim for 80%+ coverage)</li>
          <li>Use environment variables for secrets</li>
          <li>Set up CI/CD pipeline</li>
          <li>Use production WSGI server (gunicorn, uvicorn)</li>
          <li>Enable HTTPS/SSL</li>
          <li>Set up monitoring and logging</li>
          <li>Database backups</li>
          <li>Use process manager (systemd, supervisor)</li>
          <li>Configure firewall and security groups</li>
        </ul>
      </Section>

      <Section id="summary" heading="Summary">
        <ul>
          <li>pytest: Modern Python testing framework</li>
          <li>Fixtures: Reusable test setup</li>
          <li>Mocking: Test external dependencies</li>
          <li>Coverage: Measure test completeness</li>
          <li>Docker: Containerize applications</li>
          <li>CI/CD: Automate testing and deployment</li>
          <li>Environment variables: Secure configuration</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
