// This file contains the updated profile data bindings
// Copy these sections into Profile.tsx to replace the hardcoded values

export const profileDataUpdates = {
  // Height field (line ~344)
  height: `<p className="text-white">{profileData.height}</p>`,
  
  // Gender field (line ~348)
  gender: `<p className="text-white">{profileData.gender}</p>`,
  
  // Location field (line ~352)
  location: `<p className="text-white">{profileData.location}</p>`,
  
  // Edit button onclick (line ~382)
  editButton: `<Button size="sm" className="gradient-primary hover:gradient-primary-hover" onClick={() => setShowEditProfile(true)}>`,
  
  // Photo upload click handler (line ~393-397)
  photoUpload: `<div 
  className="aspect-[9/16] bg-white/5 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
  onClick={() => photoInputRef.current?.click()}
>
  <Plus className="w-6 h-6 text-white/50" />
</div>
<input 
  ref={photoInputRef}
  type="file"
  accept="image/*"
  className="hidden"
  onChange={handlePhotoUpload}
/>`,
  
  // Photos array (line ~400)
  photosArray: `{userPhotos.map((photo, index) => (`,
  
  // Photo stats (line ~418)
  photoStats: `{userPhotos.length} photo{userPhotos.length !== 1 ? 's' : ''}`,
  
  // Connection onClick (line ~452-454)
  connectionOnClick: `<div 
  key={connection.id}
  className="bg-white/5 rounded-lg p-4 text-center cursor-pointer hover:bg-white/10 transition-colors border border-white/10"
  onClick={() => handleConnectionClick(connection)}
>`,
  
  // Add dialogs at end (line ~599)
  dialogs: `<EditProfileDialog 
  open={showEditProfile}
  onOpenChange={setShowEditProfile}
  profileData={profileData}
  onSave={handleProfileSave}
/>
<UserProfileView
  open={showUserProfile}
  onOpenChange={setShowUserProfile}
  user={selectedConnection}
  onMessageClick={handleMessageFromProfile}
/>`
};
