import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Wrench, CheckCircle, Star, Sparkles, Filter } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { skillGroups } = PORTFOLIO_DATA;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...skillGroups.map((g) => g.title)];

  const displayedGroups = activeCategory === 'All'
    ? skillGroups
    : skillGroups.filter((g) => g.title === activeCategory);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <Wrench size={16} color="#38bdf8" />
          <span className="font-mono" style={{ fontSize: '0.7rem', color: '#38bdf8', letterSpacing: '0.12em' }}>
            HOUR 04 • TECHNICAL REPERTOIRE
          </span>
        </div>
        <h2 className="font-serif" style={{ fontSize: '1.45rem', fontWeight: 700, color: '#f8fafc' }}>
          Unified Technical Skills
        </h2>
        <p className="font-tech" style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
          Verified competencies across backend microservices, AWS cloud infrastructure, databases, and mobile architecture.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`steel-button ${activeCategory === cat ? 'active' : ''}`}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.74rem',
              borderRadius: '6px',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skill Groups Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {displayedGroups.map((group, idx) => (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '1.25rem',
              borderRadius: '10px',
              borderTop: '2px solid rgba(56, 189, 248, 0.4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
              <h3 className="font-tech" style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f8fafc' }}>
                {group.title}
              </h3>
              <span style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
                {group.description}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.65rem' }}>
              {group.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="glass-panel"
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    background: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.3rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#f8fafc', letterSpacing: '0.02em' }}>
                      {skill.name}
                    </span>
                  </div>
                  {skill.description && (
                    <p style={{ fontSize: '0.76rem', color: '#94a3b8', lineHeight: 1.45 }}>
                      {skill.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
