'use client';

import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { supportTutorialSteps } from '@/content/support-tutorial';
import type { EvidenceKind, TutorialStep } from '@/types/tutorial';
import { CaptureViewer } from './annotated-capture';
import { TutorialStepper } from './tutorial-stepper';
import styles from './tutorial.module.css';

const evidenceLabels: Record<EvidenceKind, string> = {
  observed: 'Observado no portal',
  guidance: 'Orientação geral',
};

const SUPPORT_PORTAL_URL = 'https://suporte.ub.edu.br/Helpdesk';

export function SupportTutorial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const steps: readonly TutorialStep[] = supportTutorialSteps;
  const currentStep = steps[currentIndex];
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === steps.length - 1;

  const selectStep = (index: number) => {
    if (index < 0 || index >= steps.length) return;
    setCurrentIndex(index);
  };

  return (
    <section
      className={styles.tutorial}
      aria-labelledby="support-tutorial-title"
    >
      <header className={styles.header}>
        <p className="eyebrow">Passo a passo • Portal de suporte UB</p>
        <h1 id="support-tutorial-title">
          Tutorial para abrir e acompanhar um chamado
        </h1>
        <p>
          Siga uma etapa de cada vez usando as capturas reais do Portal de
          Suporte.
        </p>
      </header>

      <TutorialStepper
        steps={steps}
        currentIndex={currentIndex}
        onSelect={selectStep}
      />

      <p className={styles.counter} aria-live="polite">
        Etapa {currentIndex + 1} de {steps.length}
      </p>

      <article
        className={styles.step}
        aria-labelledby={`tutorial-step-${currentStep.id}`}
      >
        <h2 id={`tutorial-step-${currentStep.id}`}>{currentStep.title}</h2>
        <p>{currentStep.description}</p>

        {currentStep.captures.map((capture) => (
          <CaptureViewer key={capture.id} capture={capture} showEvidence />
        ))}

        {currentStep.notes && (
          <ul className={styles.notes}>
            {currentStep.notes.map((note) => (
              <li key={note.id}>
                <strong>{evidenceLabels[note.evidence]}</strong>
                <span>{note.text}</span>
              </li>
            ))}
          </ul>
        )}
      </article>

      <div className={styles.navigation}>
        <button
          type="button"
          onClick={() => selectStep(currentIndex - 1)}
          disabled={isFirstStep}
        >
          <ArrowLeft size={18} /> Anterior
        </button>
        {isLastStep ? (
          <a href={SUPPORT_PORTAL_URL} target="_blank" rel="noreferrer">
            Abrir Portal de Suporte <ExternalLink size={18} />
          </a>
        ) : (
          <button
            type="button"
            onClick={() => selectStep(currentIndex + 1)}
          >
            Próximo <ArrowRight size={18} />
          </button>
        )}
      </div>
    </section>
  );
}
