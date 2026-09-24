'use client';

import Image from 'next/image';
import { ZoomIn } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import type { TutorialCapture, TutorialHotspot } from '@/types/tutorial';

function CaptureImage({
  capture,
  expanded = false,
  activeHotspot,
}: {
  capture: TutorialCapture;
  expanded?: boolean;
  activeHotspot: number | null;
}) {
  return (
    <div
      className={`capture${expanded ? ' capture-expanded' : ''}`}
      data-has-highlight={activeHotspot !== null}
      style={{
        aspectRatio: `${capture.width}/${capture.height}`,
        ...(expanded
          ? { width: `${capture.width}px`, maxWidth: 'none' }
          : { maxWidth: `${capture.width}px`, marginInline: 'auto' }),
      }}
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
          data-highlighted={activeHotspot === hotspot.id}
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
  activeHotspot,
  onHighlight,
}: {
  hotspots: readonly TutorialHotspot[];
  activeHotspot: number | null;
  onHighlight: (id: number | null) => void;
}) {
  return (
    <ol className="capture-legend">
      {hotspots.map((hotspot) => (
        <li key={hotspot.id}>
          <button
            type="button"
            data-highlighted={activeHotspot === hotspot.id}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') onHighlight(hotspot.id);
            }}
            onPointerLeave={(event) => {
              if (
                event.pointerType === 'mouse' &&
                !event.currentTarget.matches(':focus-visible')
              ) {
                onHighlight(null);
              }
            }}
            onFocus={() => onHighlight(hotspot.id)}
            onBlur={() => onHighlight(null)}
            onClick={() => onHighlight(hotspot.id)}
          >
            <b>{hotspot.id}</b>
            <span className="capture-legend-copy">
              <strong>{hotspot.label}</strong>
              <span>{hotspot.description}</span>
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}

export function CaptureViewer({ capture }: { capture: TutorialCapture }) {
  const [expanded, setExpanded] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (expanded && !dialog.open) dialog.showModal();
    if (!expanded && dialog.open) dialog.close();
  }, [expanded]);

  const handleDialogClose = () => {
    setExpanded(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <figure className="portal-screen">
      <figcaption>
        <h3>{capture.title}</h3>
        <p>{capture.description}</p>
      </figcaption>
      <CaptureImage capture={capture} activeHotspot={activeHotspot} />
      <button
        ref={triggerRef}
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
        onClose={handleDialogClose}
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
          <div className="capture-stage">
            <CaptureImage
              capture={capture}
              expanded
              activeHotspot={activeHotspot}
            />
          </div>
        </div>
        <CaptureLegend
          hotspots={capture.hotspots}
          activeHotspot={activeHotspot}
          onHighlight={setActiveHotspot}
        />
      </dialog>
      <CaptureLegend
        hotspots={capture.hotspots}
        activeHotspot={activeHotspot}
        onHighlight={setActiveHotspot}
      />
    </figure>
  );
}
