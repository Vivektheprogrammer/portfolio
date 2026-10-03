import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Feather, ExternalLink, RotateCw, Sparkles, BookOpen } from 'lucide-react';
import { horologyAudio } from '../../audio/soundEffects';

interface PoetByteSectionProps {
  onFlipToCaseback: () => void;
  isCasebackView: boolean;
}

export const PoetByteSection: React.FC<PoetByteSectionProps> = ({
  onFlipToCaseback,
  isCasebackView,
}) => {
  const { poetbyteSection } = PORTFOLIO_DATA;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Feather size={18} color="#38bdf8" />
          <span className="font-mono" style={{ fontSize: '0.78rem', color: '#38bdf8', letterSpacing: '0.12em' }}>
            HOUR 06 • THE LITERARY DIMENSION
          </span>
        </div>
        <h2 className="font-serif" style={{ fontSize: '2.2rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '0.04em' }}>
          {poetbyteSection.title}
        </h2>
        <p className="font-tech" style={{ fontSize: '1.05rem', color: '#7dd3fc', fontStyle: 'italic' }}>
          {poetbyteSection.tagline}
        </p>
      </div>

      {/* Literary Card */}
      <div
        className="glass-panel"
        style={{
          padding: '2rem',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(14, 38, 70, 0.75) 0%, rgba(8, 16, 30, 0.9) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 20px 40px -15px rgba(2, 132, 199, 0.25)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', zIndex: 1 }}>
          <blockquote style={{ fontSize: '1.15rem', color: '#e0f2fe', fontStyle: 'italic', fontFamily: 'Cinzel, serif', borderLeft: '3px solid #38bdf8', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
            {poetbyteSection.quote}
          </blockquote>

          <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.7 }}>
            {poetbyteSection.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginTop: '0.5rem' }}>
            <div className="glass-panel" style={{ padding: '0.85rem', borderRadius: '8px', background: 'rgba(5, 10, 20, 0.6)' }}>
              <span className="font-mono" style={{ fontSize: '0.7rem', color: '#38bdf8', textTransform: 'uppercase' }}>
                FRONT OF TIMEPIECE
              </span>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', marginTop: '0.2rem' }}>
                {poetbyteSection.frontConcept}
              </p>
            </div>
            <div className="glass-panel" style={{ padding: '0.85rem', borderRadius: '8px', background: 'rgba(5, 10, 20, 0.6)' }}>
              <span className="font-mono" style={{ fontSize: '0.7rem', color: '#7dd3fc', textTransform: 'uppercase' }}>
                EXHIBITION CASEBACK
              </span>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', marginTop: '0.2rem' }}>
                {poetbyteSection.backConcept}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <a
              href={poetbyteSection.url}
              target="_blank"
              rel="noopener noreferrer"
              className="steel-button"
              style={{
                fontSize: '0.85rem',
                padding: '0.7rem 1.4rem',
                background: 'linear-gradient(180deg, #0284c7 0%, #0369a1 100%)',
                borderColor: '#38bdf8',
                color: '#ffffff',
                boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)',
              }}
            >
              <BookOpen size={16} />
              ENTER POETBYTE
              <ExternalLink size={14} />
            </a>

            <button
              onClick={() => {
                horologyAudio.playFlip();
                onFlipToCaseback();
              }}
              className="steel-button"
              style={{ fontSize: '0.82rem', padding: '0.7rem 1.1rem' }}
            >
              <RotateCw size={15} />
              {isCasebackView ? 'View Watch Dial' : 'Inspect Caseback'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
