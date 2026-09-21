'use client';

import Image from 'next/image';
import { ZoomIn } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import type {
  EvidenceKind,
  TutorialCapture,
  TutorialHotspot,
} from '@/types/tutorial';

const evidenceLabels: Record<EvidenceKind, string> = {
  observed: 'Observado no portal',
  guidance: 'Orientação geral',
};

function CaptureImage({ capture }: { capture: TutorialCapture }) {
  return (
    <div
      className="capture"
      style={{ aspectRatio: `${capture.width}/${capture.height}` }}
    >
      <Image
        src={capture.src}
        alt={`Captura real do portal UB: ${capture.title}`}
        width={capture.width}
        height={capture.height}
        sizes="(max-width: 800px) 95vw, 1000px"
      />
      {capture.hotspots.map((hotspot) => (
        <span
          key={hotspot.id}
          className="capture-mark"
          aria-hidden="true"
          style={{
            left: `${hotspot.x}%`,
            top: `${hotspot.y}%`,
            width: `${hotspot.width}%`,
            height: `${hotspot.height}%`,
          }}
        >
          <b>{hotspot.id}</b>
        </span>
      ))}
    </div>
  );
}

function CaptureLegend({
  hotspots,
  showEvidence,
}: {
  hotspots: readonly TutorialHotspot[];
  showEvidence: boolean;
}) {
  return (
    <ol className="capture-legend">
      {hotspots.map((hotspot) => (
        <li key={hotspot.id}>
          <b>{hotspot.id}</b>
          <span>
            {showEvidence && (
              <small className={`evidence-label is-${hotspot.evidence}`}>
                {evidenceLabels[hotspot.evidence]}
              </small>
            )}
            {hotspot.legend}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function CaptureViewer({
  capture,
  showEvidence = false,
}: {
  capture: TutorialCapture;
  showEvidence?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (expanded && !dialog.open) dialog.showModal();
    if (!expanded && dialog.open) dialog.close();
  }, [expanded]);

  return (
    <figure className="portal-screen">
      <figcaption>
        <h3>{capture.title}</h3>
        <p>{capture.description}</p>
      </figcaption>
      <CaptureImage capture={capture} />
      <button
        type="button"
        className="zoom-button"
        onClick={() => setExpanded(true)}
      >
        <ZoomIn size={18} /> Ampliar imagem: {capture.title}
      </button>
      <dialog
        ref={dialogRef}
        className="capture-dialog"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClose={() => setExpanded(false)}
      >
        <h2 id={titleId}>{capture.title}</h2>
        <p id={descriptionId}>
          Captura real com marcações numeradas. No celular, deslize a imagem
          ampliada para ver todos os detalhes.
        </p>
        <button
          type="button"
          className="zoom-button"
          onClick={() => setExpanded(false)}
        >
          Fechar imagem
        </button>
        <div className="capture-scroll">
          <CaptureImage capture={capture} />
        </div>
        <CaptureLegend
          hotspots={capture.hotspots}
          showEvidence={showEvidence}
        />
      </dialog>
      <CaptureLegend hotspots={capture.hotspots} showEvidence={showEvidence} />
    </figure>
  );
}
