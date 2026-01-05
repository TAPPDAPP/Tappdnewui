import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileData: {
    bio: string;
    occupation: string;
    education: string;
    motives: string[];
    age: number;
    height: string;
    gender: string;
    location: string;
    interests: string[];
    smoking: string;
    drinking: string;
  };
  onSave: (data: any) => void;
}

export const EditProfileDialog = ({ open, onOpenChange, profileData, onSave }: EditProfileDialogProps) => {
  const [formData, setFormData] = useState(profileData);
  const [newInterest, setNewInterest] = useState("");
  const [newMotive, setNewMotive] = useState("");

  const handleAddInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData({
        ...formData,
        interests: [...formData.interests, newInterest.trim()]
      });
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter(i => i !== interest)
    });
  };

  const handleAddMotive = () => {
    if (newMotive.trim() && !formData.motives.includes(newMotive.trim())) {
      setFormData({
        ...formData,
        motives: [...formData.motives, newMotive.trim()]
      });
      setNewMotive("");
    }
  };

  const handleRemoveMotive = (motive: string) => {
    setFormData({
      ...formData,
      motives: formData.motives.filter(m => m !== motive)
    });
  };

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-white/10 text-white max-w-md mx-auto p-0 max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b border-white/10">
          <DialogTitle className="text-white">Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-4 py-4">
            {/* Bio */}
            <div>
              <Label className="text-white">About Me</Label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="bg-white/5 border-white/10 text-white min-h-[100px]"
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Occupation */}
            <div>
              <Label className="text-white">Occupation</Label>
              <Input
                value={formData.occupation}
                onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                className="bg-white/5 border-white/10 text-white"
                placeholder="Your occupation"
              />
            </div>

            {/* Education */}
            <div>
              <Label className="text-white">Education</Label>
              <Input
                value={formData.education}
                onChange={(e) => setFormData({...formData, education: e.target.value})}
                className="bg-white/5 border-white/10 text-white"
                placeholder="Your education"
              />
            </div>

            {/* Looking For / Motives */}
            <div>
              <Label className="text-white">Looking For</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newMotive}
                  onChange={(e) => setNewMotive(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddMotive()}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Add motive..."
                />
                <Button onClick={handleAddMotive} className="gradient-primary">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.motives.map((motive) => (
                  <span key={motive} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {motive}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveMotive(motive)} />
                  </span>
                ))}
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white">Age</Label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Height</Label>
                <Input
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder={`5'10"`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-white/10">
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white">Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* Interests */}
            <div>
              <Label className="text-white">Interests</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Add interest..."
                />
                <Button onClick={handleAddInterest} className="gradient-primary">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.interests.map((interest) => (
                  <span key={interest} className="bg-white/10 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {interest}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveInterest(interest)} />
                  </span>
                ))}
              </div>
            </div>

            {/* Vices */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white">Smoking</Label>
                <Select value={formData.smoking} onValueChange={(value) => setFormData({...formData, smoking: value})}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-white/10">
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Occasionally">Occasionally</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white">Drinking</Label>
                <Select value={formData.drinking} onValueChange={(value) => setFormData({...formData, drinking: value})}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-white/10">
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Socially">Socially</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 gradient-primary hover:gradient-primary-hover"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
