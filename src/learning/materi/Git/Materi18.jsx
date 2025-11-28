import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi18() {
  return (
    <MateriLayout
      title="GitHub Advanced Features"
      intro="GitHub menyediakan berbagai fitur advanced di luar Git functionality. Mari eksplorasi GitHub Pages untuk hosting, Wiki untuk dokumentasi, Discussions untuk community, dan Security features untuk protect repository."
    >
      <Section id="github-pages" heading="GitHub Pages - Free Static Hosting">
        <p>
          <strong>GitHub Pages</strong> adalah free static site hosting service dari GitHub. Perfect untuk portfolio, documentation, landing pages, atau project websites.
        </p>

        <Subsection id="pages-setup" heading="Setup GitHub Pages">
          <p><strong>Method 1: From main branch (simplest):</strong></p>
          
          <CodeBlock language="bash">
{`# 1. Create index.html di root repository
echo "<h1>Hello World</h1>" > index.html
git add index.html
git commit -m "Add GitHub Pages"
git push origin main

# 2. Di GitHub:
# Settings → Pages → Source: main branch → Save

# 3. Site akan live di:
# https://username.github.io/repository-name/`}
          </CodeBlock>

          <p><strong>Method 2: Dengan docs/ folder:</strong></p>
          
          <CodeBlock language="bash">
{`# Taruh website files di docs/ folder
mkdir docs
echo "<h1>My Site</h1>" > docs/index.html
git add docs/
git commit -m "Add docs site"
git push

# Settings → Pages → Source: main branch /docs folder`}
          </CodeBlock>

          <p><strong>Method 3: Custom domain:</strong></p>
          
          <CodeBlock language="text">
{`# 1. Add CNAME file di root
echo "yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push

# 2. Di DNS provider, add CNAME record:
# Type: CNAME
# Name: www (or @)
# Value: username.github.io

# 3. Di GitHub Settings → Pages → Custom domain
# Enter: yourdomain.com → Save`}
          </CodeBlock>

          <Note type="tip">
            GitHub Pages support Jekyll (static site generator) secara default. Buat file <code>_config.yml</code> untuk customize theme.
          </Note>
        </Subsection>

        <Subsection id="pages-use-cases" heading="GitHub Pages Use Cases">
          <ul>
            <li><strong>Personal Portfolio</strong> - Showcase projects & skills</li>
            <li><strong>Project Documentation</strong> - API docs, guides</li>
            <li><strong>Landing Pages</strong> - Product/service pages</li>
            <li><strong>Blog</strong> - Dengan Jekyll atau Hugo</li>
            <li><strong>Resume/CV</strong> - Online resume</li>
          </ul>
        </Subsection>
      </Section>

      <Section id="github-wiki" heading="GitHub Wiki - Documentation">
        <p>
          GitHub Wiki adalah built-in wiki system untuk dokumentasi. Setiap repository bisa enable Wiki.
        </p>

        <Subsection id="wiki-setup" heading="Enable & Use Wiki">
          <CodeBlock language="text">
{`# Enable Wiki:
# Settings → Features → Wikis (check)

# Create pages:
# Wiki tab → New Page
# Write in Markdown
# Save

# Wiki structure:
Home.md              - Landing page
Installation.md      - Setup guide
API-Reference.md     - API docs
Troubleshooting.md   - Common issues
FAQ.md              - Frequently asked questions

# Clone Wiki locally:
git clone https://github.com/user/repo.wiki.git

# Edit & push
cd repo.wiki
echo "# New Page" > New-Page.md
git add .
git commit -m "Add new page"
git push`}
          </CodeBlock>

          <Note type="info">
            Wiki is actually a separate Git repository! You can clone, edit locally, and push changes.
          </Note>
        </Subsection>
      </Section>

      <Section id="github-discussions" heading="GitHub Discussions - Community Forum">
        <p>
          <strong>GitHub Discussions</strong> adalah forum-style communication tool untuk community interaction, questions, dan announcements.
        </p>

        <Subsection id="discussions-setup" heading="Enable Discussions">
          <CodeBlock language="text">
{`# Enable:
# Settings → Features → Discussions (check)

# Discussion Categories (default):
📢 Announcements     - Project updates, releases
💡 Ideas            - Feature requests, suggestions
🗳️ Polls            - Community voting
🙏 Q&A              - Questions & answers
🙌 Show and tell    - Community showcases

# Create Discussion:
# Discussions tab → New discussion
# Choose category
# Title & description
# Post

# Benefits vs Issues:
Issues              | Discussions
-------------------|-------------------
Bug reports        | General questions
Feature tracking   | Ideas brainstorming
Task management    | Community chat
Close when done    | Ongoing conversations`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="security-features" heading="Security Features">
        <p>
          GitHub provides powerful security features untuk protect code dan detect vulnerabilities.
        </p>

        <Subsection id="dependabot" heading="Dependabot - Dependency Updates">
          <CodeBlock language="yaml">
{`# .github/dependabot.yml
version: 2
updates:
  # JavaScript dependencies
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    
  # Python dependencies
  - package-ecosystem: "pip"
    directory: "/"
    schedule:
      interval: "daily"`}
          </CodeBlock>

          <p><strong>Dependabot features:</strong></p>
          <ul>
            <li>Automatic PR untuk update dependencies</li>
            <li>Security vulnerability alerts</li>
            <li>Version compatibility checks</li>
            <li>Changelog summaries</li>
          </ul>
        </Subsection>

        <Subsection id="code-scanning" heading="Code Scanning">
          <CodeBlock language="yaml">
{`# .github/workflows/codeql.yml
name: "CodeQL"

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: github/codeql-action/init@v2
        with:
          languages: javascript, python
      - uses: github/codeql-action/analyze@v2`}
          </CodeBlock>

          <p>Code scanning detects:</p>
          <ul>
            <li>Security vulnerabilities</li>
            <li>Code quality issues</li>
            <li>Common programming errors</li>
            <li>Potential bugs</li>
          </ul>
        </Subsection>

        <Subsection id="secret-scanning" heading="Secret Scanning">
          <p>
            GitHub automatically scans untuk accidentally committed secrets:
          </p>
          
          <ul>
            <li>API keys</li>
            <li>Access tokens</li>
            <li>Private keys</li>
            <li>Database credentials</li>
            <li>OAuth tokens</li>
          </ul>

          <Note type="warning">
            Jika secret detected, GitHub akan send alert. Immediately revoke dan rotate affected credentials!
          </Note>
        </Subsection>

        <Subsection id="security-advisories" heading="Security Advisories">
          <CodeBlock language="text">
{`# Create Security Advisory:
# Security tab → Advisories → New draft advisory

# Fill details:
Title: SQL Injection vulnerability in search
Severity: High
CVE ID: (request atau provide existing)
Affected versions: < 2.5.0
Patched versions: >= 2.5.0
Description: Detailed explanation...

# Private collaboration:
# Add collaborators to work on fix privately
# Coordinate release & disclosure

# Publish when fixed:
# Advisory akan visible publicly
# Users get notified to update`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="github-insights" heading="Repository Insights & Analytics">
        <p>
          GitHub provides detailed analytics tentang repository activity:
        </p>

        <Subsection id="insights-tabs" heading="Insights Tabs">
          <ul>
            <li><strong>Pulse</strong> - Overview aktivitas (commits, PRs, issues)</li>
            <li><strong>Contributors</strong> - Contributor statistics & graphs</li>
            <li><strong>Community</strong> - Community health checklist</li>
            <li><strong>Traffic</strong> - Visitor statistics, clones, views</li>
            <li><strong>Commits</strong> - Commit activity graphs</li>
            <li><strong>Code frequency</strong> - Additions/deletions over time</li>
            <li><strong>Network</strong> - Fork network visualization</li>
            <li><strong>Forks</strong> - Active forks list</li>
          </ul>
        </Subsection>
      </Section>

      <Section id="github-sponsors" heading="GitHub Sponsors">
        <p>
          GitHub Sponsors memungkinkan developers receive financial support dari community:
        </p>

        <CodeBlock language="text">
{`# Setup GitHub Sponsors:
# Settings → Sponsors → Set up GitHub Sponsors

# Create tiers:
$5/month   - Coffee tier (supporter badge)
$25/month  - Pro tier (priority support)
$100/month - Business tier (consulting hours)

# Sponsored developers get:
✓ Funding untuk full-time open source
✓ GitHub takes 0% fee
✓ Multiple payment methods
✓ Sponsors badge on profile`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li>✅ Use GitHub Pages untuk documentation - always up to date with code</li>
          <li>✅ Enable Dependabot untuk automatic security updates</li>
          <li>✅ Setup code scanning untuk detect vulnerabilities early</li>
          <li>✅ Use Discussions untuk community engagement, Issues untuk tracking</li>
          <li>✅ Never commit secrets - use GitHub Secrets dan environment variables</li>
          <li>✅ Enable branch protection rules untuk critical branches</li>
          <li>✅ Review security alerts promptly</li>
          <li>✅ Use Wiki untuk comprehensive documentation</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>📄 <strong>GitHub Pages</strong> - Free static hosting untuk websites</li>
          <li>📚 <strong>Wiki</strong> - Built-in documentation dengan Git versioning</li>
          <li>💬 <strong>Discussions</strong> - Community forum untuk Q&A dan ideas</li>
          <li>🔒 <strong>Dependabot</strong> - Automatic dependency updates & security alerts</li>
          <li>🔍 <strong>Code Scanning</strong> - Detect vulnerabilities dengan CodeQL</li>
          <li>🔑 <strong>Secret Scanning</strong> - Prevent accidental credential exposure</li>
          <li>📊 <strong>Insights</strong> - Repository analytics & statistics</li>
          <li>💰 <strong>Sponsors</strong> - Financial support untuk open source developers</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
