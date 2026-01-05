import { useState, useRef, useEffect } from "react";
import { QrCode, Camera, Smartphone, Watch, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { BandRegistration } from "./BandRegistration";
import qrCodeImage from 'figma:asset/dcf8b51d026e480735f1cf3ec2ecccfdb0dfbc81.png';

export function TapToConnectSection() {
  const [activeMode, setActiveMode] = useState<'menu' | 'qr' | 'tap' | 'camera'>('menu');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [showBandRegistration, setShowBandRegistration] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      // Check if we're in a secure context and have camera support
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        // Show mock camera for environments without camera support
        setIsCameraActive(false);
        setActiveMode('camera');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera for scanning
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
        setActiveMode('camera');
      }
    } catch (error) {
      // Silently handle camera access errors - this is expected in many environments
      // Show mock camera instead of logging errors
      setIsCameraActive(false);
      setActiveMode('camera');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setActiveMode('qr');
  };

  useEffect(() => {
    return () => {
      // Cleanup camera stream when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const CameraScanner = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-6 px-8">
      <div className="space-y-4 text-center">
        <h3 className="text-white text-lg font-medium">Scan QR Code</h3>
        <p className="text-white/70 text-sm">
          {isCameraActive ? "Point camera at someone's QR code to connect" : "Camera simulation mode"}
        </p>
      </div>

      {/* Camera View */}
      <div className="relative bg-white/10 rounded-2xl overflow-hidden">
        {isCameraActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-64 h-64 object-cover"
          />
        ) : (
          /* Mock Camera View */
          <div className="w-64 h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center space-y-2">
              <Camera className="h-12 w-12 text-white/30 mx-auto" />
              <p className="text-white/50 text-sm">Mock Camera View</p>
              <p className="text-white/30 text-xs">Camera not available</p>
            </div>
          </div>
        )}
        
        {/* Scanning overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 border-2 border-primary rounded-lg relative">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
            
            {/* Scanning line animation */}
            <div className="absolute top-0 left-0 w-full h-1 bg-primary opacity-75 animate-pulse"></div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={stopCamera}
          className="absolute top-4 right-4 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
        >
          <X className="h-5 w-5 text-white" />
        </button>
      </div>

      <div className="text-center space-y-2">
        <p className="text-white/70 text-sm">
          {isCameraActive ? "Position the QR code within the frame" : "This is a camera simulation"}
        </p>
        <p className="text-white/50 text-xs">
          {isCameraActive ? "Make sure the code is clearly visible" : "Real camera would work in production"}
        </p>
      </div>

      <Button
        onClick={stopCamera}
        variant="outline"
        className="border-white/20 text-white hover:bg-white/10"
      >
        Back to QR View
      </Button>
    </div>
  );

  const QRDisplay = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-8 px-8">
      <div className="space-y-4 text-center">
        <h3 className="text-white text-lg font-medium">Show QR to Connect</h3>
        <p className="text-white/70 text-sm">Let others scan your QR code to connect instantly</p>
      </div>

      {/* QR Code Display */}
      <div className="bg-white p-6 rounded-2xl">
        <div className="w-48 h-48 flex items-center justify-center">
          <img
            src={qrCodeImage}
            alt="QR Code"
            className="w-40 h-40 object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-3">
        <button
          onClick={startCamera}
          className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
        >
          <Camera className="h-8 w-8 text-white/70" />
        </button>
        <p className="text-white/70 text-sm text-center">Scan to Connect</p>
      </div>

      <Button
        onClick={() => setActiveMode('menu')}
        variant="outline"
        className="border-white/20 text-white hover:bg-white/10"
      >
        Back to Menu
      </Button>
    </div>
  );

  const TapAnimation = () => {
    const [animationStep, setAnimationStep] = useState<'phone' | 'band'>('phone');

    return (
      <div className="flex flex-col items-center justify-center h-full space-y-8 px-8">
        <div className="space-y-4 text-center">
          <h3 className="text-white text-lg font-medium">Tap to Connect</h3>
          <p className="text-white/70 text-sm">
            Tap other person's phone or TAPPD band with your phone for 3 seconds to connect
          </p>
        </div>

        {/* Animation Container */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {animationStep === 'phone' ? (
            <PhoneTapAnimation />
          ) : (
            <BandTapAnimation />
          )}
        </div>

        {/* Animation Toggle */}
        <div className="flex space-x-4">
          <Button
            onClick={() => setAnimationStep('phone')}
            variant={animationStep === 'phone' ? 'default' : 'outline'}
            size="sm"
            className={animationStep === 'phone' ? '' : 'border-white/20 text-white hover:bg-white/10'}
          >
            Phone to Phone
          </Button>
          <Button
            onClick={() => setAnimationStep('band')}
            variant={animationStep === 'band' ? 'default' : 'outline'}
            size="sm"
            className={animationStep === 'band' ? '' : 'border-white/20 text-white hover:bg-white/10'}
          >
            Phone to Band
          </Button>
        </div>

        <Button
          onClick={() => setActiveMode('menu')}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
        >
          Back to Menu
        </Button>
      </div>
    );
  };

  const PhoneTapAnimation = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Phone 1 */}
      <div className="absolute left-8 transform transition-all duration-2000 animate-pulse">
        <div className="bg-white/20 rounded-2xl p-4 rotate-12">
          <Smartphone className="h-16 w-16 text-white" />
        </div>
        <div className="text-center mt-2">
          <p className="text-white/70 text-xs">Your Phone</p>
        </div>
      </div>

      {/* Phone 2 */}
      <div className="absolute right-8 transform transition-all duration-2000">
        <div className="bg-white/20 rounded-2xl p-4 -rotate-12">
          <Smartphone className="h-16 w-16 text-white" />
        </div>
        <div className="text-center mt-2">
          <p className="text-white/70 text-xs">Other Phone</p>
        </div>
      </div>

      {/* Connection Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-1 bg-gradient-to-r from-primary to-transparent opacity-50 animate-pulse"></div>
      </div>

      {/* Tap Indicators */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-primary rounded-full animate-ping"></div>
      </div>
    </div>
  );

  const BandTapAnimation = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Phone */}
      <div className="absolute left-8 transform transition-all duration-2000 animate-pulse">
        <div className="bg-white/20 rounded-2xl p-4 rotate-12">
          <Smartphone className="h-16 w-16 text-white" />
        </div>
        <div className="text-center mt-2">
          <p className="text-white/70 text-xs">Your Phone</p>
        </div>
      </div>

      {/* Smart Band */}
      <div className="absolute right-8 transform transition-all duration-2000">
        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-full p-4">
          <Watch className="h-16 w-16 text-white" />
        </div>
        <div className="text-center mt-2">
          <p className="text-white/70 text-xs">TAPPD Band</p>
        </div>
      </div>

      {/* Connection Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-1 bg-gradient-to-r from-primary to-purple-600 opacity-50 animate-pulse"></div>
      </div>

      {/* Tap Indicators */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-purple-500 rounded-full animate-ping"></div>
      </div>
    </div>
  );

  if (activeMode === 'camera') {
    return <CameraScanner />;
  }

  if (activeMode === 'qr') {
    return <QRDisplay />;
  }

  if (activeMode === 'tap') {
    return <TapAnimation />;
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10">
        <h2 className="text-white font-medium text-center">Tap to Connect</h2>
      </div>

      {/* Menu Options */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 px-8 safe-bottom">
        <div className="space-y-4 text-center">
          <h3 className="text-white text-xl font-medium">Connect Instantly</h3>
          <p className="text-white/70">Choose your preferred connection method</p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          {/* Show QR Option */}
          <Card
            className="bg-white/5 border-white/10 p-6 cursor-pointer hover:bg-white/10 transition-colors"
            onClick={() => setActiveMode('qr')}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-primary/20 rounded-full p-4">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <h4 className="text-white font-medium">Show QR Code</h4>
                <p className="text-white/60 text-sm mt-1">
                  Display your QR code for others to scan
                </p>
              </div>
            </div>
          </Card>

          {/* Tap to Connect Option */}
          <Card
            className="bg-white/5 border-white/10 p-6 cursor-pointer hover:bg-white/10 transition-colors"
            onClick={() => setActiveMode('tap')}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-gradient-to-r from-primary to-purple-600 rounded-full p-4">
                <div className="flex items-center space-x-1">
                  <Smartphone className="h-4 w-4 text-white" />
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                  <Watch className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-white font-medium">Tap to Connect</h4>
                <p className="text-white/60 text-sm mt-1">
                  Tap phones or TAPPD bands together
                </p>
              </div>
            </div>
          </Card>

          {/* Register TAPPD Band Option */}
          <Card
            className="bg-white/5 border-white/10 p-6 cursor-pointer hover:bg-white/10 transition-colors"
            onClick={() => setShowBandRegistration(true)}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-gradient-to-r from-purple-600 to-primary rounded-full p-4">
                <Watch className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <h4 className="text-white font-medium">Register TAPPD Band</h4>
                <p className="text-white/60 text-sm mt-1">
                  Connect and manage your TAPPD bands
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Info Text */}
        <div className="text-center space-y-2">
          <p className="text-white/50 text-sm">
            Hold devices together for 3 seconds
          </p>
          <p className="text-white/50 text-xs">
            Works with NFC-enabled devices
          </p>
        </div>
      </div>

      {/* Band Registration Dialog */}
      <BandRegistration open={showBandRegistration} onOpenChange={setShowBandRegistration} />
    </div>
  );
}