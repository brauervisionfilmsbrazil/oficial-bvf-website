import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { useTranslation } from "@/hooks/useTranslation";
import { MetaEvents } from "@/lib/metaPixel";
import { ServerEvents } from "@/lib/metaConversions";

const Contact = () => {
  const { t } = useTranslation();
  
  const contactSchema = z.object({
    name: z.string().trim().min(1, t('contact.validation.nameRequired')).max(100, t('contact.validation.nameTooLong')),
    email: z.string().trim().email(t('contact.validation.emailInvalid')).max(255, t('contact.validation.emailTooLong')),
    subject: z.string().min(1, t('contact.validation.subjectRequired')),
    message: z.string().trim().min(1, t('contact.validation.messageRequired')).max(2000, t('contact.validation.messageTooLong')),
  });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validation = contactSchema.safeParse(formState);
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: formState,
      });

      if (error) {
        console.error("Error sending email:", error);
        toast.error(t('contact.toast.error'));
        return;
      }

      toast.success(t('contact.toast.success'));

      // Track Contact and Lead events (client-side)
      MetaEvents.Contact();
      MetaEvents.Lead({ content_name: formState.subject, content_category: 'contact_form' });

      // Track Contact and Lead events (server-side CAPI)
      ServerEvents.Contact({ email: formState.email });
      ServerEvents.Lead(
        { email: formState.email },
        { content_name: formState.subject, content_category: 'contact_form' }
      );

      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(t('contact.toast.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full py-24 px-4 relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl font-display font-black text-foreground mb-8 uppercase leading-none">
              {t('contact.title')} <br />
              <span className="text-brauer-cyan text-glow">{t('contact.titleHighlight')}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-md">
              {t('contact.description')}
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-6 group">
                <div className="bg-muted/20 p-4 border border-border group-hover:border-brauer-cyan transition-colors">
                  <MapPin size={24} className="text-foreground group-hover:text-brauer-cyan" />
                </div>
                <div>
                  <h4 className="text-foreground font-bold uppercase tracking-widest text-sm mb-1">
                    {t('contact.location.title')}
                  </h4>
                  <p className="text-muted-foreground font-mono text-sm">{t('contact.location.value')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="bg-muted/20 p-4 border border-border group-hover:border-brauer-cyan transition-colors">
                  <Mail size={24} className="text-foreground group-hover:text-brauer-cyan" />
                </div>
                <div>
                  <h4 className="text-foreground font-bold uppercase tracking-widest text-sm mb-1">{t('contact.email.title')}</h4>
                  <p className="text-muted-foreground font-mono text-sm">{t('contact.email.value')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="bg-muted/20 p-4 border border-border group-hover:border-brauer-cyan transition-colors">
                  <Phone size={24} className="text-foreground group-hover:text-brauer-cyan" />
                </div>
                <div>
                  <h4 className="text-foreground font-bold uppercase tracking-widest text-sm mb-1">{t('contact.phone.title')}</h4>
                  <p className="text-muted-foreground font-mono text-sm">{t('contact.phone.value')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-card/50 backdrop-blur-sm border border-border p-8 md:p-12">
            <h3 className="text-2xl font-display font-bold text-foreground mb-8 uppercase tracking-wide">
              {t('contact.form.title')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono text-brauer-cyan mb-2 uppercase opacity-70 group-focus-within:opacity-100"
                  >
                    {t('contact.form.name.label')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-brauer-cyan transition-colors placeholder-muted disabled:opacity-50"
                    placeholder={t('contact.form.name.placeholder')}
                  />
                </div>
                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono text-brauer-cyan mb-2 uppercase opacity-70 group-focus-within:opacity-100"
                  >
                    {t('contact.form.email.label')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-brauer-cyan transition-colors placeholder-muted disabled:opacity-50"
                    placeholder={t('contact.form.email.placeholder')}
                  />
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="subject"
                  className="block text-xs font-mono text-brauer-cyan mb-2 uppercase opacity-70 group-focus-within:opacity-100"
                >
                  {t('contact.form.subject.label')}
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-brauer-cyan transition-colors disabled:opacity-50"
                >
                  <option value="" disabled>
                    {t('contact.form.subject.placeholder')}
                  </option>
                  <option value="vfx" className="bg-brauer-black text-muted-foreground">
                    {t('contact.form.subject.options.vfx')}
                  </option>
                  <option value="animation" className="bg-brauer-black text-muted-foreground">
                    {t('contact.form.subject.options.animation')}
                  </option>
                  <option value="commercial" className="bg-brauer-black text-muted-foreground">
                    {t('contact.form.subject.options.commercial')}
                  </option>
                  <option value="local business" className="bg-brauer-black text-muted-foreground">
                    {t('contact.form.subject.options.local')}
                  </option>
                </select>
              </div>

              <div className="group">
                <label
                  htmlFor="message"
                  className="block text-xs font-mono text-brauer-cyan mb-2 uppercase opacity-70 group-focus-within:opacity-100"
                >
                  {t('contact.form.message.label')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-brauer-cyan transition-colors resize-none placeholder-muted disabled:opacity-50"
                  placeholder={t('contact.form.message.placeholder')}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-foreground text-background font-black uppercase tracking-widest py-5 hover:bg-brauer-cyan transition-all duration-300 flex items-center justify-between px-8 group mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}</span>
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
