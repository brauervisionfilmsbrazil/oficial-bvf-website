import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import About from '../components/About';
import { MetaEvents } from '@/lib/metaPixel';
import { ServerEvents } from '@/lib/metaConversions';

const AboutPage = () => {
  useEffect(() => {
    MetaEvents.ViewContent({ content_name: 'About', content_category: 'page' });
    ServerEvents.ViewContent(undefined, { content_name: 'About', content_category: 'page' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Quem Somos | Brauer Vision Films</title>
        <meta name="description" content="Nossa história, missão e visão na produção audiovisual. A Brauer Vision Films é uma produtora cinematográfica em Salvador, Bahia, especializada em filmes publicitários e institucionais." />
        <meta property="og:title" content="Quem Somos | Brauer Vision Films" />
        <meta property="og:description" content="Nossa história e visão na produção audiovisual em Salvador, Bahia." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Quem Somos | Brauer Vision Films" />
        <meta name="twitter:description" content="Nossa história e visão na produção audiovisual." />
        <link rel="canonical" href="https://brauervisionfilms.com/quem-somos" />
      </Helmet>
      <About />
    </>
  );
};

export default AboutPage;
