import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi05() {
  return (
    <MateriLayout
      title="Merging & Conflict Resolution"
      intro="Merging adalah proses menggabungkan changes dari satu branch ke branch lain. Ini adalah core skill dalam Git collaboration. Di materi ini kita akan belajar different types of merges dan cara handle conflicts yang terjadi."
    >
      <Section id="what-is-merge" heading="Apa itu Merge?">
        <p>
          Merge adalah cara untuk integrate changes dari satu branch ke branch lain. Misalnya, setelah selesai develop feature di feature branch, Anda merge changes tersebut ke main branch.
        </p>
        <p>
          Git secara otomatis mencoba merge changes, tapi kadang terjadi conflict yang harus diselesaikan manual ketika dua branch mengubah bagian yang sama dari file.
        </p>

        <CodeBlock language="text" caption="Merge menggabungkan histories dari dua branches">
{`Merge Visualization:

BEFORE MERGE:
       A---B---C  (main)
            \\
             D---E  (feature)

AFTER MERGE:
       A---B---C---F  (main)
            \\     /
             D---E  (feature)

F = Merge commit yang menggabungkan C dan E`}
        </CodeBlock>
      </Section>

      <Section id="fast-forward" heading="Fast-Forward Merge">
        <p>
          Fast-forward merge terjadi ketika target branch belum ada commits baru sejak feature branch dibuat. Git hanya perlu move pointer forward, tidak perlu merge commit baru:
        </p>

        <CodeBlock language="bash">
{`# Fast-Forward Scenario:
# main: A---B
# feature:   A---B---C---D

# Ketika merge feature ke main:
git switch main
git merge feature

# Result: main pointer moved to D
# main: A---B---C---D
# feature:   A---B---C---D

# No merge commit created - clean linear history

# Example:
# 1. Buat branch dari main
git switch main
git switch -c feature/add-header

# 2. Make commits on feature
echo "header" > header.html
git add header.html
git commit -m "feat: add header"

echo "nav" > nav.html
git add nav.html
git commit -m "feat: add navigation"

# 3. main belum ada commits baru
git switch main
git log --oneline
# b2c3d4e Initial commit (no new commits)

# 4. Merge (fast-forward)
git merge feature/add-header
# Output:
# Updating b2c3d4e..a1b2c3d
# Fast-forward
#  header.html | 1 +
#  nav.html | 1 +
#  2 files changed, 2 insertions(+)

# 5. Linear history
git log --oneline --graph
# * a1b2c3d feat: add navigation
# * c3d4e5f feat: add header
# * b2c3d4e Initial commit

# Force non-fast-forward merge (create merge commit)
git merge --no-ff feature/add-header
# Creates merge commit even when fast-forward possible`}
        </CodeBlock>
      </Section>

      <Section id="three-way-merge" heading="Three-Way Merge">
        <p>
          Three-way merge terjadi ketika kedua branches memiliki commits baru sejak diverge. Git membuat merge commit baru yang combine changes:
        </p>

        <CodeBlock language="bash">
{`# Three-Way Merge Scenario:
# main:    A---B---C
#               \\
# feature:       D---E

# Git compares:
# 1. Common ancestor (B)
# 2. Latest main commit (C)
# 3. Latest feature commit (E)

# Merge creates new commit (F):
# main:    A---B---C---F
#               \\     /
# feature:       D---E

# Example:
# 1. Create feature branch
git switch -c feature/add-footer

# 2. Make commit on feature
echo "footer" > footer.html
git add footer.html
git commit -m "feat: add footer"

# 3. Switch to main and make different commit
git switch main
echo "sidebar" > sidebar.html
git add sidebar.html
git commit -m "feat: add sidebar"

# 4. Now both branches have new commits
git log --oneline --graph --all
# * a1b2c3d (HEAD -> main) feat: add sidebar
# | * b2c3d4e (feature/add-footer) feat: add footer
# |/
# * c3d4e5f Initial commit

# 5. Merge feature to main (three-way merge)
git merge feature/add-footer
# Opens editor for merge commit message
# Default: "Merge branch 'feature/add-footer'"

# 6. Result: merge commit created
git log --oneline --graph
# *   d4e5f6g (HEAD -> main) Merge branch 'feature/add-footer'
# |\\  
# | * b2c3d4e (feature/add-footer) feat: add footer
# * | a1b2c3d feat: add sidebar
# |/
# * c3d4e5f Initial commit`}
        </CodeBlock>
      </Section>

      <Section id="merge-conflicts" heading="Merge Conflicts">
        <p>
          Conflict terjadi ketika Git tidak bisa otomatis merge karena dua branches mengubah line yang sama di file yang sama. Anda harus resolve conflicts secara manual:
        </p>

        <CodeBlock language="bash">
{`# Conflict Scenario:
# Both branches edit same line in index.html

# main branch:
# <h1>Welcome to Main</h1>

# feature branch:
# <h1>Welcome to Feature</h1>

# When merging:
git merge feature
# Output:
# Auto-merging index.html
# CONFLICT (content): Merge conflict in index.html
# Automatic merge failed; fix conflicts and then commit the result.

# Check status
git status
# Output:
# On branch main
# You have unmerged paths.
#   (fix conflicts and run "git commit")
#
# Unmerged paths:
#   (use "git add <file>..." to mark resolution)
#         both modified:   index.html

# File index.html now contains conflict markers:
<<<<<<< HEAD
<h1>Welcome to Main</h1>
=======
<h1>Welcome to Feature</h1>
>>>>>>> feature

# Conflict markers explained:
# <<<<<<< HEAD          = Start of your (current branch) changes
# <h1>Welcome to Main</h1>  = Your version
# =======               = Separator
# <h1>Welcome to Feature</h1>  = Their version (merging branch)
# >>>>>>> feature       = End of their changes`}
        </CodeBlock>
      </Section>

      <Section id="resolving-conflicts" heading="Resolving Conflicts">
        <p>
          Ada beberapa cara untuk resolve conflicts, dari manual editing sampai menggunakan merge tools:
        </p>

        <CodeBlock language="bash">
{`# 1. Open conflicted file in editor
code index.html

# 2. File contains conflict markers:
<<<<<<< HEAD
<h1>Welcome to Main</h1>
=======
<h1>Welcome to Feature</h1>
>>>>>>> feature

# 3. Edit to resolve - remove markers and choose/combine content:
<h1>Welcome to My App</h1>

# Or keep both:
<h1>Welcome to Main</h1>
<h2>Feature Branch Addition</h2>

# 4. Remove ALL conflict markers: <<<<<<<, =======, >>>>>>>

# 5. Save file

# 6. Stage resolved file
git add index.html

# 7. Check status
git status
# Output:
# All conflicts fixed but you are still merging.
#   (use "git commit" to conclude merge)

# 8. Commit the merge
git commit
# Uses default merge commit message
# Or provide custom message:
git commit -m "Merge feature: resolved conflicts in index.html"

# 9. Verify merge
git log --oneline --graph`}
        </CodeBlock>
      </Section>

      <Section id="merge-tools" heading="Using Merge Tools">
        <p>
          Git dapat menggunakan visual merge tools untuk easier conflict resolution:
        </p>

        <CodeBlock language="bash">
{`# Configure merge tool (VS Code)
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'

# Other popular tools:
git config --global merge.tool meld      # Meld
git config --global merge.tool kdiff3    # KDiff3
git config --global merge.tool p4merge   # Perforce P4Merge

# When conflict occurs:
git mergetool

# Opens configured tool showing:
# - LOCAL (your changes)
# - REMOTE (their changes)
# - BASE (common ancestor)
# - MERGED (result)

# After resolving in tool:
# - Save and close
# - Git automatically stages resolved file

# Commit merge
git commit

# Clean up backup files (*.orig)
git clean -f`}
        </CodeBlock>
      </Section>

      <Section id="abort-merge" heading="Aborting a Merge">
        <p>
          Jika Anda decide untuk tidak continue dengan merge, bisa abort dan kembali ke state sebelum merge:
        </p>

        <CodeBlock language="bash">
{`# Abort merge (undo all merge changes)
git merge --abort

# Returns to state before merge command
# All changes from merge are discarded

# Example:
git merge feature
# CONFLICT in multiple files...

# Decide tidak ready untuk resolve
git merge --abort
git status
# Output: On branch main, nothing to commit

# Alternative: Reset to before merge
git reset --hard HEAD
# Same effect as merge --abort

# Check if in middle of merge:
ls .git/
# Look for MERGE_HEAD file - indicates merge in progress`}
        </CodeBlock>
      </Section>

      <Section id="merge-strategies" heading="Merge Strategies & Options">
        <p>
          Git provides different merge strategies dan options:
        </p>

        <CodeBlock language="bash">
{`# Default merge (automatic strategy selection)
git merge feature

# Force no fast-forward (always create merge commit)
git merge --no-ff feature
# Preserves branch history

# Squash merge (combine all commits into one)
git merge --squash feature
# All changes staged but not committed
# Then:
git commit -m "feat: add entire feature"
# Result: One commit instead of multiple

# Accept theirs (auto-resolve conflicts with their version)
git merge -X theirs feature

# Accept ours (auto-resolve conflicts with our version)
git merge -X ours feature

# Merge without committing (inspect changes first)
git merge --no-commit feature
# Changes staged, review before commit

# Example: Merge with custom message
git merge feature -m "Merge feature: add authentication module"

# Verify merge before committing
git merge --no-commit --no-ff feature
git diff --cached              # Review changes
git commit -m "Custom message"

# Or abort if not satisfied
git merge --abort`}
        </CodeBlock>
      </Section>

      <Section id="avoiding-conflicts" heading="Best Practices untuk Menghindari Conflicts">
        <p>
          Prevention is better than cure! Berikut practices untuk minimize conflicts:
        </p>

        <CodeBlock language="text" caption="Proactive strategies untuk minimize merge conflicts">
{`Conflict Prevention Strategies:

1. Pull Frequently
   ├─ git pull origin main sebelum mulai work
   ├─ Update branch regularly
   └─ Stay in sync dengan team

2. Small, Focused Commits
   ├─ Commit sering dengan logical changes
   ├─ Easier untuk identify conflict source
   └─ Simpler untuk resolve

3. Communicate dengan Team
   ├─ Koordinasi siapa work on apa
   ├─ Avoid multiple people editing same file
   └─ Use pair programming untuk shared files

4. Merge Main into Feature Regularly
   git switch feature-branch
   git merge main
   ├─ Resolve conflicts early di feature branch
   └─ Final merge ke main will be clean

5. Use Feature Branches dengan Clear Scope
   ├─ One feature = one branch
   ├─ Minimize overlapping changes
   └─ Delete branches after merge

6. Refactor Separately
   ├─ Major refactors in dedicated branches
   ├─ Communicate with team
   └─ Merge quickly to avoid divergence

7. Automated Formatting & Linting
   ├─ Use Prettier, ESLint, etc
   ├─ Consistent code style = fewer conflicts
   └─ Format on save di editor

8. Review Changes Before Merging
   git diff main...feature
   ├─ Check what will be merged
   └─ Predict potential conflicts`}
        </CodeBlock>
      </Section>

      <Section id="conflict-workflow" heading="Complete Conflict Resolution Workflow">
        <p>
          Step-by-step workflow untuk handle merge conflicts:
        </p>
      </Section>

    </MateriLayout>
  );
}
