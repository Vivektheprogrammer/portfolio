export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period?: string;
  description: string;
  tags: string[];
  keyHighlights: string[];
  architecture?: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: 'Full-Stack' | 'Cloud & Backend' | 'Geospatial' | 'Web Apps';
}

export interface Experience {
  id: string;
  company: string;
  division?: string;
  location: string;
  role: string;
  period: string;
  isCurrent: boolean;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    highlight?: boolean;
    description?: string;
  }[];
}

export interface ResumeVersion {
  id: string;
  title: string;
  focus: string;
  filename: string;
  path: string;
  description: string;
  highlights: string[];
  selectedWork?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  period: string;
  metric?: string;
  description: string;
  category: 'Academic' | 'Engineering' | 'Milestone' | 'Conference Leadership' | 'Student Committee' | 'Extracurricular' | string;
}

export interface BezelMarker {
  minute: number; // 0, 5, 10, 15, ..., 55
  name: string;
  category: string;
  description: string;
  relatedProjects: string[];
  relatedSkills: string[];
}

export interface HourSection {
  hour: number;
  label: string;
  title: string;
  subtitle: string;
  tagline: string;
  summary: string;
}

export const HOUR_SECTIONS: Record<number, HourSection> = {
  12: {
    hour: 12,
    label: 'HOME',
    title: 'THE CHRONO SYSTEM',
    subtitle: 'VIVEK R — Software Development Engineer',
    tagline: 'Precision Engineering • Scalable Systems • Horological Interface',
    summary: 'An interactive 3D timepiece portfolio engineered around scalable backend architecture, cloud infrastructure, and modern application development.'
  },
  1: {
    hour: 1,
    label: 'ABOUT',
    title: 'ENGINEERING PROFILE',
    subtitle: 'Backend Architecture & Cloud Systems',
    tagline: 'High-availability services, real-time sync & clean design principles',
    summary: 'Software Development Engineer with hands-on experience building scalable backend services, Android applications, and production-ready AWS cloud infrastructure.'
  },
  2: {
    hour: 2,
    label: 'EXPERIENCE',
    title: 'PROFESSIONAL TIMELINE',
    subtitle: 'Production Engineering at Scale',
    tagline: 'From microservices to AWS cloud deployments & Android ink sync',
    summary: 'Track record of architecting mission-critical backend modules, high-throughput data synchronization, and enterprise cloud infrastructure.'
  },
  3: {
    hour: 3,
    label: 'PROJECTS',
    title: 'ENGINEERING WORKS',
    subtitle: 'Production & Full-Stack Systems',
    tagline: 'Full-stack platforms, geospatial engines & high-throughput backends',
    summary: 'Explore production-tested applications spanning automated data ingestion, satellite geospatial processing, and modern web architectures.'
  },
  4: {
    hour: 4,
    label: 'SKILLS',
    title: 'TECHNICAL REPERTOIRE',
    subtitle: 'Core Competencies & Stack',
    tagline: 'Backend services, cloud orchestration, databases & mobile architecture',
    summary: 'Curated technical competencies verified through production deployments and systems architecture.'
  },
  5: {
    hour: 5,
    label: 'RESUME',
    title: 'CURRICULUM VITAE',
    subtitle: 'Verified Documentation',
    tagline: 'Production-ready profiles available for inspection and download',
    summary: 'Access verified resume versions tailored for Backend Engineering and Cloud & Infrastructure roles.'
  },
  6: {
    hour: 6,
    label: 'POETBYTE',
    title: 'POETBYTE PLATFORM',
    subtitle: 'Creative Digital Expression',
    tagline: 'The poetic dimension • Where literature meets elegant code',
    summary: 'A bespoke digital publishing haven designed and built for poetry enthusiasts, celebrating words and typography.'
  },
  7: {
    hour: 7,
    label: 'ACHIEVEMENTS',
    title: 'ACADEMIC & MILESTONES',
    subtitle: 'Excellence & Recognition',
    tagline: 'Academic distinction, MCA CGPA 9.16/10 & engineering milestones',
    summary: 'Academic achievements, institutional honors, and milestones across software engineering and computer science.'
  },
  8: {
    hour: 8,
    label: 'RESEARCH',
    title: 'RESEARCH & PUBLICATIONS',
    subtitle: 'Peer-Reviewed Literature & Studies',
    tagline: 'IoT security, blockchain, deep learning & ensemble ML intrusion detection',
    summary: 'Published research in IEEE and international peer-reviewed journals covering intelligent cyber defense and security architectures.'
  },
  9: {
    hour: 9,
    label: 'CONTACT',
    title: 'OPEN CHANNELS',
    subtitle: 'GitHub & Professional Inquiries',
    tagline: 'Let’s connect, collaborate, and build exceptional systems',
    summary: 'Direct communication channels, open-source repositories, and professional networks.'
  },
  10: {
    hour: 10,
    label: 'PLAYGROUND',
    title: 'LABORATORY & EXPERIMENTS',
    subtitle: 'Horological Physics & Interactive Systems',
    tagline: 'Real-time watch tuning, precision chronograph & caliber shell',
    summary: 'An expandable laboratory for interactive 3D experiments, precision mechanics, and terminal CLI controls.'
  },
  11: {
    hour: 11,
    label: 'FUTURE',
    title: 'THE NEXT HOUR',
    subtitle: 'FUTURE HORIZONS',
    tagline: 'Some destinations are planned. Others are built along the way.',
    summary: '11:00 — RESERVED FOR WHAT COMES NEXT. Systems, problems, ideas, and stories waiting to be built. The watch keeps moving.'
  }
};

