import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Camera, Heart, MapPin, Bell, Mail, Eye, EyeOff, Upload, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Progress } from "../ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { TermsOfService } from "../profile/policies/TermsOfService";
import { PrivacyPolicy } from "../profile/policies/PrivacyPolicy";

interface SignupFlowProps {
  onBack: () => void;
  onComplete: () => void;
}

interface FormData {
  // Step 1: Basic Account
  email: string;
  password: string;
  confirmPassword: string;
  
  // Step 2: Profile Building
  photo: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  age: string;
  bio: string;
  
  // Step 3: Interest Selection
  interests: string[];
  
  // Step 4: Location Setup
  country: string;
  city: string;
  locationPermission: boolean;
  
  // Step 5: Notification Preferences
  eventNotifications: boolean;
  messageNotifications: boolean;
  marketingNotifications: boolean;
  termsAccepted: boolean;
  
  // Step 6: Email Verification
  verificationCode: string;
}

const eventCategories = [
  'Music', 'Sports', 'Food & Drink', 'Art & Culture', 'Nightlife', 'Business',
  'Tech', 'Health & Fitness', 'Education', 'Travel', 'Fashion', 'Gaming',
  'Photography', 'Dance', 'Comedy', 'Literature', 'Film', 'Outdoor',
  'Charity', 'Social'
];

const countries = [
  'India', 'USA', 'UK', 'Canada', 'Australia', 'UAE', 'Singapore'
];

const citiesByCountry: Record<string, string[]> = {
  'India': ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Goa'],
  'USA': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
  'UK': ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool', 'Newcastle', 'Sheffield', 'Bristol', 'Edinburgh'],
  'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener'],
  'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Newcastle', 'Wollongong', 'Hobart'],
  'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'],
  'Singapore': ['Singapore City', 'Jurong', 'Woodlands', 'Tampines', 'Bedok', 'Ang Mo Kio']
};

