export const EVIDENCE_KINDS = ['observed', 'guidance'] as const;

export type EvidenceKind = (typeof EVIDENCE_KINDS)[number];

export type PortalCaptureSource =
  | '/portal/inicio.png'
  | '/portal/campos.png'
  | '/portal/urgencia.png'
  | '/portal/categoria.png'
  | '/portal/descricao-anexos.png'
  | '/portal/chamados.png'
  | '/portal/faq.png'
  | '/portal/reservas.png';

export type TutorialHotspot = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  legend: string;
  evidence: EvidenceKind;
};

export type TutorialCapture = {
  id: string;
  title: string;
  description: string;
  src: PortalCaptureSource;
  width: number;
  height: number;
  hotspots: readonly TutorialHotspot[];
};

export type TutorialNote = {
  id: string;
  text: string;
  evidence: EvidenceKind;
};

export type TutorialStep = {
  id: string;
  shortTitle: string;
  title: string;
  description: string;
  captures: readonly TutorialCapture[];
  notes?: readonly TutorialNote[];
};