export const BEZEL_MARKERS: BezelMarker[] = [
  {
    minute: 0,
    name: 'Java',
    category: 'Programming Languages',
    description: 'Core language for enterprise-grade backend microservices, concurrency, and OOP architecture.',
    relatedProjects: ['SlickMachine Backend'],
    relatedSkills: ['Spring Boot', 'Hibernate', 'REST APIs', 'Microservices', 'WebSockets', 'Maven']
  },
  {
    minute: 5,
    name: 'Kotlin',
    category: 'Modern Languages',
    description: 'Primary language for Android application development, coroutines, and clean modern syntax.',
    relatedProjects: ['Android Digital Ink Sync'],
    relatedSkills: ['Android SDK', 'Jetpack', 'MVVM', 'MVI', 'Google Ink API']
  },
  {
    minute: 10,
    name: 'Python',
    category: 'Languages & Scripting',
    description: 'High-productivity language for geospatial computation, REST APIs, automation, and backend platforms.',
    relatedProjects: ['AirVision', 'PlateShare'],
    relatedSkills: ['FastAPI', 'Flask', 'SQLAlchemy', 'Geospatial Data Processing']
  },
  {
    minute: 15,
    name: 'Spring Boot',
    category: 'Backend Frameworks',
    description: 'Enterprise framework for REST APIs, JWT authentication, data synchronization, and WebSocket services.',
    relatedProjects: ['SlickMachine Backend Services'],
    relatedSkills: ['Microservices', 'Hibernate', 'REST APIs', 'AES-256-GCM', 'WebSockets']
  },
  {
    minute: 20,
    name: 'PostgreSQL & PostGIS',
    category: 'Relational & Spatial Databases',
    description: 'High-performance ACID database with PostGIS extensions for spatial data and indexing.',
    relatedProjects: ['AirVision', 'SlickMachine Staging/Prod'],
    relatedSkills: ['PostgreSQL', 'PostGIS', 'SQLAlchemy', 'MySQL', 'MongoDB', 'ObjectBox']
  },
  {
    minute: 25,
    name: 'AWS Cloud',
    category: 'Cloud Infrastructure',
    description: 'Production cloud infrastructure spanning EC2, VPC, IAM, S3, RDS, ALB, Auto Scaling, ECR, and CloudWatch.',
    relatedProjects: ['AWS Staging & Production Environments'],
    relatedSkills: ['EC2', 'VPC', 'IAM', 'S3', 'RDS', 'ALB', 'Auto Scaling', 'ECR', 'CloudWatch']
  },
  {
    minute: 30,
    name: 'Docker',
    category: 'Containerization',
    description: 'Containerized production workloads and multi-service orchestration with Docker Compose.',
    relatedProjects: ['SlickMachine Deployments', 'AirVision Containerization'],
    relatedSkills: ['Docker', 'Docker Compose', 'Linux Environments', 'Container Registry']
  },
  {
    minute: 35,
    name: 'Kubernetes & Linux',
    category: 'DevOps & Orchestration',
    description: 'Container orchestration, Linux server administration, Nginx reverse proxy, and SSL/TLS infrastructure.',
    relatedProjects: ['Production Staging Infrastructure'],
    relatedSkills: ['Kubernetes', 'Linux', 'Nginx', 'Certbot', 'CI/CD']
  },
  {
    minute: 40,
    name: 'Android Engineering',
    category: 'Mobile & Client Architecture',
    description: 'Native Android apps using MVVM/MVI, Jetpack Compose, Google Ink API, and ProtoBuf serialization.',
    relatedProjects: ['Digital Ink Capture & Cross-Device Sync'],
    relatedSkills: ['Android SDK', 'Google Ink API', 'ProtoBuf', 'MVVM', 'MVI']
  },
  {
    minute: 45,
    name: 'FastAPI & React',
    category: 'Modern Web & API Systems',
    description: 'Asynchronous Python web APIs paired with reactive component-driven web user interfaces.',
    relatedProjects: ['AirVision', 'PoetByte'],
    relatedSkills: ['FastAPI', 'React', 'Next.js', 'Tailwind CSS', 'NextAuth.js']
  },
  {
    minute: 50,
    name: 'Observability & Monitoring',
    category: 'Production Reliability',
    description: 'Telemetry and metrics stack utilizing Prometheus, Grafana, Loki, Promtail, and Alertmanager.',
    relatedProjects: ['SlickMachine Production Monitoring'],
    relatedSkills: ['Prometheus', 'Grafana', 'Loki', 'Promtail', 'Alertmanager']
  },
  {
    minute: 55,
    name: 'System Design & Security',
    category: 'Architectural Foundations',
    description: 'Architecting for high availability, AES-256-GCM encryption, JWT security, and low-latency sync.',
    relatedProjects: ['SlickMachine Enterprise Backend'],
    relatedSkills: ['System Design', 'API Design', 'AES-256-GCM', 'JWT', 'Performance Optimization']
  }
];

