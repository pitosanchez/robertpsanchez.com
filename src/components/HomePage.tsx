import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Testimonials from "./Testimonials";

gsap.registerPlugin(ScrollTrigger);

// Carousel images (all .webp except logo/favicon and rob-blue.webp)
const aboutCarouselImages = [
  "robert-sanchez.webp",
  "workshoping.webp",
  "virtual-event.webp",
  "speaking.webp",
  "profeel.webp",
  "presenting.webp",
  "meet-your-speaker.webp",
  "kidneytalk.webp",
  "keeping-me-healthy.webp",
  "jentosy-blanket.webp",
  "jen-keller.webp",
  "chw.webp",
  "attending-nephcure.webp",
  "action.webp",
];

const HomePage = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const resumeCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Add social media links
  const socialLinks = {
    linkedin: "https://linkedin.com/in/your-profile",
    twitter: "https://twitter.com/your-handle",
    instagram: "https://instagram.com/your-handle",
  };

  // Add Google Analytics
  const GA_TRACKING_ID = "YOUR-GA-TRACKING-ID";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    // Hero section parallax - adjusted for better mobile performance
    gsap.to(".hero-content", {
      yPercent: window.innerWidth < 768 ? 15 : 30, // Reduced parallax effect on mobile
      ease: "none",
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: window.innerWidth < 768 ? 0.5 : true, // Smoother scrub on mobile
        invalidateOnRefresh: true, // Recalculate on resize
      },
    });

    // Services cards stack animation - improved mobile timing
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          y: window.innerWidth < 768 ? 50 : 100, // Reduced movement on mobile
          opacity: 0,
          duration: window.innerWidth < 768 ? 0.8 : 1, // Faster animation on mobile
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50", // Adjusted trigger point for mobile
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
          delay: index * (window.innerWidth < 768 ? 0.1 : 0.2), // Faster sequence on mobile
        });
      }
    });

    // Resume stack-cards animation - improved mobile timing
    resumeCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          y: window.innerWidth < 768 ? 50 : 100, // Reduced movement on mobile
          opacity: 0,
          duration: window.innerWidth < 768 ? 0.8 : 1, // Faster animation on mobile
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50", // Adjusted trigger point for mobile
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
          delay: index * (window.innerWidth < 768 ? 0.1 : 0.2), // Faster sequence on mobile
        });
      }
    });

    // Advocacy section parallax - adjusted for mobile
    gsap.to(".advocacy-bg", {
      yPercent: window.innerWidth < 768 ? -10 : -20, // Reduced parallax on mobile
      ease: "none",
      scrollTrigger: {
        trigger: "#advocacy",
        start: "top bottom",
        end: "bottom top",
        scrub: window.innerWidth < 768 ? 0.5 : true, // Smoother scrub on mobile
        invalidateOnRefresh: true,
      },
    });
  }, []);

  // Add resize handler for GSAP updates
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!carouselRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-carousel-image",
        { opacity: 0, x: window.innerWidth < 768 ? 50 : 100 }, // Reduced movement on mobile
        {
          opacity: 1,
          x: 0,
          duration: window.innerWidth < 768 ? 0.6 : 0.8, // Faster animation on mobile
          ease: "power2.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 85%", // Adjusted trigger point for mobile
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        }
      );
    }, carouselRef);
    return () => ctx.revert();
  }, [carouselIndex]);

  const nextCarousel = () =>
    setCarouselIndex((i) => (i + 1) % aboutCarouselImages.length);
  const prevCarousel = () =>
    setCarouselIndex(
      (i) => (i - 1 + aboutCarouselImages.length) % aboutCarouselImages.length
    );

  // Initialize Google Analytics
  useEffect(() => {
    // Load Google Analytics script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", GA_TRACKING_ID);
  }, []);

  // Track page views
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: window.location.pathname,
      });
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "advocacy", label: "Advocacy" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ];

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError(null);
  };

  const validateEmail = (email: string) =>
    /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setFormError("All fields are required.");
      return;
    }
    if (!validateEmail(form.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    setFormSuccess(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setFormError(null);
    // TODO: Integrate with backend/email service
  };

  return (
    <div ref={mainRef} className="min-h-screen font-display text-gray-900">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#91B8DC]/95 shadow-lg backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center h-20">
            <motion.a
              href="#home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-xl sm:text-2xl font-light tracking-wider text-white font-display mb-2 md:mb-0"
            >
              <img
                src="/rs-logo.png"
                alt="RS Logo"
                className="h-16 w-16 sm:h-20 sm:w-20"
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-1 justify-evenly items-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-base sm:text-lg font-sans tracking-wide transition-colors text-white hover:text-[#2D6FAB] ${
                    activeSection === item.id ? "text-[#2D6FAB]" : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white mt-2 md:mt-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#91B8DC]"
            >
              <div className="px-4 pt-2 pb-4 space-y-2 flex flex-col">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-2 text-white hover:text-[#2D6FAB] hover:bg-white/10 rounded-md transition-colors text-base tracking-wide"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white flex items-center justify-center overflow-hidden pt-20"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        <div className="hero-content relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8 md:gap-12 text-center md:text-left font-display">
          {/* Full-height image on the left with parallax effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full md:w-1/2 h-[50vh] sm:h-[60vh] md:h-screen flex-shrink-0 flex items-center justify-center md:justify-start"
            style={{ boxShadow: "0 8px 32px 0 rgba(45, 111, 171, 0.25)" }}
          >
            {/* Dark gradient overlay for the image */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/80 to-transparent z-10" />
            {/* Main image, fully visible */}
            <img
              src="/rob-blue.webp"
              alt="Robert A. Sanchez"
              className="w-full h-full object-cover relative z-20"
              style={{ boxShadow: "0 8px 32px 0 rgba(45, 111, 171, 0.25)" }}
            />
          </motion.div>
          {/* Dynamic text overlay on the right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center items-center md:items-start px-4 sm:px-0"
          >
            <p className="text-lg sm:text-2xl md:text-4xl uppercase tracking-widest font-light mb-3 sm:mb-4 md:mb-6 font-cinzel">
              ROBERT A. SANCHEZ, MPS
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-7xl font-cinzel font-thin leading-tight mb-6 sm:mb-8 md:mb-12 text-center md:text-left">
              Patient Advocate & Clinical Social Interviewer
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2D6FAB] hover:bg-[#2D6FAB]/90 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-md text-sm sm:text-base md:text-lg transition-colors font-display w-full sm:w-auto"
              onClick={() => scrollToSection("about")}
            >
              Start Your Journey
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-16 sm:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-extrabold text-[#2D6FAB] mb-8 sm:mb-12 text-center tracking-wide uppercase">
            About Me
          </h2>
          <div
            className="flex flex-col items-center mb-8 sm:mb-12"
            ref={carouselRef}
          >
            <div className="relative w-full max-w-xl h-80 sm:h-96 md:h-[32rem] overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl bg-[#E9E9ED] flex items-center justify-center">
              <img
                src={`/${aboutCarouselImages[carouselIndex]}`}
                alt="About carousel"
                className="about-carousel-image w-full h-full object-contain rounded-2xl sm:rounded-3xl transition-opacity duration-700 z-10"
                style={{
                  boxShadow: "0 8px 32px 0 rgba(45, 111, 171, 0.25)",
                  objectPosition: "center center",
                  padding: "1rem",
                }}
              />
              {/* Carousel controls */}
              <button
                onClick={prevCarousel}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#2D6FAB] rounded-full p-1.5 sm:p-2 shadow-lg z-20"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextCarousel}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#2D6FAB] rounded-full p-1.5 sm:p-2 shadow-lg z-20"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="flex gap-1.5 sm:gap-2 mt-3 sm:mt-4">
              {aboutCarouselImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                    carouselIndex === idx ? "bg-[#2D6FAB]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <div
            className="mx-auto text-gray-900 font-sans text-[1.18rem] sm:text-[1.25rem] leading-loose tracking-normal max-w-4xl"
            style={{ letterSpacing: "0.01em" }}
          >
            <p className="mb-8 font-semibold text-[#2D6FAB] text-2xl font-cinzel text-center tracking-wide leading-snug">
              Mission-Driven Health Equity Advocate
            </p>
            <p className="mb-7 font-medium">
              I'm driven by a singular mission: to expand living kidney donation
              and amplify the voices of underserved communities affected by rare
              kidney diseases like FSGS and IgAN. As Co-Founder of The Jentosy
              Project at Kidney Forward, I've spearheaded a nationwide campaign
              that normalizes conversations about living donation—developing
              culturally tailored outreach strategies, coordinating
              storytelling-focused events, and building partnerships with
              transplant centers, community leaders, and advocacy groups to
              measurably increase donor registrations in Black and Brown
              neighborhoods.
            </p>
            <p className="mb-7 font-medium">
              In my current role at Albert Einstein Medical College, I guide
              transplant candidates through every phase of evaluation—bringing
              together multidisciplinary teams, addressing social determinants
              of health, and designing post-transplant support workshops that
              boost engagement and improve outcomes. I translate frontline
              insights into concise "field reports" that inform program
              adjustments and policy recommendations, ensuring that patient
              needs remain at the center of institutional decision-making.
            </p>
            {/* Advocacy Cards Grid */}
            <div className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                {
                  title: "Deepening Advocacy Partnerships",
                  description:
                    "Strengthening alliances with health-equity and rare-disease organizations to close resource gaps.",
                  icon: "🤝",
                },
                {
                  title: "Geo-Targeted Community Engagement",
                  description:
                    "Crafting bilingual materials and outreach tactics that resonate locally and foster lasting trust.",
                  icon: "🌍",
                },
                {
                  title: "Cross-Functional Collaboration",
                  description:
                    "Bridging clinical teams, social workers, pharmacists, and educators—while upholding strict compliance standards.",
                  icon: "👥",
                },
                {
                  title: "Data-Driven Impact Measurement",
                  description:
                    "Embedding KPIs into every initiative to track progress and refine strategies in real time.",
                  icon: "📊",
                },
              ].map((card, idx) => (
                <div
                  key={card.title}
                  ref={(el) => {
                    if (!window._advocacyCards) window._advocacyCards = [];
                    window._advocacyCards[idx] = el;
                  }}
                  className="group h-[200px] sm:h-[250px] [perspective:1000px]"
                >
                  <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front of card (Side A) */}
                    <div
                      className="absolute w-full h-full rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center [backface-visibility:hidden]"
                      style={{
                        background: "linear-gradient(165deg, #91B8DC, #7BA3C9)",
                        boxShadow: `
                          0 20px 40px -10px rgba(45, 111, 171, 0.4),
                          0 0 0 1px rgba(45, 111, 171, 0.1),
                          0 0 0 2px rgba(45, 111, 171, 0.05),
                          0 0 0 3px rgba(45, 111, 171, 0.025),
                          inset 0 2px 4px rgba(255, 255, 255, 0.1)
                        `,
                        border: "1px solid rgba(45, 111, 171, 0.2)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div
                        className="text-4xl mb-4"
                        style={{
                          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        {card.icon}
                      </div>
                      <h3
                        className="text-lg sm:text-xl font-bold font-cinzel text-white"
                        style={{
                          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        {card.title}
                      </h3>
                      <div className="absolute bottom-4 text-sm text-white/80">
                        Hover to learn more
                      </div>
                    </div>

                    {/* Back of card (Side B) */}
                    <div
                      className="absolute w-full h-full rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
                      style={{
                        background: "linear-gradient(165deg, #7BA3C9, #91B8DC)",
                        boxShadow: `
                          0 20px 40px -10px rgba(45, 111, 171, 0.4),
                          0 0 0 1px rgba(45, 111, 171, 0.1),
                          0 0 0 2px rgba(45, 111, 171, 0.05),
                          0 0 0 3px rgba(45, 111, 171, 0.025),
                          inset 0 2px 4px rgba(255, 255, 255, 0.1)
                        `,
                        border: "1px solid rgba(45, 111, 171, 0.2)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <p
                        className="text-base font-medium leading-relaxed text-white"
                        style={{
                          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* End Advocacy Cards Grid */}
            <p className="mb-7 font-medium">
              Earlier in my career, I co-founded Rehabilitation Through the Arts
              (RTA)—the theater program that inspired Sing Sing—where I learned
              how creative collaboration can dismantle barriers and spark
              transformation. That experience in cultural humility and
              resilience now underpins every advocacy campaign I lead.
            </p>
            <p className="mb-0 font-medium">
              With a Bachelor's in Behavioral Science, an M.P.S. in Professional
              Studies, fluency in English and Spanish, and seven-plus years of
              grassroots and clinical advocacy, I'm prepared to drive
              patient-centered outreach, foster strategic community
              partnerships, and elevate living-donor dialogue on a national
              scale. If you're looking for a Community Advocate who combines
              clinical rigor with creative vision—and who's deeply committed to
              increasing kidney-donor rates in communities that need it most—I'd
              welcome the opportunity to make that impact together.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="bg-[#2D6FAB] text-white py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-light mb-3 sm:mb-4 md:mb-6">
              My Services
            </h2>
            <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              Empowering individuals and communities through comprehensive
              healthcare advocacy and education.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-12">
            {[
              {
                title: "Patient Advocacy",
                description:
                  "Guiding individuals through complex healthcare processes with personalized care and expert support.",
                icon: "🏥",
              },
              {
                title: "Community Workshops",
                description:
                  "Interactive sessions designed to empower communities on health equity, policy, and advocacy.",
                icon: "👥",
              },
              {
                title: "Public Speaking",
                description:
                  "Engaging talks and keynotes focused on personal experiences, resilience, and transformative justice.",
                icon: "🎤",
              },
            ].map((service, index) => (
              <div
                key={service.title}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 hover:bg-white/20 transition-colors transform hover:-translate-y-2 duration-300"
              >
                <div className="text-3xl sm:text-4xl mb-4 sm:mb-6">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl uppercase tracking-wide mb-3 sm:mb-4 font-light">
                  {service.title}
                </h3>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base text-white/90">
                  {service.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#2D6FAB] hover:bg-white/90 px-4 sm:px-6 py-2 rounded-md transition-colors text-sm sm:text-base w-full sm:w-auto"
                >
                  Learn More
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Resume Highlight Section */}
      <section id="resume" className="bg-[#E9E9ED] py-16 sm:py-24 px-2 sm:px-4">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-4xl font-display mb-10 text-center">
            Full Resume
          </h3>
          <div className="flex justify-end mb-8">
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/SanchezRobert.docx";
                link.download = "SanchezRobert.docx";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="flex items-center gap-2 bg-[#2D6FAB] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300"
            >
              <svg
                className="w-5 h-5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Resume (Word)
            </button>
          </div>
          {/* Page 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-900 font-sans mb-12">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold tracking-wide">
                ROBERT A. SANCHEZ
              </h1>
              <div className="uppercase text-sm font-semibold tracking-widest mt-1 mb-2">
                Clinical Social Interviewer & Patient Advocate
              </div>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-sm text-gray-700 mb-2">
                <span>347-209-5482</span>
                <span className="hidden sm:inline">|</span>
                <span>robsanchez124@gmail.com</span>
                <span className="hidden sm:inline">|</span>
                <span>Bronx, NY 10462</span>
              </div>
            </div>
            <div className="italic text-center text-gray-700 mb-6">
              Strategic Clinical Social Interviewer & Patient Advocate with
              expertise in patient advocacy, stakeholder engagement, and program
              development. Proven ability to advance health equity through
              cultural humility and collaborative research initiatives. Eager to
              leverage skills in cross-functional collaboration and policy
              development to support patient-centered care and community
              empowerment.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-sm">
              <ul className="list-disc list-inside space-y-1">
                <li>Patient Advocacy & Education</li>
                <li>Community & Stakeholder Engagement</li>
                <li>Cross-Functional Collaboration</li>
                <li>KPI Development & Data Analysis</li>
                <li>Collaborative mindset</li>
                <li>Meeting facilitation</li>
                <li>Policy Improvements</li>
              </ul>
              <ul className="list-disc list-inside space-y-1">
                <li>Program Development & Strategic Planning</li>
                <li>Mixed-Methods Research & Evaluation</li>
                <li>Cultural Humility & Health Equity</li>
                <li>Operational management</li>
                <li>Policy development</li>
                <li>Outreach strategies</li>
                <li>Teamwork</li>
              </ul>
            </div>
            <div className="font-bold text-[#2D6FAB] text-lg mt-8 mb-2">
              EXPERIENCE
            </div>
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div>
                  <span className="font-semibold">
                    SENIOR CLINICAL INTERVIEWER & PATIENT ADVOCATE
                  </span>
                  <br />
                  <span className="italic text-gray-700">
                    Albert Einstein Medical College
                  </span>
                </div>
                <div className="text-sm text-gray-600 sm:text-right mt-2 sm:mt-0">
                  Bronx, NY
                  <br />
                  October 2020 - Present
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-1">
                <li>
                  Guide patients through kidney transplant evaluation,
                  coordinating multidisciplinary care and addressing social
                  determinants of health.
                </li>
                <li>
                  Develop and facilitate living donation and post-transplant
                  support workshops, improving patient engagement and education.
                </li>
                <li>
                  Liaise between clinical teams, social services, and community
                  partners to streamline referrals and resource access.
                </li>
                <li>
                  Contribute to health literacy initiatives, performing chart
                  reviews and optimizing scheduling workflows.
                </li>
                <li>
                  Administered interviews by following scripts and using
                  appropriate interviewing techniques and protocols.
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div>
                  <span className="font-semibold">
                    PRINCIPLE LEAD, THE JENTOSY PROJECT
                  </span>
                  <br />
                  <span className="italic text-gray-700">Gallery/Remote</span>
                </div>
                <div className="text-sm text-gray-600 sm:text-right mt-2 sm:mt-0">
                  Remote, United States
                  <br />
                  January 2022 - Present
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-1">
                <li>
                  Founded The Jentosy Project, a national initiative to expand
                  access to live kidney donation for Black and Brown patients.
                </li>
                <li>
                  Designed and executed outreach strategies to increase donor
                  awareness and diversify the national kidney registry.
                </li>
                <li>
                  Collaborated with transplant centers, community leaders, and
                  national advocacy groups to achieve project goals.
                </li>
              </ul>
            </div>
          </div>
          {/* Page 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-900 font-sans mb-12">
            <div className="font-bold text-[#2D6FAB] text-lg mb-2">
              EXPERIENCE (CONTINUED)
            </div>
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div>
                  <span className="font-semibold">
                    STEERING COMMITTEE MEMBER, ACCELERATOR TEAMS MODEL &
                    STRATEGY
                  </span>
                  <br />
                  <span className="italic text-gray-700">
                    PCORI PRIMED Clinical Research Network
                  </span>
                </div>
                <div className="text-sm text-gray-600 sm:text-right mt-2 sm:mt-0">
                  United States
                  <br />
                  November 2021 - Present
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-1">
                <li>
                  Member of the Accelerator Steering Committee across nine
                  topic-specific workstreams (e.g., Disparities/Kidney Disease).
                </li>
                <li>
                  Design and deploy patient engagement toolkits and trainings to
                  foster co-learning among researchers and community advocates.
                </li>
                <li>
                  Embed intersectionality frameworks into engagement activities,
                  enhancing cultural competence and stakeholder representation.
                </li>
                <li>
                  Report outcomes and secure Governance Board approvals for key
                  strategic initiatives.
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div>
                  <span className="font-semibold">
                    COMMUNITY BOARD MEMBER, STRUCTURAL RACISM & KIDNEY OUTCOMES
                  </span>
                  <br />
                  <span className="italic text-gray-700">
                    Icahn School of Medicine at Mount Sinai
                  </span>
                </div>
                <div className="text-sm text-gray-600 sm:text-right mt-2 sm:mt-0">
                  New York, NY
                  <br />
                  October 2018 - Present
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-1">
                <li>
                  Advise on mixed-methods research exploring structural racism
                  as a "third risk" factor in APOL1-associated kidney disease.
                </li>
                <li>
                  Co-design qualitative studies (photovoice, focus groups) and
                  longitudinal cohort analyses to quantify systemic barriers.
                </li>
                <li>
                  Pilot a navigator-led intervention to mitigate effects of
                  structural racism on patient outcomes.
                </li>
                <li>
                  Translate field insights into policy recommendations for
                  program refinement.
                </li>
                <li>
                  Participated in community events as an ambassador for the
                  organization's mission and goals.
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div>
                  <span className="font-semibold">
                    PROJECT LEAD, HEALTH EQUITY
                  </span>
                  <br />
                  <span className="italic text-gray-700">
                    WE at The World Health Equity
                  </span>
                </div>
                <div className="text-sm text-gray-600 sm:text-right mt-2 sm:mt-0">
                  New York, NY
                  <br />
                  January 2020 - October 2021
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-1">
                <li>
                  Developed and implemented strategies to reduce transplant
                  wait-times for Black and Brown communities by 35%.
                </li>
                <li>
                  Built a national network of transplant physicians, nonprofit
                  leaders, and donors to amplify advocacy and fundraising.
                </li>
                <li>
                  Established KPI frameworks to measure outreach effectiveness
                  and inform continuous program improvements.
                </li>
                <li>
                  Organized virtual/in-person events (infairs, info sessions) to
                  increase donor awareness and community accountability.
                </li>
                <li>
                  Successfully managed multiple programs simultaneously,
                  ensuring all deliverables were met on time and within budget.
                </li>
                <li>
                  Provided technical guidance to team members throughout the
                  duration of a project.
                </li>
              </ul>
            </div>
          </div>
          {/* Page 3 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-900 font-sans mb-12">
            <div className="font-bold text-[#2D6FAB] text-lg mb-2">
              BILINGUAL FACILITATOR
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
              <div>
                <span className="font-semibold">Housing Works</span>
              </div>
              <div className="text-sm text-gray-600 sm:text-right mt-2 sm:mt-0">
                September 2017 - Dec
              </div>
            </div>
            <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-1 mb-6">
              <li>
                Facilitated 200+ clinical support groups for 6,000+
                justice-involved individuals, covering mental health and reentry
                topics.
              </li>
              <li>
                Designed and delivered soft-skills curriculum (anger management,
                conflict resolution), achieving a 75% skill-uptake rate.
              </li>
              <li>
                Placed over 1,000 participants in training programs and
                employment sites, supporting successful community reintegration.
              </li>
              <li>
                Organized and facilitated team meetings with effective
                communication skills.
              </li>
              <li>
                Developed training materials to ensure participants were
                prepared for upcoming events.
              </li>
            </ul>
            <div className="font-bold text-[#2D6FAB] text-lg mb-2">
              EDUCATION
            </div>
            <div className="mb-4">
              <div className="font-semibold">
                M.P.S. IN PROFESSIONAL STUDIES
              </div>
              <div className="italic text-gray-700">
                New York Theological Seminary
              </div>
            </div>
            <div className="mb-4">
              <div className="font-semibold">B.S. IN BEHAVIORAL SCIENCE</div>
              <div className="italic text-gray-700">Mercy College, NY</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold">
                CLINICAL SOCIAL WORK PRACTICES IN MSW COURSEWORK
              </div>
              <div className="italic text-gray-700">
                The Silberman School of Social Work
              </div>
            </div>
            <div className="font-bold text-[#2D6FAB] text-lg mb-2">
              CERTIFICATIONS
            </div>
            <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-1 mb-6">
              <li>Mental Health First Aid</li>
              <li>Motivational Interviewing</li>
              <li>
                Front End Software Engineering, Columbia University, 01/01/21
              </li>
            </ul>
            <div className="font-bold text-[#2D6FAB] text-lg mb-2">
              COURSEWORK
            </div>
            <div className="mb-4">
              <div>
                Clinical Social Work Practices (MSW coursework), The Silberman
                School of Social Work, 01/01/15, 01/01/16
              </div>
            </div>
            <div className="font-bold text-[#2D6FAB] text-lg mb-2">
              REFERENCES
            </div>
            <div className="mb-4">References available upon request.</div>
            <div className="font-bold text-[#2D6FAB] text-lg mb-2">
              LANGUAGES
            </div>
          </div>
        </div>
      </section>

      {/* Advocacy Section */}
      <section
        id="advocacy"
        className="bg-[#91B8DC] py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 text-white relative overflow-hidden"
      >
        <div className="advocacy-bg absolute inset-0 bg-[#2D6FAB]/20" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 sm:px-6 md:px-8"
          >
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-light mb-4 sm:mb-6 md:mb-8">
              Rehabilitation Through the Arts (RTA)
            </h3>
            <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12">
              My work with RTA and the inspiration behind the movie{" "}
              <em>Sing Sing</em> underscores my commitment to transformative
              justice through creativity.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2D6FAB] hover:bg-[#2D6FAB]/90 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-md transition-colors text-sm sm:text-base md:text-lg w-full sm:w-auto max-w-xs mx-auto"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-16 sm:py-24 px-2 sm:px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-4xl font-display mb-4 sm:mb-6">
              Let's Connect
            </h3>
            <p className="text-base sm:text-lg mb-8 sm:mb-12 text-gray-600">
              Interested in collaboration or advocacy? Reach out today.
            </p>
            <form
              onSubmit={handleFormSubmit}
              className="bg-[#E9E9ED] rounded-xl shadow-lg p-8 text-left max-w-xl mx-auto"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D6FAB]"
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D6FAB]"
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D6FAB]"
                  type="text"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D6FAB]"
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleFormChange}
                  required
                />
              </div>
              {formError && (
                <div className="mb-4 text-red-600 font-medium">{formError}</div>
              )}
              {formSuccess && (
                <div className="mb-4 text-green-600 font-medium">
                  Thank you! Your message has been sent.
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-[#2D6FAB] text-white py-3 rounded-md font-semibold hover:bg-[#1e4e7a] transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-light mb-4">ROBERT A. SANCHEZ</h4>
              <p className="text-gray-400">
                Your Certified Guide To Advocating Health Equity & Social
                Justice
              </p>
            </div>
            <div>
              <h4 className="text-xl font-light mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-light mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} Robert A. Sanchez. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-[#2D6FAB]"
      >
        Skip to main content
      </a>
    </div>
  );
};

export default HomePage;
