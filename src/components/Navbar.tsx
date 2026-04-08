import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageToggle from "./LanguageToggle";

const brauerLogo = "/images/logo-brauer.png";

interface NavbarProps {
  isIntegrated?: boolean;
}

const Navbar = ({ isIntegrated = false }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { label: t('navbar.portfolio'), path: "/" },
    { label: t('navbar.clients'), path: "/clientes" },
    { label: t('navbar.team'), path: "/team" },
    { label: t('navbar.about'), path: "/quem-somos" },
    { label: t('navbar.contact'), path: "/contato" },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isActive = (path: string) => location.pathname === path;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const logoVariants: Variants = {
    hidden: { opacity: 0, x: -30, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const menuItemVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 12,
      },
    },
  };

  // If integrated into banner, return only the content without fixed positioning
  if (isIntegrated) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="absolute top-0 left-0 w-full z-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 md:h-28">
            {/* Logo Area */}
            <motion.div variants={logoVariants} className="cursor-pointer group" onClick={() => handleNavClick("/")}>
              <img
                src={brauerLogo}
                alt="Brauer Vision Films"
                className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(0,212,255,0.6)] transition-all duration-500"
              />
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4">
              <motion.div variants={containerVariants} className="flex items-baseline space-x-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.path}
                    variants={menuItemVariants}
                    custom={index}
                    onClick={() => handleNavClick(item.path)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 py-2 rounded-sm text-xs font-bold transition-all duration-300 uppercase tracking-widest overflow-hidden group ${
                      isActive(item.path) ? "text-brauer-cyan" : "text-white/80 hover:text-white"
                    }`}
                  >
                    <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{item.label}</span>
                    {isActive(item.path) && (
                      <motion.span
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-brauer-cyan"
                        style={{ boxShadow: "0 0 15px hsl(187 100% 50%)" }}
                      />
                    )}
                    <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors rounded-sm"></span>
                  </motion.button>
                ))}
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <LanguageToggle />
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-3">
              <LanguageToggle />
              <motion.div variants={menuItemVariants}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white hover:text-brauer-cyan transition-colors p-2"
                >
                  {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-brauer-black/95 backdrop-blur-xl border-t border-brauer-cyan/20"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavClick(item.path)}
                  className={`block w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all ${
                    isActive(item.path)
                      ? "text-brauer-cyan border-l-2 border-brauer-cyan bg-brauer-cyan/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  }

  // Default fixed navbar for other pages
  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed w-full z-50 top-0 left-0 bg-brauer-black/80 backdrop-blur-xl border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Area */}
          <motion.div variants={logoVariants} className="cursor-pointer group" onClick={() => handleNavClick("/")}>
            <img
              src={brauerLogo}
              alt="Brauer Vision Films"
              className="h-12 md:h-14 w-auto object-contain drop-shadow-lg group-hover:drop-shadow-[0_0_10px_rgba(0,212,255,0.5)] transition-all duration-300"
            />
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <motion.div variants={containerVariants} className="flex items-baseline space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.path}
                  variants={menuItemVariants}
                  custom={index}
                  onClick={() => handleNavClick(item.path)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 rounded-sm text-xs font-bold transition-all duration-300 uppercase tracking-widest overflow-hidden group ${
                    isActive(item.path) ? "text-brauer-cyan" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive(item.path) && (
                    <motion.span
                      layoutId="activeTabFixed"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-brauer-cyan"
                      style={{ boxShadow: "0 0 10px hsl(187 100% 50%)" }}
                    />
                  )}
                  <span className="absolute inset-0 bg-brauer-cyan/0 group-hover:bg-brauer-cyan/5 transition-colors"></span>
                </motion.button>
              ))}
            </motion.div>
            <motion.div variants={menuItemVariants}>
              <LanguageToggle />
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle />
            <motion.div variants={menuItemVariants}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground hover:text-brauer-cyan transition-colors"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-brauer-black/90 backdrop-blur-xl border-t border-brauer-cyan/20"
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleNavClick(item.path)}
                className={`block w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all ${
                  isActive(item.path)
                    ? "text-brauer-cyan border-l-2 border-brauer-cyan bg-brauer-cyan/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
