import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi22() {
  return (
    <MateriLayout title="Web Scraping">
      <Section title="Setup">
        <CodeBlock language="bash">
{`# Install required packages
pip install requests beautifulsoup4 lxml`}
        </CodeBlock>
      </Section>

      <Section title="Basic Web Scraping">
        <CodeBlock language="python">
{`import requests
from bs4 import BeautifulSoup

# Fetch webpage
url = "https://example.com"
response = requests.get(url)

# Parse HTML
soup = BeautifulSoup(response.content, 'html.parser')

# Get title
title = soup.title.string
print(f"Title: {title}")

# Find all paragraphs
paragraphs = soup.find_all('p')
for p in paragraphs:
    print(p.text)`}
        </CodeBlock>
      </Section>

      <Section title="Finding Elements">
        <CodeBlock language="python">
{`from bs4 import BeautifulSoup

html = """
<html>
  <body>
    <h1 class="main-title">Welcome</h1>
    <div id="content">
      <p class="text">First paragraph</p>
      <p class="text">Second paragraph</p>
      <a href="https://example.com">Link</a>
    </div>
  </body>
</html>
"""

soup = BeautifulSoup(html, 'html.parser')

# Find by tag
h1 = soup.find('h1')
print(h1.text)  # Welcome

# Find by class
texts = soup.find_all('p', class_='text')
for text in texts:
    print(text.text)

# Find by id
content = soup.find(id='content')

# Find link and get href
link = soup.find('a')
print(link['href'])  # https://example.com`}
        </CodeBlock>
      </Section>

      <Section title="CSS Selectors">
        <CodeBlock language="python">
{`# CSS selectors (more powerful)
soup.select('.text')           # By class
soup.select('#content')        # By id
soup.select('div p')           # Descendant
soup.select('div > p')         # Direct child
soup.select('p.text')          # Tag with class
soup.select('a[href]')         # Tag with attribute`}
        </CodeBlock>
      </Section>

      <Section title="Extracting Data">
        <CodeBlock language="python">
{`import requests
from bs4 import BeautifulSoup

def scrape_quotes():
    url = "http://quotes.toscrape.com"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    quotes = []
    for quote in soup.find_all('div', class_='quote'):
        text = quote.find('span', class_='text').text
        author = quote.find('small', class_='author').text
        tags = [tag.text for tag in quote.find_all('a', class_='tag')]
        
        quotes.append({
            'text': text,
            'author': author,
            'tags': tags
        })
    
    return quotes

# Usage
quotes = scrape_quotes()
for quote in quotes[:3]:
    print(f"{quote['text']} - {quote['author']}")`}
        </CodeBlock>
      </Section>

      <Section title="Handling Multiple Pages">
        <CodeBlock language="python">
{`import requests
from bs4 import BeautifulSoup
import time

def scrape_multiple_pages(base_url, max_pages=3):
    all_data = []
    
    for page in range(1, max_pages + 1):
        url = f"{base_url}/page/{page}/"
        print(f"Scraping page {page}...")
        
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract data from this page
        items = soup.find_all('div', class_='item')
        for item in items:
            all_data.append(item.text.strip())
        
        # Be polite - wait between requests
        time.sleep(1)
    
    return all_data`}
        </CodeBlock>
      </Section>

      <Section title="Error Handling">
        <CodeBlock language="python">
{`import requests
from bs4 import BeautifulSoup

def safe_scrape(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()  # Raise error for bad status
        
        soup = BeautifulSoup(response.content, 'html.parser')
        return soup
        
    except requests.exceptions.Timeout:
        print("Request timed out")
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
    
    return None`}
        </CodeBlock>
      </Section>

      <Section title="Best Practices">
        <Note type="warning">
          <strong>Web Scraping Ethics:</strong>
          <ul>
            <li>✅ Check robots.txt file</li>
            <li>✅ Add delays between requests</li>
            <li>✅ Use User-Agent headers</li>
            <li>✅ Respect rate limits</li>
            <li>❌ Don't overload servers</li>
            <li>❌ Don't scrape copyrighted content</li>
          </ul>
        </Note>
        
        <CodeBlock language="python">
{`import requests
import time

headers = {
    'User-Agent': 'Mozilla/5.0 (Scraper Bot 1.0)'
}

def polite_scrape(urls):
    for url in urls:
        response = requests.get(url, headers=headers)
        # Process response...
        
        # Wait between requests
        time.sleep(2)  # 2 seconds delay`}
        </CodeBlock>
      </Section>

      <Section title="Summary">
        <ul>
          <li>✅ requests: Fetch web pages</li>
          <li>✅ BeautifulSoup: Parse HTML</li>
          <li>✅ find/find_all: Find elements</li>
          <li>✅ CSS selectors: More powerful queries</li>
          <li>✅ Be polite: Add delays, check robots.txt</li>
          <li>✅ Error handling: Handle timeouts and errors</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
