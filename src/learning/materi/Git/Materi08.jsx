import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi08() {
  return (
    <MateriLayout
      title="Git Stash - Temporary Storage"
      intro="Git Stash adalah fitur untuk menyimpan uncommitted changes sementara tanpa commit. Berguna ketika perlu switch branch tapi belum siap commit, atau saat ada interruption untuk urgent fixes."
    >
      <Section id="what-is-stash" heading="Apa itu Git Stash?">
        <p>
          Stash menyimpan modified files dan staged changes ke stack, lalu revert working directory ke clean state. Bayangkan seperti 
        </p>
        <p>
           untuk WIP (Work In Progress).
        </p>
      </Section>

      <Section id="use-cases" heading="Common Use Cases">
        <p>
          Stash sangat berguna dalam scenarios berikut:
        </p>
      </Section>

    </MateriLayout>
  );
}
