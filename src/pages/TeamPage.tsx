import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Team from '../components/Team';
import { MetaEvents } from '@/lib/metaPixel';
import { ServerEvents } from '@/lib/metaConversions';

const TeamPage = () => {
  useEffect(() => {
    MetaEvents.ViewContent({ content_name: 'Team', content_category: 'page' });
    ServerEvents.ViewContent(undefined, { content_name: 'Team', content_category: 'page' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Equipe | Brauer Vision Films</title>
        <meta name="description" content="Conheça os profissionais criativos por trás das produções da Brauer Vision Films. Nossa equipe de cineastas, diretores e produtores em Salvador, Bahia." />
        <meta property="og:title" content="Equipe | Brauer Vision Films" />
        <meta property="og:description" content="Profissionais criativos por trás da Brauer Vision Films." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Equipe | Brauer Vision Films" />
        <meta name="twitter:description" content="Profissionais criativos por trás da Brauer Vision Films." />
        <link rel="canonical" href="https://brauervisionfilms.com/team" />
      </Helmet>
      <Team />
    </>
  );
};

export default TeamPage;
