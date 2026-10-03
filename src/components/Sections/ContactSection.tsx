import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Mail, Github, Linkedin, MapPin, Send, Copy, Check, ExternalLink, Phone } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { contact } = PORTFOLIO_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Mail size={18} color="#38bdf8" />
          <span className="font-mono" style={{ fontSize: '0.78rem', color: '#38bdf8', letterSpacing: '0.12em' }}>
            HOUR 09 • OPEN CHANNELS & OPEN SOURCE
          </span>
        </div>
        <h2 className="font-serif" style={{ fontSize: '2rem', fontWeight: 700, color: '#f8fafc' }}>
          Let's Connect
        </h2>
        <p className="font-tech" style={{ fontSize: '0.95rem', color: '#94a3b8' }}>
          {contact.availability}
        </p>
      </div>

      {/* Primary Channels Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {/* Email Direct */}
        <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <Mail size={18} color="#38bdf8" />
              <h4 style={{ fontSize: '0.95rem', color: '#f8fafc', fontWeight: 600 }}>Direct Email</h4>
            </div>
            <p className="font-mono" style={{ fontSize: '0.84rem', color: '#7dd3fc', wordBreak: 'break-all' }}>
              {contact.email}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <a
              href={`mailto:${contact.email}`}
              className="steel-button"
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.8rem', flex: 1, justifyContent: 'center' }}
            >
              <Send size={13} />
              Send Email
            </a>
            <button
              onClick={handleCopyEmail}
              className="steel-button"
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.8rem' }}
              title="Copy email address"
            >
              {copiedEmail ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        {/* GitHub / Open Source */}
        <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <Github size={18} color="#38bdf8" />
              <h4 style={{ fontSize: '0.95rem', color: '#f8fafc', fontWeight: 600 }}>GitHub / Open Source</h4>
            </div>
            <p className="font-mono" style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>
              @{contact.github.username}
            </p>
            <p style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              Public repositories, experiments, and code.
            </p>
          </div>
          <a
            href={contact.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="steel-button active"
            style={{ fontSize: '0.78rem', padding: '0.45rem 0.8rem', justifyContent: 'center' }}
          >
            <Github size={14} />
            Explore Repositories
            <ExternalLink size={12} />
          </a>
        </div>

        {/* LinkedIn Professional */}
        <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <Linkedin size={18} color="#38bdf8" />
              <h4 style={{ fontSize: '0.95rem', color: '#f8fafc', fontWeight: 600 }}>LinkedIn Network</h4>
            </div>
            <p className="font-mono" style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>
              Vivek R
            </p>
            <p style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              Professional career timeline and connections.
            </p>
          </div>
          <a
            href={contact.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="steel-button"
            style={{ fontSize: '0.78rem', padding: '0.45rem 0.8rem', justifyContent: 'center' }}
          >
            <Linkedin size={14} />
            View LinkedIn
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Location Badge */}
      <div className="glass-panel" style={{ padding: '0.9rem 1.25rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <MapPin size={16} color="#38bdf8" />
        <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>
          Based in <strong>Bengaluru, Karnataka, India</strong> (IST / UTC+5:30)
        </span>
      </div>
    </div>
  );
};
