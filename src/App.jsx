import { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Shield,
  BarChart,
  Globe,
  CheckCircle,
  Clock,
  Play,
  ArrowRight,
  Server,
  DollarSign,
  Handshake,
  Linkedin,
  UsersIcon,
  Menu,
  X,
  Terminal,
  Rocket,
  Check,
  BookOpen,
  Zap
} from 'lucide-react';
import { CONTRACTS, CONTRACT_META } from './ContractData';

const logoFull = '/logo-full.png';
const gmailLogo = '/128px-Gmail_icon_(2020).svg.png';
const outlookLogo = '/outlook-2018-2024.png';
const smartleadLogo = '/smartlead-256.png';
const instantlyLogo = '/instantly-256.png';
const apolloLogo = '/apollo-256.png';
const clayLogo = '/clay-128.png';
const smartleadWebp = '/smartlead-256.webp';
const instantlyWebp = '/instantly-256.webp';
const apolloWebp = '/apollo-256.webp';
const clayWebp = '/clay-128.webp';

const Maps = {
  techStack: [
    { src: gmailLogo, name: 'Google', link: null },
    { src: outlookLogo, name: 'Outlook', link: null },
    { src: smartleadLogo, webp: smartleadWebp, name: 'Smartlead.ai', link: 'https://smartlead.ai/?via=Ezostech' },
    { src: instantlyLogo, webp: instantlyWebp, name: 'Instantly.ai', link: 'https://refer.instantly.ai/dg8s778m788s' },
    { src: apolloLogo, webp: apolloWebp, rounded: true, name: 'Apollo.io', link: 'https://get.apollo.io/iqddk9ag07xh' },
    { src: clayLogo, webp: clayWebp, name: 'Clay', link: null }
  ],
  testimonials: [
    { quote: 'The infrastructure EZOS built scaled our cold email from 500 to 5,000 sends per day without touching spam folders.', author: 'Andrew Scott Easton', role: 'Founder & CEO of Master Mined' },
    { quote: 'Finally, a team that understands deliverability is engineering. 98% inbox rate consistently.', author: 'Alexander White', role: 'Founder, GrowthLabs' },
    { quote: 'Transparent, technical, and results-driven. EZOS handles the infrastructure so we can focus on messaging.', author: 'Julian Nevin', role: 'Founder & CEO of CoWorkly' }
  ],
  tutorialModules: [
    { number: '01', title: 'The Math of Volume', description: 'Revenue math, safe send caps, and horizontal scaling basics.', duration: '2:35', difficulty: 'Foundational', videoId: '23VoMEAnw7s' },
    { number: '02', title: 'Domains & Structure', description: 'Satellite domains, safe redirects, and extension best practices.', duration: '1:40', difficulty: 'Technical', videoId: 'bkN9aegrFX4' },
    { number: '03', title: 'DNS Authentication', description: 'SPF, DKIM, and DMARC setup essentials.', duration: '0:55', difficulty: 'Technical', videoId: '_RtmrBxFdS0' },
    { number: '04', title: 'Operations & Warm-up', description: 'Sending tools, warm-up protocol, and verified leads.', duration: '4:28', difficulty: 'Technical', videoId: 'M4PgtaXIvZg' }
  ],
  pricingAddons: [
    { icon: Mail, text: 'Additional inboxes: $6 each/month' },
    { icon: Globe, text: 'Additional domains: $15 each/year' },
    { icon: Linkedin, text: 'LinkedIn outreach sync: $750/mo' },
    { icon: DollarSign, text: 'Extra sequence/angle: $600 each' },
    { icon: Clock, text: 'Deliverability deep-dive audit: $500 one-off' },
    { icon: UsersIcon, text: 'Team training and SOPs (2 hrs): $450' },
    { icon: Handshake, text: 'Prep sprint (ICP/offer/copy, 2 weeks): $1,900' }
  ],
  howItWorksFaqs: [
    { question: 'Who is this for?', answer: 'Best for businesses with a broad national or global audience (TAM of 50k+ contacts). If your market is tiny, this engine is too powerful for you.' },
    { question: 'What plan sizes do you offer?', answer: '70 / 100 / 150 active inboxes. Each plan includes a 1:1 rotation (standby), so total inboxes are double (e.g., 70 active = 140 total).' },
    { question: 'Who writes the emails?', answer: 'DIY: you write the emails. Managed Infra + Data / Inbox Management: we write the sequences; you approve before sending.' },
    { question: 'Who handles replies and bookings?', answer: 'DIY / Managed Infra + Data: your team handles replies and bookings. Inbox Management: we qualify replies and book calls; you close.' },
    { question: 'When do we start sending?', answer: 'We do not send before day 14. Days 0-14 are warm-up only.' },
    { question: 'How fast do you ramp after day 14?', answer: 'Day 15-16 ~ 1 send per inbox per day, day 17-18 ~ 3-5, day 19-21 ~ 8-10, day 22+ ~ 12-15 (adjusted by health and placement).' },
    { question: 'Why mix Google and Microsoft?', answer: 'We run a mix of Google Workspace and Microsoft 365 for variation. Provider matching can improve inbox placement and reduce fingerprint risk.' },
    { question: 'How many inboxes per domain?', answer: 'Typically 3 inboxes per domain. This balances volume and domain reputation.' },
    { question: 'What about infra costs?', answer: 'Included. Mailboxes and domains needed for your chosen plan are covered in the package price.' },
    { question: 'Can we add capacity later?', answer: 'Yes. Additional inboxes are $6 each/month and additional domains are $15 each/year.' },
    { question: 'What is your minimum offer value?', answer: 'We do not take on businesses with services under $5,000. Below that, unit economics are better with DIY.' },
    { question: 'Is B2B cold email legal?', answer: 'Targeted, relevant B2B outreach with a clear opt-out is generally permitted. We honor opt-outs immediately.' },
    { question: 'Where do the leads come from?', answer: 'Verified data from reputable sources, filtered by role/title, firmographics, regions, and exclusions.' },
    { question: 'What results should we expect?', answer: 'We engineer for inbox placement and qualified replies. Meeting volume depends on ICP fit, offer strength, and your sales follow-up.' },
    { question: 'How do you report progress?', answer: 'DIY: monthly health summary. Managed/Inbox Management: weekly snapshot on volume, replies, meetings booked.' },
    { question: 'Do you integrate with our CRM or calendar?', answer: 'Yes. Calendar links, routing rules, and light CRM handoff are supported.' },
    { question: 'What is the commitment?', answer: 'Monthly retainer with a 30-day notice period unless otherwise agreed in the SOW.' },
    { question: 'What do you need from us to start?', answer: 'ICP, offer proof, calendar/CRM preferences, copy approval (or your draft if DIY), and a closer ready to take calls.' }
  ]
};

const PRICING_DATA = {
  DIY: {
    subtitle: 'Setup + Health - You Run It',
    commitment: '3-Month Minimum Commitment for DIY Plans',
    plans: [
      {
        name: 'DIY-70',
        setupFee: '$2,000 Setup fee',
        price: '$1,500',
        period: '/ Month',
        features: [
          'Capacity: 70 active + 70 redundancy (140 total)',
          'Up to 47 domains included',
          'Weekly deliverability snapshot',
          'Ticketed support (24-48h)'
        ]
      },
      {
        name: 'DIY-100',
        setupFee: '$2,500 Setup fee',
        price: '$1,900',
        period: '/ Month',
        features: [
          'Capacity: 100 active + 100 redundancy (200 total)',
          'Up to 67 domains included',
          'Weekly deliverability snapshot',
          'Ticketed support (24-48h)'
        ],
        highlighted: true
      },
      {
        name: 'DIY-150',
        setupFee: '$3,000 Setup fee',
        price: '$2,200',
        period: '/ Month',
        features: [
          'Capacity: 150 active + 150 redundancy (300 total)',
          'Up to 100 domains included',
          'Weekly deliverability snapshot',
          'Ticketed support (24-48h)'
        ]
      }
    ]
  },
  ENGINE: {
    subtitle: 'We Run The Machine (Your Team Replies)',
    whatYouGet: [
      'Everything in DIY',
      'Verified data: 3k - 10k contacts/month aligned to ICP',
      'Live sequences (2) + 1 experimental angle; you approve',
      'Daily health checks, inbox swaps, bounce guardrails',
      'Weekly A/Bs; monthly angle review',
      'Reporting: weekly snapshot + fortnightly optimization call'
    ],
    plans: [
      {
        name: 'ENGINE-70',
        setupFee: '$2,000 Setup fee',
        price: '$5,000',
        period: '/ Month',
        features: [
          'Capacity: 70 active + 70 redundancy',
          '3k - 5K verified contacts/month',
          '2 live sequences + 1 test running',
          'Calendar/CRM handoff (light)'
        ]
      },
      {
        name: 'ENGINE-100',
        setupFee: '$2,500 Setup fee',
        price: '$6,250',
        period: '/ Month',
        features: [
          'Capacity: 100 active + 100 redundancy',
          '5k - 7.5K verified contacts/month',
          '2 live sequences + 1 test running',
          'Calendar/CRM handoff (light)'
        ],
        highlighted: true
      },
      {
        name: 'ENGINE-150',
        setupFee: '$3,000 Setup fee',
        price: '$8,250',
        period: '/ Month',
        features: [
          'Capacity: 150 active + 150 redundancy',
          '7.5k - 10K verified contacts/month',
          '2 live sequences + 1 test running',
          'Calendar/CRM handoff (light)'
        ]
      }
    ]
  },
  SCALE: {
    subtitle: 'We Write, Reply, And Book (You Close)',
    whatYouGet: [
      'Everything in ENGINE',
      'Reply handling with SLA (<=4 hrs UK time)',
      'Qualification against your must-haves',
      'Booking, routing, reschedules, show-rate workflows',
      'Light nurture for "not now" + transcripts/QA',
      'Weekly ops call; shared Slack/Teams channel'
    ],
    plans: [
      {
        name: 'SCALE-70',
        setupFee: '$5,000 Setup fee',
        price: '$9,500',
        period: '/ Month',
        features: [
          'Capacity: 70 active + 70 redundancy',
          '5k verified contacts/month',
          'End-to-end inbox management + booking'
        ]
      },
      {
        name: 'SCALE-100',
        setupFee: '$6,000 Setup fee',
        price: '$11,500',
        period: '/ Month',
        features: [
          'Capacity: 100 active + 100 redundancy',
          '5k - 10k verified contacts/month',
          'End-to-end inbox management + booking'
        ],
        highlighted: true
      },
      {
        name: 'SCALE-150',
        setupFee: '$7,000 Setup fee',
        price: '$14,500',
        period: '/ Month',
        features: [
          'Capacity: 150 active + 150 redundancy',
          '10k - 15K verified contacts/month',
          'End-to-end inbox management + booking'
        ]
      }
    ]
  }
};

const useCountUp = (end, duration = 2000, startOnMount = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const countRef = useRef(null);

  const startCounting = () => {
    if (hasStarted) return;
    setHasStarted(true);

    const startTime = Date.now();
    const endValue = typeof end === 'number' ? end : parseFloat(end.replace(/[^0-9.]/g, ''));

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * endValue);

      setCount(currentValue);

      if (progress < 1) {
        countRef.current = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    countRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (startOnMount) {
      const timer = setTimeout(startCounting, 300);
      return () => {
        clearTimeout(timer);
        if (countRef.current) cancelAnimationFrame(countRef.current);
      };
    }
  }, []);

  return { count, startCounting };
};

const Typewriter = ({ lines, speed = 30, lineDelay = 500 }) => {
  const [displayedCounts, setDisplayedCounts] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      return;
    }

    const currentLine = lines[currentLineIndex] || [];
    const currentLineText = currentLine.map(segment => segment.text).join('');

    if (currentCharIndex < currentLineText.length) {
      const timer = setTimeout(() => {
        setDisplayedCounts(prev => {
          const next = [...prev];
          next[currentLineIndex] = currentCharIndex + 1;
          return next;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrentLineIndex(prev => prev + 1);
      setCurrentCharIndex(0);
    }, lineDelay);
    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, lines, speed, lineDelay]);

  return (
    <div className="font-mono text-xs md:text-sm space-y-1">
      {lines.map((line, idx) => {
        const count = displayedCounts[idx];
        if (count === undefined) return null;
        let remaining = count;
        return (
          <p key={idx} className="text-white">
            {line.map((segment, segIdx) => {
              if (remaining <= 0) return null;
              const take = Math.min(remaining, segment.text.length);
              const text = segment.text.slice(0, take);
              remaining -= take;
              return text ? (
                <span key={segIdx} className={segment.className}>
                  {text}
                </span>
              ) : null;
            })}
          </p>
        );
      })}
      {isTyping && (
        <p className="text-white inline">&gt; <span className="animate-pulse">_</span></p>
      )}
    </div>
  );
};

