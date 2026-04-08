import { supabase } from "@/integrations/supabase/client";

interface UserData {
  email?: string;
  phone?: string;
  fbc?: string;
  fbp?: string;
  external_id?: string;
}

interface EventParams {
  event_name: string;
  user_data?: UserData;
  custom_data?: Record<string, any>;
}

// Get or create a persistent external ID for user identification
const getOrCreateExternalId = (): string => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return '';
  }
  
  let externalId = localStorage.getItem('brauer_external_id');
  if (!externalId) {
    externalId = crypto.randomUUID();
    localStorage.setItem('brauer_external_id', externalId);
  }
  return externalId;
};

// Get Facebook cookies for better attribution
const getFacebookCookies = () => {
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return {
    fbc: cookies._fbc,
    fbp: cookies._fbp,
  };
};

// Send event to Meta Conversions API via edge function
export const sendServerEvent = async (params: EventParams) => {
  try {
    const { fbc, fbp } = getFacebookCookies();
    const externalId = getOrCreateExternalId();

    const eventData = {
      event_name: params.event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: window.location.href,
      action_source: "website",
      user_data: {
        ...params.user_data,
        client_user_agent: navigator.userAgent,
        external_id: externalId,
        fbc,
        fbp,
      },
      custom_data: params.custom_data,
    };

    const { data, error } = await supabase.functions.invoke('meta-conversions', {
      body: eventData,
    });

    if (error) {
      console.error('Meta Conversions API error:', error);
      return { success: false, error };
    }

    console.log('Meta Conversions API success:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send server event:', error);
    return { success: false, error };
  }
};

// Server-side event helpers
export const ServerEvents = {
  PageView: (userData?: UserData) => 
    sendServerEvent({ event_name: 'PageView', user_data: userData }),
  
  Lead: (userData?: UserData, customData?: Record<string, any>) => 
    sendServerEvent({ event_name: 'Lead', user_data: userData, custom_data: customData }),
  
  Contact: (userData?: UserData) => 
    sendServerEvent({ event_name: 'Contact', user_data: userData }),
  
  ViewContent: (userData?: UserData, customData?: Record<string, any>) => 
    sendServerEvent({ event_name: 'ViewContent', user_data: userData, custom_data: customData }),
  
  CompleteRegistration: (userData?: UserData, customData?: Record<string, any>) => 
    sendServerEvent({ event_name: 'CompleteRegistration', user_data: userData, custom_data: customData }),
};
