import { Shield, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";

interface PrivacyPolicyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PrivacyPolicy = ({ open, onOpenChange }: PrivacyPolicyProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-white/10 text-white max-w-2xl mx-auto p-0 max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 text-white" />
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <DialogTitle className="text-white">Privacy Policy</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-6 py-4">
            {/* Introduction */}
            <Card className="bg-primary/10 border-primary/20 p-4">
              <p className="text-white/90 text-sm leading-relaxed">
                This Privacy Policy explains how <strong>TAPPD Private Limited</strong> ("TAPPD", "we", "our", "us") collects, uses, and protects your personal and financial data.
              </p>
            </Card>

            {/* Commitment */}
            <div>
              <h3 className="text-white font-medium mb-3">Our Commitment</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                We are committed to protecting your privacy in accordance with <strong>The Information Technology Act, 2000 (India)</strong>, <strong>GDPR (EU)</strong>, and other applicable global data protection laws.
              </p>
            </div>

            {/* Data We Collect */}
            <div>
              <h3 className="text-white font-medium mb-3">Data We Collect</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Personal information (name, date of birth, email, phone number)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Payment details (bank information, UPI ID, PAN, GSTIN)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Device and app usage data (for security and analytics)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Location data (when you attend events)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Connection and interaction data within the platform</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* How We Use Your Data */}
            <div>
              <h3 className="text-white font-medium mb-3">How We Use Your Data</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>To verify identity and enable secure transactions</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>To comply with RBI/NPCI KYC norms and regulatory requirements</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>For fraud detection and compliance monitoring</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>To personalize user experience and improve our services</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>To facilitate event bookings and connections</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>To send important updates and communications</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Data Sharing */}
            <div>
              <h3 className="text-white font-medium mb-3">Data Sharing</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                We do not sell or trade your data. Your information is shared only with:
              </p>
              <Card className="bg-white/5 border-white/10 p-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>RBI-regulated financial partners for payment processing</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Payment gateways and banks for transaction processing</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Government authorities, only when legally required</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Third-party service providers under strict confidentiality agreements</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Data Security */}
            <div>
              <h3 className="text-white font-medium mb-3">Data Security</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>AES-256 encryption</strong> for all stored data</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>PCI DSS compliance</strong> for payment data</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Regular vulnerability scans and security audits</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Secure data centers with 24/7 monitoring</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Multi-factor authentication for sensitive operations</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Your Rights */}
            <div>
              <h3 className="text-white font-medium mb-3">Your Rights</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Right to access</strong> your personal data</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Right to modify</strong> or correct your information</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Right to delete</strong> your account and data</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Right to withdraw consent</strong> for data processing</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Right to data portability</strong> in a structured format</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Right to opt-out</strong> of marketing communications</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Data Retention */}
            <div>
              <h3 className="text-white font-medium mb-3">Data Retention</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                We retain your personal data only as long as necessary to fulfill the purposes outlined in this policy or as required by law. KYC documents and transaction records are retained for a minimum of 5 years as per RBI guidelines.
              </p>
            </div>

            {/* Contact */}
            <Card className="bg-primary/10 border-primary/20 p-4">
              <h3 className="text-white font-medium mb-2">Contact Us</h3>
              <p className="text-white/80 text-sm mb-2">
                For any privacy-related queries or to exercise your rights:
              </p>
              <p className="text-primary font-medium text-sm">privacy@tappd.co.in</p>
            </Card>

            {/* Effective Date */}
            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-white/50 text-xs">
                Effective Date: January 1, 2025
              </p>
              <p className="text-white/50 text-xs mt-1">
                Last Updated: October 19, 2025
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
