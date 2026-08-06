const features = [
  {
    number: "01",
    title: "Estructura clara",
    description:
      "Una base ordenada con secciones esenciales para empezar a construir sin fricción.",
  },
  {
    number: "02",
    title: "Diseño adaptable",
    description:
      "Componentes que se sienten naturales en escritorio, tablet y móvil desde el primer día.",
  },
  {
    number: "03",
    title: "Listo para crecer",
    description:
      "Código simple y flexible para sumar páginas, contenido e integraciones cuando las necesites.",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="Navegación principal">
        <a className="brand" href="#inicio" aria-label="Base, ir al inicio">
          <span className="brand-mark" aria-hidden="true" />
          Base
        </a>
        <div className="nav-links">
          <a href="#estructura">Estructura</a>
          <a href="#proyecto">Proyecto</a>
        </div>
        <a className="button button-small" href="#empezar">
          Empezar
        </a>
      </nav>

      <section className="hero" id="inicio">
        <div className="eyebrow">
          <span aria-hidden="true" /> Proyecto inicial
        </div>
        <h1>Una buena idea merece una base sólida.</h1>
        <p className="hero-copy">
          Un esqueleto web limpio y funcional para convertir tu próxima idea en
          un producto real.
        </p>
        <div className="hero-actions">
          <a className="button" href="#estructura">
            Explorar la base <span aria-hidden="true">↗</span>
          </a>
          <a className="text-link" href="#proyecto">
            Ver la estructura <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-panel" aria-label="Vista previa de la estructura">
          <div className="panel-top">
            <span />
            <span />
            <span />
            <p>tu-proyecto.dev</p>
          </div>
          <div className="panel-body">
            <div className="panel-sidebar">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="panel-content">
              <span className="line line-label" />
              <span className="line line-title" />
              <span className="line line-title short" />
              <div className="panel-cards">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="estructura">
        <div className="section-heading">
          <p>Todo lo esencial</p>
          <h2>Un punto de partida, no una limitación.</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature" key={feature.number}>
              <span className="feature-number">{feature.number}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="statement" id="proyecto">
        <p className="statement-label">Construido para evolucionar</p>
        <p className="statement-copy">
          Cambia los textos, conecta tus datos y convierte esta estructura en
          algo completamente tuyo.
        </p>
        <div className="tech-row" aria-label="Tecnologías incluidas">
          <span>Next.js</span>
          <span>TypeScript</span>
          <span>Responsive</span>
          <span>Accesible</span>
        </div>
      </section>

      <section className="cta" id="empezar">
        <div>
          <p>¿Tienes una idea?</p>
          <h2>Empieza a construir.</h2>
        </div>
        <a className="button button-light" href="mailto:hola@tu-proyecto.dev">
          Hablemos <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer>
        <a className="brand" href="#inicio">
          <span className="brand-mark" aria-hidden="true" />
          Base
        </a>
        <p>Esqueleto Next.js · {new Date().getFullYear()}</p>
      </footer>
    </main>
  );
}
