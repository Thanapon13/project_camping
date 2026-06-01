import sectionPrivacy from "@/utils/sectionsPrivacy";
import { Shield } from "lucide-react";

const PrivacyPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">อัพเดตล่าสุด: มกราคม 2568</p>
        </div>

        {/* Intro */}
        <p className="text-muted-foreground leading-relaxed mb-8">
          Landmark Explorer ให้ความสำคัญกับความเป็นส่วนตัวของผู้ใช้งาน
          นโยบายนี้อธิบายถึงวิธีที่เราเก็บรวบรวม ใช้
          และปกป้องข้อมูลของคุณเมื่อใช้งานแพลตฟอร์มของเรา
        </p>

        {/* Sections */}
        <div className="space-y-6">
          {sectionPrivacy.map(({ title, content }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <h2 className="font-semibold text-foreground mb-3">{title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {content}
              </p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            มีคำถามเกี่ยวกับนโยบายนี้? ติดต่อ{" "}
            <a
              href="mailto:thanapon.dev.work@gmail.com"
              className="text-primary hover:underline"
            >
              thanapon.dev.work@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPage;
