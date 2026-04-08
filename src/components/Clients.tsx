import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface Client {
  id: string;
  name: string;
  logo_path: string;
  display_order: number;
}

const CLIENTS: Client[] = [
  { id: '1', name: 'Porsche',         logo_path: '/clients/porsche.png',       display_order: 1 },
  { id: '2', name: 'Red Bull',        logo_path: '/clients/red-bull.png',      display_order: 2 },
  { id: '3', name: 'About Man',       logo_path: '/clients/about-man.png',     display_order: 3 },
  { id: '4', name: 'CSI',             logo_path: '/clients/csi.png',           display_order: 4 },
  { id: '5', name: 'Fit Brunch',      logo_path: '/clients/fit-brunch.png',    display_order: 5 },
  { id: '6', name: 'Parachutes',      logo_path: '/clients/parachutes.png',    display_order: 6 },
  { id: '7', name: 'Seu Pescador',    logo_path: '/clients/seu-pescador.png',  display_order: 7 },
  { id: '8', name: 'Quintal du Samba',logo_path: '/clients/logo.png',          display_order: 8 },
];

const Clients = () => {
  const { t } = useTranslation();
  const [animationStyle, setAnimationStyle] = useState('');

  const clients = CLIENTS;

  useEffect(() => {
    const calculateAnimation = () => {
      const cardWidth = window.innerWidth < 768 ? 200 : 280;
      const gap = window.innerWidth < 768 ? 16 : 24;
      const totalWidth = clients.length * (cardWidth + gap);

      const style = `
        @keyframes marquee-clients {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth}px); }
        }
      `;
      setAnimationStyle(style);
    };

    calculateAnimation();
    window.addEventListener('resize', calculateAnimation);
    return () => window.removeEventListener('resize', calculateAnimation);
  }, [clients]);

  const ClientCard = ({ client }: { client: Client }) => (
    <div
      className="group relative flex-shrink-0 w-[200px] md:w-[280px] h-40 bg-muted/20 backdrop-blur-sm border border-border hover:border-brauer-cyan/50 flex items-center justify-center transition-all duration-300 hover:bg-muted/40"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brauer-cyan/0 to-brauer-purple/0 group-hover:from-brauer-cyan/5 group-hover:to-brauer-purple/5 transition-all duration-500"></div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-border group-hover:border-brauer-cyan transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-border group-hover:border-brauer-cyan transition-colors"></div>

      <div className="text-center relative z-10 px-4">
        <img
          src={client.logo_path}
          alt={client.name}
          className="w-24 h-24 mx-auto mb-4 object-contain transition-transform duration-300 group-hover:scale-110"
        />
        <p className="text-xs font-bold uppercase tracking-widest text-foreground">
          {client.name}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full py-24 px-4 relative overflow-hidden">
      <style>{animationStyle}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brauer-purple/10 via-transparent to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-brauer-cyan font-mono text-xs uppercase tracking-widest mb-2 block">{t('clients.section')}</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-foreground mb-6 uppercase">
            {t('clients.title')} <span className="gradient-text">{t('clients.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t('clients.description')}
          </p>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-4 md:gap-6"
            style={{
              animation: clients.length > 0 ? 'marquee-clients 30s linear infinite' : 'none',
              width: 'max-content'
            }}
          >
            {/* First group */}
            {clients.map((client) => (
              <ClientCard key={`first-${client.id}`} client={client} />
            ))}
            {/* Duplicated group for seamless loop */}
            {clients.map((client) => (
              <ClientCard key={`second-${client.id}`} client={client} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
