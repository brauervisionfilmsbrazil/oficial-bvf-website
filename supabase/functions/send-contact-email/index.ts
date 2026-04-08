import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const subjectLabels: Record<string, string> = {
  vfx: "VFX & CGI",
  animation: "Animação 3D",
  commercial: "Comercial / Evento",
  "local business": "Negócios Locais",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactFormData = await req.json();

    console.log("Received contact form submission:", { name, email, subject });

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.error("Missing required fields");
      return new Response(JSON.stringify({ error: "Todos os campos são obrigatórios" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const subjectLabel = subjectLabels[subject] || subject;

    // Send email to the production company
    const companyEmailResponse = await resend.emails.send({
      from: "Brauer Vision Films <contato@brauervisionfilms.com>",
      to: ["contato@brauervisionfilms.com"],
      subject: `Novo Contato: ${subjectLabel} - ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 40px;">
          <div style="border-bottom: 2px solid #00d4ff; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="color: #00d4ff; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">
              Nova Mensagem de Contato
            </h1>
          </div>
          
          <div style="background-color: #1a1a1a; padding: 25px; border-left: 4px solid #00d4ff; margin-bottom: 25px;">
            <h2 style="color: #ffffff; margin: 0 0 15px 0; font-size: 18px;">Dados do Cliente</h2>
            <p style="color: #b0b0b0; margin: 8px 0;"><strong style="color: #00d4ff;">Nome:</strong> ${name}</p>
            <p style="color: #b0b0b0; margin: 8px 0;"><strong style="color: #00d4ff;">Email:</strong> ${email}</p>
            <p style="color: #b0b0b0; margin: 8px 0;"><strong style="color: #00d4ff;">Tipo de Projeto:</strong> ${subjectLabel}</p>
          </div>
          
          <div style="background-color: #1a1a1a; padding: 25px; border-left: 4px solid #ffd700; margin-bottom: 25px;">
            <h2 style="color: #ffffff; margin: 0 0 15px 0; font-size: 18px;">Mensagem</h2>
            <p style="color: #b0b0b0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #333;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              Brauer Vision Films © ${new Date().getFullYear()}
            </p>
          </div>
        </div>
      `,
    });

    console.log("Company email sent:", companyEmailResponse);

    // Send confirmation email to the client
    const clientEmailResponse = await resend.emails.send({
      from: "Brauer Vision Films <contato@brauervisionfilms.com>",
      to: [email],
      subject: "Recebemos sua mensagem! - Brauer Vision Films",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 40px;">
          <div style="border-bottom: 2px solid #00d4ff; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="color: #00d4ff; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">
              Mensagem Recebida!
            </h1>
          </div>
          
          <div style="margin-bottom: 30px;">
            <p style="color: #ffffff; font-size: 18px; margin: 0 0 20px 0;">
              Olá, <strong style="color: #00d4ff;">${name}</strong>!
            </p>
            <p style="color: #b0b0b0; line-height: 1.8; margin: 0 0 15px 0;">
              Obrigado por entrar em contato com a <strong style="color: #ffd700;">Brauer Vision Films</strong>!
            </p>
            <p style="color: #b0b0b0; line-height: 1.8; margin: 0 0 15px 0;">
              Recebemos sua mensagem sobre <strong style="color: #00d4ff;">${subjectLabel}</strong> e nossa equipe entrará em contato em breve.
            </p>
          </div>
          
          <div style="background-color: #1a1a1a; padding: 25px; border-left: 4px solid #00d4ff; margin-bottom: 25px;">
            <h2 style="color: #ffffff; margin: 0 0 15px 0; font-size: 16px;">Resumo da sua mensagem:</h2>
            <p style="color: #b0b0b0; line-height: 1.6; white-space: pre-wrap; font-style: italic;">"${message}"</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #b0b0b0; margin: 0 0 10px 0;">Siga-nos nas redes sociais:</p>
            <p style="color: #00d4ff; margin: 0;">
              <a href="https://instagram.com/brauervision" style="color: #00d4ff; text-decoration: none;">@brauervision</a>
            </p>
          </div>
          
          <div style="text-align: center; padding-top: 30px; margin-top: 30px; border-top: 1px solid #333;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              Brauer Vision Films © ${new Date().getFullYear()} | Salvador - BA, Brasil
            </p>
          </div>
        </div>
      `,
    });

    console.log("Client confirmation email sent:", clientEmailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Emails enviados com sucesso",
        companyEmail: companyEmailResponse,
        clientEmail: clientEmailResponse,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
