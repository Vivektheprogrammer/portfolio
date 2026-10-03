import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { FileText, Download, ExternalLink, CheckCircle2, Briefcase } from 'lucide-react';

export const ResumeSection: React.FC = () => {
  const resume = PORTFOLIO_DATA.resumes[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <FileText size={16} color="#38bdf8" />
          <span className="font-mono" style={{ fontSize: '0.7rem', color: '#38bdf8', letterSpacing: '0.12em' }}>
            HOUR 05 • VERIFIED DOCUMENTATION
          </span>
        </div>
        <h2 className="font-serif" style={{ fontSize: '1.45rem', fontWeight: 700, color: '#f8fafc' }}>
          Curriculum Vitae & Resume
        </h2>
        <p className="font-tech" style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
          Documentation of my engineering experience, technical background, and work.
        </p>
      </div>

      {/* Resume Card */}
      <div className="glass-panel" style={{ padding: '1.15rem 1.25rem', borderRadius: '10px' }}>
        {/* Card Header & Direct Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.85rem', borderBottom: '1px solid rgba(56, 189, 248, 0.15)', paddingBottom: '0.95rem', marginBottom: '1rem' }}>
          <div style={{ maxWidth: '640px' }}>
            <h3 className="font-tech" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
              {resume.title}
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '0.25rem', lineHeight: 1.5 }}>
              {resume.description}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <a
              href={resume.path}
              target="_blank"
              rel="noopener noreferrer"
              className="steel-button"
              style={{ fontSize: '0.82rem', padding: '0.6rem 1.15rem' }}
            >
              <ExternalLink size={15} />
              Open PDF
            </a>
            <a
              href={resume.path}
              download={resume.filename}
              className="steel-button active"
              style={{ fontSize: '0.82rem', padding: '0.6rem 1.15rem' }}
            >
              <Download size={15} />
              Download PDF
            </a>
          </div>
        </div>

        {/* Key Qualifications Breakdown */}
        <div style={{ marginBottom: '1.35rem' }}>
          <h4 className="font-mono" style={{ fontSize: '0.78rem', color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
            KEY QUALIFICATIONS
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0 }}>
            {resume.highlights.map((hl, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.45 }}>
                <CheckCircle2 size={16} color="#38bdf8" style={{ flexShrink: 0 }} />
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Selected Work Section */}
        {resume.selectedWork && (
          <div style={{ paddingTop: '1.1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
              <span className="font-mono" style={{ color: '#94a3b8', fontSize: '0.76rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                SELECTED WORK:
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                {resume.selectedWork.map((work, idx) => (
                  <React.Fragment key={work}>
                    <span style={{ color: '#38bdf8', fontWeight: 600 }}>
                      {work}
                    </span>
                    {idx < resume.selectedWork!.length - 1 && (
                      <span style={{ color: '#64748b' }}>•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
