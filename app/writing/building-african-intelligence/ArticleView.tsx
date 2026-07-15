'use client';

import { useEffect, useRef, useState, Fragment } from 'react';
import { article } from './article-data';

type NoteSeg = { t: string; u?: string };

function Note({ n }: { n: number }) {
  const segs = (article.notes as Record<string, readonly NoteSeg[]>)[String(n)] || [];
  return (
    <span className="sidenote">
      <span className="sidenote-num">{n}.</span>{' '}
      {segs.map((s, i) => (
        <Fragment key={i}>
          {s.u ? (
            <a href={s.u} target="_blank" rel="noopener noreferrer">
              {s.t}
            </a>
          ) : (
            s.t
          )}{' '}
        </Fragment>
      ))}
    </span>
  );
}

function Linkified({ text }: { text: string }) {
  const segs = text.split(/(Lattanye)/g);
  return (
    <Fragment>
      {segs.map((seg, i) =>
        seg === 'Lattanye' ? (
          <a
            key={i}
            className="brand-link"
            href="https://www.lattanye.group/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lattanye
          </a>
        ) : (
          <Fragment key={i}>{seg}</Fragment>
        )
      )}
    </Fragment>
  );
}

function Para({ text }: { text: string }) {
  const parts = text.split(/(\{\{\d+\}\})/g);
  return (
    <p>
      {parts.map((part, i) => {
        const m = part.match(/^\{\{(\d+)\}\}$/);
        if (m) {
          const n = parseInt(m[1], 10);
          return (
            <Fragment key={i}>
              <sup className="cite">{n}</sup>
              <Note n={n} />
            </Fragment>
          );
        }
        return <Linkified key={i} text={part} />;
      })}
    </p>
  );
}

export default function ArticleView() {
  const [active, setActive] = useState<string>('intro');
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = rootRef.current?.querySelectorAll('[data-section]');
    if (!sections || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.getAttribute('data-section') || 'intro');
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const tocItems = article.sections.filter((s) => s.label);

  return (
    <div className="article-page" ref={rootRef}>
      <nav className="article-toc" aria-label="Sections">
        <a
          href="#top"
          className={active === 'intro' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          African intelligence
        </a>
        {tocItems.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={active === s.id ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {(s as { title?: string }).title ?? s.label}
          </a>
        ))}
      </nav>

      <article className="article-body" id="top">
        <div className="backlink">
          <a href="/">home</a>
        </div>

        <header className="article-header">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <span>2026</span>
            <span className="dot">·</span>
            <span>16 min</span>
          </div>
        </header>

        {article.sections.map((s) => (
          <section key={s.id} id={s.id} data-section={s.id}>
            {s.label ? (
              <h2 className="section-numeral">
                {s.label}
                <span className="section-title-mobile">
                  {' '}
                  {(s as { title?: string }).title ?? ''}
                </span>
              </h2>
            ) : null}
            {s.paras.map((p, i) => (
              <Para key={i} text={p} />
            ))}
          </section>
        ))}

        <footer className="article-byline">
          <div className="byline-name">{article.byline[0]}</div>
          <div className="byline-role"><Linkified text={article.byline[1]} /></div>
        </footer>
      </article>
    </div>
  );
}
