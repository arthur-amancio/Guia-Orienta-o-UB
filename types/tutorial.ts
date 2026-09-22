export const EVIDENCE_KINDS = ['observed', 'guidance'] as const;

export type EvidenceKind = (typeof EVIDENCE_KINDS)[number];

export type PortalCaptureSource =
  | '/portal/inicio.png'
  | '/portal/urgencia-completa.png'
  | '/portal/categoria-selecao.png'
  | '/portal/descricao-anexos.png'
  | '/portal/chamados.png';

export type TutorialHotspot = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  description: string;
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

export type TutorialChecklist = {
  title: string;
  items: readonly string[];
  evidence: EvidenceKind;
};

export type TutorialStep = {
  id: string;
  shortTitle: string;
  title: string;
  description: string;
  captures: readonly TutorialCapture[];
  checklist?: TutorialChecklist;
  notes?: readonly TutorialNote[];
};
