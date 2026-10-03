import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../../data/portfolioData';
import { FolderGit2, ExternalLink, CheckCircle2, Cpu, Globe, Server, Layers } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id);

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <FolderGit2 size={16} color="#38bdf8" />
          <span className="font-mono" style={{ fontSize: '0.7rem', color: '#38bdf8', letterSpacing: '0.12em' }}>
            HOUR 03 • SYSTEMS & APPLICATIONS
          </span>
        </div>
        <h2 className="font-serif" style={{ fontSize: '1.45rem', fontWeight: 700, color: '#f8fafc' }}>
          Engineered Projects
        </h2>
        <p className="font-tech" style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
          Full-stack platforms, geospatial analytics engines, and high-performance backends.
        </p>
      </div>

      {/* Project Card Switcher */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
        {projects.map((proj) => {
          const isSelected = proj.id === selectedProjectId;
          return (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`steel-button ${isSelected ? 'active' : ''}`}
              style={{
                width: '100%',
                minHeight: '78px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '0.85rem 1.15rem',
                gap: '0.35rem',
                borderRadius: '8px',
                textAlign: 'left',
                textTransform: 'none',
                letterSpacing: 'normal',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: isSelected ? '#38bdf8' : '#f8fafc', letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {proj.title}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.65rem',
                    color: isSelected ? '#38bdf8' : '#94a3b8',
                    background: isSelected ? 'rgba(56, 189, 248, 0.18)' : 'rgba(148, 163, 184, 0.12)',
                    border: isSelected ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(148, 163, 184, 0.2)',
                    padding: '0.12rem 0.45rem',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {proj.category}
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.78rem',
                  color: '#94a3b8',
                  width: '100%',
                  lineHeight: '1.3',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textAlign: 'left',
                  fontWeight: 500,
                }}
              >
                {proj.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Project Comprehensive Dossier */}
      <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '10px' }}>
        {/* Project Header Title & Live Links */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', borderBottom: '1px solid rgba(56, 189, 248, 0.15)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span className="font-mono" style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                {activeProject.category}
              </span>
              {activeProject.liveUrl && (
                <span className="font-mono" style={{ fontSize: '0.72rem', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                  LIVE IN PRODUCTION
                </span>
              )}
            </div>
            <h3 className="font-tech" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc' }}>
              {activeProject.title}
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#7dd3fc', marginTop: '0.15rem' }}>
              {activeProject.subtitle}
            </p>
          </div>

          {activeProject.liveUrl && (
            <a
              href={activeProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="steel-button"
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.78rem', background: 'rgba(14, 165, 233, 0.25)', borderColor: '#38bdf8' }}
            >
              <Globe size={14} />
              Open Live Site
              <ExternalLink size={12} />
            </a>
          )}
        </div>

        {/* Project Description */}
        <p style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.65, marginBottom: '1.25rem' }}>
          {activeProject.description}
        </p>

        {/* Key Architectural & Technical Highlights */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 className="font-mono" style={{ fontSize: '0.76rem', color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
            TECHNICAL CONTRIBUTIONS & ENGINEERING SPECIFICATIONS
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0 }}>
            {activeProject.keyHighlights.map((hl, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                <CheckCircle2 size={15} color="#38bdf8" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Architecture Components */}
        {activeProject.architecture && activeProject.architecture.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 className="font-mono" style={{ fontSize: '0.76rem', color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
              SYSTEM TOPOLOGY & PIPELINES
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
              {activeProject.architecture.map((arch, i) => (
                <div
                  key={i}
                  className="glass-panel"
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    color: '#94a3b8',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(8, 14, 24, 0.7)',
                  }}
                >
                  <Cpu size={13} color="#38bdf8" />
                  <span>{arch}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stack Tags */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
            <Layers size={14} color="#38bdf8" />
            <h4 className="font-mono" style={{ fontSize: '0.76rem', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              TECHNOLOGY STACK
            </h4>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {activeProject.tags.map((tag, i) => (
              <span
                key={i}
                className="glass-pill font-mono"
                style={{
                  fontSize: '0.74rem',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '6px',
                  color: '#e2e8f0',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
