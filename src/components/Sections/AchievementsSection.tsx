import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { GraduationCap, Award, Star, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AchievementsSection: React.FC = () => {
  const { achievements, educationList } = PORTFOLIO_DATA;

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#7dd3fc', '#ffffff', '#fbbf24'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <GraduationCap size={18} color="#38bdf8" />
          <span className="font-mono" style={{ fontSize: '0.78rem', color: '#38bdf8', letterSpacing: '0.12em' }}>
            HOUR 07 • ACADEMIC & LEADERSHIP
          </span>
        </div>
        <h2 className="font-serif" style={{ fontSize: '2rem', fontWeight: 700, color: '#f8fafc' }}>
          Education & Academic Honors
        </h2>
        <p className="font-tech" style={{ fontSize: '0.95rem', color: '#94a3b8' }}>
          Academic degrees, high distinction benchmarks, conference coordination, and technical committee leadership.
        </p>
      </div>

      {/* Degrees Showcase (MCA & BCA) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {educationList.map((edu) => (
          <div
            key={edu.id}
            className="glass-panel"
            style={{
              padding: '1.5rem',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(14, 38, 70, 0.65) 0%, rgba(8, 14, 24, 0.85) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.25rem',
            }}
          >
            <div style={{ maxWidth: '600px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                <GraduationCap size={18} color="#38bdf8" />
                <span className="font-mono" style={{ fontSize: '0.74rem', color: '#7dd3fc', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {edu.degree}
                </span>
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.35rem', color: '#f8fafc', fontWeight: 700 }}>
                {edu.institution}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '0.35rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                <span className="font-mono">{edu.period}</span>
                <span>•</span>
                <span>{edu.location}</span>
                {edu.status && (
                  <>
                    <span>•</span>
                    <span style={{ color: '#38bdf8', fontWeight: 500 }}>{edu.status}</span>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={triggerCelebration}
              className="steel-button active"
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Star size={16} color="#fbbf24" fill="#fbbf24" />
              <span className="font-mono" style={{ fontWeight: 800 }}>{edu.score}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Educational Leadership & Activities */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <h4 className="font-mono" style={{ fontSize: '0.78rem', color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
          EDUCATIONAL ACHIEVEMENTS & LEADERSHIP
        </h4>

        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="glass-panel"
            style={{
              padding: '1.25rem',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem',
            }}
          >
            {/* Top Row: Category Badge on left, Date on right */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.72rem',
                  color: '#38bdf8',
                  background: 'rgba(56, 189, 248, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  padding: '0.15rem 0.55rem',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {ach.category}
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.78rem',
                  color: '#94a3b8',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  textAlign: 'right',
                }}
              >
                {ach.period}
              </span>
            </div>

            {/* Title */}
            <h4 className="font-tech" style={{ fontSize: '1.08rem', color: '#f8fafc', fontWeight: 600, marginTop: '0.15rem', marginBottom: '0.1rem' }}>
              {ach.title}
            </h4>

            {/* Organization & Metric / Scope */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.82rem', marginBottom: '0.1rem' }}>
              <span className="font-tech" style={{ color: '#7dd3fc', fontWeight: 500 }}>{ach.organization}</span>
              {ach.metric && (
                <>
                  <span>•</span>
                  <span className="font-mono" style={{ color: '#38bdf8' }}>{ach.metric}</span>
                </>
              )}
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
              {ach.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