export const PORTFOLIO_DATA = {
  about: {
    name: 'Vivek R',
    role: 'Software Development Engineer',
    email: 'vivekgowda480@gmail.com',
    phone: '+91 9148375755',
    location: 'Bengaluru, India',
    github: 'https://github.com/Vivektheprogrammer',
    linkedin: 'https://www.linkedin.com/in/vivek-r-626b16217',
    poetbyte: 'https://poetbyte.vercel.app/',
    summary: 'Software Development Engineer with hands-on experience building scalable backend services, Android applications, and AWS cloud infrastructure. Experienced with Java, Python, Spring Boot, REST APIs, Docker, Kubernetes, Linux, CI/CD, networking, databases, real-time communication, data synchronization, and performance optimization. Strong foundation in object-oriented programming, data structures, system design, debugging, and Agile software development.',
    corePillars: [
      {
        title: 'Backend Systems & Concurrency',
        description: 'Designing fault-tolerant REST APIs, WebSocket channels, batch processing, and transactional database architectures.'
      },
      {
        title: 'Cloud Infrastructure & DevOps',
        description: 'Architecting production-ready AWS environments with VPC, EC2, ALB, S3, RDS, Docker Compose, and Nginx reverse proxies.'
      },
      {
        title: 'Observability & Security Primitives',
        description: 'Hardening APIs with JWT, AES-256-GCM encryption, and instrumenting services with Prometheus, Grafana, Loki, and Alertmanager.'
      },
      {
        title: 'Client-Side Engineering & Mobile',
        description: 'Building native Android experiences with MVVM/MVI, ProtoBuf serialization, and Google Ink API integration.'
      }
    ]
  },

  experiences: [
    {
      id: 'slickmachine-sde',
      company: 'SlickMachine',
      location: 'Bengaluru, India',
      role: 'Software Development Engineer',
      period: 'February 2026 – Present',
      isCurrent: true,
      summary: 'Architecting and maintaining high-throughput backend services, AWS cloud infrastructure, observability pipelines, and Android sync mechanisms.',
      responsibilities: [
        'Designed and maintained scalable backend services using Java, Spring Boot, and REST APIs for authentication, data synchronization, document management, search, and real-time collaboration across Android and web applications.',
        'Developed secure backend systems using JWT authentication and AES-256-GCM encryption, ensuring reliable API security and scalable architecture.',
        'Engineered large-scale data synchronization, batch processing, pagination, multimedia processing, and WebSocket-based real-time communication, improving reliability, performance, and scalability.',
        'Designed, deployed, and maintained AWS cloud infrastructure using EC2, VPC, IAM, S3, RDS, Application Load Balancer (ALB), Auto Scaling, ECR, and CloudWatch for secure and reliable staging and production environments.',
        'Managed Docker-based production deployments and containerized backend services, configuring application, database, networking, and service dependencies using Docker Compose in Linux environments.',
        'Configured Nginx reverse proxy and SSL/TLS infrastructure with Certbot for secure application access, routing, and production traffic management.',
        'Implemented production monitoring and observability using Prometheus, Grafana, Loki, Promtail, and Alertmanager, including health checks, centralized logging, metrics collection, dashboards, and automated alerting.',
        'Optimized backend infrastructure and services for data synchronization, batch processing, pagination, multimedia processing, and WebSocket communication, improving reliability, scalability, and operational performance.',
        'Developed Android features using MVVM/MVI, integrating Google Ink API (Ink Compose) and ProtoBuf for digital ink capture, storage, serialization, and cross-device synchronization.',
        'Collaborated using Git, Bitbucket, and Jira in an Agile environment and resolved production issues.'
      ],
      technologies: [
        'Java', 'Spring Boot', 'REST APIs', 'AWS (EC2, VPC, IAM, S3, RDS, ALB, Auto Scaling, ECR, CloudWatch)',
        'Docker', 'Docker Compose', 'Linux', 'Nginx', 'Certbot', 'Prometheus', 'Grafana', 'Loki', 'Promtail', 'Alertmanager',
        'PostgreSQL', 'WebSockets', 'JWT', 'AES-256-GCM', 'Android SDK', 'Google Ink API', 'ProtoBuf', 'MVVM/MVI', 'Git', 'Bitbucket', 'Jira'
      ]
    },
    {
      id: 'slickmachine-intern',
      company: 'Hashmint',
      location: 'Bengaluru, India',
      role: 'Software Development Engineer Intern',
      period: 'October 2025 – January 2026',
      isCurrent: false,
      summary: 'Contributed to Spring Boot backend services, REST APIs, database design with PostgreSQL, and Android features with MVVM.',
      responsibilities: [
        'Contributed to Spring Boot backend modules and REST APIs for authentication, data synchronization, document management, and database operations, gaining hands-on experience in backend architecture, API integration, and scalable application development.',
        'Worked on Android features using MVVM and backend API integration, gaining practical experience in debugging, testing, and performance optimization while working with PostgreSQL, Docker, Linux, Git, Bitbucket, and Jira in an Agile environment.',
        'Participated in sprint cycles, code reviews, and production deployment workflows.'
      ],
      technologies: [
        'Java', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'Android SDK', 'MVVM', 'Docker', 'Linux', 'Git', 'Bitbucket', 'Jira'
      ]
    }
  ] as Experience[],

  projects: [
    {
      id: 'airvision',
      title: 'AirVision',
      subtitle: 'Air Quality Forecasting & Geospatial Intelligence Platform',
      category: 'Geospatial',
      description: 'A full-stack air quality forecasting and environmental monitoring platform that ingests, models, and visualizes air pollution indices by marrying ground station telemetry with orbital satellite observations.',
      tags: ['FastAPI', 'React', 'PostgreSQL', 'PostGIS', 'SQLAlchemy', 'Python', 'Geospatial Analysis'],
      keyHighlights: [
        'Built a full-stack air quality forecasting platform integrating Central Pollution Control Board (CPCB) ground data and European Space Agency Sentinel-5P satellite imagery.',
        'Engineered high-performance REST APIs using FastAPI and Python for lightning-fast querying of spatial and temporal data.',
        'Implemented PostgreSQL with PostGIS extensions and SQLAlchemy ORM for complex geospatial queries, spatial indexing, and polygon boundary calculations.',
        'Developed automated data ingestion pipelines with scheduled synchronization workers for real-time pollution metrics.',
        'Created interactive reactive dashboards with dynamic map visualizations displaying pollutant heatmaps (PM2.5, PM10, NO2, SO2).'
      ],
      architecture: [
        'FastAPI Asynchronous Microservice Backend',
        'PostgreSQL with PostGIS Spatial Database Extension',
        'Sentinel-5P Satellite Imagery & CPCB Ground Data Ingestion Engine',
        'React Interactive Geospatial Map & Telemetry Dashboard'
      ]
    },
    {
      id: 'plateshare',
      title: 'PlateShare',
      subtitle: 'Food Redistribution & Waste Mitigation Platform',
      category: 'Full-Stack',
      description: 'A full-stack food donation and surplus recovery platform engineered to bridge the gap between food donors (restaurants, caterers, households) and recipient organizations/food banks.',
      tags: ['Python', 'Flask', 'MySQL', 'JavaScript', 'HTML5/CSS3', 'REST APIs', 'Role-Based Access'],
      keyHighlights: [
        'Built a full-stack food donation platform using Python, Flask, MySQL, and REST APIs.',
        'Implemented role-based authentication and secure authorization workflows for donors, logistics volunteers, and beneficiary shelters.',
        'Engineered comprehensive CRUD workflows for food listing management, expiration tracking, and reservation allocation.',
        'Created analytical dashboards for donors and administrators to measure rescued meals and distribution metrics.',
        'Enforced robust security practices with salted password hashing and input validation across all endpoints.'
      ],
      architecture: [
        'Python Flask REST Backend & Routing Architecture',
        'MySQL Relational Database for Inventory & Transactional Audits',
        'Role-Based Access Control (RBAC) Security Layer',
        'Responsive JavaScript/HTML5 Frontend Interface'
      ]
    },
    {
      id: 'poetbyte',
      title: 'PoetByte',
      subtitle: 'Full-Stack Digital Poetry Publishing Platform',
      category: 'Web Apps',
      liveUrl: 'https://poetbyte.vercel.app/',
      description: 'A dedicated, beautifully crafted digital publishing platform and literary community where poets compose, publish, curate, and explore verses with custom reading aesthetics and secure member accounts.',
      tags: ['Next.js', 'MongoDB', 'NextAuth.js', 'Tailwind CSS', 'REST APIs', 'Cloud Deployment'],
      keyHighlights: [
        'Built and deployed a full-stack poetry publishing platform using Next.js, MongoDB, NextAuth.js, and Tailwind CSS.',
        'Implemented secure user authentication and session management with NextAuth.js.',
        'Developed REST APIs and CRUD-based poem management supporting categorization, rich formatting, and tagging.',
        'Designed protected workflows allowing authors to draft, preview, publish, and manage their creative portfolios.',
        'Created a responsive, distraction-free UI with dark and light themes tuned for literary typography and readability.',
        'Deployed seamlessly to production on Vercel with automated continuous deployment.'
      ],
      architecture: [
        'Next.js Full-Stack App with Server-Side & Static Generation',
        'MongoDB Atlas Cloud Document Database for Poem & Author Collections',
        'NextAuth.js Secure Authentication & Session Strategy',
        'Tailwind CSS Theming Engine with Dark/Light Typography Stacks'
      ]
    }
  ] as Project[],

  skillGroups: [
    {
      title: 'Programming & Web',
      iconName: 'Code2',
      description: 'Core languages and frontend frameworks used to build robust applications.',
      skills: [
        { name: 'Java', level: 'Advanced', highlight: true, description: 'Enterprise backend, multithreading, OOP, Spring ecosystem' },
        { name: 'Python', level: 'Advanced', highlight: true, description: 'FastAPI, Flask, SQLAlchemy, automated data pipelines' },
        { name: 'Kotlin', level: 'Proficient', highlight: true, description: 'Android development, coroutines, modern Android architecture' },
        { name: 'JavaScript', level: 'Proficient', description: 'ES6+, DOM, dynamic web applications, asynchronous patterns' },
        { name: 'React', level: 'Proficient', highlight: true, description: 'Component architecture, hooks, state management, SPA design' },
        { name: 'Next.js', level: 'Proficient', highlight: true, description: 'Full-stack React framework, SSR/SSG, NextAuth, production deploys' },
        { name: 'HTML5 & CSS3', level: 'Proficient', description: 'Semantic markup, modern CSS layouts, responsive design' }
      ]
    },
    {
      title: 'Backend Engineering',
      iconName: 'Server',
      description: 'Microservices, APIs, real-time messaging, and architectural patterns.',
      skills: [
        { name: 'Spring Boot', level: 'Advanced', highlight: true, description: 'Production REST APIs, microservices, security, dependency injection' },
        { name: 'REST APIs', level: 'Advanced', highlight: true, description: 'RESTful design, pagination, batch processing, status codes, OpenAPI' },
        { name: 'Microservices', level: 'Advanced', highlight: true, description: 'Decoupled service architecture, inter-service communication' },
        { name: 'WebSockets', level: 'Proficient', highlight: true, description: 'Real-time two-way communication channels, live collaboration' },
        { name: 'Hibernate & JPA', level: 'Proficient', description: 'ORM, entity mappings, query optimization, caching' },
        { name: 'JWT Authentication', level: 'Advanced', highlight: true, description: 'Stateless session tokens, refresh flows, claim validation' },
        { name: 'Maven & Gradle', level: 'Proficient', description: 'Build management, dependency resolution, CI packaging' }
      ]
    },
    {
      title: 'Databases & Storage',
      iconName: 'Database',
      description: 'Relational, document, spatial, and embedded storage engines.',
      skills: [
        { name: 'PostgreSQL', level: 'Advanced', highlight: true, description: 'Relational data modeling, indexing, query planning, ACID compliance' },
        { name: 'PostGIS', level: 'Proficient', highlight: true, description: 'Spatial database extender for GIS objects and queries' },
        { name: 'MySQL', level: 'Proficient', description: 'Schema design, indexing, relational transactions' },
        { name: 'MongoDB', level: 'Proficient', description: 'NoSQL document storage, aggregation pipelines, schema flexibility' },
        { name: 'ObjectBox', level: 'Proficient', description: 'High-speed embedded mobile NoSQL database for Android' }
      ]
    },
    {
      title: 'Cloud & Infrastructure',
      iconName: 'Cloud',
      description: 'Production cloud services, networking, orchestration, and gateways.',
      skills: [
        { name: 'AWS (EC2, VPC, IAM, S3)', level: 'Advanced', highlight: true, description: 'Cloud architecture, security groups, IAM policies, object storage' },
        { name: 'AWS RDS & ALB', level: 'Advanced', highlight: true, description: 'Managed relational databases and Application Load Balancer routing' },
        { name: 'AWS Auto Scaling & ECR', level: 'Proficient', description: 'Dynamic capacity scaling and elastic container registry management' },
        { name: 'Docker & Docker Compose', level: 'Advanced', highlight: true, description: 'Multi-container staging & production stacks, container images' },
        { name: 'Kubernetes', level: 'Proficient', description: 'Cluster concepts, pods, deployments, service discovery' },
        { name: 'Linux', level: 'Advanced', highlight: true, description: 'Server administration, shell scripting, process management, permissions' },
        { name: 'Nginx & Certbot', level: 'Proficient', highlight: true, description: 'Reverse proxy, SSL/TLS termination, SSL auto-renewal, virtual hosts' }
      ]
    },
    {
      title: 'Monitoring & Observability',
      iconName: 'Activity',
      description: 'Telemetry, centralized logging, dashboards, and alerting.',
      skills: [
        { name: 'Prometheus', level: 'Proficient', highlight: true, description: 'Time-series metrics collection, scrape configs, PromQL' },
        { name: 'Grafana', level: 'Proficient', highlight: true, description: 'Custom monitoring dashboards, operational visibility, metric panels' },
        { name: 'Loki & Promtail', level: 'Proficient', highlight: true, description: 'Log aggregation, centralized log streams, querying' },
        { name: 'Alertmanager', level: 'Proficient', description: 'Alert routing, notification pipelines, operational escalation' },
        { name: 'CloudWatch', level: 'Proficient', description: 'AWS native metrics, log groups, alarms, and dashboards' }
      ]
    },
    {
      title: 'Security & Primitives',
      iconName: 'ShieldCheck',
      description: 'Cryptographic algorithms, secrets management, and access controls.',
      skills: [
        { name: 'AES-256-GCM', level: 'Advanced', highlight: true, description: 'Authenticated encryption for sensitive payload protection' },
        { name: 'IAM & RBAC', level: 'Advanced', description: 'Least privilege access, role-based authorization rules' },
        { name: 'TLS/SSL Infrastructure', level: 'Proficient', description: 'Encrypted communication, certificate issuance and lifecycle' },
        { name: 'Secrets Management', level: 'Proficient', description: 'Environment variables, secure config injection, key rotation' }
      ]
    },
    {
      title: 'Android Engineering',
      iconName: 'Smartphone',
      description: 'Native mobile development, UI frameworks, and data serialization.',
      skills: [
        { name: 'Android SDK', level: 'Advanced', highlight: true, description: 'Lifecycle, background tasks, native Android architecture' },
        { name: 'MVVM & MVI Architecture', level: 'Advanced', highlight: true, description: 'Unidirectional data flow, clean architecture, ViewModel & StateFlow' },
        { name: 'Google Ink API (Ink Compose)', level: 'Advanced', highlight: true, description: 'Digital ink stroke capture, smoothing, rendering' },
        { name: 'ProtoBuf (Protocol Buffers)', level: 'Advanced', highlight: true, description: 'Compact binary serialization for cross-device sync' },
        { name: 'Jetpack Libraries', level: 'Proficient', description: 'Room, Navigation, LiveData, StateFlow, Compose' }
      ]
    },
    {
      title: 'Software Development & Concepts',
      iconName: 'Cpu',
      description: 'Foundational computer science principles and software craftsmanship.',
      skills: [
        { name: 'Object-Oriented Programming (OOP)', level: 'Advanced', highlight: true, description: 'Solid principles, design patterns, encapsulation, polymorphism' },
        { name: 'Data Structures & Algorithms (DSA)', level: 'Advanced', highlight: true, description: 'Optimized space-time complexity, algorithms, graph/tree traversals' },
        { name: 'System Design & API Design', level: 'Advanced', highlight: true, description: 'Scalability, microservices, caching, rate limiting, idempotency' },
        { name: 'Performance Optimization & Debugging', level: 'Advanced', highlight: true, description: 'Profiling, query optimization, batch sync, memory diagnostics' },
        { name: 'Agile & DevOps Workflows', level: 'Proficient', description: 'Sprint cycles, CI/CD, Git, GitHub, Bitbucket, Jira' }
      ]
    }
  ] as SkillCategory[],

  resumes: [
    {
      id: 'general-sde',
      title: 'Software Development Engineer',
      focus: 'Backend / Cloud / Android / Full-Stack',
      filename: 'Vivek_R_SDE_Resume.pdf',
      path: '/resumes/VivekR.pdf',
      description: 'A detailed overview of my experience across backend engineering, cloud infrastructure, Android development, AI/ML, and system design.',
      highlights: [
        'Java · Kotlin · Python · Spring Boot · REST APIs · Microservices',
        'AWS · Docker · Kubernetes · Linux · Nginx · Prometheus · Grafana',
        'Android · MVVM · MVI · Jetpack · Google Ink API · ProtoBuf',
        'PostgreSQL · pgvector · MySQL · MongoDB · ObjectBox',
        'RAG · Vector Search · AI/ML · LLM Integration',
        'MCA · Bangalore Institute of Technology'
      ],
      selectedWork: [
        'SlickMachine',
        'AirVision',
        'PlateShare',
        'PoetByte'
      ]
    }
  ] as ResumeVersion[],

  educationList: [
    {
      id: 'mca-bit',
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Bangalore Institute of Technology',
      period: '11/2024 – 06/2026',
      score: 'CGPA: 9.16 / 10',
      location: 'Bengaluru, India',
      status: 'Completed with Academic Distinction',
      highlights: [
        'Advanced Data Structures & Algorithms',
        'Distributed Systems & Cloud Computing',
        'Database Management Systems & Spatial Indexing',
        'Software Architecture & System Design'
      ]
    },
    {
      id: 'bca-kdc',
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Krupanidhi Degree College',
      period: '06/2022 – 07/2024',
      score: 'CGPA: 9.41 / 10',
      location: 'Bengaluru, India',
      status: 'Completed with High Distinction',
      highlights: [
        'Object-Oriented Programming & Core Java',
        'Relational Databases & Web Technologies',
        'Software Engineering Principles'
      ]
    }
  ],

  achievements: [
    {
      id: 'krupadecon-coord',
      title: 'Student Coordinator — Krupadecon 2023 (International Conference)',
      organization: 'Krupanidhi Degree College',
      period: '2022 – 2023',
      metric: 'International Conference',
      category: 'Conference Leadership',
      description: 'Served as the Student Coordinator for Krupadecon 2023, an international academic conference, leading event operations, logistics, and speaker coordination.'
    },
    {
      id: 'element7-tech',
      title: "Student Coordinator — Element7's Technical Committee",
      organization: 'Department of Computer Applications',
      period: '2022 – 2024',
      metric: 'Technical Leadership',
      category: 'Student Committee',
      description: "Served as a Student Coordinator on Element7's Technical Committee, coordinating technical workshops, coding symposiums, and departmental initiatives."
    },
    {
      id: 'cultural-it-fests',
      title: 'Campus Cultural & IT Fest Events',
      organization: 'Inter-Collegiate Competitions',
      period: '2022 – 2024',
      metric: 'Campus Events',
      category: 'Extracurricular',
      description: 'Actively participated in events like Cultural fests, IT fests, and collegiate competitions throughout college.'
    }
  ] as Achievement[],

  education: {
    institution: 'Bangalore Institute of Technology',
    degree: 'Master of Computer Applications (MCA)',
    period: '11/2024 – 06/2026',
    score: 'CGPA: 9.16 / 10',
    location: 'Bengaluru, India',
    coursework: [
      'Advanced Data Structures & Algorithms',
      'Distributed Systems & Cloud Computing',
      'Database Management Systems & Spatial Indexing',
      'Software Architecture & System Design',
      'Computer Networks & Cryptographic Security'
    ]
  },

  poetbyteSection: {
    title: 'POETBYTE',
    tagline: 'A different side of me.',
    subtitle: 'Where literature meets craftsmanship in code',
    url: 'https://poetbyte.vercel.app/',
    description: 'Not everything needs to be engineered. Some things are meant to be felt, written, and remembered. PoetByte is my space for poetry, reflection, and creative expression.',
    frontConcept: 'CODE & SYSTEMS',
    backConcept: 'POETRY & CREATIVITY',
    quote: '"Lines of logic by day, stanzas of soul by night."'
  },

  contact: {
    name: 'Vivek R',
    title: 'Software Development Engineer',
    email: 'vivekgowda480@gmail.com',
    github: {
      username: 'Vivektheprogrammer',
      url: 'https://github.com/Vivektheprogrammer',
      label: 'GitHub / Open Source'
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/vivek-r-626b16217',
      label: 'LinkedIn Profile'
    },
    location: 'Bengaluru, India',
    availability: 'Feel free to reach out for technical discussions, open-source collaborations, or connecting.'
  },

  playground: {
    title: 'THE CHRONO LAB',
    subtitle: 'Experiments, ideas and things I am building',
    tagline: 'Interactive 3D mechanics, time sync simulation, and dial physics',
    status: 'Active Lab',
    experiments: [
      {
        id: 'realtime-horology',
        name: 'Real-Time Precision Escapement',
        type: '3D Simulation',
        description: 'Synchronizes the 3D watch hands to local system time with quartz-smooth or high-beat mechanical sweeping motion.'
      },
      {
        id: 'super-luminova',
        name: 'Super-LumiNova™ Night Mode',
        type: 'Lighting & Shaders',
        description: 'Simulates photoluminescent phosphorescence on hour markers and faceted hands under low-light ambient conditions.'
      },
      {
        id: 'caseback-exhibition',
        name: 'Exhibition Caseback Flip',
        type: 'Kinematics',
        description: 'Rotates the watch 180 degrees on its horizontal axis to inspect the engraved caseback and access PoetByte.'
      },
      {
        id: 'bezel-selector',
        name: 'Tactile Bezel Technology Index',
        type: 'Interactive Dial',
        description: 'Bi-directional click rotation that highlights distinct backend, cloud, and mobile competencies at 5-minute increments.'
      }
    ]
  },

  more: {
    title: 'CONTINUOUS EVOLUTION & DEPTH',
    subtitle: 'Architecture, Research & Engineering Principles',
    pillars: [
      {
        title: 'System Design & Scalability',
        description: 'Focus on horizontal scaling, event-driven architecture, resilient database transactions, and minimal latency.'
      },
      {
        title: 'Reliability Engineering',
        description: 'Production observability with Prometheus metrics, Grafana dashboards, structured Loki log streams, and proactive alert thresholds.'
      },
      {
        title: 'Security by Design',
        description: 'Defense in depth: TLS/SSL termination, AES-256-GCM encrypted payloads, JWT token rotation, and strict IAM boundaries.'
      }
    ]
  },

  future: {
    title: 'THE NEXT HOUR',
    subtitle: 'FUTURE HORIZONS',
    tagline: 'Some destinations are planned. Others are built along the way.',
    items: [
      "Systems I haven't built yet.",
      "Problems I haven't solved yet.",
      "Ideas I haven't explored yet.",
      "Stories I haven't written yet."
    ]
  }
};
