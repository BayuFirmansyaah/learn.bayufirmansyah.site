import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi02() {
  return (
    <MateriLayout
      title="Git Basics - Repository & First Commit"
      intro="Repository (atau repo) adalah folder yang berisi project Anda beserta seluruh history perubahannya. Di materi ini kita akan belajar membuat repository pertama, memahami staging area, dan membuat commit pertama dengan benar."
    >
      <Section id="what-is-repository" heading="Apa itu Git Repository?">
        <p>
          Repository adalah folder project yang di-track oleh Git. Repository menyimpan semua file project, commit history, branches, dan metadata Git lainnya di dalam folder tersembunyi bernama .git/
        </p>
        <p>
          Ada dua cara utama untuk mendapatkan Git repository: membuat baru (git init) atau mengcopy existing repository (git clone).
        </p>

        <CodeBlock language="text" caption="Struktur folder Git repository">
{`Git Repository Structure:

my-project/
├── .git/              ← Git metadata (JANGAN edit manual!)
│   ├── objects/       ← Menyimpan semua commits, files, trees
│   ├── refs/          ← References (branches, tags)
│   ├── HEAD           ← Pointer ke current branch
│   ├── config         ← Repository-specific config
│   └── hooks/         ← Git hooks (automation)
├── src/               ← Your actual project files
├── README.md
└── .gitignore         ← Files to ignore`}
        </CodeBlock>

        <Note type="warning">
          Jangan pernah edit atau hapus folder .git/ secara manual! Folder ini dikelola otomatis oleh Git. Menghapusnya akan menghilangkan seluruh history project.
        </Note>
      </Section>

      <Section id="git-init" heading="Membuat Repository Baru (git init)">
        <p>
          git init membuat repository Git baru di folder yang sudah ada. Perintah ini membuat folder .git/ yang berisi semua metadata Git:
        </p>

        <CodeBlock language="bash">
{`# Buat folder project baru
mkdir my-first-project
cd my-first-project

# Initialize Git repository
git init

# Output:
# Initialized empty Git repository in /path/to/my-first-project/.git/

# Verify - cek ada folder .git/
ls -la
# Output akan show: .git/

# Check status
git status
# Output:
# On branch main
# No commits yet
# nothing to commit (create/copy files and use "git add" to track)`}
        </CodeBlock>

        <Note type="tip">
          git init aman dijalankan berulang kali di folder yang sama - tidak akan overwrite existing repository.
        </Note>
      </Section>

      <Section id="git-clone" heading="Clone Existing Repository (git clone)">
        <p>
          git clone membuat copy lengkap dari remote repository, termasuk semua history, branches, dan commits. Ini cara paling umum untuk mulai berkontribusi ke project existing:
        </p>

        <CodeBlock language="bash">
{`# Clone repository dari GitHub
git clone https://github.com/username/repository-name.git

# Clone dengan custom folder name
git clone https://github.com/username/repo.git my-custom-name

# Clone specific branch
git clone -b develop https://github.com/username/repo.git

# Clone dengan depth (shallow clone - lebih cepat)
git clone --depth 1 https://github.com/username/repo.git

# Example: Clone React repository
git clone https://github.com/facebook/react.git
cd react

# Check remote
git remote -v
# Output:
# origin  https://github.com/facebook/react.git (fetch)
# origin  https://github.com/facebook/react.git (push)`}
        </CodeBlock>

        <Note type="info">
          Shallow clone (--depth 1) hanya download commit terbaru, bukan full history. Bagus untuk save bandwidth tapi tidak bisa lihat full history.
        </Note>
      </Section>

      <Section id="three-areas" heading="Tiga Area Penting di Git">
        <p>
          Git memiliki tiga area utama yang harus Anda pahami untuk workflow yang benar:
        </p>

        <CodeBlock language="text" caption="Three areas workflow di Git">
{`┌─────────────────────────────────────────────────────────┐
│              Git Three Areas Workflow                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. WORKING DIRECTORY                                   │
│     ├─ Folder project Anda                              │
│     ├─ File yang sedang Anda edit                       │
│     └─ Changes yang belum di-stage                      │
│                                                         │
│            ↓ git add <file>                             │
│                                                         │
│  2. STAGING AREA (Index)                                │
│     ├─ Changes yang siap di-commit                      │
│     ├─ Snapshot untuk commit berikutnya                 │
│     └─ Bisa review sebelum commit                       │
│                                                         │
│            ↓ git commit -m "message"                    │
│                                                         │
│  3. REPOSITORY (.git directory)                         │
│     ├─ Permanent history                                │
│     ├─ Committed snapshots                              │
│     └─ Safe & tracked                                   │
│                                                         │
└─────────────────────────────────────────────────────────┘

Workflow:
1. Edit files         (Working Directory)
2. Stage changes      (Staging Area)  
3. Commit snapshot    (Repository)`}
        </CodeBlock>
      </Section>

      <Section id="git-status" heading="Checking Repository Status">
        <p>
          git status adalah command yang paling sering Anda gunakan. Command ini menunjukkan state dari working directory dan staging area:
        </p>

        <CodeBlock language="bash">
{`# Check status
git status

# Output contoh:
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   src/index.js
        new file:   src/utils.js

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes)
        modified:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .env
        temp.txt

# Short status (lebih ringkas)
git status -s
# Output:
# M  src/index.js       (staged)
#  M README.md          (modified, not staged)
# ?? .env               (untracked)`}
        </CodeBlock>

        <Note type="tip">
          Biasakan jalankan 'git status' sebelum dan sesudah command Git lainnya untuk memahami state repository Anda.
        </Note>
      </Section>

      <Section id="git-add" heading="Staging Changes (git add)">
        <p>
          git add memindahkan perubahan dari working directory ke staging area. File yang di-stage akan included dalam commit berikutnya:
        </p>

        <CodeBlock language="bash">
{`# Stage single file
git add index.html

# Stage multiple files
git add index.html style.css script.js

# Stage all files in folder
git add src/

# Stage all changes (new, modified, deleted)
git add .
git add --all
git add -A

# Stage only modified & deleted (NOT new files)
git add -u

# Interactive staging
git add -i

# Stage parts of file (patch mode)
git add -p index.html

# Example workflow:
# 1. Edit files
echo "Hello World" > index.html

# 2. Check status
git status
# Output: Untracked files: index.html

# 3. Stage file
git add index.html

# 4. Check status again
git status
# Output: Changes to be committed: new file: index.html`}
        </CodeBlock>

        <Note type="tip">
          Gunakan 'git add -p' untuk stage hanya bagian tertentu dari file - sangat berguna untuk memisahkan changes menjadi multiple logical commits.
        </Note>
      </Section>

      <Section id="git-commit" heading="Creating Commits (git commit)">
        <p>
          git commit menyimpan staged changes ke repository sebagai snapshot permanent. Setiap commit memiliki message yang menjelaskan perubahan:
        </p>

        <CodeBlock language="bash">
{`# Commit dengan message
git commit -m "Add homepage HTML structure"

# Commit dengan detailed message (opens editor)
git commit
# Editor akan terbuka untuk menulis message

# Commit all modified files (skip staging)
git commit -am "Update README and fix typo"
# -a = stage all modified files
# -m = commit message

# Amend last commit (edit message atau add forgotten files)
git commit --amend -m "New commit message"

# Commit dengan author override
git commit --author="John Doe <john@example.com>" -m "Message"

# Empty commit (useful for trigger CI/CD)
git commit --allow-empty -m "Trigger deployment"

# Example: First commit
git add .
git commit -m "Initial commit - setup project structure"
# Output:
# [main (root-commit) a1b2c3d] Initial commit - setup project structure
#  3 files changed, 50 insertions(+)
#  create mode 100644 index.html
#  create mode 100644 style.css
#  create mode 100644 script.js`}
        </CodeBlock>
      </Section>

      <Section id="commit-messages" heading="Commit Message Best Practices">
        <p>
          Good commit messages adalah dokumentasi yang invaluable untuk project. Ikuti konvensi ini untuk commit messages yang professional:
        </p>

        <CodeBlock language="text" caption="Commit message conventions & examples">
{`Good Commit Message Format:

<type>: <subject>

<body (optional)>

<footer (optional)>

Types:
├─ feat:     New feature
├─ fix:      Bug fix
├─ docs:     Documentation changes
├─ style:    Code formatting (no logic change)
├─ refactor: Code restructuring (no feature/bug change)
├─ test:     Add or update tests
├─ chore:    Build process, dependencies, etc
└─ perf:     Performance improvements

Examples of GOOD messages:
✅ feat: add user authentication with JWT
✅ fix: resolve memory leak in image processing
✅ docs: update API documentation for v2.0
✅ refactor: extract validation logic to separate module
✅ style: format code with prettier

Examples of BAD messages:
❌ fixed stuff
❌ update
❌ changes
❌ asdfasdf
❌ final version

Detailed message example:
feat: add user authentication with JWT

- Implement JWT token generation
- Add login/logout endpoints
- Include password hashing with bcrypt
- Add middleware for protected routes

Closes #123`}
        </CodeBlock>

        <Note type="tip">
          Commit message ditulis dalam imperative mood: 'add feature' bukan 'added feature' atau 'adds feature'. Think: 'This commit will &lt;your message&gt;'
        </Note>
      </Section>

      <Section id="gitignore" heading="Git Ignore File">
        <p>
          File .gitignore berisi pattern untuk files/folders yang tidak ingin di-track oleh Git. Ini penting untuk exclude generated files, dependencies, credentials, dll:
        </p>

        <CodeBlock language="bash">
{`# Create .gitignore file
touch .gitignore

# Edit .gitignore
# Ignore node_modules
node_modules/

# Ignore environment files
.env
.env.local
.env.production

# Ignore build output
dist/
build/
*.log

# Ignore IDE files
.vscode/
.idea/
*.swp
*.swo

# Ignore OS files
.DS_Store
Thumbs.db

# Ignore specific file
secret-config.json

# Ignore all .txt files
*.txt

# But track this specific .txt file
!important.txt

# Ignore all files in folder
temp/

# Global .gitignore (applies to all repos)
git config --global core.excludesfile ~/.gitignore_global

# Check if file is ignored
git check-ignore -v node_modules/
# Output: .gitignore:1:node_modules/    node_modules/`}
        </CodeBlock>

        <Note type="warning">
          .gitignore hanya works untuk untracked files. Jika file sudah ter-commit, tambah ke .gitignore tidak akan remove dari Git. Gunakan: git rm --cached &lt;file&gt;
        </Note>
      </Section>

      <Section id="first-commit-example" heading="Complete First Commit Example">
        <p>
          Mari buat repository dan commit pertama dengan workflow yang benar:
        </p>

        <CodeBlock language="bash">
{`# 1. Buat project folder
mkdir my-website
cd my-website

# 2. Initialize Git
git init

# 3. Create files
echo "# My Website" > README.md
echo "console.log('Hello');" > app.js
echo "node_modules/" > .gitignore

# 4. Check status
git status
# Output: 3 untracked files

# 5. Stage all files
git add .

# 6. Check status again
git status
# Output: Changes to be committed (3 files)

# 7. Make first commit
git commit -m "Initial commit - setup project structure"

# 8. Check commit history
git log
# Output:
# commit a1b2c3d4e5f6... (HEAD -> main)
# Author: Your Name <your.email@example.com>
# Date:   Mon Jan 20 10:30:00 2024 +0700
#
#     Initial commit - setup project structure

# 9. Make changes
echo "body { margin: 0; }" > style.css
echo "// New feature" >> app.js

# 10. Check what changed
git status
# Output:
# - modified: app.js
# - untracked: style.css

# 11. Stage & commit
git add .
git commit -m "feat: add CSS styling and app.js feature"

# 12. View history
git log --oneline
# Output:
# b2c3d4e feat: add CSS styling and app.js feature
# a1b2c3d Initial commit - setup project structure`}
        </CodeBlock>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>📦 <strong>Repository</strong> = Project folder + .git/ (metadata & history)</li>
          <li>🆕 <strong>git init</strong> (buat baru) vs git clone (copy existing)</li>
          <li>🔄 <strong>3 Areas</strong>: Working Directory → Staging Area → Repository</li>
          <li>⚡ <strong>Workflow</strong>: git add (stage) → git commit -m (save snapshot)</li>
          <li>💡 <strong>git status</strong> untuk check state, jalankan sebelum/sesudah command</li>
          <li>✍️ <strong>Commit message</strong>: imperative, clear, descriptive (feat/fix/docs)</li>
          <li>🚫 <strong>.gitignore</strong> untuk exclude files (node_modules/, .env, dist/)</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