const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(40px)';
      case 'down':
        return 'translateY(-40px)';
      case 'left':
        return 'translateX(40px)';
      case 'right':
        return 'translateX(-40px)';
      default:
        return 'translateY(40px)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) translateX(0)' : getTransform(),
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
      }}
    >
      {children}
    </div>
  );
};

const SpotlightCard = ({ children, className = '' }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative card-sheen ${className}`}
      style={{
        background: isHovered
          ? `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(124,58,237,0.1), transparent 40%)`
          : 'transparent',
        transition: 'background 0.2s ease'
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(63,63,70,0.6), rgba(24,24,27,0.9))',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
          padding: '1px'
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

const VideoPlayer = ({ videoId, title = 'Video', aspectRatio = '16/9', className = '' }) => {
  if (videoId) {
    return (
      <div className={`relative w-full rounded-2xl overflow-hidden border border-zinc-800 ${className}`} style={{ aspectRatio }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50 group cursor-pointer hover:border-primary/50 transition-all duration-300 ${className}`}
      style={{ aspectRatio }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150 group-hover:scale-175 transition-transform duration-500" />
          <div className="relative w-20 h-20 rounded-full bg-zinc-900 border-2 border-primary/50 flex items-center justify-center group-hover:border-primary group-hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(124,58,237,0.3)]">
            <Play className="w-8 h-8 text-primary ml-1" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <p className="text-sm text-zinc-500 font-mono">Coming Soon</p>
      </div>
    </div>
  );
};

const BootSequence = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    'INITIALIZING CORE...',
    'LOADING_MODULE: [DNS_VERIFICATION]',
    'LOADING_MODULE: [SMTP_ROTATION]',
    'ESTABLISHING_SECURE_CONNECTION...',
    'SYSTEM_READY'
  ];

  useEffect(() => {
    if (step >= steps.length) {
      const doneTimer = setTimeout(onComplete, 800);
      return () => clearTimeout(doneTimer);
    }

    const timer = setTimeout(() => {
      setStep((current) => current + 1);
    }, 400);

    return () => clearTimeout(timer);
  }, [step, onComplete, steps.length]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-mono text-sm"
      aria-hidden="true"
      data-nosnippet
    >
      <div className="w-64 space-y-1">
        {steps.map((text, index) => {
          const isVisible = index <= step;
          const isFinal = index === steps.length - 1;
          return (
            <div
              key={text}
              className={isFinal ? 'text-primary' : 'text-zinc-300'}
              style={{ visibility: isVisible ? 'visible' : 'hidden' }}
            >
              <span className="mr-2">&gt;</span>
              {text}
            </div>
          );
        })}
        {step < steps.length && (
          <span className="animate-pulse text-primary">_</span>
        )}
      </div>
    </div>
  );
};

