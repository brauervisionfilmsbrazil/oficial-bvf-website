import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Contact from '../components/Contact';
import { MetaEvents } from '@/lib/metaPixel';
import { ServerEvents } from '@/lib/metaConversions';

const ContactPage = () => {
  useEffect(() => {
    MetaEvents.ViewContent({ content_name: 'Contact', content_category: 'page' });
    ServerEvents.ViewContent(undefined, { content_name: 'Contact', content_category: 'page' });

    // Track Lead event when visiting contact page
    MetaEvents.Lead({ content_name: 'Contact Page Visit', content_category: 'contact_page' });
    ServerEvents.Lead(undefined, { content_name: 'Contact Page Visit', content_category: 'contact_page' });
  }, []);

  const handleWhatsAppClick = () => {
    MetaEvents.Lead({ content_name: 'WhatsApp Contact Page', content_category: 'contact_page' });
    MetaEvents.Schedule({ content_name: 'WhatsApp Contact Page', content_category: 'contact_page' });
    ServerEvents.Lead(undefined, { content_name: 'WhatsApp Contact Page', content_category: 'contact_page' });
  };

  return (
    <>
      <Helmet>
        <title>Contato | Brauer Vision Films</title>
        <meta name="description" content="Entre em contato com a Brauer Vision Films para orçamentos e parcerias em produções audiovisuais. Produtora cinematográfica em Salvador, Bahia." />
        <meta property="og:title" content="Contato | Brauer Vision Films" />
        <meta property="og:description" content="Entre em contato para orçamentos e parcerias audiovisuais." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contato | Brauer Vision Films" />
        <meta name="twitter:description" content="Entre em contato para orçamentos e parcerias audiovisuais." />
        <link rel="canonical" href="https://brauervisionfilms.com.br/contato" />
      </Helmet>
      <Contact />

      {/* Direct WhatsApp CTA - 3rd WhatsApp button */}
      <div className="w-full pb-24 px-4 relative">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-brauer-cyan/5 via-brauer-purple/5 to-brauer-cyan/5 border border-border p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-display font-black text-foreground uppercase tracking-tight mb-3">
            Prefere falar direto no <span className="text-brauer-cyan">WhatsApp</span>?
          </h3>
          <p className="text-muted-foreground mb-8">
            Resposta rápida, orçamento na hora.
          </p>
          <a
            href="https://wa.me/5571999634445"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white font-display font-black uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            +55 71 99963-4445
          </a>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
