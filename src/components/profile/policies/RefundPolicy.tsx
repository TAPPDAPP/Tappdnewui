import { DollarSign, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";

interface RefundPolicyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RefundPolicy = ({ open, onOpenChange }: RefundPolicyProps) => {
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
              <DollarSign className="h-5 w-5 text-primary" />
              <DialogTitle className="text-white">Refund & Cancellation Policy</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-6 py-4">
            {/* Introduction */}
            <Card className="bg-primary/10 border-primary/20 p-4">
              <p className="text-white/90 text-sm leading-relaxed">
                At <strong>TAPPD</strong>, we strive to ensure transparency in all transactions. This policy outlines our refund and cancellation terms for both users (B2C) and businesses (B2B).
              </p>
            </Card>

            {/* For Users (B2C) */}
            <div>
              <h3 className="text-white font-medium mb-3">For Users (B2C)</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white/90 font-medium text-sm mb-2">Event Ticket Refunds</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Payments for event tickets or subscriptions are <strong>refundable only if the event is canceled by the organizer</strong></span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>If you cannot attend an event, refunds are subject to the event organizer's cancellation policy</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Refund requests must be made within <strong>7 days of the event date</strong></span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white/90 font-medium text-sm mb-2">Processing Timeline</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Refunds, if approved, will be processed within <strong>5–7 business days</strong> to the original payment source</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Bank processing times may vary (typically 3-5 additional business days)</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white/90 font-medium text-sm mb-2">Non-Refundable Items</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>TAPPD Band registration fees (one-time)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Service charges and convenience fees</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Premium subscription fees after activation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* For Businesses (B2B) */}
            <div>
              <h3 className="text-white font-medium mb-3">For Businesses (B2B)</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white/90 font-medium text-sm mb-2">Service Payments</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Subscription or service payments made by event organizers or partners are <strong>non-refundable once services have been activated</strong></span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Setup fees and onboarding charges are non-refundable</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white/90 font-medium text-sm mb-2">Duplicate Payments</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>In cases of duplicate payment, refund will be processed after verification within <strong>10 business days</strong></span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Proper documentation and proof of duplicate transaction required</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white/90 font-medium text-sm mb-2">Cancellation Terms</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Cancellation must be requested at least <strong>30 days before renewal date</strong></span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>No refunds for partial month/year subscriptions</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Services remain active until the end of the paid period</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Payment Failures */}
            <div>
              <h3 className="text-white font-medium mb-3">Payment Failures & Issues</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>If payment is deducted but transaction fails, amount will be auto-reversed within 5-7 business days</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>For delayed reversals, contact your bank or payment provider</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>TAPPD is not liable for bank processing delays beyond our control</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* How to Request a Refund */}
            <div>
              <h3 className="text-white font-medium mb-3">How to Request a Refund</h3>
              <Card className="bg-white/5 border-white/10 p-4">
                <ol className="space-y-2 text-white/70 text-sm list-decimal list-inside">
                  <li>Email your request to <strong className="text-primary">refunds@tappd.co.in</strong></li>
                  <li>Include your transaction ID, order number, and reason for refund</li>
                  <li>Attach any relevant proof (screenshots, emails, etc.)</li>
                  <li>Our team will review and respond within 3-5 business days</li>
                  <li>Approved refunds will be processed as per the timelines mentioned above</li>
                </ol>
              </Card>
            </div>

            {/* Regulatory Compliance */}
            <div>
              <h3 className="text-white font-medium mb-3">Regulatory Compliance</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                All refunds are processed in accordance with RBI guidelines, Consumer Protection Act 2019, and applicable digital payment regulations.
              </p>
            </div>

            {/* Contact */}
            <Card className="bg-primary/10 border-primary/20 p-4">
              <h3 className="text-white font-medium mb-2">Contact for Refunds</h3>
              <p className="text-white/80 text-sm mb-2">
                For any refund-related queries or assistance:
              </p>
              <p className="text-primary font-medium text-sm">refunds@tappd.co.in</p>
              <p className="text-white/60 text-xs mt-2">
                Support Hours: Monday - Saturday, 9:00 AM - 6:00 PM IST
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
