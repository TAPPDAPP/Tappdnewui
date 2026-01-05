import { Shield, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";

interface KYCPolicyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const KYCPolicy = ({ open, onOpenChange }: KYCPolicyProps) => {
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
              <DialogTitle className="text-white">KYC & Compliance Policy</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-6 py-4">
            {/* Introduction */}
            <Card className="bg-primary/10 border-primary/20 p-4">
              <p className="text-white/90 text-sm leading-relaxed">
                <strong>TAPPD Private Limited</strong> complies with all Know Your Customer (KYC) and Anti-Money Laundering (AML) norms as directed by the Reserve Bank of India (RBI) and National Payments Corporation of India (NPCI).
              </p>
            </Card>

            {/* Purpose */}
            <div>
              <h3 className="text-white font-medium mb-3">Purpose of KYC</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>To ensure <strong>secure identity verification</strong> for users and businesses transacting on TAPPD</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>To prevent fraud, money laundering, and other financial crimes</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>To comply with regulatory requirements and maintain platform integrity</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>To enable secure payment transactions and protect all users</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* KYC Documents Accepted */}
            <div>
              <h3 className="text-white font-medium mb-3">KYC Documents Accepted</h3>
              
              <div className="space-y-3">
                {/* Individual Documents */}
                <Card className="bg-white/5 border-white/10 p-4">
                  <h4 className="text-white font-medium text-sm mb-3 flex items-center gap-2">
                    <Badge className="bg-primary/20 text-primary border-0">Individual</Badge>
                  </h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">PAN Card</strong> (Permanent Account Number) - Mandatory</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Aadhaar Card</strong> - For identity verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Bank Account Proof</strong> - Passbook/Cancelled Cheque</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Address Proof</strong> - Utility bill, driving license, or passport</span>
                    </li>
                  </ul>
                </Card>

                {/* Business Documents */}
                <Card className="bg-white/5 border-white/10 p-4">
                  <h4 className="text-white font-medium text-sm mb-3 flex items-center gap-2">
                    <Badge className="bg-purple-600/20 text-purple-400 border-0">Business</Badge>
                  </h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Business PAN</strong> or <strong className="text-white">Proprietor PAN</strong> - Mandatory</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">GSTIN</strong> (Goods and Services Tax Identification Number)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Certificate of Incorporation</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Business Address Proof</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Bank Account Proof</strong> in business name</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Authorized Signatory ID & PAN</strong></span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>

            {/* Verification Process */}
            <div>
              <h3 className="text-white font-medium mb-3">Verification Process</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="bg-primary/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1">Submit KYC Details</h4>
                      <p className="text-white/70 text-xs">User submits required documents and information through the payment information form</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-primary/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1">Automated Verification</h4>
                      <p className="text-white/70 text-xs">Verification via secure API integration with government databases (NSDL, UIDAI, GST Network)</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-primary/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1">Manual Review (if needed)</h4>
                      <p className="text-white/70 text-xs">Our compliance team reviews any flagged or incomplete submissions</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-green-500/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1">KYC Verified Status</h4>
                      <p className="text-white/70 text-xs">Upon successful verification, user receives "KYC Verified" badge and full platform access</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Verification Timeline */}
            <div>
              <h3 className="text-white font-medium mb-3">Verification Timeline</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Instant verification</strong> for PAN and Aadhaar (via DigiLocker/NSDL API)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>24-48 hours</strong> for bank account verification</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>2-5 business days</strong> for business entity verification</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>You will be notified via email and in-app notification once verification is complete</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Data Retention */}
            <div>
              <h3 className="text-white font-medium mb-3">Data Retention</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>KYC data is <strong>stored securely with AES-256 encryption</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>All documents and records are retained for a minimum of <strong>5 years</strong> as per RBI guidelines</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Data will not be shared except under regulatory requirement or court order</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Access is restricted to authorized compliance personnel only</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Compliance Framework */}
            <div>
              <h3 className="text-white font-medium mb-3">Compliance Framework</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <p className="text-white/80 text-sm mb-3">TAPPD adheres to the following regulations:</p>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>RBI Master Direction on KYC</strong> - Reserve Bank of India guidelines for customer identification</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Prevention of Money Laundering Act (PMLA), 2002</strong> - AML/CFT compliance</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>IT Act 2000 & IT Rules</strong> - Digital data protection and security</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>NPCI Guidelines</strong> - For UPI and digital payment compliance</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>GDPR (EU)</strong> - For international data protection</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>ISO 27001</strong> - Information security management standards</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Penalties for Non-Compliance */}
            <div>
              <h3 className="text-white font-medium mb-3">User Responsibilities</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Provide <strong>accurate and genuine documents</strong> only</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Update KYC information if there are any changes (address, name, etc.)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Failure to complete KYC may result in restricted access to payment features</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Submitting false documents is a criminal offense under Indian law</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Contact */}
            <Card className="bg-primary/10 border-primary/20 p-4">
              <h3 className="text-white font-medium mb-2">Contact Compliance Team</h3>
              <p className="text-white/80 text-sm mb-2">
                For KYC-related queries or assistance:
              </p>
              <p className="text-primary font-medium text-sm">compliance@tappd.co.in</p>
              <p className="text-white/60 text-xs mt-2">
                Compliance Hours: Monday - Friday, 9:00 AM - 5:00 PM IST
              </p>
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