export function SignupFlow({ onBack, onComplete }: SignupFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    photo: '',
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    age: '',
    bio: '',
    interests: [],
    country: '',
    city: '',
    locationPermission: false,
    eventNotifications: true,
    messageNotifications: true,
    marketingNotifications: false,
    termsAccepted: false,
    verificationCode: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
        
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        break;
        
      case 2:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.age) newErrors.age = 'Age is required';
        else if (parseInt(formData.age) < 18) newErrors.age = 'You must be at least 18 years old';
        break;
        
      case 3:
        if (formData.interests.length < 3) newErrors.interests = 'Please select at least 3 interests';
        break;
        
      case 4:
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.city) newErrors.city = 'City is required';
        break;
        
      case 5:
        if (!formData.termsAccepted) newErrors.termsAccepted = 'Please accept the terms and conditions';
        break;
        
      case 6:
        if (!formData.verificationCode) newErrors.verificationCode = 'Verification code is required';
        else if (formData.verificationCode.length !== 6) newErrors.verificationCode = 'Please enter a 6-digit code';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsLoading(true);
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const toggleInterest = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    updateFormData('interests', newInterests);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateFormData('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCountryChange = (country: string) => {
    updateFormData('country', country);
    updateFormData('city', ''); // Reset city when country changes
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-white mb-2">Create Account</h2>
              <p className="text-white/60">Let's get you started with the basics</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="bg-input-background border-white/10 text-white placeholder:text-white/40"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    className="bg-input-background border-white/10 text-white placeholder:text-white/40 pr-12"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
              </div>
              
              <div>
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    className="bg-input-background border-white/10 text-white placeholder:text-white/40 pr-12"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-white mb-2">Build Your Profile</h2>
              <p className="text-white/60">Tell us a bit about yourself</p>
            </div>
            
            <div className="space-y-4">
              {/* Profile Photo */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 rounded-full bg-white/10 border-2 border-dashed border-white/20 flex items-center justify-center hover:border-primary/40 hover:bg-white/5 transition-all group"
                  >
                    {formData.photo ? (
                      <img src={formData.photo} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <Camera className="w-8 h-8 text-white/40 group-hover:text-primary/60 transition-colors" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                  >
                    <Upload className="w-4 h-4 text-white" />
                  </button>
                </div>
                <p className="text-white/60 text-sm mt-2">
                  {formData.photo ? 'Change profile photo' : 'Tap to upload photo'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-white">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className="bg-input-background border-white/10 text-white placeholder:text-white/40"
                    placeholder="First name"
                  />
                  {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <Label htmlFor="lastName" className="text-white">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className="bg-input-background border-white/10 text-white placeholder:text-white/40"
                    placeholder="Last name"
                  />
                  {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
              
              <div>
                <Label htmlFor="username" className="text-white">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => updateFormData('username', e.target.value)}
                  className="bg-input-background border-white/10 text-white placeholder:text-white/40"
                  placeholder="Choose a unique username"
                />
                {errors.username && <p className="text-destructive text-sm mt-1">{errors.username}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-white">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="bg-input-background border-white/10 text-white placeholder:text-white/40"
                    placeholder="Phone number"
                  />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div>
                  <Label htmlFor="age" className="text-white">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => updateFormData('age', e.target.value)}
                    className="bg-input-background border-white/10 text-white placeholder:text-white/40"
                    placeholder="Your age"
                  />
                  {errors.age && <p className="text-destructive text-sm mt-1">{errors.age}</p>}
                </div>
              </div>
              
              <div>
                <Label htmlFor="bio" className="text-white">Bio (Optional)</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => updateFormData('bio', e.target.value)}
                  className="bg-input-background border-white/10 text-white placeholder:text-white/40 resize-none"
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-white mb-2">Your Interests</h2>
              <p className="text-white/60">Select at least 3 categories you're interested in</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {eventCategories.map((category) => {
                const isSelected = formData.interests.includes(category);
                return (
                  <motion.button
                    key={category}
                    type="button"
                    onClick={() => toggleInterest(category)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected 
                        ? 'border-primary bg-primary/10 text-white' 
                        : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Heart className={`w-4 h-4 ${isSelected ? 'text-primary fill-current' : 'text-white/40'}`} />
                      <span className="text-sm font-medium">{category}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            
            {formData.interests.length > 0 && (
              <div className="text-center">
                <p className="text-white/60 text-sm">
                  {formData.interests.length} selected {formData.interests.length >= 3 ? '✓' : `(${3 - formData.interests.length} more needed)`}
                </p>
              </div>
            )}
            
            {errors.interests && <p className="text-destructive text-sm text-center">{errors.interests}</p>}
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">Location Setup</h2>
              <p className="text-white/60">Help us show you local events</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="country" className="text-white">Country</Label>
                <Select value={formData.country} onValueChange={handleCountryChange}>
                  <SelectTrigger className="bg-input-background border-white/10 text-white">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-white/10">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country} className="text-white hover:bg-white/10">
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && <p className="text-destructive text-sm mt-1">{errors.country}</p>}
              </div>

              <div>
                <Label htmlFor="city" className="text-white">City</Label>
                <Select 
                  value={formData.city} 
                  onValueChange={(value) => updateFormData('city', value)}
                  disabled={!formData.country}
                >
                  <SelectTrigger className="bg-input-background border-white/10 text-white disabled:opacity-50">
                    <SelectValue placeholder={formData.country ? "Select your city" : "Select country first"} />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-white/10">
                    {formData.country && citiesByCountry[formData.country]?.map((city) => (
                      <SelectItem key={city} value={city} className="text-white hover:bg-white/10">
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.city && <p className="text-destructive text-sm mt-1">{errors.city}</p>}
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex-1">
                  <h3 className="text-white font-medium">Location Permission</h3>
                  <p className="text-white/60 text-sm">Allow TAPPD to access your location for better event recommendations</p>
                </div>
                <Switch
                  checked={formData.locationPermission}
                  onCheckedChange={(checked) => updateFormData('locationPermission', checked)}
                  className="ml-4"
                />
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Bell className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">Notification Preferences</h2>
              <p className="text-white/60">Customize how you want to stay updated</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex-1">
                  <h3 className="text-white font-medium">Event Notifications</h3>
                  <p className="text-white/60 text-sm">Get notified about new events and updates</p>
                </div>
                <Switch
                  checked={formData.eventNotifications}
                  onCheckedChange={(checked) => updateFormData('eventNotifications', checked)}
                  className="ml-4"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex-1">
                  <h3 className="text-white font-medium">Message Notifications</h3>
                  <p className="text-white/60 text-sm">Get notified about messages and connections</p>
                </div>
                <Switch
                  checked={formData.messageNotifications}
                  onCheckedChange={(checked) => updateFormData('messageNotifications', checked)}
                  className="ml-4"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex-1">
                  <h3 className="text-white font-medium">Marketing Notifications</h3>
                  <p className="text-white/60 text-sm">Receive promotional offers and updates</p>
                </div>
                <Switch
                  checked={formData.marketingNotifications}
                  onCheckedChange={(checked) => updateFormData('marketingNotifications', checked)}
                  className="ml-4"
                />
              </div>
              
              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="text-white font-medium mb-2">Privacy & Safety</h3>
                <p className="text-white/60 text-sm mb-4">
                  Your data is secure with us. We use industry-standard encryption and never share your personal information without consent.
                </p>
                
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.termsAccepted}
                    onChange={(e) => updateFormData('termsAccepted', e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-primary focus:ring-primary focus:ring-2 cursor-pointer"
                  />
                  <Label htmlFor="terms" className="text-white/80 text-sm leading-relaxed flex-1 cursor-pointer">
                    I agree to the{" "}
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.preventDefault();
                        setShowTermsDialog(true);
                      }}
                      className="text-primary hover:underline font-medium"
                    >
                      Terms of Service
                    </button>
                    {" "}and{" "}
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPrivacyDialog(true);
                      }}
                      className="text-primary hover:underline font-medium"
                    >
                      Privacy Policy
                    </button>
                  </Label>
                </div>
                {errors.termsAccepted && (
                  <p className="text-destructive text-sm mt-2">{errors.termsAccepted}</p>
                )}
              </div>
            </div>
          </div>
        );
        
      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">Verify Your Email</h2>
              <p className="text-white/60">We've sent a 6-digit code to</p>
              <p className="text-white font-medium">{formData.email}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="verificationCode" className="text-white">Verification Code</Label>
                <Input
                  id="verificationCode"
                  value={formData.verificationCode}
                  onChange={(e) => updateFormData('verificationCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="bg-input-background border-white/10 text-white placeholder:text-white/40 text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                />
                {errors.verificationCode && (
                  <p className="text-destructive text-sm mt-1">{errors.verificationCode}</p>
                )}
              </div>
              
              <div className="text-center">
                <p className="text-white/60 text-sm mb-2">Didn't receive the code?</p>
                <button
                  type="button"
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  Resend Code
                </button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-6"
      >
        <button
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div className="text-center">
          <p className="text-white/60 text-sm">Step {currentStep} of {totalSteps}</p>
        </div>
        <div className="w-10" />
      </motion.div>

      {/* Progress Bar */}
      <div className="px-6 mb-6">
        <Progress value={progress} className="h-2" />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-sm mx-auto"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-6">
        <Button
          onClick={handleNext}
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-chart-2 to-chart-3 hover:from-primary hover:to-chart-2 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Setting up your account...</span>
            </div>
          ) : currentStep === totalSteps ? (
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>Complete Setup</span>
            </div>
          ) : (
            'Continue'
          )}
        </Button>
      </div>

      {/* Terms and Privacy Dialogs */}
      <TermsOfService open={showTermsDialog} onOpenChange={setShowTermsDialog} />
      <PrivacyPolicy open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog} />
    </div>
  );
}