import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Terminal as TerminalIcon, RotateCw, Volume2, VolumeX, Layers, Zap, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { horologyAudio } from '../../audio/soundEffects';

interface PlaygroundSectionProps {
  isCasebackView: boolean;
  onFlipToCaseback: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onSelectMinute: (minute: number) => void;
  isExploded?: boolean;
  onToggleExplode?: () => void;
  isMatrixMode?: boolean;
  onToggleMatrixMode?: () => void;
  isTurbo?: boolean;
  onToggleTurbo?: () => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const PlaygroundSection: React.FC<PlaygroundSectionProps> = ({
  isCasebackView,
  onFlipToCaseback,
  isMuted,
  onToggleMute,
  isExploded = false,
  onToggleExplode,
  isMatrixMode = false,
  onToggleMatrixMode,
  isTurbo = false,
  onToggleTurbo,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Play subtle synth beep for terminal keypress
  const playTerminalSound = (freq = 880, type: OscillatorType = 'sine', duration = 0.03) => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // safe fallback
    }
  };

  // Initial welcome message
  useEffect(() => {
    if (history.length === 0) {
      setHistory([
        {
          id: 'init-0',
          command: 'sys.init --caliber=3135',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          output: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <div style={{ padding: '0.55rem 0.75rem', background: 'rgba(56, 189, 248, 0.08)', borderRadius: '6px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
                <div className="font-mono" style={{ color: '#38bdf8', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                  CALIBER HOROLOGICAL KERNEL // CHRONO-OS v3.12
                </div>
                <div className="font-mono" style={{ color: '#94a3b8', fontSize: '0.66rem', marginTop: '0.15rem' }}>
                  ENGINEER: VIVEK R • SYSTEM INITIALIZED
                </div>
              </div>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.78rem', lineHeight: 1.5 }}>
                System ready. Type <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>help</span> or click the quick-chips below to inspect diagnostics and control the 3D watch in real-time.
              </p>
            </div>
          ),
        },
      ]);
    }
  }, [history.length]);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdText: string) => {
    const rawCmd = cmdText.trim();
    if (!rawCmd) return;
    const cmd = rawCmd.toLowerCase();
    playTerminalSound(1100, 'square', 0.05);

    let outputNode: React.ReactNode = null;
    const nowStr = new Date().toLocaleTimeString();

    switch (cmd) {
      case 'help':
      case '?':
        outputNode = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem' }}>
            <span style={{ color: '#38bdf8', fontWeight: 600 }}>AVAILABLE CALIBER COMMANDS:</span>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '0.35rem', color: '#cbd5e1' }}>
              <span style={{ color: '#4ade80' }}>explode / deconstruct</span>
              <span>Deconstructs 3D watch into 7 floating mechanical layers</span>
              <span style={{ color: '#4ade80' }}>assemble</span>
              <span>Reassembles watch into unified caliber</span>
              <span style={{ color: '#4ade80' }}>matrix</span>
              <span>Toggles cybernetic glowing wireframe shader mode</span>
              <span style={{ color: '#4ade80' }}>turbo</span>
              <span>Accelerates gear train to 20x high-beat sweep</span>
              <span style={{ color: '#4ade80' }}>flip</span>
              <span>Flips watch between dial and exhibition caseback</span>
              <span style={{ color: '#38bdf8' }}>cat bio</span>
              <span>Inspect Vivek's engineering background & core competencies</span>
              <span style={{ color: '#38bdf8' }}>cat skills</span>
              <span>Lists full technical architecture stack</span>
              <span style={{ color: '#38bdf8' }}>cat projects</span>
              <span>Displays production systems (AirVision, PlateShare, PoetByte)</span>
              <span style={{ color: '#38bdf8' }}>cat education</span>
              <span>Shows MCA & BCA degrees with Academic Distinction</span>
              <span style={{ color: '#fbbf24' }}>sudo hire</span>
              <span>Celebratory launch & downloads official Resume PDF</span>
              <span style={{ color: '#94a3b8' }}>clear</span>
              <span>Clears terminal screen output</span>
            </div>
          </div>
        );
        break;

      case 'explode':
      case 'deconstruct':
        if (!isExploded && onToggleExplode) onToggleExplode();
        outputNode = (
          <span style={{ color: '#38bdf8' }}>
            <strong>[CALIBER DECONSTRUCTED]</strong> Watch separated into 7 floating physical layers (Sapphire Crystal, Bezel, Hands, Dial, Case, Movement Engine, Rotor).
          </span>
        );
        break;

      case 'assemble':
      case 'lock':
        if (isExploded && onToggleExplode) onToggleExplode();
        outputNode = (
          <span style={{ color: '#4ade80' }}>
            <strong>[CALIBER REASSEMBLED]</strong> Monobloc case locked and sealed to 300m water resistance.
          </span>
        );
        break;

      case 'matrix':
      case 'cyber':
        if (onToggleMatrixMode) onToggleMatrixMode();
        outputNode = (
          <span style={{ color: '#22c55e' }}>
            <strong>[CYBER WIREFRAME MODE]</strong> {isMatrixMode ? 'Disabled normal shaders' : 'Enabled neon wireframe phosphorescence'}.
          </span>
        );
        break;

      case 'turbo':
      case 'speed':
        if (onToggleTurbo) onToggleTurbo();
        outputNode = (
          <span style={{ color: '#f59e0b' }}>
            <strong>[TURBO GEAR TRAIN]</strong> {isTurbo ? 'Standard real-time quartz sweep' : '20x Hyper-beat mechanical chronograph sweep'}.
          </span>
        );
        break;

      case 'flip':
      case 'caseback':
        onFlipToCaseback();
        outputNode = (
          <span style={{ color: '#38bdf8' }}>
            <strong>[ROTATIONAL AXIS]</strong> Watch flipped to {isCasebackView ? 'FRONT DIAL' : 'EXHIBITION CASEBACK'}.
          </span>
        );
        break;

      case 'cat bio':
      case 'bio':
      case 'whoami':
        outputNode = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', color: '#cbd5e1', fontSize: '0.82rem' }}>
            <span style={{ color: '#38bdf8', fontWeight: 700 }}>VIVEK R</span>
            <p style={{ margin: 0 }}>
              {PORTFOLIO_DATA.about.summary}
            </p>
            <div style={{ display: 'flex', gap: '1rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              <span>Bengaluru, India</span>
              <span>MCA (CGPA: 9.16/10)</span>
              <span>Java · Python · Cloud · Android</span>
            </div>
          </div>
        );
        break;

      case 'cat skills':
      case 'skills':
        outputNode = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
            <span style={{ color: '#38bdf8', fontWeight: 600 }}>CLASSIFIED TECHNICAL ARSENAL:</span>
            {PORTFOLIO_DATA.skillGroups.map((cat) => (
              <div key={cat.title} style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                <span style={{ color: '#7dd3fc', fontWeight: 600 }}>{cat.title}:</span>
                <span style={{ color: '#94a3b8' }}>
                  {cat.skills.map((s) => s.name).join(' • ')}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case 'cat projects':
      case 'projects':
        outputNode = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
            <span style={{ color: '#38bdf8', fontWeight: 600 }}>PRODUCTION ENGINEERING SYSTEMS:</span>
            {PORTFOLIO_DATA.projects.map((p) => (
              <div key={p.id} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid rgba(56, 189, 248, 0.15)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#f8fafc', fontWeight: 700 }}>{p.title}</span>
                  <span style={{ color: '#38bdf8', fontSize: '0.7rem' }}>{p.category}</span>
                </div>
                <p style={{ color: '#94a3b8', margin: '0.2rem 0', fontSize: '0.76rem' }}>{p.subtitle || p.description}</p>
                <span style={{ color: '#64748b', fontSize: '0.72rem' }}>{p.tags.join(' • ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'cat education':
      case 'education':
      case 'edu':
        outputNode = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8rem' }}>
            <span style={{ color: '#38bdf8', fontWeight: 600 }}>ACADEMIC CREDENTIALS & DISTINCTIONS:</span>
            {PORTFOLIO_DATA.educationList.map((edu) => (
              <div key={edu.id} style={{ color: '#cbd5e1' }}>
                <span style={{ color: '#f8fafc', fontWeight: 600 }}>{edu.degree}</span> — {edu.institution}
                <div style={{ color: '#38bdf8', fontSize: '0.75rem' }}>{edu.score} • {edu.status}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'sudo hire':
      case 'hire':
      case 'resume':
        try {
          confetti({
            particleCount: 80,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#38bdf8', '#4ade80', '#fbbf24', '#ffffff'],
          });
        } catch {
          // safe
        }
        outputNode = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem' }}>
            <span style={{ color: '#4ade80', fontWeight: 700 }}>
              [RECRUITMENT PIPELINE INITIALIZED]
            </span>
            <p style={{ color: '#cbd5e1', margin: 0 }}>
              Direct line to candidate established. Opening Resume...
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.3rem' }}>
              <a
                href={PORTFOLIO_DATA.resumes[0].path}
                target="_blank"
                rel="noopener noreferrer"
                className="steel-button active"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <FileText size={13} /> Open Resume PDF
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.about.email}`}
                className="steel-button"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                Email Vivek
              </a>
            </div>
          </div>
        );
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      default:
        outputNode = (
          <span style={{ color: '#f87171' }}>
            Command not recognized: <code style={{ color: '#ffffff' }}>{rawCmd}</code>. Type <code style={{ color: '#38bdf8' }}>help</code> for valid commands.
          </span>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: rawCmd,
        output: outputNode,
        timestamp: nowStr,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  const quickCommands = [
    { label: isExploded ? 'Assemble' : 'Explode', cmd: isExploded ? 'assemble' : 'explode' },
    { label: isMatrixMode ? 'Norm Shaders' : 'Cyber Matrix', cmd: 'matrix' },
    { label: isTurbo ? 'Normal Sweep' : 'Turbo 20x', cmd: 'turbo' },
    { label: 'Flip Watch', cmd: 'flip' },
    { label: 'Bio', cmd: 'cat bio' },
    { label: 'Skills', cmd: 'cat skills' },
    { label: 'Projects', cmd: 'cat projects' },
    { label: 'Education', cmd: 'cat education' },
    { label: 'sudo hire', cmd: 'sudo hire', highlight: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TerminalIcon size={18} color="#38bdf8" />
          <span className="font-mono" style={{ fontSize: '0.78rem', color: '#38bdf8', letterSpacing: '0.12em' }}>
            HOUR 10 • HOROLOGICAL LABORATORY & CLI
          </span>
        </div>
        <h2 className="font-serif" style={{ fontSize: '2rem', fontWeight: 700, color: '#f8fafc' }}>
          The Chrono Lab & Caliber Shell
        </h2>
        <p className="font-tech" style={{ fontSize: '0.95rem', color: '#94a3b8' }}>
          Interactive 3D diagnostics, real-time command line terminal, and mechanical caliber controls.
        </p>
      </div>

      {/* Embedded Live Caliber Terminal */}
      <div
        className="glass-panel"
        style={{
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, rgba(8, 14, 28, 0.95) 0%, rgba(3, 7, 18, 0.98) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          overflow: 'hidden',
          minHeight: '380px',
        }}
      >
        {/* Terminal Header Bar */}
        <div
          style={{
            padding: '0.65rem 1rem',
            background: 'rgba(15, 23, 42, 0.9)',
            borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginLeft: '0.5rem' }}>
              <TerminalIcon size={14} color="#38bdf8" />
              <span className="font-mono" style={{ fontSize: '0.74rem', color: '#f8fafc', fontWeight: 600, letterSpacing: '0.05em' }}>
                CALIBER KERNEL // CHRONO-OS v3.12
              </span>
            </div>
          </div>
        </div>

        {/* Quick Command Chips Toolbar */}
        <div
          className="custom-scroll"
          style={{
            padding: '0.4rem 0.65rem',
            background: 'rgba(10, 18, 34, 0.7)',
            borderBottom: '1px solid rgba(56, 189, 248, 0.1)',
            display: 'flex',
            gap: '0.35rem',
            overflowX: 'auto',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <span className="font-mono" style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', marginRight: '0.15rem', flexShrink: 0 }}>
            RUN:
          </span>
          {quickCommands.map((q) => (
            <button
              key={q.cmd}
              onClick={() => executeCommand(q.cmd)}
              className="steel-button"
              style={{
                fontSize: '0.68rem',
                padding: '0.2rem 0.5rem',
                flexShrink: 0,
                minHeight: '26px',
                minWidth: 'auto',
                borderColor: q.highlight ? 'rgba(251, 191, 36, 0.4)' : undefined,
                color: q.highlight ? '#fbbf24' : undefined,
                whiteSpace: 'nowrap',
              }}
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Terminal Body & Stream Output */}
        <div
          className="custom-scroll"
          style={{
            flex: 1,
            maxHeight: '320px',
            padding: '0.75rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
            fontFamily: 'monospace',
          }}
        >
          {history.map((item) => (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem', color: '#64748b', fontSize: '0.72rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', minWidth: 0, flex: 1 }}>
                  <span style={{ color: '#38bdf8', fontWeight: 700 }}>&gt;$</span>
                  <span style={{ color: '#f8fafc', fontWeight: 600, wordBreak: 'break-all' }}>{item.command}</span>
                </div>
                <span style={{ fontSize: '0.65rem', color: '#475569', flexShrink: 0 }}>{item.timestamp}</span>
              </div>
              <div style={{ paddingLeft: '0.65rem', borderLeft: '2px solid rgba(56, 189, 248, 0.2)', overflowX: 'hidden' }}>
                {item.output}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <div
          style={{
            padding: '0.5rem 0.75rem',
            background: 'rgba(8, 14, 28, 0.95)',
            borderTop: '1px solid rgba(56, 189, 248, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
          }}
        >
          <span className="font-mono" style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
            &gt;$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'explode', 'cat bio'..."
            style={{
              flex: 1,
              minWidth: 0,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontFamily: 'monospace',
              fontSize: '0.82rem',
            }}
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="steel-button active"
            style={{ fontSize: '0.7rem', padding: '0.3rem 0.65rem', minHeight: '30px', flexShrink: 0 }}
          >
            EXEC
          </button>
        </div>
      </div>
    </div>
  );
};
