import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Layers,
  Calendar,
  BarChart3,
  ScanFace,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Star,
  Users,
  Award,
  Zap,
  Lock,
  Compass
} from 'lucide-react';
import { motion } from 'framer-motion';
import Hero3DCanvas from '../components/ThreeScene/Hero3DCanvas';
import FaceVerificationModal from '../components/FaceVerification/FaceVerificationModal';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [showFaceModal, setShowFaceModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const FAQS = [
    {
      q: "How does JobTrack organize my job applications?",
      a: "JobTrack provides a streamlined 3D dashboard, visual Kanban workflow, and automated status timelines (Applied, Under Review, Shortlisted, Interview, Offer, Selected) so you always know where every application stands."
    },
    {
      q: "Does JobTrack require a backend server or database?",
      a: "No! JobTrack is a pure frontend Single Page Application that stores all data safely in your browser's LocalStorage. No databases, no external backend tracking, and no server leaks."
    },
    {
      q: "How does the Face Lock camera verification work?",
      a: "JobTrack features a browser-based biometric face detection demo using your webcam or a built-in simulator. It analyzes face alignment in real-time. Notice: It is a frontend demonstration and does not transmit raw images."
    },
    {
      q: "Can I manage interview schedules with Google Meet or Zoom?",
      a: "Yes! JobTrack includes a full Interview Management center with automated countdown timers, interview round tracking (Technical, System Design, HR), and direct one-click meeting link launching."
    },
    {
      q: "Can I switch between Dark and Light mode?",
      a: "Absolutely. JobTrack supports an instantaneous global theme toggle that persists across page reloads, crafted with high-contrast readable typography in both modes."
    }
  ];

  const TESTIMONIALS = [
    {
      name: "Marcus Vance",
      role: "Senior Software Engineer @ Google",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
      content: "JobTrack completely turned my chaotic job hunt into a structured victory. The 3D Kanban board and interview countdown kept me calm and prepared through 15 interviews.",
      rating: 5
    },
    {
      name: "Elena Rostova",
      role: "Principal Product Designer @ Stripe",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      content: "The aesthetic quality and micro-interactions make tracking job offers delightful. Having local privacy with zero backend surveillance gave me total peace of mind.",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Staff Frontend Architect @ Microsoft",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      content: "The Face Lock camera verification demo is incredible to experience. The analytics dashboard gave me clear data on which resume versions had the highest conversion rate.",
      rating: 5
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '60px 24px 90px 24px',
          overflow: 'hidden',
          background: isDark
            ? 'radial-gradient(ellipse at 50% 20%, #151D32 0%, #0B1020 80%)'
            : 'radial-gradient(ellipse at 50% 20%, #EEF2FF 0%, #F5F7FF 80%)'
        }}
      >
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            alignItems: 'center',
            gap: '40px'
          }}
        >
          {/* Left Column: Headings & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Pill Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '30px',
                background: isDark ? 'rgba(79, 140, 255, 0.12)' : '#EEF2FF',
                border: '1px solid rgba(79, 140, 255, 0.3)',
                color: '#4F8CFF',
                fontSize: '0.825rem',
                fontWeight: '700',
                marginBottom: '20px'
              }}
            >
              <Sparkles size={14} />
              <span>Next-Generation 3D Career Intelligence</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
                fontWeight: '900',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: isDark ? '#FFFFFF' : '#172033',
                marginBottom: '20px'
              }}
            >
              Your Dream Job.{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                One Smart Dashboard.
              </span>
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                color: isDark ? '#A0AEC0' : '#475569',
                lineHeight: 1.6,
                marginBottom: '36px',
                maxWidth: '540px'
              }}
            >
              Manage your job applications, track interviews, and take control of your career
              journey with JobTrack.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link
                to={isAuthenticated ? '/dashboard' : '/register'}
                className="btn btn-primary btn-lg"
              >
                Get Started Free <ArrowRight size={18} />
              </Link>
              <a href="#features" className="btn btn-secondary btn-lg">
                Explore Features
              </a>
            </div>

            {/* Quick Demo Credentials Pill */}
            <div
              style={{
                marginTop: '24px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                color: isDark ? '#64748B' : '#64748B'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              <span>100% Client-side LocalStorage Persistence | No sign-up required to test</span>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D WebGL Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '440px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* 3D WebGL Canvas */}
            <Hero3DCanvas />

            {/* Floating 3D Cards Surrounding the 3D core */}
            <div
              className="glass-panel animate-float"
              style={{
                position: 'absolute',
                top: '10%',
                left: '-10px',
                padding: '12px 16px',
                borderRadius: '16px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#635BFF',
                  color: '#FFF',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                S
              </div>
              <div>
                <h5 style={{ fontSize: '0.825rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033' }}>
                  Stripe Offer Received
                </h5>
                <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: '700' }}>
                  $190,000 / yr • Accepted
                </span>
              </div>
            </div>

            <div
              className="glass-panel animate-float"
              style={{
                position: 'absolute',
                bottom: '12%',
                right: '-10px',
                padding: '12px 16px',
                borderRadius: '16px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                animationDelay: '1.5s'
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#06B6D4',
                  color: '#FFF',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                G
              </div>
              <div>
                <h5 style={{ fontSize: '0.825rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033' }}>
                  Google Interview
                </h5>
                <span style={{ fontSize: '0.7rem', color: '#38BDF8', fontWeight: '700' }}>
                  System Design Round
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section
        style={{
          padding: '40px 24px',
          background: isDark ? '#0F162A' : '#FFFFFF',
          borderTop: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
          borderBottom: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            textAlign: 'center'
          }}
        >
          <div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#4F8CFF', letterSpacing: '-0.02em' }}>
              12,400+
            </h3>
            <p style={{ fontSize: '0.9rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '4px' }}>
              Applications Tracked
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#8B5CF6', letterSpacing: '-0.02em' }}>
              85%
            </h3>
            <p style={{ fontSize: '0.9rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '4px' }}>
              Interview Success Rate
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#10B981', letterSpacing: '-0.02em' }}>
              4.9 / 5
            </h3>
            <p style={{ fontSize: '0.9rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '4px' }}>
              Job Seeker Rating
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#F59E0B', letterSpacing: '-0.02em' }}>
              850+
            </h3>
            <p style={{ fontSize: '0.9rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '4px' }}>
              Tech Companies Covered
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        style={{
          padding: '90px 24px',
          background: isDark ? '#0B1020' : '#F5F7FF'
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: '700',
                color: '#4F8CFF',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              Enterprise Career Platform
            </span>
            <h2
              style={{
                fontSize: '2.4rem',
                fontWeight: '900',
                color: isDark ? '#FFFFFF' : '#172033',
                marginTop: '10px'
              }}
            >
              Supercharge Every Stage of Your Search
            </h2>
            <p
              style={{
                fontSize: '1rem',
                color: isDark ? '#A0AEC0' : '#64748B',
                maxWidth: '600px',
                margin: '12px auto 0 auto'
              }}
            >
              Powerful tools designed to manage high-volume application cycles and convert offers.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px'
            }}
          >
            {/* Feature 1 */}
            <div className="card-3d" style={{ padding: '28px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #4F8CFF 0%, #3B82F6 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <Layers size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033', marginBottom: '8px' }}>
                3D Interactive Kanban Board
              </h3>
              <p style={{ fontSize: '0.9rem', color: isDark ? '#A0AEC0' : '#64748B', lineHeight: 1.5 }}>
                Drag and drop applications across 7 tailored lifecycle stages with automatic LocalStorage sync and victory confetti.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-3d" style={{ padding: '28px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <ScanFace size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033', marginBottom: '8px' }}>
                Face Lock Biometric Scanner
              </h3>
              <p style={{ fontSize: '0.9rem', color: isDark ? '#A0AEC0' : '#64748B', lineHeight: 1.5 }}>
                Futuristic camera face alignment, real-time video canvas HUD telemetry, and camera permission handling.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-3d" style={{ padding: '28px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #06B6D4 0%, #0284C7 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <Calendar size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033', marginBottom: '8px' }}>
                Interview Calendar & Countdown
              </h3>
              <p style={{ fontSize: '0.9rem', color: isDark ? '#A0AEC0' : '#64748B', lineHeight: 1.5 }}>
                Never miss an interview. Includes live preparation countdown timers, round notes, and Google Meet/Zoom shortcuts.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card-3d" style={{ padding: '28px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <BarChart3 size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033', marginBottom: '8px' }}>
                Dynamic Analytics & Insights
              </h3>
              <p style={{ fontSize: '0.9rem', color: isDark ? '#A0AEC0' : '#64748B', lineHeight: 1.5 }}>
                Interactive Recharts graphics for conversion rates, selection ratios, and application sources with zero hardcoded data.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card-3d" style={{ padding: '28px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <Lock size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033', marginBottom: '8px' }}>
                Zero-Server Local Privacy
              </h3>
              <p style={{ fontSize: '0.9rem', color: isDark ? '#A0AEC0' : '#64748B', lineHeight: 1.5 }}>
                Your resumes, notes, salary details, and interview thoughts remain exclusively inside your browser's private storage.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card-3d" style={{ padding: '28px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <Compass size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033', marginBottom: '8px' }}>
                Cross-Platform Filters & Search
              </h3>
              <p style={{ fontSize: '0.9rem', color: isDark ? '#A0AEC0' : '#64748B', lineHeight: 1.5 }}>
                Instantly filter by company, work mode (Remote/Hybrid), location, and salary, with real-time multi-criteria search.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        style={{
          padding: '90px 24px',
          background: isDark ? '#0F162A' : '#FFFFFF',
          borderTop: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: '700',
                color: '#8B5CF6',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              Proven Career Framework
            </span>
            <h2
              style={{
                fontSize: '2.4rem',
                fontWeight: '900',
                color: isDark ? '#FFFFFF' : '#172033',
                marginTop: '10px'
              }}
            >
              How It Works
            </h2>
            <p style={{ fontSize: '1rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '8px' }}>
              Four simple steps from job application to final offer acceptance.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px'
            }}
          >
            {/* Step 1 */}
            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: isDark ? '#151D32' : '#F8FAFC',
                border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
                position: 'relative'
              }}
            >
              <span
                style={{
                  fontSize: '2.8rem',
                  fontWeight: '900',
                  color: '#4F8CFF',
                  opacity: 0.35,
                  display: 'block',
                  marginBottom: '10px'
                }}
              >
                01
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033', marginBottom: '8px' }}>
                Step 1: Add Your Job Applications
              </h4>
              <p style={{ fontSize: '0.875rem', color: isDark ? '#A0AEC0' : '#64748B', lineHeight: 1.5 }}>
                Record company details, salary expectations, application URLs, and specific resume versions used.
              </p>
            </div>

            {/* Step 2 */}
            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: isDark ? '#151D32' : '#F8FAFC',
                border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
                position: 'relative'
              }}
            >
              <span
                style={{
                  fontSize: '2.8rem',
                  fontWeight: '900',
                  color: '#8B5CF6',
                  opacity: 0.35,
                  display: 'block',
                  marginBottom: '10px'
                }}
              >
                02
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033', marginBottom: '8px' }}>
                Step 2: Track Your Application Status
              </h4>
              <p style={{ fontSize: '0.875rem', color: isDark ? '#A0AEC0' : '#64748B', lineHeight: 1.5 }}>
                Move cards seamlessly on the 3D Kanban board or view details through interactive visual progress timelines.
              </p>
            </div>

            {/* Step 3 */}
            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: isDark ? '#151D32' : '#F8FAFC',
                border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
                position: 'relative'
              }}
            >
              <span
                style={{
                  fontSize: '2.8rem',
                  fontWeight: '900',
                  color: '#06B6D4',
                  opacity: 0.35,
                  display: 'block',
                  marginBottom: '10px'
                }}
              >
                03
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033', marginBottom: '8px' }}>
                Step 3: Manage Your Interviews
              </h4>
              <p style={{ fontSize: '0.875rem', color: isDark ? '#A0AEC0' : '#64748B', lineHeight: 1.5 }}>
                Sync technical interview dates, organize preparation notes, and monitor live round countdown timers.
              </p>
            </div>

            {/* Step 4 */}
            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: isDark ? '#151D32' : '#F8FAFC',
                border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
                position: 'relative'
              }}
            >
              <span
                style={{
                  fontSize: '2.8rem',
                  fontWeight: '900',
                  color: '#10B981',
                  opacity: 0.35,
                  display: 'block',
                  marginBottom: '10px'
                }}
              >
                04
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033', marginBottom: '8px' }}>
                Step 4: Achieve Your Career Goals
              </h4>
              <p style={{ fontSize: '0.875rem', color: isDark ? '#A0AEC0' : '#64748B', lineHeight: 1.5 }}>
                Compare offers, celebrate final selection milestones, and analyze your job search velocity with deep analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section
        id="testimonials"
        style={{
          padding: '90px 24px',
          background: isDark ? '#0B1020' : '#F5F7FF'
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: '700',
                color: '#10B981',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              Candidate Stories
            </span>
            <h2
              style={{
                fontSize: '2.4rem',
                fontWeight: '900',
                color: isDark ? '#FFFFFF' : '#172033',
                marginTop: '10px'
              }}
            >
              Trusted by Top Tech Professionals
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px'
            }}
          >
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="card-3d" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p style={{ fontSize: '0.925rem', color: isDark ? '#E2E8F0' : '#334155', lineHeight: 1.6, marginBottom: '20px' }}>
                  "{t.content}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033' }}>
                      {t.name}
                    </h5>
                    <span style={{ fontSize: '0.75rem', color: isDark ? '#A0AEC0' : '#64748B' }}>
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section
        id="faq"
        style={{
          padding: '90px 24px',
          background: isDark ? '#0F162A' : '#FFFFFF',
          borderTop: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: '700',
                color: '#4F8CFF',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              Frequently Asked Questions
            </span>
            <h2
              style={{
                fontSize: '2.4rem',
                fontWeight: '900',
                color: isDark ? '#FFFFFF' : '#172033',
                marginTop: '10px'
              }}
            >
              Got Questions? We Have Answers.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    borderRadius: '14px',
                    background: isDark ? '#151D32' : '#F8FAFC',
                    border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    style={{
                      width: '100%',
                      padding: '18px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontWeight: '700',
                      fontSize: '0.975rem',
                      color: isDark ? '#FFFFFF' : '#172033',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      color={isDark ? '#A0AEC0' : '#64748B'}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: '0 20px 20px 20px',
                        fontSize: '0.875rem',
                        color: isDark ? '#A0AEC0' : '#64748B',
                        lineHeight: 1.6
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)',
          color: '#FFFFFF',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Ready to Take Control of Your Career?
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '32px' }}>
            Join thousands of smart job seekers tracking applications, preparing for technical rounds, and securing dream offers with JobTrack.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="btn btn-lg"
              style={{
                background: '#FFFFFF',
                color: '#4F8CFF',
                fontWeight: '700',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
              }}
            >
              Open Dashboard Now <ArrowRight size={18} />
            </Link>
            <button
              onClick={() => setShowFaceModal(true)}
              className="btn btn-lg"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.3)'
              }}
            >
              <ScanFace size={18} /> Try Face Lock Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '50px 24px 30px 24px',
          background: isDark ? '#070A14' : '#111827',
          color: '#A0AEC0',
          borderTop: '1px solid #1A243D'
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF'
                }}
              >
                <Briefcase size={18} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFF' }}>
                JobTrack
              </span>
            </div>

            <div style={{ display: 'flex', gap: '24px', fontSize: '0.85rem' }}>
              <a href="#features" style={{ color: '#A0AEC0' }}>Features</a>
              <a href="#how-it-works" style={{ color: '#A0AEC0' }}>How It Works</a>
              <a href="#testimonials" style={{ color: '#A0AEC0' }}>Reviews</a>
              <a href="#faq" style={{ color: '#A0AEC0' }}>FAQ</a>
              <Link to="/security" style={{ color: '#A0AEC0' }}>Privacy & Security</Link>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: '#64748B',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            <p>© {new Date().getFullYear()} JobTrack Platform Inc. All rights reserved.</p>
            <p>Frontend Demonstration Application • LocalStorage Data Only</p>
          </div>
        </div>
      </footer>

      {/* Face Verification Modal instance */}
      <FaceVerificationModal
        isOpen={showFaceModal}
        onClose={() => setShowFaceModal(false)}
        onSuccess={() => {
          setShowFaceModal(false);
          navigate('/dashboard');
        }}
      />
    </div>
  );
}
