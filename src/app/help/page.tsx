import { HelpCircle } from "lucide-react";
import faqs from "@/utils/faqs";
import contactInfo from "@/utils/contactInfo";

const HelpPage = () => {
  const emailContact = contactInfo.find(c => c.label === "Email");

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            คำถามที่พบบ่อยและวิธีใช้งาน Landmark Explorer
          </p>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          {faqs.map(({ icon: Icon, question, answer }) => (
            <div
              key={question}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {question}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        {emailContact && (
          <div className="mt-12 text-center bg-card border border-border rounded-2xl p-8">
            <p className="text-muted-foreground mb-2">ยังหาคำตอบไม่ได้?</p>
            <p className="font-medium">
              ติดต่อเราได้ที่{" "}
              <a
                href={emailContact.href ?? "#"}
                className="text-primary hover:underline"
              >
                {emailContact.value}
              </a>
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default HelpPage;
