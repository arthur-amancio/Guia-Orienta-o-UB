import type { TutorialStep } from '@/types/tutorial';
import styles from './tutorial.module.css';

export function TutorialStepper({
  steps,
  currentIndex,
  onSelect,
}: {
  steps: readonly TutorialStep[];
  currentIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav aria-label="Etapas do tutorial">
      <ol className={styles.stepper}>
        {steps.map((step, index) => (
          <li key={step.id}>
            <button
              type="button"
              aria-current={currentIndex === index ? 'step' : undefined}
              onClick={() => onSelect(index)}
            >
              <span aria-hidden="true">{index + 1}</span>
              {step.shortTitle}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
