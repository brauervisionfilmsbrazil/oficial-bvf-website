import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-muted/20 backdrop-blur-sm rounded-full p-1 border border-border/50">
      <motion.button
        onClick={() => setLanguage('pt')}
        className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
          language === 'pt'
            ? 'bg-brauer-cyan/20 border border-brauer-cyan/50'
            : 'opacity-50 hover:opacity-80'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Português"
      >
        <svg className="w-5 h-5 rounded-sm" viewBox="0 0 512 512" aria-label="Bandeira do Brasil">
          <rect width="512" height="512" fill="#009c3b"/>
          <polygon points="256,64 480,256 256,448 32,256" fill="#ffdf00"/>
          <circle cx="256" cy="256" r="90" fill="#002776"/>
          <path d="M160,256 Q256,200 352,256" stroke="#fff" strokeWidth="12" fill="none"/>
        </svg>
        {language === 'pt' && (
          <motion.div
            layoutId="activeLanguage"
            className="absolute inset-0 rounded-full border-2 border-brauer-cyan"
            style={{ boxShadow: '0 0 10px hsl(var(--brauer-cyan) / 0.5)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </motion.button>

      <motion.button
        onClick={() => setLanguage('en')}
        className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
          language === 'en'
            ? 'bg-brauer-cyan/20 border border-brauer-cyan/50'
            : 'opacity-50 hover:opacity-80'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="English"
      >
        <svg className="w-5 h-5 rounded-sm" viewBox="0 0 512 512" aria-label="USA Flag">
          <rect width="512" height="512" fill="#bf0a30"/>
          <rect y="39" width="512" height="39" fill="#fff"/>
          <rect y="118" width="512" height="39" fill="#fff"/>
          <rect y="197" width="512" height="39" fill="#fff"/>
          <rect y="276" width="512" height="39" fill="#fff"/>
          <rect y="355" width="512" height="39" fill="#fff"/>
          <rect y="434" width="512" height="39" fill="#fff"/>
          <rect width="205" height="276" fill="#002868"/>
          <g fill="#fff">
            <circle cx="26" cy="23" r="8"/><circle cx="52" cy="23" r="8"/><circle cx="78" cy="23" r="8"/><circle cx="104" cy="23" r="8"/><circle cx="130" cy="23" r="8"/><circle cx="156" cy="23" r="8"/>
            <circle cx="39" cy="46" r="8"/><circle cx="65" cy="46" r="8"/><circle cx="91" cy="46" r="8"/><circle cx="117" cy="46" r="8"/><circle cx="143" cy="46" r="8"/>
            <circle cx="26" cy="69" r="8"/><circle cx="52" cy="69" r="8"/><circle cx="78" cy="69" r="8"/><circle cx="104" cy="69" r="8"/><circle cx="130" cy="69" r="8"/><circle cx="156" cy="69" r="8"/>
            <circle cx="39" cy="92" r="8"/><circle cx="65" cy="92" r="8"/><circle cx="91" cy="92" r="8"/><circle cx="117" cy="92" r="8"/><circle cx="143" cy="92" r="8"/>
            <circle cx="26" cy="115" r="8"/><circle cx="52" cy="115" r="8"/><circle cx="78" cy="115" r="8"/><circle cx="104" cy="115" r="8"/><circle cx="130" cy="115" r="8"/><circle cx="156" cy="115" r="8"/>
            <circle cx="39" cy="138" r="8"/><circle cx="65" cy="138" r="8"/><circle cx="91" cy="138" r="8"/><circle cx="117" cy="138" r="8"/><circle cx="143" cy="138" r="8"/>
            <circle cx="26" cy="161" r="8"/><circle cx="52" cy="161" r="8"/><circle cx="78" cy="161" r="8"/><circle cx="104" cy="161" r="8"/><circle cx="130" cy="161" r="8"/><circle cx="156" cy="161" r="8"/>
            <circle cx="39" cy="184" r="8"/><circle cx="65" cy="184" r="8"/><circle cx="91" cy="184" r="8"/><circle cx="117" cy="184" r="8"/><circle cx="143" cy="184" r="8"/>
            <circle cx="26" cy="207" r="8"/><circle cx="52" cy="207" r="8"/><circle cx="78" cy="207" r="8"/><circle cx="104" cy="207" r="8"/><circle cx="130" cy="207" r="8"/><circle cx="156" cy="207" r="8"/>
          </g>
        </svg>
        {language === 'en' && (
          <motion.div
            layoutId="activeLanguage"
            className="absolute inset-0 rounded-full border-2 border-brauer-cyan"
            style={{ boxShadow: '0 0 10px hsl(var(--brauer-cyan) / 0.5)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </motion.button>
    </div>
  );
};

export default LanguageToggle;
