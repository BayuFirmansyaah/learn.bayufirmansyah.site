import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi07() {
  return (
    <MateriLayout
      title="Collaboration Workflow - Fetch, Pull, Push"
      intro="Collaboration adalah inti dari Git. Di materi ini kita akan deep dive ke fetch vs pull, pushing changes, Pull Requests, dan code review workflow yang digunakan oleh professional teams."
    >
      <Section id="fetch-vs-pull" heading="Fetch vs Pull - Apa Bedanya?">
        <p>
          Fetch dan Pull keduanya download changes dari remote, tapi dengan behavior berbeda. Memahami perbedaannya penting untuk safe collaboration:
        </p>

        <CodeBlock language="text" caption="Fetch downloads, Pull downloads + merges">
{`Fetch vs Pull:

GIT FETCH:
├─ Download changes dari remote
├─ Update remote-tracking branches (origin/main)
├─ TIDAK merge ke working branch
├─ Aman - tidak mengubah working directory
└─ Let you inspect changes before integrating

GIT PULL:
├─ Download changes dari remote (fetch)
├─ Automatically merge ke current branch
├─ = git fetch + git merge
├─ Convenient but can cause conflicts
└─ Use carefully in dirty working directory

Visualization:

BEFORE FETCH/PULL:
Local main:     A---B---C
Remote main:    A---B---C---D---E

AFTER FETCH:
Local main:     A---B---C
origin/main:    A---B---C---D---E  (updated, not merged)

AFTER PULL:
Local main:     A---B---C---F  (merge commit)
                         \\ /
                          D---E
origin/main:    A---B---C---D---E`}
        </CodeBlock>
      </Section>

      <Section id="git-fetch" heading="Git Fetch - Inspect Before Merge">
        <p>
          Fetch adalah safe way untuk download updates. You can inspect changes before deciding to merge:
        </p>

        <CodeBlock language="bash">
{`# Fetch from default remote (origin)
git fetch

# Fetch from specific remote
git fetch origin
git fetch upstream

# Fetch specific branch
git fetch origin main
git fetch origin feature-auth

# Fetch all remotes
git fetch --all

# Fetch and prune (remove deleted remote branches)
git fetch -p
git fetch --prune

# After fetch, inspect changes:

# See what's new
git log HEAD..origin/main
# Shows commits on origin/main that you don't have

# See diff
git diff HEAD origin/main
# Shows exact changes

# See files changed
git diff --name-only HEAD origin/main

# Visualize branches
git log --oneline --graph --all
# * d4e5f6g (origin/main) Remote commit 2
# * c3d4e5f (origin/main) Remote commit 1
# * b2c3d4e (HEAD -> main) Local commit
# * a1b2c3d Initial commit

# Merge after inspection
git merge origin/main

# Or rebase
git rebase origin/main

# Example workflow:
# 1. Fetch updates
git fetch origin

# 2. Check what changed
git log --oneline HEAD..origin/main
# d4e5f6g feat: add payment module
# c3d4e5f fix: resolve login bug

# 3. Review diff
git diff HEAD origin/main

# 4. Decide to merge
git merge origin/main

# 5. Or decide not to merge yet (keep working)
# Continue working on local branch`}
        </CodeBlock>
      </Section>

      <Section id="git-pull" heading="Git Pull - Fetch + Merge">
        <p>
          Pull adalah shortcut untuk fetch + merge. Convenient tapi bisa cause conflicts jika tidak hati-hati:
        </p>

        <CodeBlock language="bash">
{`# Basic pull (fetch + merge)
git pull

# Pull from specific remote and branch
git pull origin main

# Pull with rebase instead of merge
git pull --rebase
git pull --rebase origin main

# Pull only if can fast-forward (no merge commit)
git pull --ff-only

# Pull all branches
git pull --all

# Example scenarios:

# Scenario 1: Clean pull (no conflicts)
git pull origin main
# Output:
# From github.com:user/repo
#  * branch            main       -> FETCH_HEAD
# Updating a1b2c3d..d4e5f6g
# Fast-forward
#  app.js | 5 +++++
#  1 file changed, 5 insertions(+)

# Scenario 2: Pull with conflicts
git pull origin main
# Output:
# Auto-merging app.js
# CONFLICT (content): Merge conflict in app.js
# Automatic merge failed; fix conflicts and commit

# Resolve conflicts
code app.js  # Fix conflicts
git add app.js
git commit  # Complete merge

# Scenario 3: Pull with uncommitted changes
# Option A: Stash, pull, then pop
git stash
git pull origin main
git stash pop

# Option B: Commit changes first
git add .
git commit -m "WIP: work in progress"
git pull origin main

# Option C: Pull with rebase (cleaner history)
git pull --rebase origin main

# Common errors and solutions:

# Error: "You have unstaged changes"
# Solution 1: Commit changes
git add .
git commit -m "Save work"
git pull

# Solution 2: Stash changes
git stash
git pull
git stash pop

# Error: "Your local changes would be overwritten"
# Solution: Commit or discard changes
git add .
git commit -m "Save work"
git pull

# Or discard:
git restore .
git pull`}
        </CodeBlock>
      </Section>

      <Section id="git-push" heading="Git Push - Share Your Changes">
        <p>
          Push uploads local commits ke remote repository. Team members kemudian bisa pull changes tersebut:
        </p>

        <CodeBlock language="bash">
{`# Basic push (to tracked branch)
git push

# Push to specific remote and branch
git push origin main

# First push - set upstream
git push -u origin feature-auth
# -u = --set-upstream (sets tracking)

# Push all branches
git push --all

# Push tags
git push --tags

# Push specific tag
git push origin v1.0.0

# Force push (DANGEROUS!)
git push --force
git push -f

# Safer force push
git push --force-with-lease
# Only force if remote hasn't changed

# Delete remote branch
git push origin --delete feature-old
git push origin :feature-old  # Old syntax

# Push to different branch name
git push origin local-branch:remote-branch

# Dry run (see what would be pushed)
git push --dry-run

# Example workflows:

# Workflow 1: Push new feature branch
git switch -c feature/new-auth
# ... make commits ...
git push -u origin feature/new-auth

# Workflow 2: Push to existing branch
# ... make commits on main ...
git push origin main

# Workflow 3: Push rejected (remote ahead)
git push origin main
# Output:
# ! [rejected]        main -> main (fetch first)
# error: failed to push some refs

# Solution: Pull first, then push
git pull origin main
git push origin main

# Or with rebase (cleaner)
git pull --rebase origin main
git push origin main

# Common errors:

# Error: "Updates were rejected"
# Reason: Remote has commits you don't have
# Solution:
git pull origin main
# Resolve conflicts if any
git push origin main

# Error: "Permission denied"
# Reason: No write access or auth issue
# Solution: Check SSH keys atau use correct credentials

# Error: "non-fast-forward"
# Reason: Remote branch diverged
# Solution: Pull and merge, or rebase
git pull origin main
git push origin main`}
        </CodeBlock>
      </Section>

      <Section id="pull-requests" heading="Pull Requests (PR) Basics">
        <p>
          Pull Request adalah cara untuk propose changes ke repository. Di GitHub, PR memungkinkan code review sebelum merge:
        </p>

        <CodeBlock language="text" caption="Complete Pull Request workflow">
{`Pull Request Workflow:

1. CREATE FEATURE BRANCH
   git switch -c feature/user-profile
   
2. MAKE COMMITS
   # ... develop feature ...
   git add .
   git commit -m "feat: add user profile page"
   
3. PUSH BRANCH TO GITHUB
   git push -u origin feature/user-profile
   
4. CREATE PULL REQUEST (on GitHub)
   - Go to repository on GitHub
   - Click "Compare & pull request" button
   - OR: Pull requests tab → New pull request
   
5. FILL PR DETAILS
   Title: feat: Add user profile page
   Description:
   - Add profile page component
   - Add profile API integration  
   - Add unit tests
   - Closes #123
   
6. REQUEST REVIEWERS
   - Select team members
   - Assign to yourself
   - Add labels (enhancement, bug, etc)
   
7. CODE REVIEW
   - Reviewers comment on code
   - Suggest changes
   - Approve or request changes
   
8. MAKE CHANGES (if requested)
   # On local branch
   git add .
   git commit -m "fix: address review comments"
   git push
   # PR automatically updates!
   
9. MERGE PR (after approval)
   - Merge commit (preserve history)
   - Squash and merge (clean single commit)
   - Rebase and merge (linear history)
   
10. DELETE BRANCH
    - GitHub: Click "Delete branch" button
    - Local: git branch -d feature/user-profile

PR Best Practices:
├─ Keep PRs small & focused (one feature)
├─ Write descriptive title & description
├─ Link related issues (Closes #123)
├─ Add screenshots for UI changes
├─ Ensure CI/CD passes
├─ Respond to review comments promptly
└─ Delete branch after merge`}
        </CodeBlock>
      </Section>

      <Section id="code-review" heading="Code Review Process">
        <p>
          Code review adalah critical part dari collaboration. Good reviews improve code quality dan knowledge sharing:
        </p>

        <CodeBlock language="text">
{`Code Review Guidelines:

AS AUTHOR (person creating PR):
├─ Self-review before requesting
├─ Write clear PR description
├─ Test thoroughly
├─ Keep changes focused & small
├─ Respond to feedback professionally
└─ Don't take criticism personally

AS REVIEWER:
├─ Review promptly (within 24 hours)
├─ Check logic, not just syntax
├─ Test locally if needed
├─ Be constructive, not destructive
├─ Suggest improvements, not just point problems
├─ Approve if acceptable, not perfect
└─ Use questions, not commands

GitHub Review Features:
├─ Comment on specific lines
├─ Start review (batch comments)
├─ Suggest code changes (reviewers can)
├─ Request changes vs Approve
├─ Mark conversations as resolved
└─ Re-request review after changes

Example Review Comments:

GOOD Comments:
✅ "Consider using map() here for better readability:
    users.map(u => u.name)"
✅ "Could we add error handling for this API call?"
✅ "Looks good! Just one minor suggestion on line 45"
✅ "This is clever! Maybe add a comment explaining the logic?"

BAD Comments:
❌ "This is wrong"
❌ "Why did you do it this way?"
❌ "Use map here" (no explanation)
❌ "I would never do it like this"

Review Checklist:
□ Code works (no bugs)
□ Follows project style guide
□ Has tests (if applicable)
□ No security vulnerabilities
□ No performance issues
□ Clear variable names
□ Appropriate comments
□ No console.logs or debug code
□ Documentation updated
□ No merge conflicts`}
        </CodeBlock>
      </Section>

      <Section id="team-workflow" heading="Team Collaboration Workflow">
        <p>
          Complete workflow untuk team collaboration menggunakan Git & GitHub:
        </p>

        <CodeBlock language="bash">
{`# Day-to-day Team Workflow

# MORNING: Start working
# 1. Update main branch
git switch main
git pull origin main

# 2. Create feature branch
git switch -c feature/add-dashboard

# 3. Work on feature
echo "dashboard code" > dashboard.js
git add dashboard.js
git commit -m "feat: add dashboard structure"

# Continue working throughout day...
# Make multiple commits

# DURING DAY: Keep feature branch updated
# 4. Fetch updates from main
git fetch origin main

# 5. Check if main has new commits
git log HEAD..origin/main

# 6. Merge main into feature branch
git merge origin/main
# Or rebase (cleaner history):
git rebase origin/main

# END OF DAY: Push your work
# 7. Push feature branch
git push -u origin feature/add-dashboard

# NEXT DAY: Create Pull Request
# 8. Go to GitHub, create PR
# - Base: main
# - Compare: feature/add-dashboard
# - Add description, reviewers

# 9. Respond to review comments
# Make requested changes locally
git add .
git commit -m "fix: address review feedback"
git push  # PR updates automatically

# 10. After approval, merge PR on GitHub

# 11. Clean up locally
git switch main
git pull origin main  # Get merged changes
git branch -d feature/add-dashboard  # Delete local branch

# WORKING ON MULTIPLE FEATURES
# Switch between branches easily
git switch feature-auth
# ... work ...
git add .
git commit -m "progress on auth"

git switch feature-dashboard  
# ... work ...
git add .
git commit -m "progress on dashboard"

# EMERGENCY: Need to fix production bug
git switch main
git pull origin main
git switch -c hotfix/critical-bug
# ... fix bug ...
git commit -am "hotfix: critical bug fix"
git push -u origin hotfix/critical-bug
# Create PR with "hotfix" label
# Fast-track review & merge

# RESOLVING CONFLICTS WITH TEAMMATE
# Both you and teammate edited same file
git pull origin main
# CONFLICT in app.js

# 1. Check who made conflicting changes
git log origin/main --oneline -5

# 2. Communicate with teammate
# "Hey, I'm resolving conflict in app.js"

# 3. Resolve conflict
code app.js  # Fix manually
git add app.js
git commit

# 4. Push resolved version
git push origin main`}
        </CodeBlock>
      </Section>

    </MateriLayout>
  );
}
