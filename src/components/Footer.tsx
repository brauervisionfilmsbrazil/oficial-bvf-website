import { Instagram, Linkedin, Youtube } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const brauerLogo = "/images/logo-brauer.png";

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { label: t('navbar.portfolio'), path: '/' },
    { label: t('navbar.clients'), path: '/clientes' },
    { label: t('navbar.team'), path: '/team' },
    { label: t('navbar.about'), path: '/quem-somos' },
    { label: t('navbar.contact'), path: '/contato' },
  ];

  return (
    <footer className="bg-brauer-dark border-t border-border pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand */}
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-2 mb-4">
              <img src={brauerLogo} alt="Brauer Vision Films" className="h-8 w-auto" />
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-bold uppercase tracking-widest text-sm mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <a href={link.path} className="text-muted-foreground hover:text-brauer-cyan transition-colors uppercase tracking-wider text-xs">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-foreground font-bold uppercase tracking-widest text-sm mb-4">{t('footer.socialMedia')}</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/brauervision/" target="_blank" rel="noopener noreferrer" className="bg-muted p-2 rounded-full text-foreground hover:bg-brauer-gold hover:text-background transition-all duration-300">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@BrauerVisionFilms" target="_blank" rel="noopener noreferrer" className="bg-muted p-2 rounded-full text-foreground hover:bg-brauer-gold hover:text-background transition-all duration-300">
                <Youtube size={20} />
              </a>
              <a href="https://linkedin.com/company/brauervisionfilms" target="_blank" rel="noopener noreferrer" className="bg-muted p-2 rounded-full text-foreground hover:bg-brauer-gold hover:text-background transition-all duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Brauer Vision Films. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
