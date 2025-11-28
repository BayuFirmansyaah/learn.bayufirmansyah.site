import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi04() {
  return (
    <MateriLayout
      title="Branching Basics"
      intro="Branching adalah salah satu fitur paling powerful di Git. Branch memungkinkan Anda membuat isolated environment untuk develop features, fix bugs, atau experiment tanpa mengganggu kode utama. Hampir semua Git workflows modern heavily rely on branching."
    >
      <Section id="what-is-branch" heading="Apa itu Branch?">
        <p>
          Branch adalah pointer yang movable ke salah satu commit. Default branch adalah 
        </p>
        <p>
           (atau 
        </p>
        <p>
           di repo lama). Saat Anda membuat branch baru, Git membuat pointer baru yang bisa Anda pindahkan secara independent.
        </p>
        <p>
          Branching di Git sangat lightweight - hanya file kecil yang berisi 40-character SHA-1 checksum dari commit yang di-point. Ini berbeda dengan VCS lain yang copy seluruh project folder.
        </p>

        <CodeBlock language="text" caption="Branch adalah lightweight pointer ke commit">
{`Branch Visualization:

       A---B---C  (main)
            \\
             D---E  (feature)

Explanation:
├─ main branch: A → B → C
├─ feature branch: A → B → D → E
└─ Both branches share commits A and B

Creating branch adalah seperti bookmark pada commit tertentu.
Anda bisa pindah antar branch tanpa kehilangan work.`}
        </CodeBlock>
      </Section>

      <Section id="why-branching" heading="Mengapa Branching Penting?">
        <p>
          Branching memungkinkan parallel development dan safe experimentation:
        </p>
      </Section>

      <Section id="creating-branches" heading="Membuat Branch">
        <p>
          Ada beberapa cara untuk create dan switch branches:
        </p>

        <CodeBlock language="bash">
{`# View current branch
git branch
# Output:
# * main  (asterisk = current branch)

# List all branches (including remote)
git branch -a

# Create new branch
git branch feature-login

# Create and switch in one command (Old way)
git checkout -b feature-login

# Create and switch (New way - Git 2.23+)
git switch -c feature-login
# -c = create

# Switch to existing branch
git switch main
git checkout main              # Old way

# Create branch from specific commit
git branch feature abc123      # From commit abc123
git branch feature main~2      # From 2 commits before main

# Create branch from remote branch
git branch feature origin/feature

# Example workflow:
# 1. Check current branch
git branch
# * main

# 2. Create feature branch
git switch -c feature-auth

# 3. Verify
git branch
# * feature-auth
#   main

# 4. Make commits on feature branch
echo "auth code" > auth.js
git add auth.js
git commit -m "feat: add authentication"

# 5. Switch back to main
git switch main

# 6. main tidak terpengaruh oleh feature branch commits
git log --oneline
# auth commit tidak ada di main`}
        </CodeBlock>
      </Section>

      <Section id="viewing-branches" heading="Viewing Branches">
        <p>
          Ada banyak cara untuk list dan view branches:
        </p>

        <CodeBlock language="bash">
{`# List local branches
git branch
# * feature-auth
#   main

# List with last commit on each branch
git branch -v
# * feature-auth  a1b2c3d Add authentication
#   main          c3d4e5f Initial commit

# List all branches (local + remote)
git branch -a
# * feature-auth
#   main
#   remotes/origin/main
#   remotes/origin/feature-payment

# List remote branches only
git branch -r

# List merged branches
git branch --merged
# Branches yang sudah di-merge ke current branch

# List unmerged branches  
git branch --no-merged
# Branches yang belum di-merge

# Show branches with tracking info
git branch -vv
# * feature-auth  a1b2c3d [origin/feature-auth] Add auth
#   main          c3d4e5f [origin/main: ahead 2] Initial

# Visual graph of branches
git log --oneline --graph --all
# *   a1b2c3d (HEAD -> feature-auth) Add authentication
# |\\  
# | * c3d4e5f (main) Initial commit
# |/  
# * b2c3d4e Setup project`}
        </CodeBlock>
      </Section>

      <Section id="switching-branches" heading="Switching Between Branches">
        <p>
          Pindah branch sangat mudah, tapi ada beberapa hal yang perlu diperhatikan:
        </p>

        <CodeBlock language="bash">
{`# Switch to existing branch (New way)
git switch main
git switch feature-auth

# Switch to existing branch (Old way)
git checkout main

# Switch and create if not exists
git switch -c feature-new

# Switch with uncommitted changes
# Option 1: Commit changes first
git add .
git commit -m "WIP: work in progress"
git switch main

# Option 2: Stash changes (temporary save)
git stash
git switch main
# ... do work on main ...
git switch feature-auth
git stash pop                  # Restore stashed changes

# Force switch (discard uncommitted changes)
git switch -f main
git checkout -f main           # Old way

# Switch to previous branch (like cd -)
git switch -
# If you were on main, switch to feature-auth and vice versa

# Detached HEAD state (advanced)
git switch --detach abc123     # Switch to specific commit
# Warning: You're in 'detached HEAD' state`}
        </CodeBlock>
      </Section>

      <Section id="deleting-branches" heading="Deleting Branches">
        <p>
          Delete branches yang sudah tidak diperlukan untuk keep repository clean:
        </p>
      </Section>

      <Section id="naming-conventions" heading="Branch Naming Conventions">
        <p>
          Gunakan naming convention yang consistent untuk easy identification:
        </p>

        <CodeBlock language="text" caption="Professional branch naming conventions">
{`Branch Naming Best Practices:

Format: <type>/<description>
        atau
        <type>/<ticket-id>-<description>

Types:
├─ feature/  → New features
├─ bugfix/   → Bug fixes
├─ hotfix/   → Urgent production fixes
├─ release/  → Release preparation
├─ docs/     → Documentation
└─ refactor/ → Code refactoring

Good Examples:
✅ feature/user-authentication
✅ feature/JIRA-123-payment-integration
✅ bugfix/login-error
✅ bugfix/ISSUE-456-memory-leak
✅ hotfix/critical-security-patch
✅ release/v2.0.0
✅ docs/api-documentation
✅ refactor/database-layer

Bad Examples:
❌ new-feature
❌ fix
❌ test
❌ johns-branch
❌ feature1, feature2
❌ temp

Rules:
├─ Use lowercase
├─ Use hyphens, not spaces or underscores
├─ Be descriptive but concise
├─ Include ticket/issue number if applicable
└─ Use forward slashes for categorization

GitHub Flow (simple):
├─ main (production)
└─ feature/* (all development)

Git Flow (complex):
├─ main (production)
├─ develop (integration)
├─ feature/* (new features)
├─ release/* (release prep)
└─ hotfix/* (urgent fixes)`}
        </CodeBlock>
      </Section>

      <Section id="branch-workflow" heading="Complete Branch Workflow Example">
        <p>
          Workflow typical untuk develop feature dengan branching:
        </p>

        <CodeBlock language="bash">
{`# 1. Start dari main branch yang up-to-date
git switch main
git pull origin main

# 2. Create feature branch
git switch -c feature/user-profile

# 3. Develop feature (make multiple commits)
echo "profile code" > profile.js
git add profile.js
git commit -m "feat: add profile page structure"

echo "profile tests" > profile.test.js
git add profile.test.js  
git commit -m "test: add profile page tests"

# 4. Check status dan history
git status
git log --oneline
# a1b2c3d test: add profile page tests
# b2c3d4e feat: add profile page structure

# 5. Push branch to remote
git push -u origin feature/user-profile
# -u sets upstream tracking

# 6. Continue working... make more commits
# ... commits ...
git push  # Subsequent pushes don't need -u origin branch

# 7. Ready to merge? Switch to main
git switch main

# 8. Update main (might have changed)
git pull origin main

# 9. Merge feature branch
git merge feature/user-profile

# 10. Push merged main
git push origin main

# 11. Delete feature branch (local)
git branch -d feature/user-profile

# 12. Delete feature branch (remote)
git push origin --delete feature/user-profile

# Alternative: Create Pull Request on GitHub instead of merging locally
# After step 6, go to GitHub and create PR
# Team reviews, then merge via GitHub UI
# Then locally:
git switch main
git pull origin main
git branch -d feature/user-profile`}
        </CodeBlock>
      </Section>

    </MateriLayout>
  );
}
