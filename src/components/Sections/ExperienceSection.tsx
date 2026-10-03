import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { experiences } = PORTFOLIO_DATA;
  const [selectedExpId, setSelectedExpId] = useState<string>(experiences[0].id);

  const activeExp = experiences.find((e) => e.id === selectedExpId) || experiences[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <Briefcase size={16} color="#38bdf8" />
          <span className="font-mono" style={{ fontSize: '0.7rem', color: '#38bdf8', letterSpacing: '0.12em' }}>
            HOUR 02 • PRODUCTION TIMELINE
          </span>
        </div>
        <h2 className="font-serif" style={{ fontSize: '1.45rem', fontWeight: 700, color: '#f8fafc' }}>
          Professional Experience
        </h2>
        <p className="font-tech" style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
          Engineering production backends, cloud deployments, and mobile architectures at SlickMachine.
        </p>
      </div>

      {/* Role Selector Tabs / Timeline Step */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
        {experiences.map((exp) => {
          const isCurrent = exp.id === selectedExpId;
          const badgeText = exp.isCurrent ? 'PRESENT' : 'INTERNSHIP';
          return (
            <button
              key={exp.id}
              onClick={() => setSelectedExpId(exp.id)}
              className={`steel-button ${isCurrent ? 'active' : ''}`}
              style={{
                width: '100%',
                minHeight: '78px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                textAlign: 'left',
                padding: '0.85rem 1.15rem',
                gap: '0.35rem',
                borderRadius: '8px',
                textTransform: 'none',
                letterSpacing: 'normal',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: isCurrent ? '#38bdf8' : '#f8fafc', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {exp.company}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.68rem',
                    background: exp.isCurrent ? 'rgba(56, 189, 248, 0.2)' : 'rgba(148, 163, 184, 0.15)',
                    color: exp.isCurrent ? '#38bdf8' : '#94a3b8',
                    border: exp.isCurrent ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(148, 163, 184, 0.25)',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {badgeText}
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', textAlign: 'left', width: '100%', lineHeight: '1.35', fontWeight: 500 }}>
                {exp.role}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Role Card Details */}
      <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '10px' }}>
        {/* Role Header Banner */}
        <div style={{ borderBottom: '1px solid rgba(56, 189, 248, 0.15)', paddingBottom: '1.1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 className="font-tech" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc' }}>
                  {activeExp.role}
                </h3>
                <p style={{ fontSize: '0.98rem', color: '#38bdf8', fontWeight: 600, marginTop: '0.2rem' }}>
                  {activeExp.company}
                </p>
              </div>

              {/* Status Pill Badge */}
              <span
                className="font-mono"
                style={{
                  fontSize: '0.72rem',
                  background: activeExp.isCurrent ? 'rgba(56, 189, 248, 0.18)' : 'rgba(148, 163, 184, 0.12)',
                  color: activeExp.isCurrent ? '#38bdf8' : '#cbd5e1',
                  border: activeExp.isCurrent ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid rgba(148, 163, 184, 0.25)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {activeExp.isCurrent ? 'FULL-TIME • PRESENT' : 'INTERNSHIP'}
              </span>
            </div>

            {/* Consistent Left-Aligned Date & Location Meta Row */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', color: '#cbd5e1', fontSize: '0.82rem', marginTop: '0.1rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                <Calendar size={14} color="#38bdf8" />
                <span className="font-mono">{activeExp.period}</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#94a3b8' }}>
                <MapPin size={14} color="#38bdf8" />
                <span>{activeExp.location}</span>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '0.95rem', lineHeight: 1.6 }}>
            {activeExp.summary}
          </p>
        </div>

        {/* Responsibilities & Achievements */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 className="font-mono" style={{ fontSize: '0.78rem', color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
            KEY PRODUCTION DELIVERABLES & TECHNICAL CONTRIBUTIONS
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
            {activeExp.responsibilities.map((resp, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.55 }}>
                <span style={{ marginTop: '0.25rem', color: '#38bdf8', flexShrink: 0 }}>
                  <CheckCircle2 size={15} />
                </span>
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Employed */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
            <Layers size={14} color="#38bdf8" />
            <h4 className="font-mono" style={{ fontSize: '0.76rem', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              TECHNOLOGIES & TOOLS UTILIZED
            </h4>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {activeExp.technologies.map((tech, i) => (
              <span
                key={i}
                className="glass-pill"
                style={{
                  fontSize: '0.74rem',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '6px',
                  color: '#e2e8f0',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
