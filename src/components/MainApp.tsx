import { useState } from "react";
import { Header } from "./Header";
import { ExploreHeader } from "./ExploreHeader";
import { EventCategories } from "./EventCategories";
import { RecommendedEvents } from "./RecommendedEvents";
import { TrendingEvents } from "./TrendingEvents";
import { WishlistedEvents } from "./WishlistedEvents";
import { Reconnect } from "./Reconnect";
import { Engage } from "./Engage";
import { Host } from "./Host";
import { Profile } from "./Profile";
import { CategoryDetail } from "./CategoryDetail";
import { ExploreAll } from "./ExploreAll";
import { EventBooking } from "./EventBooking";
import { DraftEvents } from "./DraftEvents";
import { PublishedEvents } from "./PublishedEvents";
import { Notifications } from "./Notifications";
import { BottomNavigation } from "./BottomNavigation";
import { RecommendedEventsDetail } from "./RecommendedEventsDetail";
import { TrendingEventsDetail } from "./TrendingEventsDetail";
import { WishlistEventsDetail } from "./WishlistEventsDetail";
import { ManageBookings } from "./ManageBookings";
import { MapView } from "./MapView";

import { Separator } from "./ui/separator";
import { Toaster } from "./ui/sonner";

export function MainApp() {
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showExploreAll, setShowExploreAll] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{id: string, name: string} | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [profileInitialTab, setProfileInitialTab] = useState('about');
  const [lastPage, setLastPage] = useState<'explore' | 'category' | 'exploreAll' | 'recommended' | 'trending' | 'wishlist'>('explore');
  const [showDraftEvents, setShowDraftEvents] = useState(false);
  const [showPublishedEvents, setShowPublishedEvents] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [editingDraft, setEditingDraft] = useState<any>(null);
  const [showRecommendedDetail, setShowRecommendedDetail] = useState(false);
  const [showTrendingDetail, setShowTrendingDetail] = useState(false);
  const [showWishlistDetail, setShowWishlistDetail] = useState(false);
  const [showManageBookings, setShowManageBookings] = useState(false);
  const [exploreSubTab, setExploreSubTab] = useState<'explore' | 'bookings' | 'map'>('explore');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowExploreAll(false);
    setLastPage('exploreAll');
  };

  const handleBackFromCategory = () => {
    setSelectedCategory(null);
  };

  const handleExploreAllClick = () => {
    setShowExploreAll(true);
    setSelectedCategory(null);
    setLastPage('explore');
  };

  const handleBackFromExploreAll = () => {
    setShowExploreAll(false);
  };

  const handleEventSelect = (eventId: string, eventName: string) => {
    setSelectedEvent({id: eventId, name: eventName});
    // Determine the last page based on current state
    if (selectedCategory) {
      setLastPage('category');
    } else if (showExploreAll) {
      setLastPage('exploreAll');
    } else if (showRecommendedDetail) {
      setLastPage('recommended');
    } else if (showTrendingDetail) {
      setLastPage('trending');
    } else if (showWishlistDetail) {
      setLastPage('wishlist');
    } else {
      setLastPage('explore');
    }
  };

  const handleBackFromBooking = () => {
    setSelectedEvent(null);
  };

  const handleProfileOpen = () => {
    setProfileInitialTab('about');
    setShowProfile(true);
  };

  const handleSettingsOpen = () => {
    setProfileInitialTab('settings');
    setShowProfile(true);
  };

  const handleBackFromProfile = () => {
    setShowProfile(false);
    setProfileInitialTab('about');
  };

  const handleShowDrafts = () => {
    setShowDraftEvents(true);
  };

  const handleBackFromDrafts = () => {
    setShowDraftEvents(false);
    setEditingDraft(null);
  };

  const handleEditDraft = (draft: any) => {
    setEditingDraft(draft);
    setShowDraftEvents(false);
  };

  const handleShowPublished = () => {
    setShowPublishedEvents(true);
  };

  const handleBackFromPublished = () => {
    setShowPublishedEvents(false);
  };

  const handleNotificationClick = () => {
    setShowNotifications(true);
  };

  const handleBackFromNotifications = () => {
    setShowNotifications(false);
  };

  const handleNotificationEventSelect = (eventId: string, eventName: string) => {
    setSelectedEvent({id: eventId, name: eventName});
    setShowNotifications(false);
    setLastPage('explore');
  };

  const handleNotificationOpenChat = (chatId: string) => {
    // Navigate to engage tab and open chat
    setActiveTab('engage');
    setShowNotifications(false);
    // You might want to pass chatId to Engage component to open specific chat
  };

  const handleNotificationOpenReconnect = () => {
    setActiveTab('reconnect');
    setShowNotifications(false);
  };

  const handleNotificationOpenEventInteraction = (eventId: string) => {
    setActiveTab('engage');
    setShowNotifications(false);
    // You might want to pass eventId to Engage component to open specific event interaction
  };

  const handleShowRecommendedDetail = () => {
    setShowRecommendedDetail(true);
    setShowTrendingDetail(false);
    setShowWishlistDetail(false);
    setSelectedCategory(null);
    setShowExploreAll(false);
  };

  const handleShowTrendingDetail = () => {
    setShowTrendingDetail(true);
    setShowRecommendedDetail(false);
    setShowWishlistDetail(false);
    setSelectedCategory(null);
    setShowExploreAll(false);
  };

  const handleShowWishlistDetail = () => {
    setShowWishlistDetail(true);
    setShowRecommendedDetail(false);
    setShowTrendingDetail(false);
    setSelectedCategory(null);
    setShowExploreAll(false);
  };

  const handleBackFromRecommendedDetail = () => {
    setShowRecommendedDetail(false);
  };

  const handleBackFromTrendingDetail = () => {
    setShowTrendingDetail(false);
  };

  const handleBackFromWishlistDetail = () => {
    setShowWishlistDetail(false);
  };

  const renderContent = () => {
    // Show profile if requested
    if (showProfile) {
      return <Profile onBack={handleBackFromProfile} initialTab={profileInitialTab} />;
    }

    // Show draft events if requested
    if (showDraftEvents) {
      return <DraftEvents onBack={handleBackFromDrafts} onEditDraft={handleEditDraft} />;
    }

    // Show published events if requested
    if (showPublishedEvents) {
      return <PublishedEvents onBack={handleBackFromPublished} />;
    }

    // Show notifications if requested
    if (showNotifications) {
      return (
        <Notifications 
          onBack={handleBackFromNotifications}
          onEventSelect={handleNotificationEventSelect}
          onOpenChat={handleNotificationOpenChat}
          onOpenReconnect={handleNotificationOpenReconnect}
          onOpenEventInteraction={handleNotificationOpenEventInteraction}
        />
      );
    }

    switch (activeTab) {
      case 'reconnect':
        return <Reconnect />;
      case 'engage':
        return <Engage />;
      case 'host':
        return (
          <Host 
            onShowDrafts={handleShowDrafts} 
            onShowPublished={handleShowPublished}
            onBack={() => setActiveTab('explore')}
            editingDraft={editingDraft}
          />
        );
      case 'profile':
        return <Profile onBack={handleBackFromProfile} initialTab={profileInitialTab} />;
      case 'explore':
      default:
        // Show event booking if an event is selected
        if (selectedEvent) {
          return (
            <EventBooking 
              eventId={selectedEvent.id}
              eventName={selectedEvent.name}
              onBack={handleBackFromBooking}
            />
          );
        }
        
        // Show category detail if a category is selected
        if (selectedCategory) {
          return (
            <CategoryDetail 
              category={selectedCategory} 
              onBack={handleBackFromCategory}
              onEventSelect={handleEventSelect}
            />
          );
        }
        
        // Show explore all page if requested
        if (showExploreAll) {
          return (
            <ExploreAll 
              onBack={handleBackFromExploreAll}
              onCategorySelect={handleCategorySelect}
            />
          );
        }

        // Show recommended events detail if requested
        if (showRecommendedDetail) {
          return (
            <RecommendedEventsDetail 
              onBack={handleBackFromRecommendedDetail}
              onEventSelect={handleEventSelect}
            />
          );
        }

        // Show trending events detail if requested
        if (showTrendingDetail) {
          return (
            <TrendingEventsDetail 
              onBack={handleBackFromTrendingDetail}
              onEventSelect={handleEventSelect}
            />
          );
        }

        // Show wishlist events detail if requested
        if (showWishlistDetail) {
          return (
            <WishlistEventsDetail 
              onBack={handleBackFromWishlistDetail}
              onEventSelect={handleEventSelect}
            />
          );
        }
        
        // Show manage bookings if on bookings tab
        if (exploreSubTab === 'bookings') {
          return (
            <ManageBookings
              onBack={() => setExploreSubTab('explore')}
              onEventSelect={handleEventSelect}
            />
          );
        }

        // Show map view if on map tab
        if (exploreSubTab === 'map') {
          return (
            <MapView
              onBack={() => setExploreSubTab('explore')}
              onEventSelect={handleEventSelect}
            />
          );
        }

        // Show main explore page
        return (
          <div className="flex-1 overflow-y-auto safe-bottom scrollbar-hide">
            <div className="space-y-6">
              {/* Event Categories */}
              <EventCategories 
                onCategorySelect={handleCategorySelect}
                onExploreAllClick={handleExploreAllClick}
              />
              
              <Separator className="bg-white/10" />
              
              {/* Recommended Events */}
              <RecommendedEvents 
                onEventSelect={handleEventSelect} 
                onExploreAll={handleShowRecommendedDetail}
              />
              
              <Separator className="bg-white/10" />
              
              {/* Trending Events */}
              <TrendingEvents 
                onEventSelect={handleEventSelect}
                onExploreAll={handleShowTrendingDetail}
              />
              
              <Separator className="bg-white/10" />
              
              {/* Wishlisted Events */}
              <WishlistedEvents 
                onEventSelect={handleEventSelect}
                onExploreAll={handleShowWishlistDetail}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen-mobile bg-background flex flex-col w-full mobile-safe-area">
      {/* Fixed Header - only show on main explore page */}
      {activeTab === 'explore' && !selectedCategory && !showExploreAll && !selectedEvent && !showProfile && !showDraftEvents && !showPublishedEvents && !showNotifications && !showRecommendedDetail && !showTrendingDetail && !showWishlistDetail && (
        <ExploreHeader 
          activeSubTab={exploreSubTab}
          onSubTabChange={setExploreSubTab}
          onSettingsClick={handleSettingsOpen}
          onNotificationClick={handleNotificationClick}
        />
      )}
      
      {/* Content */}
      {renderContent()}
      
      {/* Fixed Bottom Navigation - always show */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}