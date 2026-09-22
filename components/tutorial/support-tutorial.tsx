'use client';

import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { supportTutorialSteps } from '@/content/support-tutorial';
import type { EvidenceKind, TutorialStep } from '@/types/tutorial';
import { CaptureViewer } from './annotated-capture';
import { TutorialStepper } from './tutorial-stepper';
import styles from './tutorial.module.css';

const evidenceLabels: Record<EvidenceKind, string> = {
  observed: 'Observado',
  guidance: 'Orientação',
};

const SUPPORT_PORTAL_URL = 'https://suporte.ub.edu.br/Helpdesk';

export function SupportTutorial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visitedIndexes, setVisitedIndexes] = useState<ReadonlySet<number>>(
    () => new Set([0]),
  );
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousIndexRef = useRef(currentIndex);
  const steps: readonly TutorialStep[] = supportTutorialSteps;
  const currentStep = steps[currentIndex];
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === steps.length - 1;

  const selectStep = (index: number) => {
    if (index < 0 || index >= steps.length) return;
    setVisitedIndexes((visited) => {
      if (visited.has(index)) return visited;
      const nextVisited = new Set(visited);
      nextVisited.add(index);
      return nextVisited;
    });
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (previousIndexRef.current === currentIndex) return;
    previousIndexRef.current = currentIndex;

    const heading = headingRef.current;
    if (!heading) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    heading.focus({ preventScroll: true });
    heading.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [currentIndex]);

  return (
    <section
      className={styles.tutorial}
      aria-labelledby="support-tutorial-title"
    >
      <header className={styles.header}>
        <p className="eyebrow">Passo a passo • Portal de suporte UB</p>
        <h1 id="support-tutorial-title">
          Como abrir um chamado no Portal de Suporte UB
        </h1>
        <p>
          Acompanhe as telas reais e veja exatamente onde clicar e o que
          preencher.
        </p>
      </header>

      <TutorialStepper
        steps={steps}
        currentIndex={currentIndex}
        visitedIndexes={visitedIndexes}
        onSelect={selectStep}
      />

      <p className={styles.liveStatus} aria-live="polite" aria-atomic="true">
        Etapa {currentIndex + 1} de {steps.length} — {currentStep.title}
      </p>

      <article
        className={styles.step}
        aria-labelledby={`tutorial-step-${currentStep.id}`}
      >
        <p className={styles.counter} aria-hidden="true">
          Etapa {currentIndex + 1} de {steps.length}
        </p>
        <h2
          ref={headingRef}
          id={`tutorial-step-${currentStep.id}`}
          tabIndex={-1}
        >
          {currentStep.title}
        </h2>
        <p>{currentStep.description}</p>

        <div className={styles.captures}>
          {currentStep.captures.map((capture) => (
            <div className={styles.captureGroup} key={capture.id}>
              <CaptureViewer capture={capture} showEvidence />
            </div>
          ))}
        </div>

        {currentStep.checklist && (
          <section
            className={styles.checklist}
            aria-labelledby={`tutorial-checklist-${currentStep.id}`}
          >
            <div>
              <h3 id={`tutorial-checklist-${currentStep.id}`}>
                {currentStep.checklist.title}
              </h3>
              <small
                className={`evidence-label is-${currentStep.checklist.evidence}`}
              >
                {evidenceLabels[currentStep.checklist.evidence]}
              </small>
            </div>
            <ul>
              {currentStep.checklist.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {currentStep.notes && (
          <ul className={styles.notes}>
            {currentStep.notes.map((note) => (
              <li key={note.id}>
                <small className={`evidence-label is-${note.evidence}`}>
                  {evidenceLabels[note.evidence]}
                </small>
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
          <button type="button" onClick={() => selectStep(currentIndex + 1)}>
            Próximo <ArrowRight size={18} />
          </button>
        )}
      </div>

      <aside className={styles.evidenceKey} aria-label="Como ler as indicações">
        <span>
          <b>Observado</b> aparece na captura.
        </span>
        <span aria-hidden="true">•</span>
        <span>
          <b>Orientação</b> é uma recomendação de uso.
        </span>
      </aside>
    </section>
  );
}
