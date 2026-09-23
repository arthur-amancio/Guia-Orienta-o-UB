import type { TutorialStep } from '@/types/tutorial';
import styles from './tutorial.module.css';

export function TutorialStepper({
  steps,
  currentIndex,
  visitedIndexes,
  onSelect,
}: {
  steps: readonly TutorialStep[];
  currentIndex: number;
  visitedIndexes: ReadonlySet<number>;
  onSelect: (index: number) => void;
}) {
  const stepState = (index: number) => {
    if (currentIndex === index) return 'current';
    if (visitedIndexes.has(index)) return 'visited';
    return 'future';
  };

  const accessibleName = (step: TutorialStep, index: number) => {
    const state = stepState(index);
    const stateLabel =
      state === 'current'
        ? 'etapa atual'
        : state === 'visited'
          ? 'etapa visitada'
          : 'etapa ainda não visitada';
    return `Etapa ${index + 1} de ${steps.length}: ${step.title}, ${stateLabel}`;
  };

  return (
    <nav className={styles.stepperNav} aria-label="Etapas do tutorial">
      <ol className={styles.desktopStepper}>
        {steps.map((step, index) => (
          <li key={step.id}>
            <button
              type="button"
              aria-current={currentIndex === index ? 'step' : undefined}
              aria-label={accessibleName(step, index)}
              data-state={stepState(index)}
              onClick={() => onSelect(index)}
            >
              <span className={styles.stepNumber} aria-hidden="true">
                {index + 1}
              </span>
              <span aria-hidden="true">{step.shortTitle}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className={styles.mobileSummary} aria-hidden="true">
        <span>
          Etapa {currentIndex + 1} de {steps.length}
        </span>
        <strong>{steps[currentIndex].shortTitle}</strong>
      </div>
      <ol className={styles.mobileStepper}>
        {steps.map((step, index) => (
          <li key={step.id}>
            <button
              type="button"
              aria-current={currentIndex === index ? 'step' : undefined}
              aria-label={accessibleName(step, index)}
              data-state={stepState(index)}
              onClick={() => onSelect(index)}
            >
              <span aria-hidden="true" />
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
