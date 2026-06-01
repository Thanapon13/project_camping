import { Mail } from "lucide-react";
import contactInfo from "@/utils/contactInfo";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Contact us</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have questions, suggestions, or need assistance? Our team is always
            happy to help.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {contactInfo.map(({ icon: Icon, label, value, href }) => (
            <div
              key={label}
              className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4"
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{label}</p>
                {href ? (
                  <a
                    href={href}
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="font-medium text-foreground">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