const AnimatedStat = ({ value, suffix = '', label }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const { count } = useCountUp(numericValue, 2000);
  const displayValue = value.includes(',') ? count.toLocaleString() : count;

  return (
    <div className="text-center">
      <p className="font-mono text-3xl font-bold text-foreground lg:text-4xl">{displayValue}{suffix}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

const MiniStat = ({ value, suffix = '', label }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const { count } = useCountUp(numericValue, 1600);
  const displayValue = value.includes(',') ? count.toLocaleString() : count;

  return (
    <div className="text-center">
      <p className="font-mono text-lg font-semibold text-foreground">{displayValue}{suffix}</p>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
    </div>
  );
};

const InfiniteMarquee = ({ items }) => {
  const marqueeItems = [...items, ...items];

  return (
    <div className="relative max-w-5xl mx-auto overflow-hidden px-2">
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-card via-card to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-card via-card to-transparent z-10 pointer-events-none" />
      <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
        {marqueeItems.map((tech, idx) => {
          const content = (
            <>
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl md:rounded-2xl bg-zinc-900 border border-zinc-800/50 shadow-lg shadow-black/20 group-hover:border-primary/30 group-hover:shadow-primary/5 group-hover:shadow-xl transition-all duration-500">
                {tech.webp ? (
                  <picture>
                    <source srcSet={tech.webp} type="image/webp" />
                    <img
                      src={tech.src}
                      alt={tech.name}
                      loading="lazy"
                      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ${tech.rounded ? 'rounded-md md:rounded-lg' : ''}`}
                    />
                  </picture>
                ) : (
                  <img
                    src={tech.src}
                    alt={tech.name}
                    loading="lazy"
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ${tech.rounded ? 'rounded-md md:rounded-lg' : ''}`}
                  />
                )}
              </div>
              <span className="mt-3 md:mt-4 text-[10px] md:text-sm font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300 whitespace-nowrap">{tech.name}</span>
            </>
          );

          return tech.link ? (
            <a key={`${tech.name}-${idx}`} href={tech.link} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center px-3 md:px-10">
              {content}
            </a>
          ) : (
            <div key={`${tech.name}-${idx}`} className="group flex flex-col items-center justify-center px-3 md:px-10">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GradientDivider = ({ className = '' }) => (
  <div className={`h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent ${className}`} />
);

const ComparisonSection = () => {
  const rows = [
    { feature: 'Domain Ownership', agency: 'They Own', inHouse: 'You Own', ezos: 'You Own' },
    { feature: 'Setup Time', agency: '4-8 Weeks', inHouse: '8-12 Weeks', ezos: '14 Days' },
    { feature: 'Inbox Rotation', agency: 'Manual', inHouse: 'None', ezos: 'Auto' },
    { feature: 'Cost', agency: 'Variable', inHouse: 'Salaries', ezos: 'Flat' }
  ];

  return (
    <FadeIn>
      <div className="max-w-5xl mx-auto mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Us vs. Them</h2>
          <p className="text-sm md:text-base text-muted-foreground mt-2">A clean comparison of ownership, speed, and cost structure.</p>
        </div>
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl overflow-hidden">
          <div className="grid grid-cols-4 px-4 py-3 sm:px-6 sm:py-4 text-[10px] sm:text-[11px] uppercase tracking-widest font-mono text-zinc-500 border-b border-zinc-800/60">
            <span>Feature</span>
            <span>Generic Agencies</span>
            <span>In-House Hiring</span>
            <span className="text-emerald-300">EZOS TECH</span>
          </div>
          <div className="divide-y divide-zinc-800/60">
            {rows.map((row) => (
              <div key={row.feature} className="grid grid-cols-4 px-4 py-3 sm:px-6 sm:py-4 items-center text-xs sm:text-sm">
                <div className="text-foreground font-medium">{row.feature}</div>
                <div className="text-zinc-500">{row.agency}</div>
                <div className="text-zinc-400">{row.inHouse}</div>
                <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-400/10 border border-emerald-400/30">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>{row.ezos}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

const TypingTerminal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (terminalRef.current) observer.observe(terminalRef.current);
    return () => observer.disconnect();
  }, []);

  const terminalLines = [
    [
      { text: '> ', className: 'text-zinc-400' },
      { text: 'checking DNS for client.com...', className: 'text-white' }
    ],
    [
      { text: '> ', className: 'text-zinc-400' },
      { text: 'SPF record: v=spf1 include:_spf.google.com ~all ', className: 'text-white' },
      { text: '[PASS]', className: 'text-emerald-400 font-semibold' }
    ],
    [
      { text: '> ', className: 'text-zinc-400' },
      { text: 'DMARC record: v=DMARC1; p=quarantine; ', className: 'text-white' },
      { text: '[PASS]', className: 'text-emerald-400 font-semibold' }
    ],
    [
      { text: '> ', className: 'text-zinc-400' },
      { text: 'DKIM signature: verified ', className: 'text-white' },
      { text: '[PASS]', className: 'text-emerald-400 font-semibold' }
    ]
  ];

  return (
    <div ref={terminalRef} className="bg-[#0a0a0a] rounded-lg border border-zinc-800 overflow-hidden group-hover:border-zinc-700 transition-colors">
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border-b border-zinc-800">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-zinc-500 font-mono">dns-check.sh</span>
      </div>
      <div className="p-4 min-h-[120px]">
        {isVisible ? (
          <Typewriter lines={terminalLines} speed={25} lineDelay={400} />
        ) : (
          <p className="text-white font-mono text-xs md:text-sm">&gt; <span className="animate-pulse">_</span></p>
        )}
      </div>
    </div>
  );
};

const Navbar = ({ currentView, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigate = (view) => {
    navigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur transition-colors duration-300 ${isScrolled ? 'border-border bg-background/95' : 'border-transparent bg-background/60'} supports-[backdrop-filter]:bg-background/60`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center hover:opacity-80 transition-opacity"
            aria-label="EZOS Tech home"
          >
            <img
              src={logoFull}
              alt="EZOS TECH"
              width="128"
              height="32"
              className="h-6 md:h-8 w-auto"
              fetchPriority="high"
              decoding="async"
            />
          </button>

          <div className="hidden md:flex items-center gap-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'how-it-works', label: 'How it Works' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'tutorials', label: 'Academy' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  currentView === item.id ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-mono text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              Status: Taking Clients
            </div>
            <button
              onClick={() => handleNavigate('contact')}
              className="cta-lift bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:shadow-[0_0_25px_rgba(124,58,237,0.6)]"
            >
              Contact Us
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {[
              { id: 'home', label: 'Home' },
              { id: 'how-it-works', label: 'How it Works' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'tutorials', label: 'Academy' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`block w-full text-center py-2 text-sm font-medium transition-colors hover:text-foreground ${
                  currentView === item.id ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavigate('contact')}
              className="block w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(124,58,237,0.5)]"
            >
              Contact Us
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

const Footer = ({ navigate }) => (
  <footer className="border-t border-border bg-card mt-auto">
    <div className="footer-progress" />
    <div className="border-b border-border/60 bg-zinc-900/40">
      <div className="container mx-auto px-4 py-2 text-center">
        <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
          98% inbox placement focus • 24/7 monitoring • 14-day warm-up
        </p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <img src={logoFull} alt="EZOS TECH" width="128" height="24" className="h-6 w-auto opacity-80" />
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <button onClick={() => navigate('tutorials')} className="text-muted-foreground hover:text-foreground transition-colors text-sm">Academy</button>
          <button onClick={() => navigate('how-it-works')} className="text-muted-foreground hover:text-foreground transition-colors text-sm">How it Works</button>
          <button onClick={() => navigate('pricing')} className="text-muted-foreground hover:text-foreground transition-colors text-sm">Pricing</button>
          <button onClick={() => navigate('contact')} className="text-muted-foreground hover:text-foreground transition-colors text-sm">Contact Us</button>
          <button onClick={() => navigate('privacy')} className="text-muted-foreground hover:text-foreground transition-colors text-sm">Privacy Policy</button>
          <button onClick={() => navigate('terms')} className="text-muted-foreground hover:text-foreground transition-colors text-sm">Terms & Conditions</button>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/company/ezos-tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="EZOS Tech on LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="border-t border-border mt-4 pt-4 text-center">
        <p className="text-muted-foreground text-xs">(c) 2025 Ezos Tech. All Rights Reserved</p>
      </div>
    </div>
  </footer>
);

const CookieBanner = ({ navigate, onAccept, onReject }) => (
  <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#18181b] border-t border-zinc-800">
    <div className="container mx-auto px-4 py-4 md:py-5">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-foreground font-semibold mb-1">We value your privacy</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We use cookies to enhance your browsing experience and analyze site traffic.{' '}
            <button onClick={() => navigate('privacy')} className="text-zinc-400 underline hover:text-foreground transition-colors">Read our Privacy Policy</button>
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button onClick={onReject} className="flex-1 md:flex-none px-5 py-2.5 rounded-lg text-sm font-medium text-zinc-400 border border-zinc-700 hover:border-zinc-600 hover:text-foreground transition-all">Reject</button>
          <button onClick={onAccept} className="flex-1 md:flex-none px-5 py-2.5 rounded-lg text-sm font-medium bg-[#7c3aed] text-white hover:bg-[#7c3aed]/90 transition-all shadow-[0_0_15px_rgba(124,58,237,0.5)]">Accept</button>
        </div>
      </div>
    </div>
  </div>
);

const HomeView = ({ navigate, Maps }) => {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    const media = window.matchMedia('(pointer: fine)');
    if (!media.matches) return undefined;

    let rafId = null;
    const latest = { x: 0, y: 0 };

    const applyParallax = () => {
      const rect = hero.getBoundingClientRect();
      const x = (latest.x - rect.left) / rect.width - 0.5;
      const y = (latest.y - rect.top) / rect.height - 0.5;
      hero.style.setProperty('--px1', `${x * 16}px`);
      hero.style.setProperty('--py1', `${y * 16}px`);
      hero.style.setProperty('--px2', `${x * -12}px`);
      hero.style.setProperty('--py2', `${y * -12}px`);
      rafId = null;
    };

    const handleMove = (event) => {
      latest.x = event.clientX;
      latest.y = event.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(applyParallax);
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="flex flex-col pt-16">
      <section ref={heroRef} className="relative py-16 md:py-20 lg:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="parallax-orb hidden md:block absolute -top-24 right-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" style={{ transform: 'translate(var(--px1, 0px), var(--py1, 0px))' }} />
        <div className="parallax-orb hidden md:block absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" style={{ transform: 'translate(var(--px2, 0px), var(--py2, 0px))' }} />
        <div className="scanlines hidden md:block absolute inset-0 opacity-30" />
        <div className="noise hidden md:block absolute inset-0 opacity-[0.08]" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-start md:items-center">
          <FadeIn direction="up">
            <div className="text-center md:text-left mx-auto md:mx-0 w-full max-w-xl">
              <h1 className="mb-5 text-4xl md:text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl break-words">
                Cold Email <span className="bg-gradient-to-r from-[#7c3aed] to-violet-400 bg-clip-text text-transparent">Engineered</span>
              </h1>
              <p className="mb-8 max-w-xl mx-auto md:mx-0 text-base md:text-lg text-muted-foreground">
                The infrastructure behind high-volume cold email. Dedicated domains, portable data, and transparent ops.
              </p>
              <p className="mb-8 max-w-xl mx-auto md:mx-0 text-sm md:text-base text-zinc-400">
                EZOS TECH is a cold email infrastructure partner for B2B teams that need scale without sacrificing inbox
                placement. We engineer domain fleets, authentication, and warm-up systems so your outbound engine stays
                stable as volume grows.
              </p>
              <div className="flex flex-col items-center md:items-start gap-4 sm:flex-row">
                <button onClick={() => navigate('apply')} className="cta-lift pulse-glow w-full sm:w-auto inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3 rounded-lg text-base font-medium hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:shadow-[0_0_25px_rgba(124,58,237,0.6)]">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button onClick={() => navigate('pricing')} className="w-full sm:w-auto inline-flex items-center justify-center bg-card border border-border text-foreground px-8 py-3 rounded-lg text-base font-medium hover:bg-muted transition-all">
                  Pricing
                </button>
              </div>
              <div className="mt-6 overflow-hidden rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2">
                <div className="ticker whitespace-nowrap text-xs font-mono text-zinc-400">
                  <span className="mx-4">CLIENTS: 5K+ INBOXES</span>
                  <span className="mx-4">INBOX PLACEMENT: 98%</span>
                  <span className="mx-4">WARMUP READY: 14 DAYS</span>
                  <span className="mx-4">MONITORING: 24/7</span>
                  <span className="mx-4">CLIENTS: 5K+ INBOXES</span>
                  <span className="mx-4">INBOX PLACEMENT: 98%</span>
                  <span className="mx-4">WARMUP READY: 14 DAYS</span>
                  <span className="mx-4">MONITORING: 24/7</span>
                </div>
              </div>
              <div className="mt-4 w-full sm:max-w-md rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 mx-auto md:mx-0">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Live Metrics</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 uppercase">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    Live
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <MiniStat value="5000" suffix="+" label="Inboxes" />
                  <MiniStat value="98" suffix="%" label="Placement" />
                  <MiniStat value="24" suffix="/7" label="Monitoring" />
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={200}>
            <div className="relative w-full max-w-xl mx-auto md:max-w-none">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 opacity-30" />
              <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-900/80">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-primary" />
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">System Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-xs text-green-400 font-mono">LIVE</span>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500 font-mono">Active Nodes</span>
                      <span className="text-foreground font-mono font-semibold">140</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-violet-400 rounded-full animate-fluctuate-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500 font-mono">Throughput</span>
                      <span className="text-foreground font-mono font-semibold">98.4%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full animate-fluctuate-2" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500 font-mono">Latency</span>
                      <span className="text-foreground font-mono font-semibold">45ms</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-fluctuate-3" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-zinc-800">
                    <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
                      <p className="text-lg font-mono font-bold text-foreground">5K+</p>
                      <p className="text-xs text-zinc-500">Inboxes</p>
                    </div>
                    <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
                      <p className="text-lg font-mono font-bold text-green-400">98%</p>
                      <p className="text-xs text-zinc-500">Delivery</p>
                    </div>
                    <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
                      <p className="text-lg font-mono font-bold text-foreground">24/7</p>
                      <p className="text-xs text-zinc-500">Uptime</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    <GradientDivider className="my-10" />

    <section className="border-y border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedStat value="5000" suffix="+" label="Inboxes Managed" />
          <AnimatedStat value="98" suffix="%" label="Inbox Placement Focus" />
          <div className="text-center">
            <p className="font-mono text-3xl font-bold text-foreground lg:text-4xl">24/7</p>
            <p className="mt-1 text-sm text-muted-foreground">Monitoring</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-3xl font-bold text-foreground lg:text-4xl">∞</p>
            <p className="mt-1 text-sm text-muted-foreground">Horizontal Scaling</p>
          </div>
        </div>
      </div>
    </section>

    <GradientDivider className="my-10" />

    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="section-title mb-4 text-2xl md:text-3xl font-bold text-foreground">Everything You Need for Cold Email at Scale</h2>
            <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground">From infrastructure setup to ongoing maintenance, we provide the complete technical foundation for your outbound campaigns.</p>
          </div>
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Server, title: 'Verified and Strategic', description: 'Every domain is verified, every inbox authenticated. We build infrastructure that passes SPF, DKIM, and DMARC checks from day one.' },
            { icon: Shield, title: 'Built for Safety', description: '3 inboxes per domain with 1:1 redundancy ratio. We deploy infrastructure designed for maximum deliverability and minimal risk.' },
            { icon: BarChart, title: 'Transparent Reporting', description: 'Real-time dashboards showing deliverability metrics, bounce rates, and engagement data. You own the data, you see everything.' }
          ].map((feature, idx) => (
            <FadeIn key={feature.title} delay={idx * 150}>
              <SpotlightCard className="rounded-2xl bg-card/70 backdrop-blur-sm shadow-card transition-all hover:shadow-levitation p-6 h-full">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <GradientDivider className="my-10" />

    <FadeIn>
      <section className="border-y border-border bg-card py-12 md:py-24">
        <div className="container mx-auto px-4 mb-8 md:mb-12 text-center">
          <h2 className="section-title mx-auto text-center text-xl md:text-3xl font-bold text-foreground tracking-tight mb-3">Tech Stack</h2>
          <p className="text-center text-muted-foreground mt-3 md:mt-4 text-xs md:text-base">Integrated with industry-leading platforms</p>
        </div>
        <InfiniteMarquee items={Maps.techStack} />
      </section>
    </FadeIn>

    <GradientDivider className="my-10" />

    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="section-title mb-4 text-2xl md:text-3xl font-bold text-foreground">Trusted By Outbound Teams</h2>
            <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground">See what our clients say about their experience with EZOS TECH infrastructure.</p>
          </div>
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-3">
          {Maps.testimonials.map((testimonial, idx) => (
            <FadeIn key={idx} delay={idx * 150}>
              <div className="card-sheen border border-border bg-card shadow-card rounded-lg p-6 h-full">
                <p className="mb-4 font-serif text-muted-foreground italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <GradientDivider className="my-10" />

    <FadeIn>
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="border border-border bg-card shadow-levitation rounded-lg">
            <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center">
              <h2 className="section-title mb-4 text-2xl md:text-3xl font-bold text-foreground">Ready To Start?</h2>
              <p className="mb-8 max-w-xl text-sm md:text-base text-muted-foreground">Tell us about your ICP and goal. We'll reply with a plan within 1 business day.</p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button onClick={() => navigate('apply')} className="cta-lift pulse-glow w-full sm:w-auto inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3 rounded-lg text-base font-medium hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:shadow-[0_0_25px_rgba(124,58,237,0.6)]">
                  Book 15 Minute Call
                </button>
                <button onClick={() => navigate('tutorials')} className="w-full sm:w-auto inline-flex items-center justify-center bg-secondary text-secondary-foreground px-8 py-3 rounded-lg text-base font-medium hover:bg-secondary/80 transition-all">
                  Watch the Academy
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  </div>
);

};

const HowItWorksView = ({ navigate, openFaq, setOpenFaq, Maps }) => (
  <div className="flex flex-col pt-16">
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
            <h1 className="mb-6 text-3xl md:text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              <span className="heading-word" style={{ '--word-delay': '0ms' }}>How</span>{' '}
              <span className="heading-word" style={{ '--word-delay': '120ms' }}>It</span>{' '}
              <span
                className="heading-word bg-gradient-to-r from-[#7c3aed] to-violet-400 bg-clip-text text-transparent"
                style={{ '--word-delay': '240ms' }}
              >
                Works
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">A systematic approach to building cold email infrastructure at scale.</p>
            <p className="mt-4 text-sm md:text-base text-zinc-400">
              We handle domains, authentication, warm-up, and monitoring so your team can focus on messaging and sales.
              This process is designed to protect inbox placement while growing send volume responsibly.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-5xl mx-auto relative mb-16 md:mb-20">
          <div className="absolute top-1/2 left-8 right-8 border-t-2 border-dashed border-zinc-800 -translate-y-1/2 hidden md:block z-0" />
          <div className="absolute top-8 bottom-8 left-1/2 border-l-2 border-dashed border-zinc-800 -translate-x-1/2 hidden md:block z-0" />
          <div className="grid md:grid-cols-2 gap-6 relative z-10">
            <FadeIn delay={0}>
              <div className="group border border-border bg-card shadow-card rounded-lg p-8 hover:shadow-levitation hover:border-primary/50 transition-all duration-300 h-full">
                <div className="text-4xl font-bold text-primary mb-4 group-hover:drop-shadow-[0_0_10px_rgba(124,58,237,0.5)] transition-all duration-300">01</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Domain Setup and DNS Configuration</h3>
                <p className="text-muted-foreground">We register and configure your sending domains with proper SPF, DKIM, and DMARC records.</p>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="group border border-border bg-card shadow-card rounded-lg p-8 hover:shadow-levitation hover:border-primary/50 transition-all duration-300 h-full">
                <div className="text-4xl font-bold text-primary mb-4 group-hover:drop-shadow-[0_0_10px_rgba(124,58,237,0.5)] transition-all duration-300">02</div>
                <h3 className="text-xl font-bold text-foreground mb-3">The Build</h3>
                <p className="text-muted-foreground mb-4">We create and configure your email accounts across multiple providers with proper authentication.</p>
                <TypingTerminal />
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="group border border-border bg-card shadow-card rounded-lg p-8 hover:shadow-levitation hover:border-primary/50 transition-all duration-300 h-full">
                <div className="text-4xl font-bold text-primary mb-4 group-hover:drop-shadow-[0_0_10px_rgba(124,58,237,0.5)] transition-all duration-300">03</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Warm-Up & Ramp</h3>
                <p className="text-muted-foreground mb-4">Our proprietary warm-up system gradually increases sending volume.</p>
                <div className="flex items-end justify-center gap-3 md:gap-4 h-20 md:h-24 mt-6">
                  <div className="flex flex-col items-center"><div className="w-10 md:w-16 bg-gradient-to-t from-green-600 to-green-400 rounded-t-md h-6 md:h-8" /><span className="text-xs text-zinc-500 mt-2">Warmup</span></div>
                  <div className="flex flex-col items-center"><div className="w-10 md:w-16 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-md h-10 md:h-14" /><span className="text-xs text-zinc-500 mt-2">Ramp</span></div>
                  <div className="flex flex-col items-center"><div className="w-10 md:w-16 bg-gradient-to-t from-primary to-violet-400 rounded-t-md h-16 md:h-24" /><span className="text-xs text-zinc-500 mt-2">Scale</span></div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={450}>
              <div className="group border border-border bg-card shadow-card rounded-lg p-8 hover:shadow-levitation hover:border-primary/50 transition-all duration-300 h-full">
                <div className="text-4xl font-bold text-primary mb-4 group-hover:drop-shadow-[0_0_10px_rgba(124,58,237,0.5)] transition-all duration-300">04</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Monitoring and Deliverability</h3>
                <p className="text-muted-foreground">24/7 monitoring of inbox placement, bounce rates, and sender scores.</p>
              </div>
            </FadeIn>
          </div>
        </div>

        <FadeIn>
          <div className="max-w-5xl mx-auto mb-16 md:mb-20">
            <h2 className="section-title text-2xl md:text-3xl font-bold text-foreground text-center mb-12">Typical Timeline</h2>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-zinc-800 -translate-x-1/2 hidden md:block" />
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-zinc-800 md:hidden" />
              <div className="space-y-8 md:space-y-0">
                {[
                  { period: 'Day 1-3', title: 'Domain and DNS Setup', description: 'Domain registration and DNS configuration' },
                  { period: 'Day 3-5', title: 'Inbox Provisioning', description: 'Email accounts created and configured' },
                  { period: 'Week 1-4', title: 'Warm-up Period', description: 'Gradual volume increase with reputation building' },
                  { period: 'Week 4+', title: 'Full Production', description: 'Ready for high-volume sending' }
                ].map((phase, idx) => (
                  <div key={phase.period} className={`relative flex md:items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${idx % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                      <div className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                        <span className="inline-block font-mono text-sm text-primary font-semibold mb-2 px-3 py-1 bg-primary/10 rounded-full">{phase.period}</span>
                        <h3 className="text-lg font-bold text-foreground mb-2">{phase.title}</h3>
                        <p className="text-sm text-muted-foreground">{phase.description}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 w-5 h-5 bg-primary rounded-full blur-sm opacity-50" />
                        <div className="relative w-5 h-5 bg-zinc-900 border-2 border-primary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 -translate-x-1/2">
                      <div className="relative">
                        <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full blur-sm opacity-50" />
                        <div className="relative w-4 h-4 bg-zinc-900 border-2 border-primary rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

    <GradientDivider className="my-10" />

    <section className="py-16 md:py-20 border-t border-border bg-card">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center">
            <h2 className="section-title mx-auto text-2xl md:text-3xl font-bold text-foreground text-center mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Everything you need to know about our infrastructure and process.</p>
          </div>
        </FadeIn>
        <div className="max-w-3xl mx-auto space-y-3">
          {Maps.howItWorksFaqs.map((faq, idx) => (
            <FadeIn key={faq.question} delay={Math.min(idx * 50, 500)}>
              <div className={`bg-zinc-900/30 border rounded-xl overflow-hidden transition-all duration-300 ${openFaq === idx ? 'border-primary/50 shadow-lg shadow-primary/5' : 'border-zinc-800/50 hover:border-zinc-700'}`}>
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full px-6 py-5 flex items-center justify-between text-left gap-4">
                  <span className="font-medium text-foreground leading-relaxed">{faq.question}</span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${openFaq === idx ? 'bg-primary text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                    <span className={`text-xl font-light transition-transform duration-300 ${openFaq === idx ? 'rotate-45' : 'rotate-0'}`}>+</span>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-5 border-t border-zinc-800/50">
                    <p className="text-muted-foreground pt-4 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <GradientDivider className="my-10" />

    <FadeIn>
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="border border-border bg-card shadow-levitation rounded-lg">
            <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center">
              <h2 className="section-title mb-4 text-2xl md:text-3xl font-bold text-foreground">Ready To Start?</h2>
              <p className="mb-8 max-w-xl text-sm md:text-base text-muted-foreground">Tell us about your ICP and goal. We'll reply with a plan within 1 business day.</p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button onClick={() => navigate('apply')} className="cta-lift pulse-glow w-full sm:w-auto inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3 rounded-lg text-base font-medium hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(124,58,237,0.5)]">Book 15 Minute Call</button>
                <button onClick={() => navigate('tutorials')} className="w-full sm:w-auto inline-flex items-center justify-center bg-secondary text-secondary-foreground px-8 py-3 rounded-lg text-base font-medium hover:bg-secondary/80 transition-all">Watch the Academy</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  </div>
);

const PricingView = ({ navigate, pricingTab, setPricingTab, Maps }) => {
  const activePricing = PRICING_DATA[pricingTab] || PRICING_DATA.DIY;

  return (
    <div className="flex flex-col pt-16">
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h1 className="mb-6 text-3xl md:text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                <span className="heading-word" style={{ '--word-delay': '0ms' }}>Simple,</span>{' '}
                <span className="heading-word" style={{ '--word-delay': '120ms' }}>Transparent</span>{' '}
                <span
                  className="heading-word bg-gradient-to-r from-[#7c3aed] to-violet-400 bg-clip-text text-transparent"
                  style={{ '--word-delay': '240ms' }}
                >
                  Pricing
                </span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">Choose your level of infrastructure and support.</p>
              <p className="mt-4 text-sm md:text-base text-zinc-400">
                All plans include domain strategy, mailbox provisioning, and deliverability safeguards built for B2B cold
                email at scale. Pick DIY if your team runs outreach, or choose ENGINE/SCALE for managed execution.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-full bg-zinc-900/70 border border-zinc-800 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                {['DIY', 'ENGINE', 'SCALE'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setPricingTab(tab)}
                    className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.25em] transition-all ${
                      pricingTab === tab
                        ? 'bg-primary text-primary-foreground shadow-[0_0_18px_rgba(124,58,237,0.45)]'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="text-center mb-4">
              <p className="text-muted-foreground text-lg font-semibold">{activePricing.subtitle}</p>
              {activePricing.commitment && <p className="text-muted-foreground text-sm mt-2">{activePricing.commitment}</p>}
            </div>
          </FadeIn>

          {activePricing.whatYouGet && (
            <FadeIn delay={200}>
              <div className="max-w-3xl mx-auto mb-12 bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">What you get</h3>
                <ul className="space-y-2">
                  {activePricing.whatYouGet.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{item}</span></li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          )}

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {activePricing.plans.map((plan, idx) => (
              <FadeIn key={plan.name} delay={250 + idx * 100}>
                <div className="relative h-full pt-6">
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                      <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg shadow-primary/25 whitespace-nowrap">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  {plan.highlighted && <div className="absolute inset-0 bg-primary blur-3xl opacity-20 -z-10 rounded-3xl scale-105" />}

                  <SpotlightCard className={`rounded-2xl bg-card/70 backdrop-blur-sm shadow-card transition-all hover:shadow-levitation p-8 h-full flex flex-col ${plan.highlighted ? 'ring-1 ring-primary/40' : ''}`}>
                    <h3 className="text-2xl font-bold text-foreground mb-1">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{plan.setupFee}</p>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-start gap-3 text-sm"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{feature}</span></li>
                      ))}
                    </ul>
                    <button onClick={() => navigate('apply')} className={`w-full px-6 py-3 rounded-lg text-sm font-medium transition-all ${plan.highlighted ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>Get Started</button>
                  </SpotlightCard>
                </div>
              </FadeIn>
            ))}
          </div>

          <ComparisonSection />

          <FadeIn>
            <div className="max-w-4xl mx-auto mb-16 md:mb-20">
              <h2 className="section-title text-2xl md:text-3xl font-bold text-foreground text-center mb-12">Add-Ons</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Maps.pricingAddons.map((addon, idx) => (
                  <div key={idx} className="card-sheen flex items-center gap-4 bg-card border border-border rounded-lg p-4">
                    <addon.icon className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{addon.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-8">
              <div className="text-center">
                <h3 className="section-title mx-auto text-2xl font-bold text-foreground text-center mb-6">Terms & Fit</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Infra (mailboxes + domains) included up to plan size',
                  'We only work with B2B offers $5,000+; below that, you are better off DIY with tutorials',
                  'Clear ICP and a closer available required',
                  'Monthly retainer; 30-day notice to cancel unless otherwise agreed in SOW'
                ].map((term, idx) => (
                  <li key={idx} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{term}</span></li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
    </section>

    <GradientDivider className="my-10" />

    <FadeIn>
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container mx-auto px-4">
            <div className="border border-border bg-card shadow-levitation rounded-lg">
              <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center">
                <h2 className="section-title mb-4 text-2xl md:text-3xl font-bold text-foreground">Ready To Start?</h2>
                <p className="mb-8 max-w-xl text-sm md:text-base text-muted-foreground">Tell us about your ICP and goal. We'll reply with a plan within 1 business day.</p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <button onClick={() => navigate('apply')} className="cta-lift pulse-glow w-full sm:w-auto inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3 rounded-lg text-base font-medium hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(124,58,237,0.5)]">Book 15 Minute Call</button>
                  <button onClick={() => navigate('tutorials')} className="w-full sm:w-auto inline-flex items-center justify-center bg-secondary text-secondary-foreground px-8 py-3 rounded-lg text-base font-medium hover:bg-secondary/80 transition-all">Watch the Academy</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
};

const TutorialsView = ({ navigate, Maps }) => {
  const modules = Maps.tutorialModules;

  return (
    <div className="flex flex-col pt-16">
      <section className="py-16 md:py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">START HERE</span>
                </span>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Masterclass</span>
              </div>
              <h1 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                EZOS <span className="bg-gradient-to-r from-[#7c3aed] to-violet-400 bg-clip-text text-transparent">Masterclass</span>
              </h1>
              <p className="mb-8 text-base md:text-lg text-muted-foreground max-w-2xl">
                Master the technical fundamentals of cold email infrastructure. From domain math to DNS authentication.
              </p>
              <p className="mb-8 text-sm md:text-base text-zinc-400 max-w-2xl">
                The Academy breaks down deliverability, sender reputation, and inbox management so your team can scale
                outbound without burning domains. Each module is short, practical, and designed for immediate execution.
              </p>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-4 md:p-6">
                  <div className="absolute top-5 left-5 z-10">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-700 text-xs font-mono text-emerald-300">START HERE</span>
                  </div>
                  <VideoPlayer videoId="zeBD9oDJq7o" title="Intro: The Philosophy of Infrastructure" aspectRatio="16/9" />
                  <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <BookOpen className="w-4 h-4" />
                      <span>Intro: The Philosophy of Infrastructure</span>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">1:33</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
    </section>

    <GradientDivider className="my-10" />

    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="section-title mb-4 text-2xl md:text-3xl font-bold text-foreground">Technical Modules</h2>
              <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground">
                Four modules covering everything you need to build and maintain cold email infrastructure.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {modules.map((module, idx) => (
              <FadeIn key={module.number} delay={idx * 150}>
              <div className="card-sheen group border border-border bg-card rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-levitation transition-all duration-300 h-full flex flex-col">
                  <div className="relative">
                    <VideoPlayer videoId={module.videoId} title={module.title} aspectRatio="16/9" className="rounded-none" />
                    <div className="pointer-events-none absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-zinc-900/90 via-zinc-900/40 to-transparent" />
                    <div className="absolute bottom-0 left-4">
                      <span className="inline-block translate-y-[35%] px-2 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-primary shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
                        Module {module.number}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      Module {module.number}: {module.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {module.description}
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                        <Clock className="w-3 h-3" />
                        {module.duration}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                        <BarChart className="w-3 h-3" />
                        {module.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
    </section>

    <GradientDivider className="my-10" />

    <FadeIn>
      <section className="border-y border-border bg-card py-12 md:py-24">
          <div className="container mx-auto px-4 mb-8 md:mb-12 text-center">
            <h2 className="section-title text-center text-xl md:text-3xl font-bold text-foreground tracking-tight mb-3">Tools We Utilize</h2>
            <p className="text-center text-muted-foreground mt-3 md:mt-4 text-xs md:text-base">Industry-leading platforms for cold email infrastructure</p>
          </div>
          <InfiniteMarquee items={Maps.techStack} />
        </section>
    </FadeIn>

    <GradientDivider className="my-10" />

    <FadeIn>
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container mx-auto px-4">
            <div className="border border-border bg-card shadow-levitation rounded-lg">
              <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center">
                <h2 className="section-title mb-4 text-2xl md:text-3xl font-bold text-foreground">Ready to Scale?</h2>
                <p className="mb-8 max-w-xl text-sm md:text-base text-muted-foreground">Done learning? Let us build and manage your infrastructure.</p>
                <button onClick={() => navigate('apply')} className="cta-lift pulse-glow w-full sm:w-auto inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3 rounded-lg text-base font-medium hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
};

const ContactView = ({ navigate }) => (
  <div className="flex flex-col pt-16">
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          <FadeIn>
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono text-primary">ONBOARDING PORTAL</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">Initialize Your Build.</h1>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">We engineer high-volume systems for established B2B teams. Tell us your targets; we return a strategy.</p>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                  If you need reliable cold email deliverability, domain strategy, and inbox management at scale, our
                  team will map the right infrastructure for your ICP and offer.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider">// Requirements</h3>
                <div className="space-y-3">
                  {[
                    { icon: DollarSign, text: 'B2B offer value > $5,000' },
                    { icon: Clock, text: 'Ready for 3-month minimum commitment' },
                    { icon: UsersIcon, text: 'TAM of 50k+ contacts' },
                    { icon: Shield, text: 'Clear ICP and closer available' }
                  ].map((req, idx) => (
                    <div key={idx} className="flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-primary/50 transition-colors"><req.icon className="w-4 h-4 text-primary" /></div>
                      <span className="text-muted-foreground text-sm">{req.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4"><Server className="w-4 h-4 text-zinc-500" /><span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">System Status</span></div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex items-center justify-between"><span className="text-zinc-500">Status:</span><div className="flex items-center gap-2"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" /></span><span className="text-green-400">Operational</span></div></div>
                  <div className="flex items-center justify-between"><span className="text-zinc-500">Response Time:</span><span className="text-foreground">&lt; 24 Hours</span></div>
                  <div className="flex items-center justify-between"><span className="text-zinc-500">Onboarding:</span><span className="text-yellow-400">Limited Spots</span></div>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="space-y-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-violet-600/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center"><Rocket className="w-6 h-6 text-primary" /></div>
                    <div><h2 className="text-xl font-bold text-foreground">New Client Application</h2><p className="text-sm text-zinc-500 font-mono">// Initialize onboarding sequence</p></div>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">Start the qualification process. Share your ICP, current volume, and growth targets. We'll return a custom infrastructure plan.</p>
                  <button onClick={() => navigate('apply')} className="cta-lift pulse-glow w-full relative group/btn overflow-hidden bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                    <span className="relative z-10 flex items-center justify-center gap-2"><Terminal className="w-5 h-5" />Start Application Process<ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" /></span>
                  </button>
                  <p className="text-center text-xs text-zinc-600 mt-4 font-mono">~ Takes approximately 4 minutes ~</p>
                </div>
              </div>
              <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5 text-zinc-400" /></div>
                  <div className="flex-1">
                    <h3 className="text-foreground font-semibold mb-1">General Inquiries</h3>
                    <p className="text-sm text-zinc-500 mb-3">Not a sales inquiry? Reach out directly.</p>
                    <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-3 font-mono text-sm">
                      <span className="text-zinc-500">$ mailto:</span>
                      <a href="mailto:info@ezostech.com" className="text-primary hover:text-primary/80 transition-colors ml-1">info@ezostech.com</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { value: '5,000+', label: 'Inboxes' },
                  { value: '98%', label: 'Inbox Rate' },
                  { value: '24/7', label: 'Monitoring' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center"><p className="font-mono text-lg font-bold text-foreground">{stat.value}</p><p className="text-xs text-zinc-500">{stat.label}</p></div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  </div>
);

// ============================================
// NATIVE TERMINAL FORM (No Tally)
// ============================================
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xojweypa';

const ApplyView = ({ navigate }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    infraLevel: '',
    setupBudget: '',
    sendVolume: '',
    ltv: '',
    responseOwner: '',
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    website: ''
  });
  const [isQualified, setIsQualified] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disqualifyReason, setDisqualifyReason] = useState('');
  const totalSteps = 4;
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const [showSweep, setShowSweep] = useState(false);

  const stepPrompt = [
    '$ access_control --verify',
    '$ infra_profile --select',
    '$ demand_scan --telemetry',
    '$ identity_check --confirm'
  ];

  const signals = [
    { label: 'Infra', value: formData.infraLevel ? formData.infraLevel.toUpperCase() : 'Pending' },
    { label: 'Setup Fee', value: formData.setupBudget ? (formData.setupBudget === 'no' ? 'No' : 'Yes') : 'Pending' },
    { label: 'Send Vol', value: formData.sendVolume ? formData.sendVolume.replace('lt_', '< ').replace('gt_', '> ') : 'Pending' },
    { label: 'LTV', value: formData.ltv ? (formData.ltv === 'ltv_under_1k' ? '< $1k' : formData.ltv === 'ltv_1_10k' ? '$1k-$10k' : formData.ltv === 'ltv_5_10k' ? '$5k-$10k' : '$10k+') : 'Pending' }
  ];
  const summaryItems = signals.filter((signal) => signal.value !== 'Pending').slice(0, 3);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);

  const nextFromStep1 = () => {
    if (formData.setupBudget === 'no') {
      setIsQualified(false);
      setDisqualifyReason('Setup fee not in budget');
      setStep(4);
      return;
    }
    nextStep();
  };

  const nextFromStep2 = () => {
    if (formData.ltv === 'ltv_under_1k') {
      setIsQualified(false);
      setDisqualifyReason('LTV under $1,000');
      setStep(4);
      return;
    }
    nextStep();
  };

  const handleSubmit = async () => {
    const isDisqualified = formData.setupBudget === 'no' || formData.ltv === 'ltv_under_1k';
    setIsSubmitting(true);
    setShowSweep(true);

    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'New EZOS Tech Application'
        })
      });
    } catch (error) {
      console.error('Submission error', error);
    }

    if (isDisqualified) {
      setDisqualifyReason(
        formData.setupBudget === 'no'
          ? 'Setup fee not in budget'
          : 'LTV under $1,000'
      );
    }
    setIsQualified(!isDisqualified);
    setIsSubmitting(false);
    setShowSweep(false);
    setStep(4);
  };

  const progress = Math.min((step / totalSteps) * 100, 100);
  const calendlyRedirect = typeof window !== 'undefined'
    ? encodeURIComponent(`${window.location.origin}/thank-you`)
    : '';

  return (
    <div className="flex flex-col pt-24 min-h-screen pb-20 relative z-10">
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
          opacity: 0.1
        }}
      />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <FadeIn>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Secure Connection Established</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Initialize Configuration</h1>
            <p className="text-zinc-500">Complete the intake protocol below.</p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="relative rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl overflow-hidden shadow-2xl min-h-[540px] flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-zinc-800">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="text-xs font-mono text-zinc-500">user_intake.sh</div>
              <div className="w-10" />
            </div>

            <div className="px-6 pt-4">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                <span>Intake Progress</span>
                <span>{Math.min(step + 1, totalSteps)} / {totalSteps}</span>
              </div>
              <div className="mt-2 h-1 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalSteps }).map((_, idx) => (
                    <span
                      key={`step-dot-${idx}`}
                      className={`h-1.5 w-1.5 rounded-full ${idx < step ? 'bg-emerald-400' : idx === step ? 'bg-primary' : 'bg-zinc-700'}`}
                    />
                  ))}
                </div>
                <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase">
                  <span className="text-emerald-400">{stepPrompt[Math.min(step, stepPrompt.length - 1)]}</span>
                </div>
              </div>
              {summaryItems.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {summaryItems.map((signal) => (
                    <span
                      key={`summary-${signal.label}`}
                      className="px-2 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border border-zinc-800 text-zinc-400 bg-zinc-900/40"
                    >
                      {signal.label}: {signal.value}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="p-8 md:p-12 flex-grow flex flex-col justify-center">
              <div className="mb-6 flex items-center justify-between">
                <div className="font-mono text-emerald-400 text-xs md:text-sm">
                  {stepPrompt[Math.min(step, stepPrompt.length - 1)]} <span className="animate-caret">_</span>
                </div>
              </div>
              {step === 0 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Roster Gate</h2>
                  <p className="text-zinc-400 leading-relaxed">
                    We limit our active client roster to ensure 100% deliverability and uptime.
                    <br />
                    Please answer the following questions to see if your offer is compatible with our high-volume engine.
                  </p>
                  <button
                    onClick={nextStep}
                    className="mt-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all inline-flex items-center gap-2"
                  >
                    Start Intake <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-600">
                  <div className="space-y-3">
                    <label className="text-xs font-mono text-zinc-500 uppercase">Which infrastructure level are you applying for?</label>
                    <div className="grid gap-3">
                      {[
                        { value: 'managed', label: 'MANAGED ENGINE ($5k/mo)' },
                        { value: 'diy', label: 'DIY INFRASTRUCTURE ($1.5k/mo)' },
                        { value: 'scale', label: 'SCALE ($9.5k/mo)' },
                        { value: 'unsure', label: "I'm not sure yet" }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, infraLevel: option.value })}
                          className={`text-left p-4 rounded-lg border transition-all ${formData.infraLevel === option.value ? 'border-primary bg-primary/10' : 'border-zinc-700 bg-zinc-900/30 hover:border-zinc-500'}`}
                        >
                          <span className="font-mono text-sm text-white">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase">Our infrastructure builds start at a $2,000 setup fee. Is this within your budget?</label>
                    <div className="grid gap-3">
                      {[
                        { value: 'yes', label: 'Yes, we have budget allocated.' },
                        { value: 'maybe', label: 'I can invest if the ROI makes sense.' },
                        { value: 'no', label: 'No, I am looking for a lower-cost solution.' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, setupBudget: option.value })}
                          className={`text-left p-4 rounded-lg border transition-all ${formData.setupBudget === option.value ? 'border-primary bg-primary/10' : 'border-zinc-700 bg-zinc-900/30 hover:border-zinc-500'}`}
                        >
                          <span className="font-mono text-sm text-white">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {formData.infraLevel && (
                    <p className="text-xs font-mono text-emerald-300/80">OK: Infra selected</p>
                  )}
                  {formData.setupBudget && (
                    <p className="text-xs font-mono text-emerald-300/80">OK: Setup fee response logged</p>
                  )}
                  <div className="flex gap-4 pt-2">
                    <button onClick={() => setStep(0)} className="text-zinc-500 hover:text-white transition-colors">Back</button>
                    <button
                      onClick={nextFromStep1}
                      disabled={!formData.infraLevel || !formData.setupBudget}
                      className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-600">
                  <div className="space-y-3">
                    <label className="text-xs font-mono text-zinc-500 uppercase">Current Monthly Sending Volume?</label>
                    <div className="grid gap-3">
                      {[
                        { value: '0', label: '0 (Starting from scratch)' },
                        { value: 'lt_5k', label: '< 5,000 / month' },
                        { value: 'gt_10k', label: '10,000+ / month' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, sendVolume: option.value })}
                          className={`text-left p-4 rounded-lg border transition-all ${formData.sendVolume === option.value ? 'border-primary bg-primary/10' : 'border-zinc-700 bg-zinc-900/30 hover:border-zinc-500'}`}
                        >
                          <span className="font-mono text-sm text-white">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-mono text-zinc-500 uppercase">Average Lifetime Value (LTV) of a customer?</label>
                    <div className="grid gap-3">
                      {[
                        { value: 'ltv_under_1k', label: 'Less than $1,000' },
                        { value: 'ltv_1_10k', label: '$1,000 - $10,000' },
                        { value: 'ltv_5_10k', label: '$5,000 - $10,000' },
                        { value: 'ltv_10k_plus', label: '$10,000+' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, ltv: option.value })}
                          className={`text-left p-4 rounded-lg border transition-all ${formData.ltv === option.value ? 'border-primary bg-primary/10' : 'border-zinc-700 bg-zinc-900/30 hover:border-zinc-500'}`}
                        >
                          <span className="font-mono text-sm text-white">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-mono text-zinc-500 uppercase">Who will be handling the responses?</label>
                    <div className="grid gap-3">
                      {[
                        { value: 'founder', label: 'Me (Founder)' },
                        { value: 'sales', label: 'Sales Team (SDR/AE)' },
                        { value: 'none', label: 'No resource available' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, responseOwner: option.value })}
                          className={`text-left p-4 rounded-lg border transition-all ${formData.responseOwner === option.value ? 'border-primary bg-primary/10' : 'border-zinc-700 bg-zinc-900/30 hover:border-zinc-500'}`}
                        >
                          <span className="font-mono text-sm text-white">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {(formData.sendVolume || formData.ltv || formData.responseOwner) && (
                    <p className="text-xs font-mono text-emerald-300/80">OK: Outreach profile captured</p>
                  )}

                  <div className="flex gap-4 pt-2">
                    <button onClick={() => setStep(1)} className="text-zinc-500 hover:text-white transition-colors">Back</button>
                    <button
                      onClick={nextFromStep2}
                      disabled={!formData.sendVolume || !formData.ltv || !formData.responseOwner}
                      className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-600">
                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-500 uppercase">First Name</label>
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-500 uppercase">Last Name</label>
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase">Work Email</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-zinc-900/50 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all ${formData.email && !emailIsValid ? 'border-amber-400/60 focus:border-amber-400 focus:ring-amber-400/40' : 'border-zinc-700 focus:border-primary focus:ring-primary'}`}
                      placeholder="john@company.com"
                    />
                    {formData.email && !emailIsValid && (
                      <p className="text-xs text-amber-300 font-mono">Enter a valid work email.</p>
                    )}
                    {formData.email && emailIsValid && (
                      <p className="text-xs text-emerald-300 font-mono">Email format looks good.</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase">Company</label>
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase">Company Website (optional)</label>
                    <input
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      placeholder="https://company.com"
                    />
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button onClick={() => setStep(2)} className="text-zinc-500 hover:text-white transition-colors">Back</button>
                    <button
                      onClick={handleSubmit}
                      disabled={!formData.firstName || !formData.email || !emailIsValid || !formData.company}
                      className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      Submit <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  {isSubmitting && (
                    <div className="mt-4 space-y-1 text-xs font-mono text-zinc-500 animate-pulse">
                      <div>&gt; validating inputs...</div>
                      <div>&gt; encrypting payload...</div>
                      <div>&gt; transmitting to secure endpoint...</div>
                    </div>
                  )}
                </div>
              )}

              {step === 4 && isQualified === true && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 h-full">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 mb-4">
                      <Check className="w-4 h-4" />
                      <span className="text-xs font-mono font-bold">APPLICATION APPROVED</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Book Your Deployment Call</h3>
                    <p className="text-zinc-400 mt-2">Select a time below to finalize your infrastructure build.</p>
                  </div>

                  <div className="flex-grow w-full bg-white rounded-lg overflow-hidden h-[600px]">
                    <iframe
                      src={`https://calendly.com/ezos-tech/30min?name=${formData.firstName} ${formData.lastName}&email=${formData.email}${calendlyRedirect ? `&redirect_uri=${calendlyRedirect}` : ''}`}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      title="Schedule a call"
                    />
                  </div>
                  <div className="pt-6 text-center">
                    <p className="text-xs text-zinc-500 font-mono mb-3">Booked your time? Continue to confirmation.</p>
                    <button
                      onClick={() => navigate('thank-you')}
                      className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && isQualified === false && (
                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 text-center py-8">
                  <div className="mx-auto w-fit rounded-full p-[2px] bg-gradient-to-r from-emerald-400/40 via-cyan-400/40 to-violet-400/40">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                      <Rocket className="w-7 h-7 text-emerald-400" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Academy First</h3>
                  {disqualifyReason && (
                    <p className="text-xs font-mono text-amber-300/80 uppercase tracking-widest">
                      Signal: {disqualifyReason}
                    </p>
                  )}
                  <p className="text-zinc-400 max-w-md mx-auto leading-relaxed">
                    We recommend starting with our <span className="text-white font-semibold">Academy</span> to build your own engine first.
                  </p>
                  <div className="grid gap-4 md:grid-cols-3 text-left">
                    {[
                      {
                        name: 'Smartlead',
                        desc: 'Master inbox warm-up + sending ops.',
                        src: smartleadLogo,
                        link: 'https://smartlead.ai/?via=Ezostech'
                      },
                      {
                        name: 'Instantly',
                        desc: 'Campaigns, inbox health, and scaling.',
                        src: instantlyLogo,
                        link: 'https://refer.instantly.ai/dg8s778m788s'
                      },
                      {
                        name: 'Apollo',
                        desc: 'Verified leads and enrichment.',
                        src: apolloLogo,
                        link: 'https://get.apollo.io/iqddk9ag07xh'
                      }
                    ].map((tool) => (
                      <a
                        key={tool.name}
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 hover:border-primary/60 hover:bg-primary/5 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl bg-transparent flex items-center justify-center">
                            <img
                              src={tool.src}
                              alt={tool.name}
                              className={`h-7 w-7 object-contain ${tool.name === 'Apollo' || tool.name === 'Smartlead' ? 'rounded-full' : ''}`}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{tool.name}</p>
                            <p className="text-xs text-zinc-500">{tool.desc}</p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => navigate('tutorials')}
                      className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" /> Enter Academy
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-10 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase">System: Online</span>
              </div>
              <div className="text-[10px] font-mono text-zinc-600">EZOS_SECURE_V1.0</div>
            </div>
            {showSweep && (
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-form-sweep" />
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const SEO_MAP = {
  home: {
    title: 'EZOS TECH - Cold Email Infrastructure',
    description: 'Cold email infrastructure for high-volume outbound: dedicated domains, inbox warm-up, deliverability monitoring, and transparent ops.',
    path: '/'
  },
  'how-it-works': {
    title: 'How It Works | EZOS TECH',
    description: 'See how EZOS TECH builds, warms, and scales cold email infrastructure with domain setup, DNS authentication, and deliverability ops.',
    path: '/how-it-works'
  },
  pricing: {
    title: 'Pricing | EZOS TECH',
    description: 'Transparent pricing for cold email infrastructure: DIY, ENGINE, and SCALE plans with setup, inbox capacity, and data options.',
    path: '/pricing'
  },
  tutorials: {
    title: 'Academy | EZOS TECH',
    description: 'Learn cold email infrastructure in the EZOS TECH Academy: volume math, domain strategy, SPF/DKIM/DMARC, and warm-up.',
    path: '/academy'
  },
  contact: {
    title: 'Contact | EZOS TECH',
    description: 'Contact EZOS TECH to scope your cold email infrastructure, onboarding requirements, and next steps for scale.',
    path: '/contact'
  },
  apply: {
    title: 'Apply | EZOS TECH',
    description: 'Apply to work with EZOS TECH. Complete the intake to qualify for high-volume cold email infrastructure.',
    path: '/apply'
  },
  'thank-you': {
    title: 'Booked | EZOS TECH',
    description: 'You are booked. We will prepare your cold email infrastructure plan ahead of the call.',
    path: '/thank-you'
  },
  contract: {
    title: 'Contract | EZOS TECH',
    description: 'Review and sign your EZOS TECH service agreement.',
    path: '/contract'
  },
  privacy: {
    title: 'Privacy Policy | EZOS TECH',
    description: 'EZOS TECH privacy policy covering data usage, security, and your rights.',
    path: '/privacy'
  },
  terms: {
    title: 'Terms & Conditions | EZOS TECH',
    description: 'EZOS TECH terms and conditions for cold email infrastructure services.',
    path: '/terms'
  }
};

const ThankYouView = ({ navigate }) => (
  <div className="flex flex-col pt-24 min-h-screen pb-20 relative z-10">
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: 'linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)',
        backgroundSize: '4rem 4rem',
        maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
        opacity: 0.1
      }}
    />
    <div className="container mx-auto px-4 max-w-3xl relative z-10">
      <FadeIn>
        <div className="relative rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl overflow-hidden shadow-2xl p-10 text-center">
          <div className="mx-auto w-fit rounded-full p-[2px] bg-gradient-to-r from-primary/40 via-cyan-400/40 to-emerald-400/40">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 shadow-[0_0_20px_rgba(124,58,237,0.25)]">
              <Check className="w-7 h-7 text-primary" />
            </div>
          </div>
          <h1 className="mt-6 text-2xl md:text-3xl font-bold text-white">You are booked.</h1>
          <p className="mt-3 text-zinc-400 max-w-md mx-auto leading-relaxed">
            Thanks for scheduling. We are looking forward to the call and will be ready with your infrastructure plan.
          </p>
          <button
            onClick={() => navigate('home')}
            className="mt-6 bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all"
          >
            Back to Home
          </button>
        </div>
      </FadeIn>
    </div>
  </div>
);

const ContractView = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    signerName: '',
    email: '',
    signature: '',
    agreed: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [signatureMode, setSignatureMode] = useState('draw');
  const [signatureData, setSignatureData] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [signaturePulse, setSignaturePulse] = useState(false);
  const canvasRef = useRef(null);
  const lastPointRef = useRef({ x: 0, y: 0 });

  const params = new URLSearchParams(window.location.search);
  const typeParam = params.get('type');
  const contractType = CONTRACTS[typeParam] ? typeParam : 'diy-70';
  const contractText = CONTRACTS[contractType];
  const contractMeta = CONTRACT_META[contractType];
  const setupFee = contractMeta?.setupFee ?? 2000;

  const STRIPE_LINKS = {
    'diy-70': 'https://buy.stripe.com/6oUeVcb615RH75t3z28bS01',
    'diy-100': 'https://buy.stripe.com/3cI3cufmh6VLcpNb1u8bS02',
    'diy-150': 'https://buy.stripe.com/00wbJ0b61a7XahFb1u8bS03',
    'engine-70': 'https://buy.stripe.com/8x26oG6PL7ZPdtR6Le8bS04',
    'engine-100': 'https://buy.stripe.com/eVqbJ04HDa7X0H54D68bS05',
    'engine-150': 'https://buy.stripe.com/14A9AS1vra7X3Thb1u8bS06',
    'scale-70': 'https://buy.stripe.com/14AfZg1vr4NDdtR3z28bS07',
    'scale-100': 'https://buy.stripe.com/fZu6oG1vr7ZP75t2uY8bS08',
    'scale-150': 'https://buy.stripe.com/bJedR8a1X1Br89x0mQ8bS09'
  };
  const stripeLink = STRIPE_LINKS[contractType];
  const CONTRACT_FORMSPREE_ENDPOINT = 'https://formspree.io/f/xojweypa';

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const signatureIsValid = signatureMode === 'draw' ? Boolean(signatureData) : Boolean(formData.signature);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext('2d');
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#111827';
  };

  useEffect(() => {
    if (signatureMode !== 'draw') return;
    resizeCanvas();
    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [signatureMode]);

  const getPointer = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  const handlePointerDown = (event) => {
    if (signatureMode !== 'draw') return;
    event.preventDefault();
    setIsDrawing(true);
    const point = getPointer(event);
    lastPointRef.current = point;
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.beginPath();
    ctx?.moveTo(point.x, point.y);
  };

  const handlePointerMove = (event) => {
    if (!isDrawing || signatureMode !== 'draw') return;
    event.preventDefault();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const point = getPointer(event);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPointRef.current = point;
  };

  const handlePointerUp = () => {
    if (!isDrawing || signatureMode !== 'draw') return;
    setIsDrawing(false);
    if (canvasRef.current) {
      setSignatureData(canvasRef.current.toDataURL('image/png'));
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureData('');
  };

  useEffect(() => {
    const hasSignature = signatureMode === 'draw' ? Boolean(signatureData) : Boolean(formData.signature);
    if (!hasSignature) return;
    setSignaturePulse(true);
    const timer = setTimeout(() => setSignaturePulse(false), 900);
    return () => clearTimeout(timer);
  }, [signatureData, formData.signature, signatureMode]);

  const handleAutoFillSignature = () => {
    if (!formData.signerName) return;
    setFormData((prev) => ({ ...prev, signature: prev.signerName }));
  };

  const handleDownloadPdf = () => {
    window.print();
    return true;
  };

  const handleSignAndPay = async () => {
    if (!stripeLink) {
      setSubmitError('Stripe link not configured yet.');
      return;
    }
    setSubmitError('');
    setIsSubmitting(true);

    try {
      await fetch(CONTRACT_FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          _subject: `CONTRACT SIGNED: ${formData.companyName}`,
          _template: 'table',
          contractType,
          setupFee,
          monthlyFee: contractMeta?.monthly ?? '',
          ...formData,
          signatureMode,
          signatureData: signatureMode === 'draw' ? signatureData : '',
          timestamp: new Date().toLocaleString(),
          legal_notice: 'Digitally Signed via EZOS Tech Console'
        })
      });
    } catch (error) {
      console.error('Contract submission error', error);
    } finally {
      window.location.href = stripeLink;
    }
  };

  const escapeHtml = (value) =>
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  let seenHeading = false;
  const normalizedContract = contractText
    .replace('GENERAL TERMS & CONDITIONS (ALL TIERS)', `GENERAL TERMS & CONDITIONS (${contractMeta?.label ?? 'APPLICABLE TIER'})`)
    .replace(/\r\n/g, '\n');
  const contractHtml = normalizedContract
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return '<div class="contract-spacer"></div>';
      }

      const headingMatch = trimmed.match(/^\d+\.\s+/);
      const sectionTitleMatch = !headingMatch ? trimmed.match(/^[A-Z][A-Z\s&]+(\(.*\))?$/) : null;
      const listMatch = !headingMatch
        ? trimmed.match(/^(?!MASTER SERVICES|Monthly Rate:|Commitment:|Capacity:|Up to|Domains)(.*)$/)
        : null;

      if (headingMatch) {
        const spacer = seenHeading ? '<div class="contract-spacer"></div>' : '';
        seenHeading = true;
        return `${spacer}<div class="contract-heading">${escapeHtml(trimmed)}</div>`;
      }

      if (sectionTitleMatch) {
        return `<div class="contract-section-title">${escapeHtml(trimmed)}</div>`;
      }

      if (listMatch) {
        return `<div class="contract-bullet"><span class="contract-bullet-dot">&bull;</span><span>${escapeHtml(trimmed)}</span></div>`;
      }

      return `<div class="contract-line">${escapeHtml(trimmed)}</div>`;
    })
    .join('');

  return (
    <div className="flex flex-col pt-24 min-h-screen pb-20 relative z-10">
      <div className="print-only">
        <div className="print-header">
          <img src={logoFull} alt="EZOS TECH" className="print-logo" />
          <h1>Master Services Agreement</h1>
          <p>Tier: {contractMeta?.label ?? contractType.toUpperCase()} | Setup: ${setupFee.toLocaleString()} | Monthly: ${contractMeta?.monthly?.toLocaleString() ?? ''}</p>
        </div>
        <div className="print-meta">
          <div><strong>Company:</strong> {formData.companyName || '—'}</div>
          <div><strong>Signer:</strong> {formData.signerName || '—'}</div>
          <div><strong>Email:</strong> {formData.email || '—'}</div>
          <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
        </div>
        <div className="print-contract" dangerouslySetInnerHTML={{ __html: contractHtml }} />
        <div className="print-signature">
          <div className="print-signature-meta">
            <div><strong>Signer:</strong> {formData.signerName || '—'}</div>
            <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
          </div>
          <div><strong>Signature:</strong></div>
          {signatureMode === 'draw' && signatureData ? (
            <img src={signatureData} alt="Signature" className="print-signature-img" />
          ) : (
            <div className="print-signature-typed">{formData.signature || '—'}</div>
          )}
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-5xl relative z-10 no-print">
        <FadeIn>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                Secure Uplink: {contractMeta?.label ?? contractType.toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white">Master Services Agreement</h1>
            <p className="text-zinc-500 mt-2">Review terms, digitally sign, and initialize infrastructure funding.</p>
            {contractMeta && (
              <div className="mt-4 flex flex-wrap gap-3 text-xs font-mono text-zinc-400">
                <span className="px-3 py-1 rounded-full bg-zinc-900/70 border border-zinc-800">Setup: ${contractMeta.setupFee.toLocaleString()}</span>
                <span className="px-3 py-1 rounded-full bg-zinc-900/70 border border-zinc-800">Monthly: ${contractMeta.monthly.toLocaleString()}</span>
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col h-[800px] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-emerald-400/10 pointer-events-none" />
              <div className="relative bg-zinc-900/80 border-b border-zinc-800 px-5 py-3 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">MSA_{contractMeta?.label ?? 'PROTOCOL'}.txt</span>
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    className="px-2.5 py-1 rounded-full border border-zinc-600/70 bg-zinc-900/60 text-zinc-300 hover:border-emerald-400/70 hover:text-emerald-200 transition-colors"
                  >
                    Download PDF
                  </button>
                  <span className="px-2 py-0.5 rounded-full border border-zinc-700/70">Encrypted</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
                </div>
              </div>
              <div className="relative p-6 overflow-y-auto font-mono text-xs text-zinc-300 leading-relaxed custom-scrollbar">
                <div className="contract-body font-sans" dangerouslySetInnerHTML={{ __html: contractHtml }} />
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)] h-[800px] flex flex-col">
                <h3 className="text-white font-bold mb-4">Sign & Execute</h3>
                <div className="flex flex-col gap-4 flex-1">
                  <div>
                    <label className="text-xs text-zinc-500 uppercase font-mono mb-1 block">Company Name</label>
                    <input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-zinc-700 rounded p-2 text-sm text-white focus:border-indigo-500 outline-none"
                      placeholder="Client Corp"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-500 uppercase font-mono mb-1 block">Signer Full Name</label>
                    <input
                      name="signerName"
                      value={formData.signerName}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-zinc-700 rounded p-2 text-sm text-white focus:border-indigo-500 outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-500 uppercase font-mono mb-1 block">Work Email</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-zinc-700 rounded p-2 text-sm text-white focus:border-indigo-500 outline-none"
                      placeholder="john@client.com"
                    />
                    {!emailIsValid && formData.email && (
                      <p className="text-xs text-amber-400 mt-1">Enter a valid email address.</p>
                    )}
                  </div>

                  <div className={`pt-4 border-t border-zinc-800 ${signaturePulse ? 'signature-confirmed' : ''}`}>
                    <label className="text-xs text-zinc-500 uppercase font-mono mb-1 block">Digital Signature</label>
                    <div className="flex items-center gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => setSignatureMode('draw')}
                        className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border ${
                          signatureMode === 'draw' ? 'border-emerald-400 text-emerald-300' : 'border-zinc-700 text-zinc-400'
                        }`}
                      >
                        Draw
                      </button>
                      <button
                        type="button"
                        onClick={() => setSignatureMode('type')}
                        className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border ${
                          signatureMode === 'type' ? 'border-emerald-400 text-emerald-300' : 'border-zinc-700 text-zinc-400'
                        }`}
                      >
                        Type
                      </button>
                      {signatureMode === 'draw' && (
                        <button
                          type="button"
                          onClick={clearSignature}
                          className="ml-auto text-[10px] font-mono text-zinc-400 hover:text-zinc-200"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    {signatureMode === 'type' ? (
                      <div className="space-y-2">
                        <input
                          name="signature"
                          value={formData.signature}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-zinc-700 rounded p-3 text-lg text-white font-serif italic focus:border-emerald-500 outline-none placeholder:text-zinc-700"
                          placeholder="Type full name..."
                        />
                        <button
                          type="button"
                          onClick={handleAutoFillSignature}
                          disabled={!formData.signerName}
                          className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 hover:text-emerald-200 disabled:text-zinc-600"
                        >
                          Use signer name
                        </button>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed border-zinc-600 bg-zinc-100/95">
                        <canvas
                          ref={canvasRef}
                          className="w-full h-32 cursor-crosshair"
                          onPointerDown={handlePointerDown}
                          onPointerMove={handlePointerMove}
                          onPointerUp={handlePointerUp}
                          onPointerLeave={handlePointerUp}
                        />
                      </div>
                    )}
                    <p className="text-[10px] text-zinc-600 mt-1">
                      Drawing or typing your name constitutes a legal signature.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input
                      type="checkbox"
                      name="agreed"
                      checked={formData.agreed}
                      onChange={handleChange}
                      className="mt-1 bg-transparent border-zinc-700 rounded focus:ring-0"
                    />
                    <span className="text-xs text-zinc-400">
                      I agree to the Terms of Service and authorize the setup fee.
                    </span>
                  </div>

                  {submitError && <p className="text-xs text-amber-400">{submitError}</p>}

                  <div className="mt-auto space-y-3">
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={handleDownloadPdf}
                        disabled={!signatureIsValid || !formData.companyName || !formData.signerName || !emailIsValid}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-emerald-200 hover:border-emerald-400/80 hover:bg-emerald-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Download Contract PDF
                      </button>
                      <p className="text-[10px] text-zinc-500 text-center">
                        Download before payment for your records.
                      </p>
                    </div>

                    <button
                      onClick={handleSignAndPay}
                      disabled={!formData.agreed || !signatureIsValid || !formData.companyName || !formData.signerName || !emailIsValid || isSubmitting}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.2)] text-sm"
                    >
                      {isSubmitting ? 'Processing...' : `Pay Setup & Activate Contract ($${setupFee.toLocaleString()})`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const PrivacyView = () => (
  <div className="flex flex-col pt-16">
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-sm md:text-base text-muted-foreground mb-8">Last Updated: January 13, 2026</p>
          <div className="space-y-8 text-muted-foreground">
            <div><h2 className="text-2xl font-bold text-foreground mb-3">1. Introduction</h2><p>Ezos Tech ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (ezostech.com) or use our services.</p></div>
            <div><h2 className="text-2xl font-bold text-foreground mb-3">2. The Data We Collect</h2><p>We may collect, use, store, and transfer different kinds of personal data about you:</p><ul className="list-disc pl-6 space-y-2 mt-3"><li><strong>Identity Data:</strong> First name, last name, username, or similar identifier.</li><li><strong>Contact Data:</strong> Billing address, email address, and telephone numbers.</li><li><strong>Financial Data:</strong> Payment card details (processed securely via our third-party payment processors).</li><li><strong>Transaction Data:</strong> Details about payments and services you have purchased from us.</li><li><strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting, and location.</li></ul></div>
            <div><h2 className="text-2xl font-bold text-foreground mb-3">3. How We Use Your Data</h2><p>We will only use your personal data when the law allows us to:</p><ul className="list-disc pl-6 space-y-2 mt-3"><li><strong>Service Delivery:</strong> To build your infrastructure, configure domains, and manage email campaigns.</li><li><strong>Contractual Obligations:</strong> To process your monthly subscription or setup fees.</li><li><strong>Communication:</strong> To send you service updates, reports, or critical alerts regarding your infrastructure.</li></ul></div>
            <div><h2 className="text-2xl font-bold text-foreground mb-3">4. Data Security</h2><p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.</p></div>
            <div><h2 className="text-2xl font-bold text-foreground mb-3">5. Third-Party Services</h2><p>We may share data with specific third-party providers:</p><ul className="list-disc pl-6 space-y-2 mt-3"><li>Payment Processors (e.g., Stripe) for billing.</li><li>Scheduling Tools (e.g., Calendly) for booking consultations.</li><li>Form Providers (e.g., Tally) for application processing.</li></ul></div>
            <div><h2 className="text-2xl font-bold text-foreground mb-3">6. Your Legal Rights</h2><p>Under GDPR, you have rights to request access, correction, erasure, restriction, transfer, or to object to processing of your personal data.</p></div>
            <div><h2 className="text-2xl font-bold text-foreground mb-3">7. Contact Us</h2><p>For any questions regarding this privacy policy:</p><div className="mt-3"><p><strong>Ezos Tech</strong></p><p>Email: <a href="mailto:info@ezostech.com" className="text-primary hover:underline">info@ezostech.com</a></p><p>Website: ezostech.com</p></div></div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const TermsView = () => (
  <div className="flex flex-col pt-16">
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Terms and Conditions</h1>
          <p className="text-sm md:text-base text-muted-foreground mb-8">Last Updated: January 13, 2026</p>
          <div className="space-y-8 text-muted-foreground">
            <div><h2 className="text-2xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2><p>By accessing ezostech.com and using our services, you accept and agree to be bound by these terms.</p></div>
            <div><h2 className="text-2xl font-bold text-foreground mb-3">2. Services Description</h2><p>Ezos Tech provides "Cold Email Infrastructure" services, including domain procurement, DNS configuration, inbox warming, and campaign management.</p></div>
            <div><h2 className="text-2xl font-bold text-foreground mb-3">3. Client Obligations</h2><ul className="list-disc pl-6 space-y-2 mt-3"><li><strong>Content Compliance:</strong> You are solely responsible for the content of emails sent using our infrastructure. You agree to comply with all applicable laws (CAN-SPAM, GDPR, CASL).</li><li><strong>Non-Abusive Use:</strong> You agree not to use the infrastructure for phishing, scams, or illegal activities. We reserve the right to terminate services immediately if malicious activity is detected.</li></ul></div>
            <div><h2 className="text-2xl font-bold text-foreground mb-3">4. Payment & Subscription Terms</h2><ul className="list-disc pl-6 space-y-2 mt-3"><li><strong>Setup Fees:</strong> All setup fees are non-refundable once the build process has commenced.</li><li><strong>Monthly Subscriptions:</strong> Managed services are billed monthly. You may cancel with 30 days notice.</li><li><strong>Late Payments:</strong> Failure to pay within 7 days may result in suspension of your domains and inboxes.</li></ul></div>
            <div><h2 className="text-2xl font-bold text-foreground mb-3">5. Disclaimer of Warranties</h2><p>While we utilize industry-best practices to maximize deliverability:</p><ul className="list-disc pl-6 space-y-2 mt-3"><li>We cannot guarantee 100% inbox placement, as this is controlled by third-party providers.</li><li>We cannot guarantee a specific number of leads, replies, or sales.</li></ul></div>
            <div><h2 className="text-2xl font-bold text-foreground mb-3">6. Limitation of Liability</h2><p>Ezos Tech shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of our service.</p></div>
            <div><h2 className="text-2xl font-bold text-foreground mb-3">7. Governing Law</h2><p>These Terms shall be governed by the laws of England and Wales.</p></div>
            <div><h2 className="text-2xl font-bold text-foreground mb-3">8. Contact Information</h2><p>If you have any questions about these Terms, contact us at <a href="mailto:info@ezostech.com" className="text-primary hover:underline">info@ezostech.com</a>.</p></div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

function App() {
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !sessionStorage.getItem('ezos-booted');
  });
  const [currentView, setCurrentView] = useState('home');
  const [pricingTab, setPricingTab] = useState('DIY');
  const [openFaq, setOpenFaq] = useState(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  const viewToPath = {
    home: '/',
    'how-it-works': '/how-it-works',
    pricing: '/pricing',
    tutorials: '/academy',
    contact: '/contact',
    apply: '/apply',
    'thank-you': '/thank-you',
    contract: '/contract',
    privacy: '/privacy',
    terms: '/terms'
  };

  const pathToView = {
    '/': 'home',
    '/how-it-works': 'how-it-works',
    '/pricing': 'pricing',
    '/academy': 'tutorials',
    '/contact': 'contact',
    '/apply': 'apply',
    '/thank-you': 'thank-you',
    '/contract': 'contract',
    '/privacy': 'privacy',
    '/terms': 'terms'
  };

  useEffect(() => {
    const consent = localStorage.getItem('ezos-cookie-consent');
    if (!consent) {
      setShowCookieBanner(true);
    }
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const seo = SEO_MAP[currentView] || SEO_MAP.home;
    document.title = seo.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', seo.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.description);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `https://ezostech.com${seo.path}`);
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', seo.title);
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', seo.description);
    const canonical = document.querySelector('#canonical-link');
    if (canonical) canonical.setAttribute('href', `https://ezostech.com${seo.path}`);
  }, [currentView]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const meta = document.querySelector('meta[name="robots"]');
    if (!meta) return;
    const isVercelHost = window.location.hostname.endsWith('vercel.app');
    if (isVercelHost) {
      meta.setAttribute('content', 'noindex,nofollow');
      return;
    }
    meta.setAttribute('content', currentView === 'contract' ? 'noindex,nofollow' : 'index,follow');
  }, [currentView]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    if (viewParam === 'contract') {
      setCurrentView('contract');
      return;
    }
    const path = window.location.pathname || '/';
    const view = pathToView[path] || 'home';
    setCurrentView(view);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view');
      if (viewParam === 'contract') {
        setCurrentView('contract');
        scrollToTop();
        return;
      }
      const path = window.location.pathname || '/';
      const view = pathToView[path] || 'home';
      setCurrentView(view);
      scrollToTop();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem('ezos-cookie-consent', 'accepted');
    setShowCookieBanner(false);
  };

  const handleCookieReject = () => {
    localStorage.setItem('ezos-cookie-consent', 'rejected');
    setShowCookieBanner(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigate = (view) => {
    const nextView = viewToPath[view] ? view : 'home';
    const nextPath = viewToPath[nextView];
    window.history.pushState({}, '', nextPath);
    setCurrentView(nextView);
    scrollToTop();
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView navigate={navigate} Maps={Maps} />;
      case 'how-it-works':
        return <HowItWorksView navigate={navigate} Maps={Maps} openFaq={openFaq} setOpenFaq={setOpenFaq} />;
      case 'pricing':
        return <PricingView navigate={navigate} Maps={Maps} pricingTab={pricingTab} setPricingTab={setPricingTab} />;
      case 'tutorials':
        return <TutorialsView navigate={navigate} Maps={Maps} />;
      case 'contact':
        return <ContactView navigate={navigate} />;
      case 'apply':
        return <ApplyView navigate={navigate} />;
      case 'thank-you':
        return <ThankYouView navigate={navigate} />;
      case 'contract':
        return <ContractView />;
      case 'privacy':
        return <PrivacyView />;
      case 'terms':
        return <TermsView />;
      default:
        return <HomeView navigate={navigate} Maps={Maps} />;
    }
  };

  return (
    <>
      {loading ? (
        <BootSequence
          onComplete={() => {
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('ezos-booted', '1');
            }
            setLoading(false);
          }}
        />
      ) : (
        <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden" style={{ animation: 'fade-in 1s ease' }}>
          <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3 pointer-events-none" style={{ animation: 'breathe 14s ease-in-out infinite' }} />
          <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] opacity-10 translate-y-1/2 -translate-x-1/3 pointer-events-none" style={{ animation: 'breathe 18s ease-in-out infinite 2s' }} />
          <div className="fixed top-1/2 left-1/2 w-[400px] h-[400px] bg-violet-500 rounded-full blur-[150px] opacity-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ animation: 'breathe 22s ease-in-out infinite 4s' }} />

          <div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)',
              backgroundSize: '4rem 4rem',
              maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
              opacity: 0.1
            }}
          />

          <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1) translate(var(--tw-translate-x), var(--tw-translate-y)); opacity: 0.1; }
          50% { transform: scale(1.1) translate(var(--tw-translate-x), var(--tw-translate-y)); opacity: 0.15; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
        }
        @keyframes fluctuate-1 {
          0%, 100% { width: 85%; }
          50% { width: 94%; }
        }
        @keyframes fluctuate-2 {
          0%, 100% { width: 92%; }
          50% { width: 84%; }
        }
        @keyframes fluctuate-3 {
          0%, 100% { width: 45%; }
          50% { width: 55%; }
        }
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
        @keyframes noise {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-2%, 1%); }
          40% { transform: translate(1%, -2%); }
          60% { transform: translate(-1%, 2%); }
          80% { transform: translate(2%, -1%); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(124,58,237,0.0); }
          50% { box-shadow: 0 0 30px rgba(124,58,237,0.45); }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes word-reveal {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes underline-reveal {
          0% { width: 0; opacity: 0; }
          100% { width: 60%; opacity: 1; }
        }
        @keyframes caret-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes form-sweep {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes signature-pulse {
          0% { box-shadow: 0 0 0 rgba(16,185,129,0); }
          40% { box-shadow: 0 0 20px rgba(16,185,129,0.35); }
          100% { box-shadow: 0 0 0 rgba(16,185,129,0); }
        }
        .animate-fluctuate-1 {
          animation: fluctuate-1 3s ease-in-out infinite;
        }
        .animate-fluctuate-2 {
          animation: fluctuate-2 4s ease-in-out infinite;
        }
        .animate-fluctuate-3 {
          animation: fluctuate-3 5s ease-in-out infinite;
        }
        .scanlines {
          background: linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 100% 4px;
          animation: scanlines 6s linear infinite;
          mix-blend-mode: overlay;
        }
        .noise {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E");
          animation: noise 1.5s steps(2) infinite;
          mix-blend-mode: soft-light;
        }
        .pulse-glow {
          animation: pulse-glow 2.6s ease-in-out infinite;
        }
        .signature-confirmed {
          animation: signature-pulse 0.9s ease-out;
        }
        .print-only {
          display: none;
        }
        @media print {
          body { background: #fff; }
          .no-print { display: none !important; }
          .print-only { display: block; color: #111827; font-family: Arial, sans-serif; padding: 18mm; }
          .print-header h1 { font-size: 20px; margin: 0 0 6px 0; }
          .print-header p { font-size: 12px; color: #6b7280; margin: 0 0 14px 0; }
          .print-contract { font-size: 12px; line-height: 1.5; }
          .print-contract .contract-heading { font-weight: 700; margin-top: 18px; }
          .print-contract .contract-section-title { margin-top: 12px; font-weight: 600; }
          .print-contract .contract-bullet { display: flex; gap: 8px; margin-left: 14px; }
          .print-contract .contract-bullet-dot { font-weight: 700; }
          .print-contract .contract-line { margin-left: 14px; }
          .print-contract .contract-spacer { height: 8px; }
          .print-meta { margin: 12px 0 16px; font-size: 12px; }
          .print-meta div { margin-bottom: 4px; }
          .print-signature { margin-top: 18px; font-size: 12px; }
          .print-signature-meta { margin-bottom: 6px; }
          .print-signature-meta div { margin-bottom: 2px; }
          .print-signature-img { margin-top: 6px; max-width: 240px; max-height: 80px; filter: contrast(140%); }
          .print-signature-typed { margin-top: 6px; font-family: "Times New Roman", serif; font-size: 18px; color: #111827; }
          .print-header { position: relative; padding-top: 8px; }
          .print-logo { position: absolute; top: 0; right: 0; height: 28px; }
          @page { margin: 12mm; }
        }
        .ticker {
          display: inline-block;
          min-width: 200%;
          animation: ticker 18s linear infinite;
        }
        .heading-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(12px);
          animation: word-reveal 0.8s ease forwards;
          animation-delay: var(--word-delay, 0ms);
        }
        .section-title {
          position: relative;
          display: inline-block;
          letter-spacing: 0.02em;
        }
        .section-title::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -10px;
          height: 2px;
          width: 0;
          transform: translateX(-50%);
          background: linear-gradient(90deg, rgba(124,58,237,0), rgba(124,58,237,0.8), rgba(56,189,248,0.8), rgba(124,58,237,0));
          border-radius: 999px;
          animation: underline-reveal 0.9s ease forwards;
        }
        button:focus-visible,
        a:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px rgba(124,58,237,0.5), 0 0 20px rgba(124,58,237,0.35);
          border-radius: 0.6rem;
        }
        .parallax-orb {
          transition: transform 0.12s ease-out;
        }
        .card-sheen {
          position: relative;
          overflow: hidden;
        }
        .card-sheen::before {
          content: '';
          position: absolute;
          inset: -40% -60%;
          background: linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.06), transparent 65%);
          transform: translateX(-60%);
          transition: transform 1.1s ease;
          pointer-events: none;
        }
        .card-sheen:hover::before {
          transform: translateX(60%);
        }
        .footer-progress {
          height: 2px;
          width: 100%;
          background: linear-gradient(90deg, rgba(124,58,237,0), rgba(56,189,248,0.8), rgba(124,58,237,0));
          background-size: 200% 100%;
          animation: ticker 10s linear infinite;
          opacity: 0.6;
        }
        .cta-lift {
          transition: transform 180ms ease, box-shadow 180ms ease;
        }
        .cta-lift:hover {
          transform: translateY(-2px);
        }
        .animate-caret {
          display: inline-block;
          animation: caret-blink 1s steps(1) infinite;
        }
        .animate-form-sweep {
          animation: form-sweep 2.2s ease-in-out infinite;
          opacity: 0.55;
          mix-blend-mode: screen;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(24, 24, 27, 0.6);
          border-radius: 999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(124,58,237,0.6), rgba(16,185,129,0.5));
          border-radius: 999px;
          border: 1px solid rgba(39,39,42,0.7);
        }
        .contract-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .contract-heading {
          margin-top: 6px;
          font-weight: 700;
          color: #e4e4e7;
        }
        .contract-section-title {
          margin-top: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #d4d4d8;
        }
        .contract-line {
          margin-left: 12px;
        }
        .contract-bullet {
          display: flex;
          gap: 10px;
          margin-left: 24px;
        }
        .contract-bullet-dot {
          color: #a1a1aa;
          line-height: 1.2;
        }
        .contract-spacer {
          height: 10px;
        }
        button {
          position: relative;
          overflow: hidden;
          transform: translateZ(0);
        }
        button::after {
          content: '';
          position: absolute;
          inset: -40% -60%;
          background: linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.12), transparent 65%);
          transform: translateX(-60%);
          transition: transform 1.2s ease;
          pointer-events: none;
          opacity: 0.85;
        }
        button:hover::after {
          transform: translateX(60%);
        }
        button:disabled::after {
          opacity: 0;
        }
      `}</style>

          <Navbar currentView={currentView} navigate={navigate} />
          <main className="flex-1 relative z-10">{renderView()}</main>
          {currentView !== 'apply' && <Footer navigate={navigate} />}
          {showCookieBanner && <CookieBanner navigate={navigate} onAccept={handleCookieAccept} onReject={handleCookieReject} />}
        </div>
      )}
    </>
  );
}

export default App;
