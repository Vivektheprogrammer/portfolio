import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Compass, Sparkles, Cpu, Heart, Watch } from 'lucide-react';

interface HomeSectionProps {
  onSelectHour: (hour: number) => void;
  onSelectMinute: (minute: number) => void;
  onFlipToCaseback: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onSelectHour,
  onSelectMinute,
  onFlipToCaseback,
}) => {
  const { achievements, about } = PORTFOLIO_DATA;

  const personalPassions = [
    {
      title: 'A Love for Watches (Analog, Automatic & Digital)',
      desc: "I love watches—analog, automatic, and classic digital timepieces (never smartwatches). The way dedicated movements, balance wheels, and precision oscillators function with pure, timeless reliability inspires how I build software: modular, decoupled, and crafted to run flawlessly.",
      icon: <Watch size={16} color="#38bdf8" />,
    },
    {
      title: 'Code = Poetry (Built with Love)',
      desc: "Code = Poetry represents the things I create with genuine love and intention. Where code works as the soul for the system, poetry gives voice to our own soul.",
      icon: <Heart size={16} color="#38bdf8" />,
    },
    {
      title: 'Curiosity Under the Hood',
      desc: "I don't just use tools, I love understanding the machinery beneath them. Whether it's concurrency models, database indexing, or cloud VPC networking, the 'why' matters as much as the 'how'.",
      icon: <Cpu size={16} color="#38bdf8" />,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Position 12 Index Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#38bdf8',
          boxShadow: '0 0 10px #38bdf8',
        }} />
        <span className="font-mono" style={{ fontSize: '0.75rem', color: '#38bdf8', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          POSITION 12:00 • A PERSONAL NOTE
        </span>
      </div>

      {/* Warm Personal Introduction */}
      <div>
        <h1 className="font-serif" style={{ fontSize: '1.45rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.04em', lineHeight: 1.2 }}>
          Hello, I'm Vivek.
        </h1>
        <p className="font-tech" style={{ fontSize: '0.86rem', color: '#7dd3fc', marginTop: '0.25rem', letterSpacing: '0.03em' }}>
          Software Development Engineer • Crafting Systems with Heart
        </p>
        <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '0.75rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <p>
            Welcome to my space. I’m a software engineer who loves architecting backend systems, cloud services, and interactive software. But more than just writing code, I love the feeling of turning complex, abstract challenges into simple, elegant systems that just work.
          </p>
          <div
            style={{
              padding: '0.85rem 1.1rem',
              borderRadius: '8px',
              background: 'rgba(56, 189, 248, 0.07)',
              borderLeft: '3px solid #38bdf8',
              fontStyle: 'italic',
              color: '#e0f2fe',
              fontSize: '0.95rem',
            }}
          >
            "Where code works for the system's soul, and poetry for our own."
          </div>
          <p style={{ color: '#94a3b8' }}>
            I built this entire website around an interactive 3D timepiece because good engineering shares the spirit of authentic horology—whether analog, automatic, or digital: dedicated purpose, quiet reliability, and a deep respect for craft.
          </p>
        </div>
      </div>

      {/* What Drives Me */}
      <div>
        <span className="font-mono" style={{ fontSize: '0.72rem', color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
          WHAT I BELIEVE IN
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {personalPassions.map((passion, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '1.1rem 1.25rem',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.9rem',
                background: 'rgba(8, 15, 27, 0.7)',
                border: '1px solid rgba(56, 189, 248, 0.15)',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: 'rgba(56, 189, 248, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '0.1rem',
                }}
              >
                {passion.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                  {passion.title}
                </h4>
                <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.55, marginTop: '0.35rem' }}>
                  {passion.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Invitation */}
      <div
        className="glass-panel"
        style={{
          padding: '1rem 1.25rem',
          borderRadius: '10px',
          background: 'rgba(6, 12, 22, 0.85)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <Compass size={20} color="#38bdf8" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.5 }}>
          Take your time and explore the watch—click on any <strong style={{ color: '#38bdf8' }}>hour marker</strong> on the dial to see projects, experience, writing, and skills.
        </span>
      </div>
    </div>
  );
};

