import { Box, Layers, Zap, Hexagon } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const About = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Box className="text-brauer-cyan" size={24} />,
      title: t('about.services.3d.title'),
      desc: t('about.services.3d.desc'),
    },
    {
      icon: <Layers className="text-brauer-purple" size={24} />,
      title: t('about.services.vfx.title'),
      desc: t('about.services.vfx.desc'),
    },
    {
      icon: <Zap className="text-brauer-gold" size={24} />,
      title: t('about.services.motion.title'),
      desc: t('about.services.motion.desc'),
    },
    {
      icon: <Hexagon className="text-brauer-cyan" size={24} />,
      title: t('about.services.animation.title'),
      desc: t('about.services.animation.desc'),
    },
  ];

  return (
    <div className="w-full relative overflow-hidden pt-20">
      {/* Background Abstract Blob */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brauer-cyan/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <div>
            <div className="mb-6 flex items-center space-x-2">
              <span className="w-8 h-[2px] bg-brauer-purple"></span>
              <span className="text-brauer-purple font-mono text-xs uppercase tracking-widest">{t('about.section')}</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-display font-black text-foreground mb-8 leading-[0.9] tracking-tighter uppercase">
              {t('about.title')} <br />
              <span className="gradient-text">{t('about.titleHighlight')}</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t('about.description1')}{" "}
              <span className="text-foreground font-bold">{t('about.specialties')}</span>{t('about.description1End')}
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {t('about.description2')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {services.map((item, i) => (
                <div key={i} className="flex items-start space-x-4 group">
                  <div className="p-3 border border-border group-hover:border-brauer-cyan/50 transition-colors bg-muted/20">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold uppercase tracking-wider text-sm mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual Side */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-brauer-cyan/20 to-brauer-purple/20 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative aspect-[4/5] border border-border overflow-hidden">
              <img
                src="/images/about-outside.png"
                alt="Brauer Studio"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brauer-black via-transparent to-transparent"></div>

              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 bg-brauer-black/80 backdrop-blur-sm border border-border p-4">
                <span className="text-brauer-cyan font-mono text-xs uppercase tracking-widest block mb-1">{t('about.since')}</span>
                <span className="text-4xl font-display font-black text-foreground">2019</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glitch/Noise Strip */}
      <div className="w-full h-24 bg-muted/10 backdrop-blur-md mt-20 flex items-center overflow-hidden border-y border-border">
        <div className="whitespace-nowrap animate-marquee opacity-30 font-display font-black text-6xl text-transparent bg-clip-text bg-gradient-to-r from-transparent via-muted-foreground to-transparent italic">
          {t('about.marquee')}
        </div>
      </div>
    </div>
  );
};

export default About;
