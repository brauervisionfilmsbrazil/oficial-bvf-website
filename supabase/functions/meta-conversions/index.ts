import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const META_PIXEL_ID = "2694978980865211";
const META_API_VERSION = "v18.0";
const TEST_EVENT_CODE = "TEST71924"; // Remove this in production

interface EventData {
  event_name: string;
  event_time?: number;
  event_source_url?: string;
  user_data?: {
    email?: string;
    phone?: string;
    client_ip_address?: string;
    client_user_agent?: string;
    external_id?: string;
    fbc?: string;
    fbp?: string;
  };
  custom_data?: Record<string, any>;
  action_source?: string;
}

// Hash user data for privacy (required by Meta)
async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const accessToken = Deno.env.get("META_ACCESS_TOKEN");
    
    if (!accessToken) {
      console.error("META_ACCESS_TOKEN not configured");
      return new Response(
        JSON.stringify({ error: "Meta Access Token not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body: EventData = await req.json();
    console.log("Received event:", body.event_name);

    // Get client IP from request headers (required by Meta for server-side events)
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
      || req.headers.get("cf-connecting-ip") 
      || req.headers.get("x-real-ip")
      || "";

    // Prepare user data with hashing
    const userData: Record<string, any> = {};
    
    // Always add client IP if available (important for matching)
    if (clientIp) {
      userData.client_ip_address = clientIp;
      console.log("Client IP captured:", clientIp);
    }
    
    if (body.user_data) {
      if (body.user_data.email) {
        userData.em = [await hashData(body.user_data.email)];
      }
      if (body.user_data.phone) {
        userData.ph = [await hashData(body.user_data.phone)];
      }
      // Hash external_id for privacy (important fallback identifier)
      if (body.user_data.external_id) {
        userData.external_id = [await hashData(body.user_data.external_id)];
        console.log("External ID captured and hashed");
      }
      if (body.user_data.client_user_agent) {
        userData.client_user_agent = body.user_data.client_user_agent;
      }
      if (body.user_data.fbc) {
        userData.fbc = body.user_data.fbc;
      }
      if (body.user_data.fbp) {
        userData.fbp = body.user_data.fbp;
      }
    }

    // Build event payload
    const eventPayload = {
      data: [
        {
          event_name: body.event_name,
          event_time: body.event_time || Math.floor(Date.now() / 1000),
          event_source_url: body.event_source_url,
          action_source: body.action_source || "website",
          user_data: userData,
          custom_data: body.custom_data,
        },
      ],
      test_event_code: TEST_EVENT_CODE, // Remove in production
    };

    console.log("Sending to Meta API:", JSON.stringify(eventPayload, null, 2));

    // Send to Meta Conversions API
    const metaResponse = await fetch(
      `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventPayload),
      }
    );

    const metaResult = await metaResponse.json();
    console.log("Meta API response:", metaResult);

    if (!metaResponse.ok) {
      console.error("Meta API error:", metaResult);
      return new Response(
        JSON.stringify({ error: "Failed to send event to Meta", details: metaResult }),
        { status: metaResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, result: metaResult }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Error in meta-conversions function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
