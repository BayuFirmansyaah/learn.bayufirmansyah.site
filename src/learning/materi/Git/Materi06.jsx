import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi06() {
  return (
    <MateriLayout
      title="Remote Repository & GitHub"
      intro="Remote repository adalah Git repository yang hosted di server (seperti GitHub, GitLab, Bitbucket). Remote memungkinkan collaboration dengan team, backup code, dan sharing project dengan dunia. GitHub adalah platform hosting paling populer dengan 100M+ developers."
    >
      <Section id="what-is-remote" heading="Apa itu Remote Repository?">
        <p>
          Remote repository adalah version dari project Anda yang di-host di internet atau network. Anda bisa push local changes ke remote, dan pull changes dari remote ke local.
        </p>
        <p>
          Git adalah distributed version control - setiap developer punya complete copy dari repository. Remote repository bertindak sebagai central hub untuk team collaboration.
        </p>
      </Section>

      <Section id="github-account" heading="Membuat Akun GitHub">
        <p>
          GitHub adalah platform paling populer untuk host Git repositories. Free tier sudah sangat capable untuk individual developers:
        </p>
      </Section>

      <Section id="ssh-setup" heading="Setup SSH Keys (Recommended)">
        <p>
          SSH keys memungkinkan Anda connect ke GitHub tanpa perlu input username/password setiap kali. Lebih aman dan convenient:
        </p>
      </Section>

      <Section id="create-repo" heading="Membuat Repository di GitHub">
        <p>
          Ada dua cara utama: create di GitHub dulu (lalu clone), atau push existing local repo:
        </p>
      </Section>

      <Section id="push-existing" heading="Method 2: Push Existing Local Repo">
        <p>
          Sudah punya local repo, ingin push ke GitHub:
        </p>
      </Section>

      <Section id="git-remote" heading="Managing Remotes">
        <p>
          Git dapat track multiple remotes. Ini berguna untuk forks, mirrors, atau backup locations:
        </p>
      </Section>

      <Section id="clone-vs-fork" heading="Clone vs Fork">
        <p>
          Clone dan Fork sering membingungkan. Pahami perbedaannya:
        </p>
      </Section>

      <Section id="first-push" heading="First Push to GitHub">
        <p>
          Complete workflow untuk push local repository ke GitHub untuk pertama kali:
        </p>
      </Section>

    </MateriLayout>
  );
}
