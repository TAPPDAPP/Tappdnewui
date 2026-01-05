import { useState } from "react";
import { User, Building, ChevronRight, FileText, Shield, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Card } from "../ui/card";
import { motion, AnimatePresence } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PrivacyPolicy } from "./policies/PrivacyPolicy";
import { RefundPolicy } from "./policies/RefundPolicy";
import { TermsOfService } from "./policies/TermsOfService";
import { KYCPolicy } from "./policies/KYCPolicy";

interface AddPaymentInfoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingPayment?: any;
  onClose: () => void;
}

type PolicyType = 'privacy' | 'refund' | 'terms' | 'kyc' | null;

export const AddPaymentInfo = ({ open, onOpenChange, editingPayment, onClose }: AddPaymentInfoProps) => {
  const [accountType, setAccountType] = useState<'individual' | 'business' | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPolicy, setShowPolicy] = useState<PolicyType>(null);
  
  // Individual form state
  const [individualForm, setIndividualForm] = useState({
    fullName: '',
    dob: '',
    pan: '',
    accountNumber: '',
    ifsc: '',
    upiId: '',
    address: '',
    country: 'India',
    state: '',
    city: '',
    pincode: '',
    mobile: '+91 98765 43210', // Fetched from account
    email: 'harsh@tappd.co.in' // Fetched from account
  });

  // Business form state
  const [businessForm, setBusinessForm] = useState({
    businessName: '',
    businessType: '',
    signatoryName: '',
    dateOfIncorporation: '',
    pan: '',
    gstin: '',
    accountNumber: '',
    ifsc: '',
    address: '',
    businessEmail: '',
    businessPhone: ''
  });

  const handleSelectType = (type: 'individual' | 'business') => {
    setAccountType(type);
  };

  const handleBack = () => {
    if (accountType) {
      setAccountType(null);
    } else {
      onClose();
    }
  };

  const handleSave = () => {
    // Validation and save logic here
    console.log('Saving payment info...', accountType === 'individual' ? individualForm : businessForm);
    onClose();
  };

  const isFormValid = () => {
    if (!agreedToTerms) return false;
    
    if (accountType === 'individual') {
      return individualForm.fullName && individualForm.dob && individualForm.pan && 
             individualForm.accountNumber && individualForm.ifsc && individualForm.state &&
             individualForm.city && individualForm.pincode;
    } else if (accountType === 'business') {
      return businessForm.businessName && businessForm.businessType && businessForm.signatoryName &&
             businessForm.dateOfIncorporation && businessForm.pan && businessForm.accountNumber &&
             businessForm.ifsc && businessForm.address && businessForm.businessEmail &&
             businessForm.businessPhone;
    }
    return false;
  };

  // Policy view
  if (showPolicy) {
    return (
      <>
        {showPolicy === 'privacy' && <PrivacyPolicy open={true} onOpenChange={() => setShowPolicy(null)} />}
        {showPolicy === 'refund' && <RefundPolicy open={true} onOpenChange={() => setShowPolicy(null)} />}
        {showPolicy === 'terms' && <TermsOfService open={true} onOpenChange={() => setShowPolicy(null)} />}
        {showPolicy === 'kyc' && <KYCPolicy open={true} onOpenChange={() => setShowPolicy(null)} />}
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-white/10 text-white max-w-md mx-auto p-0 max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b border-white/10">
          <DialogTitle className="text-white">
            {accountType ? 'Enter Payment Details' : 'Add New Payment Information'}
          </DialogTitle>
          <DialogDescription className="text-white/70">
            {accountType 
              ? `Fill in your ${accountType} payment information` 
              : 'Choose your account type to get started'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <AnimatePresence mode="wait">
            {!accountType ? (
              // Account Type Selection
              <motion.div
                key="selection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 py-4"
              >
                <Card
                  onClick={() => handleSelectType('individual')}
                  className="bg-white/5 border-white/10 p-6 hover:bg-white/10 cursor-pointer transition-all hover:border-primary/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 rounded-full p-3">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">Individual (B2C)</h4>
                      <p className="text-white/60 text-sm">
                        For personal use and individual transactions
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/40" />
                  </div>
                </Card>

                <Card
                  onClick={() => handleSelectType('business')}
                  className="bg-white/5 border-white/10 p-6 hover:bg-white/10 cursor-pointer transition-all hover:border-purple-600/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-600/20 rounded-full p-3">
                      <Building className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">Business (B2B)</h4>
                      <p className="text-white/60 text-sm">
                        For registered businesses and enterprises
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/40" />
                  </div>
                </Card>
              </motion.div>
            ) : accountType === 'individual' ? (
              // Individual Form
              <motion.div
                key="individual"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 py-4"
              >
                <div className="space-y-3">
                  <div>
                    <Label className="text-white">Full Name (as per PAN) *</Label>
                    <Input
                      value={individualForm.fullName}
                      onChange={(e) => setIndividualForm({...individualForm, fullName: e.target.value})}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label className="text-white">Date of Birth *</Label>
                    <Input
                      type="date"
                      value={individualForm.dob}
                      onChange={(e) => setIndividualForm({...individualForm, dob: e.target.value})}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-white">PAN Number *</Label>
                    <Input
                      value={individualForm.pan}
                      onChange={(e) => setIndividualForm({...individualForm, pan: e.target.value.toUpperCase()})}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="ABCDE1234F"
                      maxLength={10}
                    />
                  </div>

                  <div>
                    <Label className="text-white">Bank Account Number *</Label>
                    <Input
                      value={individualForm.accountNumber}
                      onChange={(e) => setIndividualForm({...individualForm, accountNumber: e.target.value})}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="Enter account number"
                    />
                  </div>

                  <div>
                    <Label className="text-white">IFSC Code *</Label>
                    <Input
                      value={individualForm.ifsc}
                      onChange={(e) => setIndividualForm({...individualForm, ifsc: e.target.value.toUpperCase()})}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="SBIN0001234"
                      maxLength={11}
                    />
                  </div>

                  <div>
                    <Label className="text-white">UPI ID (Optional)</Label>
                    <Input
                      value={individualForm.upiId}
                      onChange={(e) => setIndividualForm({...individualForm, upiId: e.target.value})}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="yourname@upi"
                    />
                  </div>

                  <div>
                    <Label className="text-white">Billing Address *</Label>
                    <Input
                      value={individualForm.address}
                      onChange={(e) => setIndividualForm({...individualForm, address: e.target.value})}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="Enter your address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-white">State *</Label>
                      <Input
                        value={individualForm.state}
                        onChange={(e) => setIndividualForm({...individualForm, state: e.target.value})}
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <Label className="text-white">City *</Label>
                      <Input
                        value={individualForm.city}
                        onChange={(e) => setIndividualForm({...individualForm, city: e.target.value})}
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="City"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Pincode *</Label>
                    <Input
                      value={individualForm.pincode}
                      onChange={(e) => setIndividualForm({...individualForm, pincode: e.target.value})}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="110001"
                      maxLength={6}
                    />
                  </div>

                  <div>
                    <Label className="text-white">Mobile Number</Label>
                    <Input
                      value={individualForm.mobile}
                      disabled
                      className="bg-white/10 border-white/10 text-white/50"
                    />
                    <p className="text-white/40 text-xs mt-1">Fetched from your account</p>
                  </div>

                  <div>
                    <Label className="text-white">Email Address</Label>
                    <Input
                      value={individualForm.email}
                      disabled
                      className="bg-white/10 border-white/10 text-white/50"
                    />
                    <p className="text-white/40 text-xs mt-1">Fetched from your account</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Business Form
              <motion.div
                key="business"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 py-4"
              >
                <div className="space-y-3">
                  <div>
                    <Label className="text-white">Registered Business Name *</Label>
                    <Input
                      value={businessForm.businessName}
                      onChange={(e) => setBusinessForm({...businessForm, businessName: e.target.value})}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="Enter business name"
                    />
                  </div>

                  <div>
                    <Label className="text-white">Business Type *</Label>
                    <Select 
                      value={businessForm.businessType}
                      onValueChange={(value) => setBusinessForm({...businessForm, businessType: value})}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-white/10">
                        <SelectItem value="private">Private Limited</SelectItem>
                        <SelectItem value="llp">LLP</SelectItem>
                        <SelectItem value="proprietorship">Proprietorship</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="public">Public Limited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white">Authorized Signatory Name *</Label>
                    <Input
                      value={businessForm.signatoryName}
                      onChange={(e) => setBusinessForm({...businessForm, signatoryName: e.target.value})}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="Enter signatory name"
                    />
                  </div>

                  <div>
                    <Label className="text-white">Date of Incorporation *</Label>
                    <Input
                      type="date"
                      value={businessForm.dateOfIncorporation}
                      onChange={(e) => setBusinessForm({...businessForm, dateOfIncorporation: e.target.value})}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-white">PAN (Business/Proprietor) *</Label>
                    <Input
                      value={businessForm.pan}
                      onChange={(e) => setBusinessForm({...businessForm, pan: e.target.value.toUpperCase()})}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="ABCDE1234F"
                      maxLength={10}
                    />
                  </div>

                  <div>
                    <Label className="text-white">GSTIN (Optional)</Label>
                    <Input
                      value={businessForm.gstin}
                      onChange={(e) => setBusinessForm({...businessForm, gstin: e.target.value.toUpperCase()})}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="22ABCDE1234F1Z5"
                      maxLength={15}
                    />
                  </div>

                  <div>
                    <Label className="text-white">Bank Account Number *</Label>
                    <Input
                      value={businessForm.accountNumber}
                      onChange={(e) => setBusinessForm({...businessForm, accountNumber: e.target.value})}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="Enter account number"
                    />
                  </div>

                  <div>
                    <Label className="text-white">IFSC Code *</Label>
                    <Input
                      value={businessForm.ifsc}
                      onChange={(e) => setBusinessForm({...businessForm, ifsc: e.target.value.toUpperCase()})}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="SBIN0001234"
                      maxLength={11}
                    />
                  </div>

                  <div>
                    <Label className="text-white">Registered Business Address *</Label>
                    <Input
                      value={businessForm.address}
                      onChange={(e) => setBusinessForm({...businessForm, address: e.target.value})}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="Enter business address"
                    />
                  </div>

                  <div>
                    <Label className="text-white">Business Email Address *</Label>
                    <Input
                      type="email"
                      value={businessForm.businessEmail}
                      onChange={(e) => setBusinessForm({...businessForm, businessEmail: e.target.value})}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="business@company.com"
                    />
                  </div>

                  <div>
                    <Label className="text-white">Business Phone Number *</Label>
                    <Input
                      value={businessForm.businessPhone}
                      onChange={(e) => setBusinessForm({...businessForm, businessPhone: e.target.value})}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Terms Confirmation & Actions */}
          {accountType && (
            <div className="space-y-4 pt-4 border-t border-white/10 mt-4">
              {/* Checkbox */}
              <div className="flex items-start gap-3">
                <Checkbox 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="mt-1"
                />
                <label className="text-white/80 text-sm leading-relaxed cursor-pointer" onClick={() => setAgreedToTerms(!agreedToTerms)}>
                  I confirm that all details provided are accurate and valid.
                </label>
              </div>

              {/* Policies Section */}
              <Card className="bg-white/5 border-white/10 p-4">
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  View Policies & Terms
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPolicy('privacy')}
                    className="border-white/20 text-white hover:bg-white/10 text-xs justify-start"
                  >
                    Privacy Policy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPolicy('refund')}
                    className="border-white/20 text-white hover:bg-white/10 text-xs justify-start"
                  >
                    Refund Policy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPolicy('terms')}
                    className="border-white/20 text-white hover:bg-white/10 text-xs justify-start"
                  >
                    Terms of Service
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPolicy('kyc')}
                    className="border-white/20 text-white hover:bg-white/10 text-xs justify-start"
                  >
                    KYC & Compliance
                  </Button>
                </div>
              </Card>

              {/* Compliance Notice */}
              <Card className="bg-primary/10 border-primary/20 p-3">
                <div className="flex gap-2">
                  <Shield className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 text-xs leading-relaxed">
                    This information is stored and processed under strict confidentiality and regulatory compliance.
                  </p>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!isFormValid()}
                  className="flex-1 gradient-primary hover:gradient-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Payment Information
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
