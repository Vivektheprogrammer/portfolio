import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { User, Server, Cloud, Shield, Smartphone, GraduationCap, MapPin, Mail, ExternalLink } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { about, education } = PORTFOLIO_DATA;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <User size={16} color="#38bdf8" />
          <span className="font-mono" style={{ fontSize: '0.7rem', color: '#38bdf8', letterSpacing: '0.12em' }}>
            HOUR 01 • ENGINEERING ARCHITECTURE
          </span>
        </div>
        <h2 className="font-serif" style={{ fontSize: '1.45rem', fontWeight: 700, color: '#f8fafc' }}>
          About Vivek R
        </h2>
        <p className="font-tech" style={{ fontSize: '0.84rem', color: '#7dd3fc' }}>
          {about.role} • {about.location}
        </p>
      </div>

      {/* Main Narrative */}
      <div className="glass-panel" style={{ padding: '0.95rem 1.05rem', borderRadius: '8px', lineHeight: 1.6, fontSize: '0.82rem' }}>
        <p style={{ color: '#e2e8f0', marginBottom: '0.65rem' }}>
          {about.summary}
        </p>
        <p style={{ color: '#94a3b8' }}>
          Focused on building systems that endure high concurrent loads with sub-millisecond precision, robust data synchronization protocols, and clean object-oriented architecture.
        </p>
      </div>

      {/* 4 Core Focus Areas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div className="glass-panel" style={{ padding: '1.1rem', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <Server size={18} color="#38bdf8" />
            <h4 style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 600 }}>Backend & Concurrency</h4>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>
            Java & Spring Boot microservices, WebSocket real-time channels, batch processing, pagination, and transactional PostgreSQL/MySQL databases.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '1.1rem', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <Cloud size={18} color="#38bdf8" />
            <h4 style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 600 }}>Cloud & Observability</h4>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>
            AWS production deployments (EC2, VPC, ALB, RDS, S3), Docker Compose containerization, Nginx SSL/TLS, and Prometheus/Grafana telemetry.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '1.1rem', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <Shield size={18} color="#38bdf8" />
            <h4 style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 600 }}>Security Primitives</h4>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>
            AES-256-GCM encryption, JWT authentication, IAM role enforcement, secrets isolation, and robust API defenses.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '1.1rem', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <Smartphone size={18} color="#38bdf8" />
            <h4 style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 600 }}>Android Engineering</h4>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>
            Native Android architecture with MVVM/MVI, Google Ink API (Ink Compose) for low-latency digital ink capture, and ProtoBuf serialization.
          </p>
        </div>
      </div>

      {/* Education Block */}
      <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
          <GraduationCap size={20} color="#38bdf8" />
          <h3 className="font-tech" style={{ fontSize: '1.1rem', color: '#f8fafc' }}>
            Academic Foundation
          </h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#e2e8f0', fontWeight: 600 }}>
              {education.institution}
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#38bdf8' }}>
              {education.degree}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="glass-pill font-mono" style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.8rem', color: '#7dd3fc', fontWeight: 600 }}>
              {education.score}
            </span>
            <p className="font-mono" style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
              {education.period}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
