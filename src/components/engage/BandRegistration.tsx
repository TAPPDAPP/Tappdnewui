import { useState, useEffect } from "react";
import { Watch, Smartphone, Check, Plus, Trash2, Edit2, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { motion, AnimatePresence } from "motion/react";

interface RegisteredBand {
  id: string;
  name: string;
  registeredAt: Date;
}

interface BandRegistrationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BandRegistration({ open, onOpenChange }: BandRegistrationProps) {
  const [step, setStep] = useState<'tapping' | 'naming' | 'list'>('tapping');
  const [currentBandId, setCurrentBandId] = useState<string>('');
  const [bandName, setBandName] = useState('');
  const [registeredBands, setRegisteredBands] = useState<RegisteredBand[]>([]);
  const [editingBandId, setEditingBandId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [isTapping, setIsTapping] = useState(false);

  // Load bands from localStorage on mount
  useEffect(() => {
    const storedBands = localStorage.getItem('tappd_registered_bands');
    if (storedBands) {
      const bands = JSON.parse(storedBands);
      setRegisteredBands(bands.map((band: any) => ({
        ...band,
        registeredAt: new Date(band.registeredAt)
      })));
    }
  }, []);

  // Save bands to localStorage whenever they change
  useEffect(() => {
    if (registeredBands.length > 0) {
      localStorage.setItem('tappd_registered_bands', JSON.stringify(registeredBands));
    }
  }, [registeredBands]);

  const generateBandId = () => {
    return `TAPPD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const handleStartTapping = () => {
    setStep('tapping');
    setIsTapping(true);
    
    // Simulate successful band detection after 3 seconds
    setTimeout(() => {
      const newBandId = generateBandId();
      setCurrentBandId(newBandId);
      setIsTapping(false);
      setStep('naming');
    }, 3000);
  };

  const handleSaveBand = () => {
    if (bandName.trim()) {
      const newBand: RegisteredBand = {
        id: currentBandId,
        name: bandName.trim(),
        registeredAt: new Date()
      };
      setRegisteredBands([...registeredBands, newBand]);
      setBandName('');
      setCurrentBandId('');
      setStep('list');
    }
  };

  const handleEditBand = (band: RegisteredBand) => {
    setEditingBandId(band.id);
    setEditingName(band.name);
  };

  const handleSaveEdit = () => {
    if (editingName.trim() && editingBandId) {
      setRegisteredBands(registeredBands.map(band => 
        band.id === editingBandId ? { ...band, name: editingName.trim() } : band
      ));
      setEditingBandId(null);
      setEditingName('');
    }
  };

  const handleDeleteBand = (bandId: string) => {
    setRegisteredBands(registeredBands.filter(band => band.id !== bandId));
  };

  const handleAddNewBand = () => {
    setStep('tapping');
    setBandName('');
    setCurrentBandId('');
    handleStartTapping();
  };

  const handleClose = () => {
    setStep(registeredBands.length > 0 ? 'list' : 'tapping');
    setBandName('');
    setCurrentBandId('');
    setIsTapping(false);
    onOpenChange(false);
  };

  const TappingView = () => (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <div className="space-y-2 text-center">
        <h3 className="text-white text-lg font-medium">
          {isTapping ? 'Connecting to Band...' : 'Register TAPPD Band'}
        </h3>
        <p className="text-white/70 text-sm">
          {isTapping ? 'Keep holding until connection is established' : 'Tap and hold band until it shows up'}
        </p>
      </div>

      {/* Animation Container */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Phone */}
        <motion.div
          className="absolute left-8"
          animate={isTapping ? { 
            x: [0, 20, 20, 0],
            rotate: [12, 0, 0, 12]
          } : { 
            x: 0, 
            rotate: 12 
          }}
          transition={{ 
            duration: 2, 
            repeat: isTapping ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          <div className="bg-white/20 rounded-2xl p-4">
            <Smartphone className="h-16 w-16 text-white" />
          </div>
          <div className="text-center mt-2">
            <p className="text-white/70 text-xs">Your Phone</p>
          </div>
        </motion.div>

        {/* TAPPD Band */}
        <motion.div
          className="absolute right-8"
          animate={isTapping ? { 
            x: [0, -20, -20, 0],
            scale: [1, 1.05, 1.05, 1]
          } : { 
            x: 0, 
            scale: 1 
          }}
          transition={{ 
            duration: 2, 
            repeat: isTapping ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-full p-4">
            <Watch className="h-16 w-16 text-white" />
          </div>
          <div className="text-center mt-2">
            <p className="text-white/70 text-xs">TAPPD Band</p>
          </div>
        </motion.div>

        {/* Connection Effect */}
        <AnimatePresence>
          {isTapping && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-primary to-purple-600"
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  scaleX: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tap Indicators with Crystal Effect */}
        <AnimatePresence>
          {isTapping && (
            <>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0.8, 0, 0.8], scale: [0.5, 2, 0.5] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              >
                <div className="w-8 h-8 bg-primary/30 rounded-full" />
              </motion.div>
              
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-2 h-2 bg-white rounded-full shadow-lg shadow-primary/50" />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {!isTapping && (
        <Button
          onClick={handleStartTapping}
          className="gradient-primary hover:gradient-primary-hover"
        >
          Start Pairing
        </Button>
      )}

      {isTapping && (
        <div className="flex items-center gap-2 text-white/70">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
          </motion.div>
          <span className="text-sm">Searching for band...</span>
        </div>
      )}
    </div>
  );

  const NamingView = () => (
    <div className="flex flex-col space-y-6 py-4">
      <div className="space-y-2 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center justify-center mb-4"
        >
          <div className="bg-green-500/20 rounded-full p-3">
            <Check className="h-8 w-8 text-green-500" />
          </div>
        </motion.div>
        <h3 className="text-white text-lg font-medium">Band Detected!</h3>
        <p className="text-white/70 text-sm">Give your TAPPD band a name</p>
      </div>

      {/* Band ID Display */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs mb-1">Band ID</p>
            <p className="text-white font-mono text-sm">{currentBandId}</p>
          </div>
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-full p-2">
            <Watch className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>

      {/* Name Input */}
      <div className="space-y-2">
        <label className="text-white text-sm font-medium">Band Name</label>
        <Input
          value={bandName}
          onChange={(e) => setBandName(e.target.value)}
          placeholder="e.g., My TAPPD Band"
          className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && bandName.trim()) {
              handleSaveBand();
            }
          }}
        />
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => {
            setStep('tapping');
            setCurrentBandId('');
            setBandName('');
          }}
          variant="outline"
          className="flex-1 border-white/20 text-white hover:bg-white/10"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveBand}
          disabled={!bandName.trim()}
          className="flex-1 gradient-primary hover:gradient-primary-hover disabled:opacity-50"
        >
          Save Band
        </Button>
      </div>
    </div>
  );

  const ListView = () => (
    <div className="flex flex-col space-y-6 py-4">
      <div className="space-y-2 text-center">
        <h3 className="text-white text-lg font-medium">My TAPPD Bands</h3>
        <p className="text-white/70 text-sm">
          {registeredBands.length} band{registeredBands.length !== 1 ? 's' : ''} registered
        </p>
      </div>

      {/* Registered Bands List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {registeredBands.map((band) => (
          <motion.div
            key={band.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-lg p-4"
          >
            {editingBandId === band.id ? (
              <div className="space-y-3">
                <Input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && editingName.trim()) {
                      handleSaveEdit();
                    }
                  }}
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveEdit}
                    size="sm"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingBandId(null);
                      setEditingName('');
                    }}
                    size="sm"
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="bg-gradient-to-r from-primary to-purple-600 rounded-full p-2">
                    <Watch className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{band.name}</h4>
                    <p className="text-white/50 text-xs font-mono truncate">{band.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleEditBand(band)}
                    size="sm"
                    variant="ghost"
                    className="p-2 hover:bg-white/10"
                  >
                    <Edit2 className="h-4 w-4 text-white/70" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteBand(band.id)}
                    size="sm"
                    variant="ghost"
                    className="p-2 hover:bg-red-500/20"
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        ))}

        {registeredBands.length === 0 && (
          <div className="text-center py-8">
            <div className="bg-white/5 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <Watch className="h-8 w-8 text-white/30" />
            </div>
            <p className="text-white/50 text-sm">No bands registered yet</p>
          </div>
        )}
      </div>

      {/* Add New Band Button */}
      <Button
        onClick={handleAddNewBand}
        className="w-full gradient-primary hover:gradient-primary-hover"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add New Band
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-background border-white/10 text-white max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>TAPPD Band Registration</DialogTitle>
          <DialogDescription>
            {step === 'tapping' && 'Connect your TAPPD band with your phone'}
            {step === 'naming' && 'Name your TAPPD band for easy identification'}
            {step === 'list' && 'Manage your registered TAPPD bands'}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 'tapping' && (
            <motion.div
              key="tapping"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <TappingView />
            </motion.div>
          )}
          {step === 'naming' && (
            <motion.div
              key="naming"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <NamingView />
            </motion.div>
          )}
          {step === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <ListView />
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
