import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Sparkles, Zap, Layers, RefreshCw, Download, FileText, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface CaliberTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  isExploded: boolean;
  onToggleExplode: () => void;
  isCasebackView: boolean;
  onFlipToCaseback: () => void;
  isMatrixMode: boolean;
  onToggleMatrixMode: () => void;
  isTurbo: boolean;
  onToggleTurbo: () => void;
  onSelectHour: (hour: number) => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const CaliberTerminal: React.FC<CaliberTerminalProps> = ({
  isOpen,
  onClose,
  isExploded,
  onToggleExplode,
  isCasebackView,
  onFlipToCaseback,
  isMatrixMode,
  onToggleMatrixMode,
  isTurbo,
  onToggleTurbo,
  onSelectHour,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);
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
          timestamp: new Date().toLocaleTimeString(),
          output: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <pre className="font-mono" style={{ color: '#38bdf8', fontSize: '0.72rem', margin: 0, lineHeight: 1.2 }}>
{`
 ╔════════════════════════════════════════════════════════════════╗
 ║   CALIBER HOROLOGICAL KERNEL // CHRONO TERMINAL v3.12        ║
 ║   ENGINEER: VIVEK R                                          ║
 ╚════════════════════════════════════════════════════════════════╝
`}
              </pre>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.8rem' }}>
                System ready. Type <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>help</span> to inspect available diagnostics or click the quick-chips below.
              </p>
            </div>
          ),
        },
      ]);
    }
  }, [history.length]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

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
              <span>Deconstructs 3D watch into floating mechanical layers</span>
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
              <span>Confetti celebration & downloads official Resume PDF</span>
              <span style={{ color: '#94a3b8' }}>clear</span>
              <span>Clears terminal screen output</span>
            </div>
          </div>
        );
        break;

      case 'explode':
      case 'deconstruct':
        if (!isExploded) onToggleExplode();
        outputNode = (
          <span style={{ color: '#38bdf8' }}>
            <strong>[CALIBER DECONSTRUCTED]</strong> Watch separated into 7 floating physical layers (Sapphire Crystal, Bezel, Hands, Dial, Case, Movement Engine, Rotor).
          </span>
        );
        break;

      case 'assemble':
      case 'lock':
        if (isExploded) onToggleExplode();
        outputNode = (
          <span style={{ color: '#4ade80' }}>
            <strong>[CALIBER REASSEMBLED]</strong> Monobloc case locked and sealed to 300m water resistance.
          </span>
        );
        break;

      case 'matrix':
      case 'cyber':
        onToggleMatrixMode();
        outputNode = (
          <span style={{ color: '#22c55e' }}>
            <strong>[CYBER WIREFRAME MODE]</strong> {isMatrixMode ? 'Disabled normal shaders' : 'Enabled neon wireframe phosphorescence'}.
          </span>
        );
        break;

      case 'turbo':
      case 'speed':
        onToggleTurbo();
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
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: isMaximized ? 'stretch' : 'center',
        justifyContent: isMaximized ? 'stretch' : 'center',
        padding: isMaximized ? 0 : '1.5rem',
        background: 'rgba(2, 6, 15, 0.75)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: isMaximized ? '100vw' : 'min(820px, 92vw)',
          height: isMaximized ? '100vh' : 'min(580px, 85vh)',
          borderRadius: isMaximized ? 0 : '12px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, rgba(8, 14, 28, 0.95) 0%, rgba(3, 7, 18, 0.98) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.15)',
          overflow: 'hidden',
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
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#22c55e' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginLeft: '0.5rem' }}>
              <TerminalIcon size={14} color="#38bdf8" />
              <span className="font-mono" style={{ fontSize: '0.76rem', color: '#f8fafc', fontWeight: 600, letterSpacing: '0.05em' }}>
                CALIBER KERNEL // CHRONO-OS v3.12
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              onClick={() => setIsMaximized((prev) => !prev)}
              className="steel-button"
              style={{ padding: '0.25rem 0.45rem', fontSize: '0.7rem' }}
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
            </button>
            <button
              onClick={onClose}
              className="steel-button"
              style={{ padding: '0.25rem 0.45rem', fontSize: '0.7rem', color: '#f87171' }}
              title="Close Terminal"
            >
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Quick Command Chips Toolbar */}
        <div
          style={{
            padding: '0.45rem 0.85rem',
            background: 'rgba(10, 18, 34, 0.7)',
            borderBottom: '1px solid rgba(56, 189, 248, 0.1)',
            display: 'flex',
            gap: '0.4rem',
            overflowX: 'auto',
            alignItems: 'center',
          }}
        >
          <span className="font-mono" style={{ fontSize: '0.66rem', color: '#64748b', textTransform: 'uppercase', marginRight: '0.2rem', flexShrink: 0 }}>
            QUICK RUN:
          </span>
          {quickCommands.map((q) => (
            <button
              key={q.cmd}
              onClick={() => executeCommand(q.cmd)}
              className="steel-button"
              style={{
                fontSize: '0.7rem',
                padding: '0.2rem 0.55rem',
                flexShrink: 0,
                borderColor: q.highlight ? 'rgba(251, 191, 36, 0.4)' : undefined,
                color: q.highlight ? '#fbbf24' : undefined,
              }}
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Terminal Body & Stream Output */}
        <div
          style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            fontFamily: 'monospace',
          }}
        >
          {history.map((item) => (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.76rem' }}>
                <span style={{ color: '#38bdf8' }}>visitor@chrono-os:~$</span>
                <span style={{ color: '#f8fafc', fontWeight: 600 }}>{item.command}</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: '#475569' }}>{item.timestamp}</span>
              </div>
              <div style={{ paddingLeft: '0.75rem', borderLeft: '2px solid rgba(56, 189, 248, 0.2)' }}>
                {item.output}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <div
          style={{
            padding: '0.65rem 1rem',
            background: 'rgba(8, 14, 28, 0.95)',
            borderTop: '1px solid rgba(56, 189, 248, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <span className="font-mono" style={{ color: '#38bdf8', fontSize: '0.84rem', fontWeight: 700 }}>
            visitor@chrono-os:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'explode', 'cat bio', 'sudo hire'..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontFamily: 'monospace',
              fontSize: '0.88rem',
            }}
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="steel-button active"
            style={{ fontSize: '0.74rem', padding: '0.35rem 0.75rem' }}
          >
            EXECUTE
          </button>
        </div>
      </div>
    </div>
  );
};
