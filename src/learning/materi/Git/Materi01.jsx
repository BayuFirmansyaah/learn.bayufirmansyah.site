import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi01() {
  return (
    <MateriLayout
      title="Pengenalan Git & Version Control"
      intro="Git adalah distributed version control system yang paling populer di dunia. Digunakan oleh jutaan developer dan perusahaan besar seperti Google, Microsoft, Facebook, dan Netflix. Git memungkinkan Anda melacak perubahan kode, berkolaborasi dengan tim, dan mengelola project dengan efisien."
    >
      <Section id="what-is-vcs" heading="Apa itu Version Control System (VCS)?">
        <p>
          <strong>Version Control System</strong> adalah software yang membantu developer melacak dan mengelola perubahan pada source code sepanjang waktu. Bayangkan seperti 'time machine' untuk kode Anda - Anda bisa melihat history perubahan, kembali ke versi sebelumnya, dan bekerja pada fitur baru tanpa merusak kode yang sudah stabil.
        </p>
        <p>
          Tanpa VCS, developer harus menyimpan backup manual dengan nama seperti 'project_v1.zip', 'project_v2_final.zip', 'project_v2_final_REAL.zip' - sangat tidak efisien dan error-prone. VCS menghilangkan masalah ini dengan tracking otomatis dan sistematis.
        </p>

        <Note type="info">
          VCS bukan hanya untuk programmer! Designer, writer, dan siapapun yang bekerja dengan file digital bisa mendapat manfaat dari version control.
        </Note>
      </Section>

      <Section id="why-git" heading="Mengapa Git Penting dalam Development?">
        <p>
          Git telah menjadi standar industri untuk version control. Hampir semua perusahaan teknologi menggunakan Git untuk mengelola codebase mereka. Ada beberapa alasan kuat mengapa Git begitu populer:
        </p>

        <Subsection id="git-benefits" heading="Keuntungan Menggunakan Git">
          <ul>
            <li>🔄 <strong>Track Changes</strong> - Setiap perubahan terekam dengan detail: siapa, kapan, dan kenapa</li>
            <li>🔙 <strong>Undo Mistakes</strong> - Kembali ke versi sebelumnya jika ada bug atau kesalahan</li>
            <li>🤝 <strong>Collaboration</strong> - Multiple developers bisa kerja pada file yang sama secara bersamaan</li>
            <li>🌿 <strong>Branching</strong> - Kembangkan fitur baru tanpa mengganggu kode production</li>
            <li>💾 <strong>Backup</strong> - Repository tersimpan di local dan remote (GitHub, GitLab)</li>
            <li>📊 <strong>Code Review</strong> - Review perubahan sebelum merge ke main codebase</li>
            <li>⚡ <strong>Speed</strong> - Git sangat cepat karena sebagian besar operasi dilakukan secara local</li>
          </ul>
        </Subsection>
      </Section>

      <Section id="git-vs-github" heading="Git vs GitHub vs GitLab">
        <p>
          Banyak pemula bingung membedakan Git, GitHub, dan GitLab. Mari kita klarifikasi:
        </p>

        <CodeBlock language="text">
{`┌──────────────────────────────────────────────────────────┐
│                  Git vs GitHub vs GitLab                 │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  GIT                                                     │
│  ├─ Software version control (tool)                     │
│  ├─ Runs locally on your computer                       │
│  ├─ Command-line based                                  │
│  ├─ Created by Linus Torvalds (2005)                    │
│  └─ FREE & Open Source                                  │
│                                                          │
│  GITHUB                                                  │
│  ├─ Web-based hosting service for Git repositories      │
│  ├─ Owned by Microsoft                                  │
│  ├─ Social features: issues, pull requests, actions     │
│  ├─ Largest community (100M+ developers)                │
│  └─ Free for public repos, paid for advanced features   │
│                                                          │
│  GITLAB                                                  │
│  ├─ Web-based hosting service for Git repositories      │
│  ├─ Open source (self-hostable)                         │
│  ├─ Built-in CI/CD pipelines                            │
│  ├─ Strong DevOps focus                                 │
│  └─ Free tier includes private repos & CI/CD            │
│                                                          │
└──────────────────────────────────────────────────────────┘

Analogy:
Git     = Microsoft Word (the tool)
GitHub  = Google Docs (cloud storage + collaboration)
GitLab  = Alternative to Google Docs with more features`}
        </CodeBlock>

        <Note type="tip">
          Anda HARUS install Git terlebih dahulu di komputer. GitHub/GitLab adalah optional - mereka adalah platform hosting untuk berbagi repository.
        </Note>
      </Section>

      <Section id="installation" heading="Instalasi Git">
        <p>
          Git tersedia untuk semua sistem operasi utama. Berikut panduan instalasi untuk masing-masing platform:
        </p>

        <Subsection id="install-windows" heading="Windows">
          <p>
            Download installer dari git-scm.com dan jalankan dengan setting default:
          </p>

          <CodeBlock language="bash">
{`# 1. Download dari: https://git-scm.com/download/win
# 2. Jalankan installer (Git-2.43.0-64-bit.exe)
# 3. Gunakan default settings (klik Next)
# 4. Pilih editor (VS Code recommended)
# 5. Path: "Git from the command line and also from 3rd-party software"
# 6. HTTPS: "Use the OpenSSL library"
# 7. Line ending: "Checkout Windows-style, commit Unix-style"
# 8. Terminal: "Use MinTTY"
# 9. Finish installation

# Verify installation
git --version
# Output: git version 2.43.0`}
          </CodeBlock>

          <Note type="tip">
            Installer juga include Git Bash - terminal emulator dengan Linux-style commands untuk Windows.
          </Note>
        </Subsection>

        <Subsection id="install-mac" heading="macOS">
          <p>
            Cara termudah adalah menggunakan Homebrew package manager:
          </p>

          <CodeBlock language="bash">
{`# Install dengan Homebrew (recommended)
brew install git

# Atau download installer dari:
# https://git-scm.com/download/mac

# Atau install Xcode Command Line Tools (include Git)
xcode-select --install

# Verify installation
git --version
# Output: git version 2.43.0`}
          </CodeBlock>
        </Subsection>

        <Subsection id="install-linux" heading="Linux">
          <p>
            Gunakan package manager sesuai distribusi Linux Anda:
          </p>

          <CodeBlock language="bash">
{`# Ubuntu / Debian
sudo apt update
sudo apt install git

# Fedora
sudo dnf install git

# Arch Linux
sudo pacman -S git

# CentOS / RHEL
sudo yum install git

# Verify installation
git --version
# Output: git version 2.43.0`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="configuration" heading="Konfigurasi Awal Git">
        <p>
          Setelah instalasi, Anda HARUS setup identitas Anda. Git menggunakan informasi ini untuk setiap commit yang Anda buat:
        </p>

        <CodeBlock language="bash">
{`# Set username (akan muncul di commit history)
git config --global user.name "Your Name"

# Set email (PENTING: gunakan email yang sama dengan GitHub)
git config --global user.email "your.email@example.com"

# Set default editor (VS Code)
git config --global core.editor "code --wait"

# Set default branch name ke 'main' (GitHub standard)
git config --global init.defaultBranch main

# Enable color output
git config --global color.ui auto

# View all configurations
git config --list

# View specific config
git config user.name
git config user.email`}
        </CodeBlock>

        <Note type="warning">
          Email di git config HARUS sama dengan email GitHub Anda agar commit ter-link ke profile GitHub Anda!
        </Note>
      </Section>

      <Section id="config-levels" heading="Level Konfigurasi Git">
        <p>
          Git memiliki tiga level konfigurasi dengan priority berbeda:
        </p>

        <CodeBlock language="bash">
{`# 1. System Level (applies to all users)
git config --system user.name "Name"
# Location: /etc/gitconfig

# 2. Global Level (applies to current user) - MOST COMMON
git config --global user.name "Name"
# Location: ~/.gitconfig or ~/.config/git/config

# 3. Local Level (applies to current repository only)
git config --local user.name "Name"
# Location: .git/config inside repository

# Priority: Local > Global > System
# Local config overrides global, global overrides system`}
        </CodeBlock>

        <Note type="info">
          Gunakan --global untuk konfigurasi umum. Gunakan --local jika perlu setting berbeda untuk project tertentu (misalnya work email vs personal email).
        </Note>
      </Section>

      <Section id="verification" heading="Verifikasi Instalasi & Setup">
        <p>
          Pastikan Git terinstall dengan benar dan konfigurasi sudah tepat:
        </p>

        <CodeBlock language="bash">
{`# Check Git version
git --version
# Expected: git version 2.43.0 (or higher)

# Check configuration
git config --list
# Should show:
# user.name=Your Name
# user.email=your.email@example.com
# init.defaultbranch=main
# core.editor=code --wait

# Check specific config
git config user.name
git config user.email

# Get help
git help
git help config
git help commit

# Short help
git commit -h`}
        </CodeBlock>
      </Section>

      <Section id="useful-aliases" heading="Useful Git Aliases (Optional)">
        <p>
          Aliases adalah shortcut untuk perintah Git yang sering digunakan. Setup ini optional tapi sangat membantu productivity:
        </p>

        <CodeBlock language="bash">
{`# Status shortcut
git config --global alias.st status

# Commit shortcut
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit

# Pretty log
git config --global alias.lg "log --oneline --graph --all --decorate"

# Undo last commit (keep changes)
git config --global alias.undo "reset HEAD~1 --mixed"

# Show all aliases
git config --global --get-regexp alias

# Now you can use:
git st        # instead of git status
git co main   # instead of git checkout main
git lg        # pretty log with graph`}
        </CodeBlock>

        <Note type="tip">
          Aliases sangat personal. Buat aliases untuk commands yang Anda gunakan paling sering!
        </Note>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>📌 <strong>VCS</strong> = Time machine untuk kode, track changes, undo mistakes, collaboration</li>
          <li>🔧 <strong>Git</strong> (tool) ≠ GitHub (hosting platform) ≠ GitLab (alternative)</li>
          <li>💻 <strong>Install</strong>: brew install git (Mac), apt install git (Linux), git-scm.com (Windows)</li>
          <li>⚙️ <strong>Config</strong>: git config --global user.name & user.email (WAJIB setup)</li>
          <li>💡 <strong>Tip</strong>: Email di git config HARUS sama dengan email GitHub</li>
          <li>✨ <strong>Aliases</strong>: git config --global alias.st status untuk shortcut</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
