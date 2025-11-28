import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi03() {
  return (
    <MateriLayout
      title="Git Workflow Fundamental"
      intro="Memahami Git workflow adalah kunci untuk menggunakan Git dengan efektif. Di materi ini kita akan deep dive ke lifecycle file di Git, melihat history, membandingkan changes, dan undo changes dengan aman."
    >
      <Section id="file-lifecycle" heading="Git File Lifecycle">
        <p>
          Setiap file dalam repository Git bisa berada dalam salah satu dari empat states. Memahami lifecycle ini penting untuk workflow yang efisien:
        </p>

        <CodeBlock language="text" caption="Four states of file lifecycle in Git">
{`┌──────────────────────────────────────────────────────┐
│            Git File Lifecycle States                 │
├──────────────────────────────────────────────────────┤
│                                                      │
│  1. UNTRACKED                                        │
│     ├─ File baru, belum pernah di-add               │
│     ├─ Git tidak track changes pada file ini        │
│     └─ Warna RED di git status                      │
│                 ↓                                    │
│            git add <file>                            │
│                 ↓                                    │
│  2. STAGED (Tracked)                                 │
│     ├─ File di staging area                         │
│     ├─ Ready untuk di-commit                        │
│     └─ Warna GREEN di git status                    │
│                 ↓                                    │
│          git commit -m "msg"                         │
│                 ↓                                    │
│  3. UNMODIFIED (Tracked)                             │
│     ├─ File sudah committed                         │
│     ├─ Tidak ada changes sejak last commit          │
│     └─ Tidak muncul di git status                   │
│                 ↓                                    │
│            Edit file                                 │
│                 ↓                                    │
│  4. MODIFIED (Tracked)                               │
│     ├─ File berubah sejak last commit               │
│     ├─ Changes belum di-stage                       │
│     └─ Warna RED di git status                      │
│                 ↓                                    │
│            git add <file>                            │
│                 ↓                                    │
│          Back to STAGED                              │
│                                                      │
└──────────────────────────────────────────────────────┘

State Transitions:
Untracked → (git add) → Staged → (git commit) → Unmodified
Unmodified → (edit) → Modified → (git add) → Staged`}
        </CodeBlock>
      </Section>

      <Section id="git-log" heading="Viewing Commit History (git log)">
        <p>
          git log menampilkan commit history. Ada banyak options untuk customize output sesuai kebutuhan:
        </p>

        <CodeBlock language="bash">
{`# Basic log (lengkap)
git log
# Output:
# commit a1b2c3d4e5f6... (HEAD -> main)
# Author: John Doe <john@example.com>
# Date:   Mon Jan 20 10:30:00 2024
#
#     feat: add user authentication

# One line per commit (paling sering digunakan)
git log --oneline
# Output:
# a1b2c3d feat: add user authentication
# b2c3d4e fix: resolve login bug
# c3d4e5f docs: update README

# Log dengan graph visualization
git log --oneline --graph --all
# Output menunjukkan branches dan merges secara visual

# Log dengan statistics
git log --stat
# Menampilkan files yang berubah per commit

# Log specific file
git log index.html
git log src/components/

# Log dengan search
git log --grep="auth"        # Search commit messages
git log -S"console.log"      # Search code changes

# Log by author
git log --author="John"

# Log by date
git log --since="2 weeks ago"
git log --after="2024-01-01"
git log --before="2024-12-31"

# Limit number of commits
git log -n 5                 # Last 5 commits
git log -3                   # Last 3 commits

# Pretty format (custom)
git log --pretty=format:"%h - %an, %ar : %s"
# Output: a1b2c3d - John Doe, 2 hours ago : feat: add auth

# Show specific commit
git show a1b2c3d
# Menampilkan detail commit + diff changes`}
        </CodeBlock>
      </Section>

      <Section id="git-diff" heading="Viewing Changes (git diff)">
        <p>
          git diff menampilkan perbedaan antara files. Sangat berguna untuk review changes sebelum commit:
        </p>

        <CodeBlock language="bash">
{`# Show unstaged changes (modified files not yet added)
git diff
# Output menunjukkan differences dari last commit

# Show staged changes (files ready to commit)
git diff --staged
git diff --cached              # Sama dengan --staged

# Diff specific file
git diff index.html

# Diff between branches
git diff main..develop
git diff main develop          # Sama

# Diff between commits
git diff a1b2c3d c3d4e5f
git diff HEAD~2 HEAD           # Last 2 commits

# Show only file names that changed
git diff --name-only

# Show file names with status (modified/added/deleted)
git diff --name-status

# Word diff (lebih readable untuk text)
git diff --word-diff

# Statistics only
git diff --stat

# Example output dari git diff:
diff --git a/index.html b/index.html
index a1b2c3d..c3d4e5f 100644
--- a/index.html
+++ b/index.html
@@ -10,7 +10,7 @@
   <title>My App</title>
 </head>
 <body>
-  <h1>Hello World</h1>
+  <h1>Welcome to My App</h1>
   <p>This is a paragraph</p>
 </body>
 </html>

Legend:
- (red)   = Deleted lines
+ (green) = Added lines
@@ -10,7 +10,7 @@ = Line numbers (old file, new file)`}
        </CodeBlock>
      </Section>

      <Section id="undo-changes" heading="Undoing Changes">
        <p>
          Git menyediakan berbagai cara untuk undo changes tergantung situasi. Pahami perbedaannya agar tidak kehilangan work:
        </p>

        <CodeBlock language="bash">
{`# Discard changes pada specific file (New way - Git 2.23+)
git restore index.html

# Discard all changes in working directory
git restore .

# Old way (still works)
git checkout -- index.html

# Example:
# 1. Edit file
echo "bad code" >> app.js

# 2. Check status
git status
# Output: modified: app.js

# 3. Discard changes
git restore app.js

# 4. File kembali ke last commit version
cat app.js
# "bad code" sudah hilang`}
        </CodeBlock>
      </Section>

      <Section id="unstage-files" heading="Unstage Files (Undo git add)">
        <p>
          Jika Anda sudah git add tapi ingin remove dari staging area (tanpa hilangkan changes):
        </p>

        <CodeBlock language="bash">
{`# Unstage specific file (New way)
git restore --staged index.html

# Unstage all files
git restore --staged .

# Old way (still works)
git reset HEAD index.html

# Example:
# 1. Stage file
git add app.js
git status
# Output: Changes to be committed: modified: app.js

# 2. Unstage
git restore --staged app.js

# 3. Check status
git status
# Output: Changes not staged for commit: modified: app.js
# File masih modified tapi tidak staged

# 4. Changes tetap ada di working directory
cat app.js
# Changes masih ada, hanya tidak staged`}
        </CodeBlock>
      </Section>

      <Section id="undo-commit" heading="Undo Last Commit">
        <p>
          Jika Anda sudah commit tapi ingin undo (berbagai scenarios):
        </p>

        <CodeBlock language="bash">
{`# Undo commit, keep changes staged
git reset --soft HEAD~1
# Use case: Forgot to add file, want to include in same commit

# Undo commit, keep changes but unstaged (MOST COMMON)
git reset HEAD~1
git reset --mixed HEAD~1      # Same as above (default)
# Use case: Want to reorganize changes into different commits

# Undo commit, discard all changes (DANGEROUS!)
git reset --hard HEAD~1
# Use case: Commit was completely wrong, want to start over

# Amend last commit (fix message or add forgotten files)
git commit --amend -m "New message"
# Use case: Typo in commit message, forgot to add file

# Example workflow:
# 1. Make commit
git commit -m "Add feature"

# 2. Realize you forgot a file
echo "important" > config.js

# 3. Add forgotten file
git add config.js

# 4. Amend to include in same commit
git commit --amend --no-edit
# --no-edit keeps same commit message

# HEAD~1 means "1 commit before HEAD"
# HEAD~2 means "2 commits before HEAD"
# HEAD~n means "n commits before HEAD"`}
        </CodeBlock>
      </Section>

      <Section id="gitignore-deep" heading="Advanced .gitignore Patterns">
        <p>
          .gitignore menggunakan glob patterns untuk specify files yang di-ignore. Berikut patterns yang berguna:
        </p>

        <CodeBlock language="bash">
{`# .gitignore patterns

# Ignore specific file
secret.txt

# Ignore all files with extension
*.log
*.tmp
*.cache

# But track this specific file (exception)
!important.log

# Ignore folder
node_modules/
dist/
build/

# Ignore all .txt in root only
/*.txt

# Ignore all .txt in any directory
**/*.txt

# Ignore files in specific nested folder
app/cache/

# Wildcard patterns
*.[oa]              # *.o and *.a files
*~                  # Backup files

# Ignore all .pdf in doc/ directory and subdirectories
doc/**/*.pdf

# Common .gitignore for web projects:
# Dependencies
node_modules/
vendor/
bower_components/

# Build output
dist/
build/
*.min.js
*.min.css

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
.DS_Store

# Logs
logs/
*.log
npm-debug.log*

# Testing
coverage/
.nyc_output/

# Temporary
tmp/
temp/
*.tmp`}
        </CodeBlock>
      </Section>

      <Section id="check-ignore" heading="Debugging .gitignore">
        <p>
          Kadang file tidak ke-ignore seperti yang diharapkan. Gunakan command ini untuk debug:
        </p>

        <CodeBlock language="bash">
{`# Check if file is ignored
git check-ignore -v node_modules/package.json
# Output menunjukkan rule mana yang match

# Check multiple files
git check-ignore *.log

# List all ignored files in project
git status --ignored

# Force add ignored file (if really needed)
git add -f forced-file.log

# Remove file from Git but keep in working directory
git rm --cached file.txt
# Useful jika accidentally committed file yang harusnya di-ignore

# Remove folder from Git
git rm -r --cached folder/

# Example: Fix accidentally committed .env
# 1. Add to .gitignore
echo ".env" >> .gitignore

# 2. Remove from Git (keep local file)
git rm --cached .env

# 3. Commit changes
git add .gitignore
git commit -m "Remove .env from tracking"

# 4. Push
git push`}
        </CodeBlock>
      </Section>

      <Section id="workflow-example" heading="Complete Daily Workflow Example">
        <p>
          Ini adalah workflow Git yang typical dalam daily development:
        </p>

        <CodeBlock language="bash">
{`# Morning: Start working on new feature
git status                    # Check current state
git pull origin main          # Update from remote

# Create files and make changes
echo "feature code" > feature.js
echo "tests" > feature.test.js

# Check what changed
git status                    # See untracked files
git diff                      # See modified files (if any)

# Stage specific files (selective staging)
git add feature.js
git add feature.test.js

# Or stage all
git add .

# Check staged changes
git diff --staged             # Review before commit

# Commit with good message
git commit -m "feat: implement new authentication feature

- Add JWT token generation
- Implement login endpoint  
- Add unit tests"

# Continue working, make more changes
echo "more code" >> feature.js

# Check status
git status                    # feature.js modified

# Oops, made mistake in feature.js
git restore feature.js        # Discard changes

# Or made mistake in commit message
git commit --amend -m "feat: implement user authentication (fix typo)"

# View history
git log --oneline -5          # Last 5 commits

# End of day: Push to remote
git push origin main`}
        </CodeBlock>
      </Section>

    </MateriLayout>
  );
}
