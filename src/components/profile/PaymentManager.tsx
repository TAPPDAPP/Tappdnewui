import { useState } from "react";
import { CreditCard, Plus, Edit, Trash2, Building, User, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { AddPaymentInfo } from "./AddPaymentInfo";

interface PaymentMethod {
  id: string;
  type: 'individual' | 'business';
  bankName: string;
  accountLast4: string;
  linkedEmail: string;
  linkedPhone: string;
  isVerified: boolean;
  addedDate: string;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'individual',
    bankName: 'HDFC Bank',
    accountLast4: '4567',
    linkedEmail: 'harsh@tappd.co.in',
    linkedPhone: '+91 98765 43210',
    isVerified: true,
    addedDate: '2024-12-15'
  },
  {
    id: '2',
    type: 'business',
    bankName: 'ICICI Bank',
    accountLast4: '8901',
    linkedEmail: 'business@tappd.co.in',
    linkedPhone: '+91 98765 43210',
    isVerified: true,
    addedDate: '2025-01-10'
  }
];

interface PaymentManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PaymentManager = ({ open, onOpenChange }: PaymentManagerProps) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(null);

  const handleDelete = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  const handleEdit = (method: PaymentMethod) => {
    setEditingPayment(method);
    setShowAddPayment(true);
  };

  const handleAddNew = () => {
    setEditingPayment(null);
    setShowAddPayment(true);
  };

  return (
    <>
      <Dialog open={open && !showAddPayment} onOpenChange={onOpenChange}>
        <DialogContent className="bg-background border-white/10 text-white max-w-md mx-auto p-0 max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0">
            <DialogTitle className="text-white">Manage Payment Information</DialogTitle>
            <DialogDescription className="text-white/70">
              View, edit, or add payment details for secure transactions.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="space-y-4">
              {/* Payment Methods List */}
              {paymentMethods.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-white/5 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <CreditCard className="h-8 w-8 text-white/30" />
                  </div>
                  <h4 className="text-white font-medium mb-2">No Payment Methods</h4>
                  <p className="text-white/50 text-sm mb-4">
                    Add your first payment method to get started
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {paymentMethods.map((method, index) => (
                    <motion.div
                      key={method.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-white/5 border-white/10 p-4 hover:bg-white/10 transition-colors">
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className={`rounded-full p-2 ${
                            method.type === 'business' 
                              ? 'bg-purple-600/20' 
                              : 'bg-primary/20'
                          }`}>
                            {method.type === 'business' ? (
                              <Building className="h-5 w-5 text-purple-400" />
                            ) : (
                              <User className="h-5 w-5 text-primary" />
                            )}
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-white font-medium">{method.bankName}</h4>
                              {method.isVerified && (
                                <Badge className="bg-green-500/20 text-green-400 border-0 text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-white/60 text-sm mb-1">
                              •••• {method.accountLast4}
                            </p>
                            <p className="text-white/50 text-xs mb-1">
                              {method.linkedEmail}
                            </p>
                            <p className="text-white/50 text-xs">
                              {method.linkedPhone}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs border-white/20 text-white/70">
                                {method.type === 'business' ? 'Business' : 'Individual'}
                              </Badge>
                              <span className="text-white/40 text-xs">
                                Added {new Date(method.addedDate).toLocaleDateString('en-IN', { 
                                  day: '2-digit', 
                                  month: 'short', 
                                  year: 'numeric' 
                                })}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(method)}
                              className="p-2 hover:bg-white/10 h-8 w-8"
                            >
                              <Edit className="h-4 w-4 text-white/70" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(method.id)}
                              className="p-2 hover:bg-red-500/20 h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4 text-red-400" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}

              {/* Add New Button */}
              <Button
                onClick={handleAddNew}
                className="w-full gradient-primary hover:gradient-primary-hover"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Payment Information
              </Button>

              {/* Compliance Note */}
              <Card className="bg-primary/10 border-primary/20 p-4">
                <p className="text-white/80 text-xs leading-relaxed">
                  <strong>Secure & Compliant:</strong> This information is stored and processed under strict confidentiality and regulatory compliance including RBI, NPCI, PCI DSS, GDPR, and IT Act 2000 standards.
                </p>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Payment Dialog */}
      <AddPaymentInfo 
        open={showAddPayment}
        onOpenChange={setShowAddPayment}
        editingPayment={editingPayment}
        onClose={() => {
          setShowAddPayment(false);
          setEditingPayment(null);
        }}
      />
    </>
  );
};
