import { FileText, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";

interface TermsOfServiceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TermsOfService = ({ open, onOpenChange }: TermsOfServiceProps) => {
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
              <FileText className="h-5 w-5 text-primary" />
              <DialogTitle className="text-white">Terms of Service</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-6 py-4">
            {/* Introduction */}
            <Card className="bg-primary/10 border-primary/20 p-4">
              <p className="text-white/90 text-sm leading-relaxed">
                Welcome to <strong>TAPPD Private Limited</strong>. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully.
              </p>
            </Card>

            {/* 1. Use of Platform */}
            <div>
              <h3 className="text-white font-medium mb-3">1. Use of Platform</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>You agree to use TAPPD only for <strong>lawful purposes</strong> and in accordance with applicable regulations</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>You must be at least <strong>18 years of age</strong> to use the platform</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>You will not use the platform for any illegal, fraudulent, or unauthorized purpose</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>You will not attempt to interfere with, disrupt, or hack the platform</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>You will respect other users and maintain appropriate conduct</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* 2. Account Responsibility */}
            <div>
              <h3 className="text-white font-medium mb-3">2. Account Responsibility</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>You are responsible for maintaining the <strong>confidentiality of your account credentials</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>You must provide accurate, current, and complete information during registration</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>You are responsible for all activities that occur under your account</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>You must notify us immediately of any unauthorized access or security breach</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>TAPPD reserves the right to suspend or terminate accounts that violate these terms</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* 3. Payments & Fees */}
            <div>
              <h3 className="text-white font-medium mb-3">3. Payments & Fees</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>All payments processed through TAPPD are governed by <strong>RBI and NPCI guidelines</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>TAPPD charges a <strong>20% service fee</strong> on ticket sales and event transactions</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>All prices and fees are displayed in <strong>Indian Rupees (INR)</strong> unless otherwise stated</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>You agree to pay all applicable fees and charges</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Payment terms are subject to our Refund & Cancellation Policy</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>TAPPD is not responsible for bank charges, currency conversion fees, or payment gateway charges</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* 4. Content & Intellectual Property */}
            <div>
              <h3 className="text-white font-medium mb-3">4. Content & Intellectual Property</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>All platform content, branding, logos, and trademarks are <strong>property of TAPPD Private Limited</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Unauthorized use, reproduction, or distribution of TAPPD content is prohibited</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>You retain ownership of content you upload, but grant TAPPD a license to use it</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>You must not upload content that violates intellectual property rights of others</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>TAPPD reserves the right to remove any content that violates these terms</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* 5. Liability & Disclaimers */}
            <div>
              <h3 className="text-white font-medium mb-3">5. Liability & Disclaimers</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>TAPPD is not liable for damages arising from <strong>third-party payment failures or service interruptions</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>We do not guarantee uninterrupted or error-free service</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>TAPPD is not responsible for event cancellations or changes made by organizers</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>We are not liable for loss of data, connection issues, or device compatibility problems</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Maximum liability is limited to the amount paid by you for the specific service</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* 6. User Conduct & Prohibited Activities */}
            <div>
              <h3 className="text-white font-medium mb-3">6. User Conduct & Prohibited Activities</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <p className="text-white/80 text-sm mb-2">You must not:</p>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Harass, abuse, or harm other users</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Post offensive, discriminatory, or inappropriate content</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Impersonate others or create fake accounts</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Engage in spam, phishing, or fraudulent activities</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Use automated bots or scrapers</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* 7. Changes to Terms */}
            <div>
              <h3 className="text-white font-medium mb-3">7. Changes to Terms</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>We reserve the right to <strong>update these Terms periodically</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Material changes will be notified via email or in-app notification</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Continued use after changes constitutes acceptance of new terms</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>It is your responsibility to review the Terms regularly</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* 8. Termination */}
            <div>
              <h3 className="text-white font-medium mb-3">8. Termination</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>You may delete your account at any time through Profile Settings</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>TAPPD may suspend or terminate accounts that violate these terms</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Upon termination, your access to paid services will cease immediately</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Certain provisions (payment obligations, liability) survive termination</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* 9. Governing Law */}
            <div>
              <h3 className="text-white font-medium mb-3">9. Governing Law</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                These Terms are governed by the laws of <strong>India</strong>. Any disputes shall be subject to the exclusive jurisdiction of courts in <strong>New Delhi, India</strong>.
              </p>
            </div>

            {/* Contact */}
            <Card className="bg-primary/10 border-primary/20 p-4">
              <h3 className="text-white font-medium mb-2">Contact & Support</h3>
              <p className="text-white/80 text-sm mb-2">
                For questions or support regarding these Terms:
              </p>
              <p className="text-primary font-medium text-sm">support@tappd.co.in</p>
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
