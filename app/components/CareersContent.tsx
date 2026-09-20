'use client';

import { useRef } from 'react';
import SubNav from './SubNav';
import Footer from './Footer';
import { useSubpageScrollNav } from '../hooks/useScrollNav';
import { useReveal } from '../hooks/useReveal';
import { useParallax } from '../hooks/useParallax';
import { useStatementHighlight } from '../hooks/useStatementHighlight';
import { useCopyTemplate } from '../hooks/useCopyTemplate';

const ROLES = [
  {
    subject: 'Frontend%20Engineer',
    cat: 'Engineering',
    title: 'Frontend Engineer',
    desc: 'We’re looking for someone who genuinely cares about great products. Someone who notices the little details, values clean design, and enjoys turning ideas into experiences people love using. You’ll work closely with us from the start and have a real say in how Raasta looks, feels, and evolves.',
    skills: 'React · Next.js · TypeScript · Tailwind CSS · UI/UX · Figma',
  },
  {
    subject: 'Backend%20Engineer',
    cat: 'Engineering',
    title: 'Backend Engineer',
    desc: 'Build the systems that power Raasta behind the scenes. You’ll work on APIs, databases, search, integrations, scalability, and the infrastructure needed to support a growing travel platform.',
    skills: 'Node.js · PostgreSQL · Python · Supabase · REST APIs · Cloud Infrastructure',
  },
  {
    subject: 'Full%20Stack%20Engineer',
    cat: 'Engineering',
    title: 'Full Stack Engineer',
    desc: 'Own features end-to-end and help turn ideas into products people use. You’ll work across frontend, backend, product, and infrastructure while helping define technical direction from day one.',
    skills: 'React · Next.js · TypeScript · Node.js · PostgreSQL · Supabase',
  },
  {
    subject: 'SEO%20%26%20Content%20Creator',
    cat: 'Marketing & Content',
    title: 'SEO & Content Creator',
    desc: 'Help travellers discover Raasta through search and great content. You’ll create destination guides, travel stories, and SEO-driven content that helps people uncover incredible places across India.',
    skills: 'SEO · Content Writing · Keyword Research · Google Search Console · Analytics Tools',
  },
  {
    subject: 'Social%20Media%20%26%20Community%20Intern',
    cat: 'Internship',
    title: 'Social Media & Community Intern',
    desc: 'Help us build a community of curious travellers. You’ll create content, engage with audiences, spot trends, and help tell the stories behind the places and experiences we feature.',
    skills: 'Instagram · X · LinkedIn · Content Creation · Community Building',
  },
  {
    subject: 'Marketing%20%26%20Growth%20Intern',
    cat: 'Internship',
    title: 'Marketing & Growth Intern',
    desc: 'Help us find creative ways to grow. You’ll work on campaigns, partnerships, user acquisition, growth experiments, and anything that helps more people discover Raasta.',
    skills: 'Growth Marketing · Analytics · Partnerships · Content Marketing · Social Media',
  },
  {
    subject: 'Travel%20Research%20Intern',
    cat: 'Internship',
    title: 'Travel Research Intern',
    desc: 'Research destinations, experiences, hidden gems, local stories, and travel trends across India. Your work will directly influence the recommendations and insights travellers see on Raasta.',
    skills: 'Strong Research Skills · Travel Enthusiasm · Content Discovery · Attention to Detail',
  },
];

export default function CareersContent() {
  const navRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useSubpageScrollNav(navRef, progressRef);
  useReveal();
  useParallax();
  useStatementHighlight();
  useCopyTemplate();

  return (
    <>
      <div className="statusbar-fill" aria-hidden="true"></div>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="progress" id="progress" aria-hidden="true" ref={progressRef}></div>

      <SubNav navRef={navRef} current="careers" />

      <main id="main">
        <header className="ph-hero">
          <div className="wrap">
            <span className="eyebrow ph-rise">Careers</span>
            <h1 className="ph-title ph-rise d1">Join us early</h1>
            <p className="ph-lead ph-rise d2">We’re looking for people who want ownership, impact, and the chance to help build something meaningful from day one.</p>
            <div className="note ph-rise d3" role="note">
              <p>
                Raasta is currently <b>pre-revenue and bootstrapped</b>. Most roles right now are <b>equity-based</b>, as we build the company and look for long-term partners, not just hires.
              </p>
            </div>
          </div>
        </header>

        <section className="section">
          <div className="wrap">
            <div className="ph-head reveal">
              <span className="eyebrow">Open roles</span>
              <h2 className="section-title left">Roles &amp; internships.</h2>
              <p className="sec-sub">Every role is remote, with a flexible commitment, an equity opportunity and a high degree of ownership.</p>
            </div>

            <div className="roles reveal">
              {ROLES.map((role) => (
                <a className="role" href={`mailto:hello@raasta.app?subject=Careers%20-%20${role.subject}`} key={role.title}>
                  <div className="role-main">
                    <div className="role-cat">{role.cat}</div>
                    <h3 className="role-title">{role.title}</h3>
                    <p className="role-desc">{role.desc}</p>
                    <p className="role-skills">
                      <span className="role-skills-label">Preferred</span> {role.skills}
                    </p>
                  </div>
                  <span className="role-apply">
                    Apply
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt" id="apply">
          <div className="wrap">
            <div className="cta-lg reveal">
              <span className="eyebrow">How to apply</span>
              <h2>We hire on proof of work, not CVs.</h2>
              <p>Fill in the template below and email it to us, with the role in your subject line.</p>
            </div>

            <div className="tpl reveal">
              <div className="tpl-bar">
                <span className="tpl-label">Quick application</span>
                <button className="tpl-copy" id="copyTemplate" type="button">
                  <svg className="tpl-copy-ic" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x={9} y={9} width={13} height={13} rx={2} />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span className="tpl-copy-text">Copy</span>
                </button>
              </div>
              <pre className="tpl-text" id="templateText">
                <b>Name:</b> [your name]
                {'\n\n'}
                <b>Role:</b> [the exact role you want]
                {'\n\n'}
                <b>About:</b> [who you are and what you’re working on now]
                {'\n\n'}
                <b>Why Raasta:</b> [what made you reach out]
                {'\n\n'}
                <b>Proof of work:</b>
                {'\n'}
                1. [link] - [what it is, in one line]
                {'\n'}
                2. [link] - [what it is, in one line]
                {'\n'}
                3. [link] - [optional]
                {'\n\n'}
                <b>Location:</b> [city, country]
              </pre>
            </div>

            <p className="tpl-note reveal">You don’t have to copy the template. Write to us however you like, just keep your mail short and quick. One or two projects is plenty, three is great but never required, and we read every one.</p>

            <div className="tpl-send reveal">
              <a className="cta-email" href="mailto:hello@raasta.app?subject=Careers%20-%20Role%20Name">
                <span>hello@raasta.app</span>
              </a>
              <p className="cta-fineprint">
                Subject: <code>Careers - Role Name</code>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer
        hand="build with us"
        headline={
          <>
            Help build the future
            <br />
            of travel in India.
          </>
        }
        ctaHref="#apply"
        ctaLabel="See how to apply"
        showCompanyCol
        current="careers"
        hashPrefix="/"
      />
    </>
  );
}
