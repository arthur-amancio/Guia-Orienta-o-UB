import Image from 'next/image';
import { ArrowRight, BookOpen, CalendarDays, ExternalLink } from 'lucide-react';
import { SupportTutorial } from '@/components/tutorial/support-tutorial';

const SUPPORT_PORTAL_URL = 'https://suporte.ub.edu.br/Helpdesk';

const secondaryResources = [
  {
    title: 'FAQ',
    description: 'Consulte artigos e orientações disponíveis no portal.',
    icon: BookOpen,
  },
  {
    title: 'Reservas',
    description:
      'Consulte itens e disponibilidade conforme sua unidade e seu acesso.',
    icon: CalendarDays,
  },
] as const;

export default function Home() {
  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <a
            className="brand"
            href="#inicio"
            aria-label="Guia do Portal de Suporte — início"
          >
            <Image
              src="/ub-logo.png"
              alt="Universidade Brasil"
              width={48}
              height={48}
              priority
            />
            <span>
              <strong>Guia do Portal de Suporte</strong>
              <small>Universidade Brasil</small>
            </span>
          </a>
          <nav aria-label="Ação principal">
            <a
              className="support-link"
              href={SUPPORT_PORTAL_URL}
              target="_blank"
              rel="noreferrer"
            >
              Abrir o Suporte <ArrowRight size={17} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>

      <main id="inicio">
        <SupportTutorial />

        <section
          className="portal-resources"
          aria-labelledby="portal-resources-title"
        >
          <div className="resources-heading">
            <p className="eyebrow">Recursos secundários</p>
            <h2 id="portal-resources-title">Outros recursos do portal</h2>
            <p>
              Acesse esses recursos pelo Portal de Suporte conforme sua
              necessidade e permissão.
            </p>
          </div>

          <div className="resource-grid">
            {secondaryResources.map(({ title, description, icon: Icon }) => (
              <article className="resource-card" key={title}>
                <Icon size={24} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <a
                  href={SUPPORT_PORTAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Acessar ${title} pelo Portal de Suporte`}
                >
                  Acessar pelo portal
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <Image
            src="/ub-logo-white.png"
            alt="Universidade Brasil"
            width={54}
            height={54}
          />
          <div>
            <strong>Guia do Portal de Suporte</strong>
            <span>Orientação institucional para colaboradores.</span>
          </div>
          <a href={SUPPORT_PORTAL_URL} target="_blank" rel="noreferrer">
            suporte.ub.edu.br <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </footer>
    </>
  );
}
