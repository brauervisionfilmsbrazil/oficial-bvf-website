// Meta Pixel ID
export const META_PIXEL_ID = '2694978980865211';

// Declare fbq for TypeScript
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

// Flag global para controle de inicialização (previne dupla ativação)
let isPixelInitialized = false;
let isPixelLoaded = false;

// Fila para eventos pendentes enquanto o Pixel carrega
let eventQueue: Array<{ type: 'track' | 'trackCustom'; eventName: string; params?: Record<string, any> }> = [];

// Processar fila de eventos pendentes
const processEventQueue = () => {
  console.log(`[Meta Pixel] Processing ${eventQueue.length} queued events`);
  while (eventQueue.length > 0) {
    const event = eventQueue.shift();
    if (event && window.fbq) {
      console.log(`[Meta Pixel] Firing queued event: ${event.eventName}`);
      window.fbq(event.type, event.eventName, event.params);
    }
  }
};

// Initialize Meta Pixel
export const initMetaPixel = () => {
  if (typeof window === 'undefined') return;
  
  // Usar flag de módulo + check do fbq para prevenir dupla inicialização
  if (isPixelInitialized) return;
  isPixelInitialized = true;

  // Se o fbq já existe (de outra fonte), marcar como carregado
  if (window.fbq) {
    isPixelLoaded = true;
    return;
  }

  // Criar script do Meta Pixel
  const script = document.createElement('script');
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);

  // Verificar quando o fbq estiver pronto e processar fila
  const checkFbqReady = () => {
    if (window.fbq && typeof window.fbq === 'function') {
      console.log('[Meta Pixel] Pixel loaded, processing queue');
      isPixelLoaded = true;
      processEventQueue();
    } else {
      setTimeout(checkFbqReady, 100);
    }
  };
  
  // Aguardar um pouco para o script inline executar
  setTimeout(checkFbqReady, 100);

  // Add noscript fallback
  const noscript = document.createElement('noscript');
  const img = document.createElement('img');
  img.height = 1;
  img.width = 1;
  img.style.display = 'none';
  img.src = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`;
  noscript.appendChild(img);
  document.body.appendChild(noscript);
};

// Track standard events (com fila para eventos antes do carregamento)
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  
  console.log(`[Meta Pixel] trackEvent called: ${eventName}, isLoaded: ${isPixelLoaded}`);
  
  if (window.fbq && isPixelLoaded) {
    console.log(`[Meta Pixel] Firing event immediately: ${eventName}`);
    window.fbq('track', eventName, params);
  } else {
    console.log(`[Meta Pixel] Queueing event: ${eventName}`);
    eventQueue.push({ type: 'track', eventName, params });
  }
};

// Track custom events (com fila para eventos antes do carregamento)
export const trackCustomEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  
  console.log(`[Meta Pixel] trackCustomEvent called: ${eventName}, isLoaded: ${isPixelLoaded}`);
  
  if (window.fbq && isPixelLoaded) {
    console.log(`[Meta Pixel] Firing custom event immediately: ${eventName}`);
    window.fbq('trackCustom', eventName, params);
  } else {
    console.log(`[Meta Pixel] Queueing custom event: ${eventName}`);
    eventQueue.push({ type: 'trackCustom', eventName, params });
  }
};

// Standard Meta Pixel events
export const MetaEvents = {
  PageView: () => trackEvent('PageView'),
  ViewContent: (params?: { content_name?: string; content_category?: string; content_ids?: string[]; content_type?: string; value?: number; currency?: string }) => trackEvent('ViewContent', params),
  Lead: (params?: { content_name?: string; content_category?: string; value?: number; currency?: string }) => trackEvent('Lead', params),
  Contact: () => trackEvent('Contact'),
  Schedule: (params?: { content_name?: string; content_category?: string; value?: number; currency?: string }) => trackEvent('Schedule', params),
  CompleteRegistration: (params?: { content_name?: string; status?: string; value?: number; currency?: string }) => trackEvent('CompleteRegistration', params),
  InitiateCheckout: (params?: { content_ids?: string[]; content_type?: string; value?: number; currency?: string; num_items?: number }) => trackEvent('InitiateCheckout', params),
  Purchase: (params: { value: number; currency: string; content_ids?: string[]; content_type?: string; num_items?: number }) => trackEvent('Purchase', params),
  Search: (params?: { search_string?: string; content_category?: string; content_ids?: string[]; value?: number; currency?: string }) => trackEvent('Search', params),
};
