import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Carousel images with titles
const aboutCarouselImages = [
  {
    src: "robert-sanchez.webp",
    title: "Robert Sanchez - Health Equity Advocate",
  },
  {
    src: "workshoping.webp",
    title: "Leading Health Equity Workshop",
  },
  {
    src: "virtual-event.webp",
    title: "Virtual Health Education Event",
  },
  {
    src: "speaking.webp",
    title: "Public Speaking Engagement",
  },
  {
    src: "presenting.webp",
    title: "Presenting at Health Conference",
  },
  {
    src: "meet-your-speaker.webp",
    title: "Meet Your Speaker",
  },
  {
    src: "kidneytalk.webp",
    title: "Kidney Health Discussion",
  },
  {
    src: "keeping-me-healthy.webp",
    title: "Health and Wellness Focus",
  },
  {
    src: "jentosy-blanket.webp",
    title: "The Jentosy Project Initiative",
  },
  {
    src: "jen-keller.webp",
    title: "Collaboration with Jen Keller",
  },
  {
    src: "chw.webp",
    title: "Community Health Worker Training",
  },
  {
    src: "attending-nephcure.webp",
    title: "NephCure Event Participation",
  },
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
    linkedin: "https://www.linkedin.com/in/robsanchez124/",
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
    { id: "mission", label: "Mission" },
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setFormError("All fields are required.");
      return;
    }
    if (!validateEmail(form.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);

    formData.append("access_key", "237ca06d-386d-455e-a2cc-c8e192dd415f");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setFormError("Failed to send message. Please try again.");
      return;
    }

    const data = await response.json();
    if (data.success) {
      setFormSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setFormError(null);
    } else {
      setFormError("Failed to send message. Please try again.");
    }
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
                className={`h-16 w-16 sm:h-20 sm:w-20 transition-all duration-300 ${
                  !isScrolled
                    ? "drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] brightness-110 contrast-110"
                    : "drop-shadow-[0_0_15px_rgba(255,255,255,0.9)] brightness-125 contrast-125 hover:drop-shadow-[0_0_20px_rgba(255,255,255,1)]"
                }`}
                style={{
                  filter: !isScrolled
                    ? "brightness(1.2) contrast(1.2)"
                    : "brightness(1.4) contrast(1.4)",
                  transform: "scale(1.05)",
                }}
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
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-light text-[#2D6FAB] mb-8 sm:mb-12 text-center tracking-wide uppercase">
            About Me
          </h2>
          <div
            className="flex flex-col items-center mb-8 sm:mb-12"
            ref={carouselRef}
          >
            <div className="relative w-full max-w-xl h-80 sm:h-96 md:h-[32rem] overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl bg-[#E9E9ED] flex items-center justify-center">
              <img
                src={`/${aboutCarouselImages[carouselIndex].src}`}
                alt={aboutCarouselImages[carouselIndex].title}
                title={aboutCarouselImages[carouselIndex].title}
                className="about-carousel-image w-full h-full object-contain rounded-2xl sm:rounded-3xl transition-opacity duration-700 z-10"
                style={{
                  boxShadow: "0 8px 32px 0 rgba(45, 111, 171, 0.25)",
                  objectPosition: "center center",
                  padding: "1rem",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-center z-20">
                <h3 className="text-lg sm:text-xl font-light">
                  {aboutCarouselImages[carouselIndex].title}
                </h3>
              </div>
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
            className="mx-auto text-gray-900 font-sans text-lg sm:text-xl leading-relaxed tracking-normal max-w-4xl"
            style={{ letterSpacing: "0.01em" }}
          >
            <p className="mb-8 font-light text-[#2D6FAB] text-3xl font-cinzel text-center tracking-wide leading-snug">
              Mission-Driven Kidney Health Advocate
            </p>
            <p className="mb-7">
              I'm dedicated to a singular purpose: increasing living kidney
              donations and amplifying the voices of underserved communities
              deeply affected by rare kidney diseases like FSGS and IgA
              Nephropathy. As Co-Founder of The Jentosy Project at Kidney
              Forward, I've led a national movement designed to normalize
              conversations around living donation. By creating culturally
              responsive outreach initiatives, coordinating impactful
              storytelling events, and fostering strategic partnerships with
              transplant centers, community leaders, and advocacy organizations,
              we've significantly raised donor registrations in underserved
              neighborhoods nationwide.
            </p>
            <p className="mb-7">
              In my current role at Albert Einstein Medical College, I guide
              transplant candidates through each stage of their journey—from
              initial evaluation to post-transplant support. My approach
              emphasizes multidisciplinary collaboration, comprehensive
              attention to social determinants of health, and personalized
              patient workshops designed to improve long-term engagement and
              health outcomes. By consistently translating frontline experiences
              into actionable "field reports," I help institutions refine
              programs and policies, ensuring patient needs remain central to
              every decision.
            </p>
            <p className="mb-7">
              My approach to advocacy is built on four key pillars that guide
              every initiative and partnership I undertake. These principles
              form the foundation of my work in healthcare equity and community
              engagement:
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
                        className="text-xl font-light font-cinzel text-white"
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
                        className="text-lg font-light leading-relaxed text-white"
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
            <p className="mb-7">
              My advocacy journey began with co-founding Rehabilitation Through
              the Arts (RTA), a transformative theater program that inspired the
              acclaimed film "Sing Sing." This early experience instilled in me
              a deep understanding of how creative collaboration, cultural
              humility, and resilience can dismantle barriers and spark
              meaningful change—principles I continue to apply to every
              initiative I undertake.
            </p>
            <p className="mb-0">
              With a Bachelor's degree in Behavioral Science, a Master's in
              Professional Studies, bilingual fluency in English and Spanish,
              and over two decades of experience in grassroots and clinical
              advocacy, I'm uniquely positioned to lead patient-centered
              outreach, cultivate impactful community partnerships, and elevate
              the dialogue surrounding living kidney donation on a national
              scale. My work intentionally engages communities directly—through
              churches, barbershops, local gatherings, sporting events, and even
              neighborhood nightspots—to ensure conversations about kidney
              health happen where people feel most comfortable and receptive. If
              you're seeking a dedicated Community Advocate who combines
              clinical expertise with a visionary approach—committed to making a
              measurable impact on kidney donor rates in communities that need
              it most—let's connect and drive this vital mission forward
              together.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section - Now Mission Section */}
      <section
        id="mission"
        className="min-h-screen bg-gradient-to-br from-[#2D6FAB] to-[#1a4b7c] text-white py-16 sm:py-20 px-4 sm:px-8 relative overflow-hidden"
      >
        {/* Subtle animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2D6FAB]/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-light mb-8 sm:mb-12 text-center tracking-wide uppercase">
              Mission
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl max-w-3xl mx-auto leading-relaxed font-light">
              Empowering individuals and communities through comprehensive
              healthcare advocacy and education.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-16 max-w-5xl mx-auto">
            {[
              {
                title: "Patient Advocacy",
                icon: "🏥",
                description: `When I was first diagnosed with FSGS, I had no idea what those four letters would come to mean in my life. Focal Segmental Glomerulosclerosis is a rare kidney disease that causes scarring in parts of the kidneys' filtering units (glomeruli). Over time, that damage can lead to kidney failure. It disproportionately affects people of African, Caribbean, and Hispanic descent—and research suggests that genetics, environment, and social factors all play a role in who gets this disease and how it progresses.

IgA Nephropathy is another rare kidney condition, sometimes called Berger's disease, which occurs when an antibody called immunoglobulin A builds up in the kidneys, causing inflammation. This inflammation can eventually impair kidney function, especially when left undiagnosed or untreated. Like FSGS, it's often invisible until it's advanced, and it's not widely understood in many communities of color.

At the time of my diagnosis, I didn't know what questions to ask. I didn't see myself reflected in any of the materials. And I certainly didn't feel like anyone was speaking directly to people like me—Black, Puerto Rican, from the Bronx—trying to make sense of a condition I had never even heard of.

That's why I became a patient advocate. Not because I had all the answers, but because I knew what it felt like to have none.

Being a patient advocate means using my lived experience to help others navigate a healthcare system that often feels cold, complex, or inaccessible. It means standing in the gap—between patients and healthcare professionals, between fear and understanding, between surviving and thriving.

It also means working with healthcare systems and pharmaceutical companies, not just critiquing them. Because in order to better understand diseases like FSGS and IgA Nephropathy, we need research that reflects our communities. We need clinical trials designed with equity in mind. We need companies that listen to patient voices from the beginning—not as an afterthought.

A real patient advocate doesn't just amplify stories—they help shape systems. They push for culturally relevant education, build bridges between science and lived experience, and foster trust in communities that have long been neglected.

For me, advocacy is personal. It's a commitment to making sure that rare doesn't mean forgotten. Whether I'm mentoring a newly diagnosed patient, developing outreach materials, or collaborating on strategies for community education, I carry this mission with me: people matter.

And when we treat people like they matter—when we educate, empower, and uplift—we don't just change individual outcomes. We shift entire systems. That's what being a patient advocate means to me.`,
                color: "bg-gradient-to-br from-blue-500/20 to-blue-600/30",
              },
              {
                title: "Community Workshops",
                icon: "👥",
                description: `I lead dynamic, community-rooted workshops that meet people where they are—virtually and in person. Through The Jentosy Project, We In The World, and Chromatic Black, I've facilitated sessions in Atlanta, Washington D.C., and New York City, connecting with communities across health, housing, and justice spaces. These workshops aren't just informational—they're transformational.

I've worked with organizations like STRIVE to support fatherhood and reentry programs, and with Housing Works to lead life-coaching and wellness sessions. My workshops explore the complexities of kidney health, rare diseases like FSGS and IgA Nephropathy, and the everyday challenges people face in accessing quality care. Each session is built to foster trust, spark real dialogue, and provide practical tools for change.

Workshops have the power to unlock community leadership, deepen understanding, and help people imagine new possibilities for wellness and connection. They create space for healing, learning, and mobilizing around solutions that reflect people's lived realities.`,
                color: "bg-gradient-to-br from-purple-500/20 to-purple-600/30",
              },
              {
                title: "Public Speaking",
                icon: "🎤",
                description: `Public speaking is where I turn lived experience into purpose-driven storytelling. I speak with clarity and compassion about resilience, identity, and the path from patient to advocate. As someone who's faced the complexities of a rare kidney disease diagnosis firsthand, I understand how vital it is to share honest, human stories that move people to think—and act—differently.

I've given talks and keynotes for healthcare institutions, advocacy groups, universities, and national nonprofits. Whether the focus is on navigating rare conditions like FSGS and IgA Nephropathy, building trust in care settings, or empowering communities to advocate for themselves, I bring a voice rooted in both personal experience and professional practice.

My goal is to inform, inspire, and ignite connection. I help audiences see the person behind the diagnosis, the family behind the policy, and the community behind the data. Speaking is not just about delivering information—it's about opening hearts and minds to new ways of understanding and engaging with the world around us.`,
                color: "bg-gradient-to-br from-teal-500/20 to-teal-600/30",
              },
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`${section.color} backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3),0_10px_20px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.4),0_15px_25px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.15)] hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{section.icon}</span>
                  <h3 className="text-3xl md:text-4xl font-cinzel font-light text-white">
                    {section.title}
                  </h3>
                </div>
                <div className="text-white text-lg sm:text-xl leading-relaxed space-y-6">
                  {section.description.split("\n").map((paragraph, idx) => (
                    <p key={idx} className="mb-6 last:mb-0 font-light">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Highlight Section */}
      <section id="resume" className="bg-[#E9E9ED] py-16 sm:py-24 px-2 sm:px-4">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-extrabold text-[#2D6FAB] mb-8 sm:mb-12 text-center tracking-wide uppercase">
            Full Resume
          </h3>

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
                <span>347-290-3482</span>
                <span className="hidden sm:inline">|</span>
                <span>robertp.sanchez@outlook.com</span>
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
                  <span className="italic text-gray-700">Kidney Forward</span>
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
                CLINICAL SOCIAL WORK PRACTICES IN MSW COURSEWORK (MSW Pending)
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
            <div className="mb-4">
              <div>English & Spanish</div>
            </div>
          </div>

          {/* Download Buttons - Centered */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/documents/resume/Robert_A_Sanchez_Resume.docx";
                link.download = "Robert_A_Sanchez_Resume.docx";
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
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/documents/resume/Robert_A_Sanchez_Resume.pdf";
                link.download = "Robert_A_Sanchez_Resume.pdf";
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
              Download Resume (PDF)
            </button>
          </div>
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
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-lg font-light mb-2">ROBERT A. SANCHEZ</h4>
              <p className="text-gray-400 text-sm">
                Patient Advocate & Health Equity Advocate
              </p>
            </div>
            <div>
              <h4 className="text-lg font-light mb-2">Quick Links</h4>
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start">
              <h4 className="text-lg font-light mb-2">Connect</h4>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors mb-2"
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
                href="mailto:robertp.sanchez@outlook.com"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                robertp.sanchez@outlook.com
              </a>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-800 text-center text-gray-400 text-sm">
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
