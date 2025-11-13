// src/components/LandingPage.tsx
import { useState } from 'react';
import BoxLogo from './BoxLogo';
import { Button } from './ui/button';
import {
    Upload,
    ArrowLeftRight,
    Instagram,
    Linkedin,
    Menu,
    X,
    Shield,
    Recycle,
    Lightbulb,
    Users,
    Target,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import './LandingPage.css';

interface LandingPageProps {
    navigateTo: (screen: string) => void;
}

export default function LandingPage({ navigateTo }: LandingPageProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    const handleGetStarted = () => {
        navigateTo('login');
    };

    return (
        <div className="landing-page">
            {/* Top Navigation */}
            <nav className="landing-nav">
                <div className="landing-nav-inner">
                    {/* Left – Logo */}
                    <div className="landing-nav-left">
                        <BoxLogo size={28} />
                    </div>

                    {/* Center – Links */}
                    <div className="landing-nav-center">
                        <button
                            onClick={() => scrollToSection('about')}
                            className="landing-nav-link"
                        >
                            About
                        </button>
                        <span className="landing-nav-dot">·</span>
                        <button
                            onClick={() => scrollToSection('how-it-works')}
                            className="landing-nav-link"
                        >
                            How It Works
                        </button>
                        <span className="landing-nav-dot">·</span>
                        <button
                            onClick={() => scrollToSection('circles')}
                            className="landing-nav-link"
                        >
                            Circles
                        </button>
                        <span className="landing-nav-dot">·</span>
                        <button
                            onClick={() => scrollToSection('footer')}
                            className="landing-nav-link"
                        >
                            Contact
                        </button>
                    </div>

                    {/* Right – CTA + Mobile menu */}
                    <div className="landing-nav-right">
                        <Button
                            onClick={handleGetStarted}
                            className="landing-cta-button"
                        >
                            Get Started
                        </Button>

                        <button
                            className="landing-nav-menu-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile nav drawer */}
                {mobileMenuOpen && (
                    <div className="landing-nav-mobile">
                        <button
                            onClick={() => scrollToSection('about')}
                            className="landing-nav-mobile-link"
                        >
                            About
                        </button>
                        <button
                            onClick={() => scrollToSection('how-it-works')}
                            className="landing-nav-mobile-link"
                        >
                            How It Works
                        </button>
                        <button
                            onClick={() => scrollToSection('circles')}
                            className="landing-nav-mobile-link"
                        >
                            Circles
                        </button>
                        <button
                            onClick={() => scrollToSection('footer')}
                            className="landing-nav-mobile-link"
                        >
                            Contact
                        </button>
                    </div>
                )}
            </nav>

            {/* Hero */}
            <section className="landing-hero">
                <div className="landing-hero-inner">
                    <div className="landing-hero-left">
                        <h1 className="landing-hero-title">
                            Turn Extras Into Essentials.
                        </h1>
                        <p className="landing-hero-subtitle">
                            A campus-first marketplace built to help students trade smarter,
                            declutter faster, and create a circular economy.
                        </p>

                        <div className="landing-hero-actions">
                            <Button
                                onClick={handleGetStarted}
                                className="landing-hero-primary-btn"
                            >
                                Get Started
                            </Button>
                            <button
                                onClick={() => scrollToSection('circles')}
                                className="landing-hero-secondary-link"
                            >
                                Explore Snag Circles
                            </button>
                        </div>
                    </div>

                    <div className="landing-hero-right">
                        <div className="landing-hero-device-shell">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1722834228772-01d16b9bf83b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwc2NyZWVuJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2Mjk5ODgwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="Snag App Interface"
                                className="landing-hero-device-image"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Who we are */}
            <section id="about" className="landing-section landing-about">
                <div className="landing-section-inner landing-about-inner">
                    <div className="landing-section-heading">
                        <h2 className="landing-heading-xl">
                            Built by Students at the University of Illinois Chicago
                        </h2>
                    </div>

                    <div className="landing-about-grid">
                        <div className="landing-about-card">
                            <p>
                                Snag was created by UIC students who saw how much time, money,
                                and effort gets wasted during move-out season, semester
                                turnovers, and campus life transitions. We're building a
                                sustainable, student-first marketplace that redefines how items
                                move across campus.
                            </p>
                        </div>

                        <div className="landing-about-image-card">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1758270705518-b61b40527e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwdGVhbSUyMHVuaXZlcnNpdHl8ZW58MXx8fHwxNjMwMDU1NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="UIC Students"
                                className="landing-about-image"
                            />
                        </div>
                    </div>

                    <div className="landing-founders-grid">
                        {founders.map((founder, index) => (
                            <div key={index} className="landing-founder-card">
                                <div className="landing-founder-avatar">
                                    {founder.initials}
                                </div>
                                <h3>{founder.name}</h3>
                                <p>Co-Creator of Snag</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how-it-works" className="landing-section">
                <div className="landing-section-inner">
                    <h2 className="landing-heading-xl center">
                        How Snag Works
                    </h2>

                    <div className="landing-how-grid">
                        <div className="landing-how-card">
                            <div className="landing-how-icon">
                                <Upload size={32} />
                            </div>
                            <h3>Post in Seconds</h3>
                            <p>
                                Snap a photo, add a few details, choose a pickup spot — done.
                            </p>
                        </div>

                        <div className="landing-how-card">
                            <div className="landing-how-icon">
                                <Shield size={32} />
                            </div>
                            <h3>Safe & Verified</h3>
                            <p>
                                Meet at campus-approved spots, view trust scores, and stay
                                protected.
                            </p>
                        </div>

                        <div className="landing-how-card">
                            <div className="landing-how-icon">
                                <ArrowLeftRight size={32} />
                            </div>
                            <h3>Smart Trading</h3>
                            <p>
                                Use credits or essentials to trade — no cash required.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Circles */}
            <section id="circles" className="landing-section landing-circles">
                <div className="landing-section-inner">
                    <div className="landing-section-heading center">
                        <h2 className="landing-heading-xl">
                            Snag Circles — Trade in Groups That Matter
                        </h2>
                        <p className="landing-section-subtitle">
                            Join public circles or create your own to trade within clubs, dorm
                            floors, majors, or interest groups. Keep exchanges relevant, fast,
                            and trusted.
                        </p>
                    </div>

                    <div className="landing-circles-grid">
                        {sampleCircles.map((circle, index) => (
                            <div key={index} className="landing-circle-card">
                                <div
                                    className={`landing-circle-icon ${circle.colorClass}`}
                                >
                                    <circle.icon size={22} />
                                </div>
                                <h4>{circle.name}</h4>
                                <p>{circle.members} members</p>
                            </div>
                        ))}
                    </div>

                    <div className="landing-circles-cta">
                        <Button
                            onClick={handleGetStarted}
                            className="landing-circles-button"
                        >
                            Explore Circles
                        </Button>
                    </div>
                </div>
            </section>

            {/* Sustainability */}
            <section className="landing-section landing-sustain">
                <div className="landing-section-inner">
                    <div className="landing-sustain-card">
                        <h2 className="landing-heading-xl center">
                            Why Snag Matters
                        </h2>
                        <p className="landing-section-subtitle center">
                            Every item traded, reused, or repurposed reduces waste and
                            lightens your move-out load. We aim to solve the growing problem
                            of waste on college campuses by helping students exchange what
                            they no longer need with those who do.
                        </p>

                        <div className="landing-sustain-icons">
                            <div className="landing-sustain-icon-block">
                                <div className="landing-sustain-icon">
                                    <Recycle size={32} />
                                </div>
                                <span>Reuse</span>
                            </div>
                            <div className="landing-sustain-icon-block">
                                <div className="landing-sustain-icon">
                                    <Target size={32} />
                                </div>
                                <span>Reduce</span>
                            </div>
                            <div className="landing-sustain-icon-block">
                                <div className="landing-sustain-icon">
                                    <Lightbulb size={32} />
                                </div>
                                <span>Rethink</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="landing-section landing-final-cta">
                <div className="landing-final-card">
                    <h2>
                        Join thousands of students building a circular campus economy.
                    </h2>
                    <Button
                        onClick={handleGetStarted}
                        className="landing-final-button"
                    >
                        Get Started
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer id="footer" className="landing-footer">
                <div className="landing-footer-inner">
                    <div className="landing-footer-left">
                        <BoxLogo size={24} />
                    </div>

                    <div className="landing-footer-links">
                        <button>About</button>
                        <span>·</span>
                        <button>Contact</button>
                        <span>·</span>
                        <button>Terms</button>
                        <span>·</span>
                        <button>Privacy</button>
                    </div>

                    <div className="landing-footer-social">
                        <button>
                            <Instagram size={18} />
                        </button>
                        <button>
                            <Linkedin size={18} />
                        </button>
                    </div>
                </div>

                <div className="landing-footer-bottom">
                    © 2025 Snag — Made by students, for students.
                </div>
            </footer>
        </div>
    );
}

// Founders Data
const founders = [
    { initials: 'HB', name: 'Humza Bukhari' },
    { initials: 'JL', name: 'Joshua Luce' },
    { initials: 'JM', name: 'Joonyoung Ma' },
    { initials: 'YN', name: 'Yamaan Nandolia' },
];

// Sample Circles Data (with CSS color classes)
const sampleCircles = [
    {
        name: 'Dorm 3A',
        members: 45,
        icon: Users,
        colorClass: 'circle-blue',
    },
    {
        name: 'Film Club',
        members: 28,
        icon: Users,
        colorClass: 'circle-pink',
    },
    {
        name: 'Movers Circle',
        members: 156,
        icon: Users,
        colorClass: 'circle-green',
    },
    {
        name: 'UIUC Carpool',
        members: 92,
        icon: Users,
        colorClass: 'circle-orange',
    },
    {
        name: 'CS Majors',
        members: 203,
        icon: Users,
        colorClass: 'circle-purple',
    },
    {
        name: 'Study Abroad',
        members: 67,
        icon: Users,
        colorClass: 'circle-indigo',
    },
];