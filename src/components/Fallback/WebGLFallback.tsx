import React, { useState, useEffect } from 'react';
import { HOUR_SECTIONS, BEZEL_MARKERS, PORTFOLIO_DATA } from '../../data/portfolioData';
import { Clock, RotateCw, ShieldCheck } from 'lucide-react';
import { horologyAudio } from '../../audio/soundEffects';

interface WebGLFallbackProps {
  selectedHour: number;
  onSelectHour: (hour: number) => void;
  selectedMinute: number | null;
  onSelectMinute: (minute: number) => void;
  isCasebackView: boolean;
  onFlipToCaseback: () => void;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({
  selectedHour,
  onSelectHour,
  selectedMinute,
  onSelectMinute,
  isCasebackView,
  onFlipToCaseback,
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const secAngle = (time.getSeconds() / 60) * 360;
  const minAngle = (time.getMinutes() / 60) * 360 + (secAngle / 60);
  const hourAngle = ((time.getHours() % 12) / 12) * 360 + (minAngle / 12);

  // In nav mode, hour angle points to selected hour
  const navHourAngle = (selectedHour / 12) * 360;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: 'clamp(320px, 45vmin, 520px)',
          height: 'clamp(320px, 45vmin, 520px)',
          borderRadius: '50%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 30px 70px rgba(0, 0, 0, 0.9), inset 0 0 30px rgba(56, 189, 248, 0.25)',
          border: '8px solid #cbd5e1',
          background: isCasebackView
            ? 'radial-gradient(circle, #0f172a 0%, #05080e 100%)'
            : 'radial-gradient(circle at 50% 50%, #38bdf8 0%, #0369a1 50%, #0c192d 100%)',
        }}
      >
        {!isCasebackView ? (
          <>
            {/* Horizontal dial lines */}
            <svg
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
              viewBox="0 0 500 500"
            >
              {Array.from({ length: 32 }).map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1={75 + i * 11}
                  x2="450"
                  y2={75 + i * 11}
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1.5"
                />
              ))}

              {/* 12 Hour Markers */}
              {Array.from({ length: 12 }).map((_, idx) => {
                const h = idx + 1;
                const angle = (h / 12) * Math.PI * 2 - Math.PI / 2;
                const r = 180;
                const cx = 250 + Math.cos(angle) * r;
                const cy = 250 + Math.sin(angle) * r;
                const isSel = selectedHour === h;

                return (
                  <g key={h} onClick={() => onSelectHour(h)} style={{ cursor: 'pointer' }}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSel ? 18 : 14}
                      fill={isSel ? '#38bdf8' : '#0b192e'}
                      stroke="#f8fafc"
                      strokeWidth={isSel ? 3 : 2}
                    />
                    <text
                      x={cx}
                      y={cy + 5}
                      textAnchor="middle"
                      fill={isSel ? '#05080e' : '#f8fafc'}
                      fontSize="14"
                      fontWeight="bold"
                      fontFamily="Outfit, sans-serif"
                    >
                      {h}
                    </text>
                  </g>
                );
              })}

              {/* Brand Text: VIVEK R & Code = Poetry */}
              <text x="250" y="165" textAnchor="middle" fill="#000000" fontSize="22" fontWeight="900" letterSpacing="4" fontFamily="Cinzel, serif">
                VIVEK R
              </text>
              <text x="250" y="358" textAnchor="middle" fill="#000000" fontSize="18" fontWeight="bold" letterSpacing="1" fontFamily="Outfit, Space Grotesk, sans-serif">
                Code = Poetry
              </text>

              {/* Watch Hands */}
              {/* Hour Hand */}
              <line
                x1="250"
                y1="250"
                x2={250 + Math.sin((navHourAngle * Math.PI) / 180) * 110}
                y2={250 - Math.cos((navHourAngle * Math.PI) / 180) * 110}
                stroke="#f8fafc"
                strokeWidth="7"
                strokeLinecap="round"
              />

              {/* Minute Hand */}
              <line
                x1="250"
                y1="250"
                x2={250 + Math.sin((minAngle * Math.PI) / 180) * 155}
                y2={250 - Math.cos((minAngle * Math.PI) / 180) * 155}
                stroke="#cbd5e1"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Second Hand */}
              <line
                x1="250"
                y1="250"
                x2={250 + Math.sin((secAngle * Math.PI) / 180) * 170}
                y2={250 - Math.cos((secAngle * Math.PI) / 180) * 170}
                stroke="#38bdf8"
                strokeWidth="2"
              />

              <circle cx="250" cy="250" r="7" fill="#38bdf8" />
            </svg>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem', color: '#cbd5e1' }}>
            <h3 className="font-serif" style={{ fontSize: '1.6rem', color: '#f8fafc', letterSpacing: '0.1em' }}>
              VIVEK R
            </h3>
            <p className="font-tech" style={{ fontSize: '0.85rem', color: '#38bdf8', marginTop: '0.25rem' }}>
              CALIBER 2026 EXHIBITION CASEBACK
            </p>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.75rem' }}>
              JAVA • KOTLIN • PYTHON • SPRING • AWS • POSTGRESQL
            </p>
            <p className="font-tech" style={{ fontSize: '0.82rem', color: '#7dd3fc', marginTop: '0.5rem' }}>
              CODE / SYSTEMS / CREATIVITY
            </p>
            <button
              onClick={onFlipToCaseback}
              className="steel-button"
              style={{ marginTop: '1.25rem', fontSize: '0.8rem' }}
            >
              <RotateCw size={14} />
              Flip to Front Dial
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
