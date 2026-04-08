import { useState, useRef, useEffect } from "react";
import { Play, X, Maximize2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { PROJECTS } from "../constants";
import { Project } from "../types";
import ParticleBackground from "../components/ParticleBackground";
import Navbar from "../components/Navbar";
import { useTranslation } from "@/hooks/useTranslation";
import { MetaEvents } from "@/lib/metaPixel";
import { ServerEvents } from "@/lib/metaConversions";

const studioBanner = "/images/studio-banner.png";

const PortfolioPage = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showGlitch, setShowGlitch] = useState(false);
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const secretosText = t('portfolio.secretos');

  // Track ViewContent event
  useEffect(() => {
    MetaEvents.ViewContent({ content_name: 'Portfolio', content_category: 'page' });
    ServerEvents.ViewContent(undefined, { content_name: 'Portfolio', content_category: 'page' });
  }, []);

  // Calculate carousel width dynamically for perfect loop
  useEffect(() => {
    const calculateWidth = () => {
      const isMobile = window.innerWidth < 768;
      const projectWidth = isMobile ? window.innerWidth * 0.85 : 600;
      setCarouselWidth(PROJECTS.length * projectWidth);
    };
    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, []);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setShowGlitch(true);
    }, 2500);
    const letterInterval = setInterval(() => {
      setVisibleLetters((prev) => {
        if (prev >= secretosText.length) {
          clearInterval(letterInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 150);
    return () => {
      clearTimeout(typingTimer);
      clearInterval(letterInterval);
    };
  }, [secretosText]);

  const { scrollY } = useScroll();
  const bannerY = useTransform(scrollY, [0, 500], [0, 150]);
  const bannerScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const bannerOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.3, 0.8]);

  // Transforms isolados para o texto do banner (parallax)
  const textY = useTransform(scrollY, [0, 400], [0, 80]);
  const textOpacity = useTransform(scrollY, [0, 350], [1, 0]);
  const duplicatedProjects = [...PROJECTS, ...PROJECTS, ...PROJECTS];

  return (
    <>
      <Helmet>
        <title>Portfolio | Brauer Vision Films</title>
        <meta
          name="description"
          content="Produções audiovisuais cinematográficas de alta qualidade. Veja nosso portfólio de filmes publicitários, vídeos institucionais e projetos criativos em Salvador, Bahia."
        />
        <meta property="og:title" content="Portfolio | Brauer Vision Films" />
        <meta
          property="og:description"
          content="Produções audiovisuais cinematográficas de alta qualidade em Salvador, Bahia."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio | Brauer Vision Films" />
        <meta name="twitter:description" content="Produções audiovisuais cinematográficas de alta qualidade." />
        <link rel="canonical" href="https://brauervisionfilms.com/" />
      </Helmet>
      <div className="w-full min-h-screen relative">
        <ParticleBackground />

        {/* Studio Banner Section with Integrated Navbar */}
        <div ref={bannerRef} className="relative z-10 w-full overflow-hidden">
          <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden group/banner">
            <motion.img
              src={studioBanner}
              alt="Brauer Vision Films Studio"
              className="absolute inset-0 w-full h-[120%] object-cover grayscale group-hover/banner:grayscale-0 transition-all duration-700"
              style={{
                y: bannerY,
                scale: bannerScale,
                opacity: bannerOpacity,
              }}
            />

            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-brauer-black via-brauer-black/50 to-brauer-black/30"
              style={{
                opacity: overlayOpacity,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brauer-black/80 via-brauer-black/40 to-transparent"></div>

            {/* Integrated Navbar */}
            <Navbar isIntegrated={true} />

            {/* Banner Description Text - Absolute positioning for easy adjustment */}
            <div
              className="absolute left-1/2 -translate-x-1/2 px-6 md:px-12 w-full flex justify-center"
              style={{
                top: "55%",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ y: textY, opacity: textOpacity }}
                className="w-full max-w-[320px] md:max-w-[400px] lg:max-w-[480px] text-center"
              >
                <p className="text-foreground text-[11px] md:text-sm leading-[1.6] md:leading-relaxed drop-shadow-lg text-center font-bold my-0 py-0 lg:text-sm">
                  {t('portfolio.description')}{" "}
                  <mark
                    className="bg-yellow-400/70 text-foreground font-semibold animate-pulse"
                    style={{
                      textDecoration: "none",
                      padding: "0.1em 0.2em",
                      borderRadius: "2px",
                      animationDuration: "2s",
                    }}
                  >
                    {t('portfolio.highlight')}
                  </mark>{" "}
                  {t('portfolio.descriptionEnd')}
                </p>
              </motion.div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] pointer-events-none"></div>

            {/* Cyberpunk Border Accents */}
            <div className="absolute bottom-0 left-0 w-1/3 h-1 bg-gradient-to-r from-brauer-cyan to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-l from-brauer-purple to-transparent"></div>

            {/* Corner Decorations */}
            <div className="absolute top-6 md:top-8 left-6 md:left-8 w-12 md:w-16 h-12 md:h-16 border-l-2 border-t-2 border-brauer-cyan/60"></div>
            <div className="absolute top-6 md:top-8 right-6 md:right-8 w-12 md:w-16 h-12 md:h-16 border-r-2 border-t-2 border-brauer-purple/60"></div>
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 w-12 md:w-16 h-12 md:h-16 border-l-2 border-b-2 border-brauer-cyan/60"></div>
            <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 w-12 md:w-16 h-12 md:h-16 border-r-2 border-b-2 border-brauer-purple/60"></div>
          </div>
        </div>

        {/* Featured Works Section */}
        <div className="relative z-10 pt-12 pb-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="text-xl md:text-2xl font-display font-black text-foreground uppercase leading-none flex flex-col md:flex-row items-center gap-1 md:gap-2">
                <span className="relative inline-block overflow-hidden">
                  <span
                    className={`inline-block whitespace-nowrap ${showGlitch ? "animate-glitch" : "animate-typing"}`}
                    style={{
                      borderRight: showGlitch ? "none" : "3px solid hsl(var(--brauer-cyan))",
                      animation: showGlitch
                        ? "glitch 3s ease-in-out infinite"
                        : "typing 2s steps(8) forwards, blink 0.8s infinite",
                    }}
                  >
                    {t('portfolio.projects')}
                  </span>
                </span>

                <span
                  className={`font-display text-xl md:text-2xl uppercase font-black text-white relative ${showGlitch ? "animate-glitch" : ""}`}
                  style={{
                    animationDelay: showGlitch ? "0.5s" : "0s",
                    textShadow:
                      visibleLetters > 0 ? "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)" : "none",
                  }}
                >
                  {secretosText.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block transition-all duration-300"
                      style={{
                        opacity: index < visibleLetters ? 1 : 0,
                        transform:
                          index < visibleLetters ? "translateY(0) rotate(0deg)" : "translateY(10px) rotate(-5deg)",
                        transitionDelay: `${index * 50}ms`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                  <span
                    className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full blur-xl animate-pulse transition-opacity duration-500"
                    style={{
                      opacity: visibleLetters >= secretosText.length ? 1 : 0,
                    }}
                  ></span>
                  <span
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/60 rounded-full blur-lg animate-pulse transition-opacity duration-500"
                    style={{
                      animationDelay: "0.3s",
                      opacity: visibleLetters >= secretosText.length ? 1 : 0,
                    }}
                  ></span>
                </span>
              </h2>
            </div>
          </div>

          {/* Horizontal Scrolling Carousel */}
          <style>
            {`
            @keyframes marquee-loop {
              0% { transform: translateX(0); }
              100% { transform: translateX(-${carouselWidth}px); }
            }
          `}
          </style>
          <div className="relative overflow-hidden">
            <div
              className="flex gap-0 hover:[animation-play-state:paused]"
              style={{
                animation: carouselWidth > 0 ? "marquee-loop 45s linear infinite" : "none",
              }}
            >
              {duplicatedProjects.map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className="relative w-[85vw] md:w-[600px] aspect-video group cursor-pointer flex-shrink-0 border-r border-border bg-card overflow-hidden"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-brauer-black via-transparent to-transparent opacity-90"></div>

                  <div className="absolute top-0 left-0 w-full h-1 bg-brauer-cyan transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  <div className="absolute bottom-0 right-0 w-full h-1 bg-brauer-purple transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>

                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-brauer-cyan text-[10px] font-bold tracking-[0.2em] uppercase bg-brauer-black/50 backdrop-blur-md px-2 py-1">
                          {project.category}
                        </span>
                        <Maximize2
                          size={20}
                          className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                      <h3 className="text-3xl font-display font-black text-foreground uppercase tracking-tight leading-none mb-1">
                        {project.title}
                      </h3>
                      <span className="text-muted-foreground text-xs font-mono">{project.year}</span>
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-20 h-20 rounded-full bg-brauer-cyan/20 backdrop-blur-sm flex items-center justify-center border border-brauer-cyan/50">
                      <Play size={32} className="text-brauer-cyan ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button - Fale com a Brauer */}
          <style>
            {`
              @keyframes border-glow {
                0%, 100% { 
                  box-shadow: 0 0 20px hsl(var(--brauer-cyan)), 
                              0 0 40px hsl(var(--brauer-cyan) / 0.5),
                              inset 0 0 20px hsl(var(--brauer-cyan) / 0.1);
                }
                50% { 
                  box-shadow: 0 0 30px hsl(var(--brauer-cyan)), 
                              0 0 60px hsl(var(--brauer-cyan) / 0.7),
                              0 0 80px hsl(var(--brauer-purple) / 0.3),
                              inset 0 0 30px hsl(var(--brauer-cyan) / 0.2);
                }
              }
            `}
          </style>
          <div className="flex justify-center pt-16 pb-8">
            <a
              href="https://wa.me/5571999634445"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                MetaEvents.Lead({ content_name: 'WhatsApp CTA', content_category: 'portfolio_page' });
                MetaEvents.Schedule({ content_name: 'WhatsApp CTA', content_category: 'portfolio_page' });
                MetaEvents.InitiateCheckout({ content_type: 'service_inquiry', num_items: 1 });
                ServerEvents.Lead(undefined, { content_name: 'WhatsApp CTA', content_category: 'portfolio_page' });
              }}
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brauer-cyan text-brauer-black font-display font-black text-xs uppercase tracking-wider transition-all duration-500 hover:bg-brauer-gold hover:scale-110 border border-brauer-cyan/80 opacity-75"
              style={{ 
                animation: 'border-glow 2s ease-in-out infinite',
              }}
            >
              <span className="absolute inset-0 rounded-full bg-brauer-cyan/20 blur-xl group-hover:bg-brauer-gold/20 transition-colors duration-500" />
              <span className="relative z-10">{t('portfolio.cta')}</span>
            </a>
          </div>
        </div>

        {/* Video Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-[60] bg-brauer-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative w-full max-w-5xl aspect-video bg-brauer-black border border-border overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://player.vimeo.com/video/${selectedProject.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&transparent=0`}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-12 h-12 bg-brauer-black/80 border border-border flex items-center justify-center hover:border-brauer-cyan hover:text-brauer-cyan transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="absolute bottom-8 left-8">
              <span className="text-brauer-cyan text-xs font-mono uppercase tracking-widest">
                {selectedProject.category}
              </span>
              <h3 className="text-4xl font-display font-black text-foreground uppercase">{selectedProject.title}</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PortfolioPage;
