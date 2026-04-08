import { TEAM } from '../constants';
import { TeamMember } from '../types';
import { Instagram, Linkedin, Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const TEAM_SOCIAL: Record<string, { instagram?: string; linkedin?: string }> = {
  "Yan Brauer": {
    instagram: "https://www.instagram.com/yanbrauer_",
    linkedin: "https://www.linkedin.com/in/yanbrauer",
  },
  "Fernanda Vial": {
    instagram: "https://www.instagram.com/fehvial",
  },
};

const Team = () => {
  const { t } = useTranslation();

  return <div className="w-full py-24 px-4 bg-brauer-dark/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-foreground uppercase tracking-tighter leading-none">
              {t('team.title1')} <span className="text-brauer-cyan">{t('team.titleHighlight')}</span>
            </h2>
            <h2 className="text-4xl md:text-6xl font-display font-black text-foreground uppercase tracking-tighter leading-none">
              {t('team.title2')}
            </h2>
          </div>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM.map((member: TeamMember) => <div key={member.id} className="group relative bg-brauer-black border border-border hover:border-brauer-purple/50 transition-colors duration-500 overflow-hidden">
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brauer-black via-brauer-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>

                {/* Scanlines Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-10" style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)'
            }}></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    <Sparkles size={14} className="text-brauer-cyan" />
                    <span className="text-brauer-cyan text-xs font-mono font-bold uppercase tracking-widest">
                      {member.role}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-display font-black text-foreground uppercase italic mb-4">{member.name}</h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                    {member.name === "Yan Brauer" ? t('team.bios.yan') : 
                     member.name === "Fernanda Vial" ? t('team.bios.fernanda') : member.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity delay-300">
                    {TEAM_SOCIAL[member.name]?.instagram && (
                      <a href={TEAM_SOCIAL[member.name].instagram} target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-brauer-cyan transition-colors">
                        <Instagram size={18} />
                      </a>
                    )}
                    {TEAM_SOCIAL[member.name]?.linkedin && (
                      <a href={TEAM_SOCIAL[member.name].linkedin} target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-brauer-cyan transition-colors">
                        <Linkedin size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default Team;
