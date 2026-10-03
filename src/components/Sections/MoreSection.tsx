import React from 'react';
import { BookOpen, FileText, ExternalLink, Calendar, Hash } from 'lucide-react';

const papers = [
  {
    id: 'paper-1',
    title: 'Smart Home Security Using Internet of Things, Deep Learning, and Blockchain Technology',
    authors: 'Vivek R, Varshini J, Shubhashree TK',
    journal: 'Tuijin Jishu / Journal of Propulsion Technology',
    identifiers: 'ISSN: 1001-4055 • Vol.44 No. 6 (2023)',
    date: 'September 2023',
    doi: null,
    pdf: '/02 Vivek Paper.pdf',
    accent: '#38bdf8',
  },
  {
    id: 'paper-2',
    title: 'The Efficiency of Ensemble Machine Learning Models on Network Intrusion Detection Using KDDCup 99 Dataset',
    authors: 'Nisha Varghese, Vivek R',
    journal: '2023 IEEE International Conference on Contemporary Computing and Communications (InC4)',
    identifiers: 'ISBN: 979-8-3503-3577-4',
    date: 'April 2023',
    doi: 'https://doi.org/10.1109/InC457730.2023.10263037',
    pdf: '/nisha-varghese-the-efficiency-of-ensemble-machine.pdf',
    accent: '#4ade80',
  },
];

export const MoreSection: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={18} color="#38bdf8" />
          <span className="font-mono" style={{ fontSize: '0.78rem', color: '#38bdf8', letterSpacing: '0.12em' }}>
            HOUR 08 • RESEARCH & PUBLICATIONS
          </span>
        </div>
        <h2 className="font-serif" style={{ fontSize: '2rem', fontWeight: 700, color: '#f8fafc' }}>
          Research Papers
        </h2>
        <p className="font-tech" style={{ fontSize: '0.95rem', color: '#94a3b8' }}>
          Peer-reviewed publications in IoT security, deep learning, and ensemble machine learning.
        </p>
      </div>

      {/* Papers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {papers.map((paper) => (
          <div
            key={paper.id}
            className="glass-panel"
            style={{
              padding: '1.4rem',
              borderRadius: '10px',
              borderLeft: `3px solid ${paper.accent}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.9rem',
            }}
          >
            {/* Title */}
            <h3
              className="font-serif"
              style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.45, margin: 0 }}
            >
              {paper.title}
            </h3>

            {/* Authors */}
            <p style={{ fontSize: '0.84rem', color: paper.accent, margin: 0, fontWeight: 600 }}>
              {paper.authors}
            </p>

            {/* Meta */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <BookOpen size={13} color="#64748b" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>{paper.journal}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Hash size={13} color="#64748b" />
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'monospace' }}>{paper.identifiers}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={13} color="#64748b" />
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{paper.date}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <a
                href={paper.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="steel-button active"
                style={{
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.78rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                }}
              >
                <FileText size={13} />
                View PDF
              </a>
              {paper.doi && (
                <a
                  href={paper.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="steel-button"
                  style={{
                    padding: '0.4rem 0.85rem',
                    fontSize: '0.78rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                  }}
                >
                  <ExternalLink size={13} />
                  IEEE DOI
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
