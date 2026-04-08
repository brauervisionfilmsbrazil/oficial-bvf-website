import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MouseFollower from './MouseFollower';
import FloatingChat from './FloatingChat';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isPortfolioPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background flex flex-col relative cursor-none-desktop">
      {/* Global Noise Overlay */}
      <div className="noise-bg"></div>
      
      <MouseFollower />
      
      {/* Fixed Navbar only for non-portfolio pages */}
      {!isPortfolioPage && <Navbar />}
      
      {/* Main Content Area */}
      <main className={`flex-grow flex flex-col w-full ${!isPortfolioPage ? 'pt-20' : ''} relative z-10`}>
        <div className="animate-fadeIn w-full">
          {children}
        </div>
      </main>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Layout;
