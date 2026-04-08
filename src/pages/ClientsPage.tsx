import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Clients from '../components/Clients';
import { MetaEvents } from '@/lib/metaPixel';
import { ServerEvents } from '@/lib/metaConversions';

const ClientsPage = () => {
  useEffect(() => {
    MetaEvents.ViewContent({ content_name: 'Clients', content_category: 'page' });
    ServerEvents.ViewContent(undefined, { content_name: 'Clients', content_category: 'page' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Clientes | Brauer Vision Films</title>
        <meta name="description" content="Conheça as empresas e marcas que confiam na Brauer Vision Films para suas produções audiovisuais. Parcerias de sucesso em Salvador, Bahia." />
        <meta property="og:title" content="Clientes | Brauer Vision Films" />
        <meta property="og:description" content="Empresas e marcas que confiam na Brauer Vision Films." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Clientes | Brauer Vision Films" />
        <meta name="twitter:description" content="Empresas e marcas que confiam na Brauer Vision Films." />
        <link rel="canonical" href="https://brauervisionfilms.com/clientes" />
      </Helmet>
      <Clients />
    </>
  );
};

export default ClientsPage;
