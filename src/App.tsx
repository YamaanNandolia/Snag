import { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import TradeScreen from './components/TradeScreen';
import CreateListingScreen from './components/CreateListingScreen';
import ProfileScreen from './components/ProfileScreen';
import SettingsScreen from './components/SettingsScreen';
import NotificationsScreen from './components/NotificationsScreen';
import ItemDetailScreen from './components/ItemDetailScreen';
import MeetingScreen from './components/MeetingScreen';
import BarterOfferScreen from './components/BarterOfferScreen';
import CounterOfferScreen from './components/CounterOfferScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import ConfirmationModal from './components/ConfirmationModal';
import ListingDetailModal from './components/ListingDetailModal';
import FullListingView from './components/FullListingView';
import MyListingsScreen from './components/MyListingsScreen';
import SplashScreen from './components/SplashScreen';
import BottomNav from './components/BottomNav';
import StyleGuide from './components/StyleGuide';
import PrivacySettingsScreen from './components/PrivacySettingsScreen';
import BlockedUsersScreen from './components/BlockedUsersScreen';
import SafetyTipsScreen from './components/SafetyTipsScreen';
import EditProfileScreen from './components/EditProfileScreen';
import ChangePasswordScreen from './components/ChangePasswordScreen';
import LanguageSettingsScreen from './components/LanguageSettingsScreen';
import HelpCenterScreen from './components/HelpCenterScreen';
import SendFeedbackScreen from './components/SendFeedbackScreen';
import UserProfileView from './components/UserProfileView';
import CirclesHomeScreen from './components/CirclesHomeScreen';
import CircleFeedScreen from './components/CircleFeedScreen';
import CircleAboutScreen from './components/CircleAboutScreen';
import CreateCircleScreen from './components/CreateCircleScreen';
import ComponentLibrary from './components/ComponentLibrary';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import SelectInterestsScreen from './components/SelectInterestsScreen';
import ReviewProfileScreen from './components/ReviewProfileScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import VerifyEmailScreen from './components/VerifyEmailScreen';
import { CheckCircle, Package, ArrowLeftRight, Calendar } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';
import { CreditProvider } from "./contexts/CreditContext";

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  listingData?: any;
}

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<string>('login');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedMeetingSpot, setSelectedMeetingSpot] = useState<string>('');
  const [showSplash, setShowSplash] = useState(false);
  const [latestListing, setLatestListing] = useState<any>(null);
  const [myListings, setMyListings] = useState<any[]>([]);
  const [currentUser] = useState({ id: 'user_1', name: 'Ryan Mehta' });
  const [userCircles, setUserCircles] = useState<any[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    icon?: React.ReactNode;
    title: string;
    message: string;
  }>({
    isOpen: false,
    icon: undefined,
    title: '',
    message: ''
  });
  const [listingModal, setListingModal] = useState<{
    isOpen: boolean;
    listing: any;
  }>({
    isOpen: false,
    listing: null
  });
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'meeting',
      title: 'Meeting confirmed',
      message: 'Your meeting for Desk Chair at Student Union Entrance',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 2,
      type: 'barter',
      title: 'New barter offer received',
      message: 'Emma L. wants to trade for your Vintage Denim Jacket',
      time: '3 hours ago',
      unread: true
    }
  ]);
  const [notificationCount, setNotificationCount] = useState(2);

  // Simulate splash screen timeout
  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        setCurrentScreen('home');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  const addNotification = (type: string, title: string, message: string, listingData?: any) => {
    const newNotification: Notification = {
      id: Date.now(),
      type,
      title,
      message,
      time: 'Just now',
      unread: true,
      listingData
    };
    setNotifications(prev => [newNotification, ...prev]);
    setNotificationCount(prev => prev + 1);
  };

  const showConfirmation = (icon: React.ReactNode, title: string, message: string) => {
    setConfirmationModal({
      isOpen: true,
      icon,
      title,
      message
    });
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.type === 'listing' && notification.listingData) {
      setListingModal({
        isOpen: true,
        listing: notification.listingData
      });
    }
    // Add more handlers for other notification types if needed
  };

  const handleListingPublish = (listingData: any) => {
    // Create full listing object with all necessary properties
    const fullListing = {
      ...listingData,
      id: Date.now(),
      sellerId: currentUser.id,
      seller: {
        name: currentUser.name,
        verified: true
      },
      status: 'active',
      views: 0,
      images: [listingData.image],
      postedTime: 'Just now',
      isBarter: false
    };

    // Add to my listings (newest first)
    setMyListings(prev => [fullListing, ...prev]);
    setLatestListing(fullListing);
    
    // Add notification with listing data
    addNotification('listing', 'Listing published', 'Your item is now visible to all campus students', fullListing);
    
    // Show confirmation modal
    showConfirmation(
      <Package className="w-8 h-8 text-white" />,
      'Listing Published!',
      'Your item is now visible to all students'
    );
  };

  const handleBarterConfirm = () => {
    addNotification('barter', 'Barter confirmed', 'Your trade has been accepted! Schedule a meetup to exchange items.');
    showConfirmation(
      <ArrowLeftRight className="w-8 h-8 text-white" />,
      'Barter Confirmed!',
      'Your trade has been accepted'
    );
    setCurrentScreen('home');
  };

  const handleCircleCreate = (newCircle: any) => {
    setUserCircles(prev => [newCircle, ...prev]);
    // Navigate to the newly created circle's feed
    setSelectedItem(newCircle);
    setCurrentScreen('circle-feed');
  };

  const addCustomTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !customTags.includes(trimmedTag)) {
      setCustomTags(prev => [...prev, trimmedTag]);
    }
  };

  const removeCustomTag = (tag: string) => {
    setCustomTags(prev => prev.filter(t => t !== tag));
  };

  const navigateTo = (screen: string, data?: any) => {
    // Handle navigation and notification updates
    if (screen === 'confirmation') {
      addNotification('meeting', 'Meeting confirmed', `Your meeting at ${selectedMeetingSpot || 'Main Library Lobby'} has been scheduled`);
      showConfirmation(
        <Calendar className="w-8 h-8 text-white" />,
        'Meeting Confirmed!',
        `Your meetup is scheduled at ${selectedMeetingSpot || 'Main Library Lobby'}`
      );
    }

    if (screen === 'notifications') {
      // Mark all as read and hide badge dot when viewing notifications
      setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
      setNotificationCount(0);
    }

    setCurrentScreen(screen);
    if (data) setSelectedItem(data);
  };

  const setMeetingSpot = (spot: string) => {
    setSelectedMeetingSpot(spot);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen navigateTo={navigateTo} />;
      case 'signup':
        return <SignupScreen navigateTo={navigateTo} />;
      case 'select-interests':
        return <SelectInterestsScreen navigateTo={navigateTo} userData={selectedItem} />;
      case 'review-profile':
        return <ReviewProfileScreen navigateTo={navigateTo} userData={selectedItem} />;
      case 'forgot-password':
        return <ForgotPasswordScreen navigateTo={navigateTo} />;
      case 'verify-email':
        return <VerifyEmailScreen navigateTo={navigateTo} userData={selectedItem} />;
      case 'home':
        return <HomeScreen navigateTo={navigateTo} notificationCount={notificationCount} customTags={customTags} onAddCustomTag={addCustomTag} onRemoveCustomTag={removeCustomTag} />;
      case 'trade':
        return <TradeScreen navigateTo={navigateTo} customTags={customTags} onAddCustomTag={addCustomTag} onRemoveCustomTag={removeCustomTag} />;
      case 'circles-home':
        return <CirclesHomeScreen navigateTo={navigateTo} userCircles={userCircles} />;
      case 'circle-feed':
        return <CircleFeedScreen navigateTo={navigateTo} circle={selectedItem} customTags={customTags} onAddCustomTag={addCustomTag} onRemoveCustomTag={removeCustomTag} />;
      case 'circle-about':
        return <CircleAboutScreen navigateTo={navigateTo} circle={selectedItem} />;
      case 'create-circle':
        return <CreateCircleScreen navigateTo={navigateTo} onCreate={handleCircleCreate} />;
      case 'user-profile':
        return <UserProfileView navigateTo={navigateTo} user={selectedItem} />;
      case 'create':
        return <CreateListingScreen navigateTo={navigateTo} onPublish={handleListingPublish} prefilledCircle={selectedItem?.prefilledCircle} customTags={customTags} onAddCustomTag={addCustomTag} />;
      case 'profile':
        return <ProfileScreen navigateTo={navigateTo} myListings={myListings} />;
      case 'settings':
        return <SettingsScreen navigateTo={navigateTo} />;
      case 'notifications':
        return <NotificationsScreen navigateTo={navigateTo} notifications={notifications} onNotificationClick={handleNotificationClick} />;
      case 'item-detail':
        return <ItemDetailScreen item={selectedItem} navigateTo={navigateTo} />;
      case 'meeting':
        return <MeetingScreen item={selectedItem} navigateTo={navigateTo} onSelectSpot={setMeetingSpot} />;
      case 'barter-offer':
        return <BarterOfferScreen item={selectedItem} navigateTo={navigateTo} />;
      case 'counter-offer':
        return <CounterOfferScreen 
          item={selectedItem} 
          counterOffer={{
            title: 'Vintage Leather Jacket',
            description: 'Size L, excellent condition',
            image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
            credits: 5
          }}
          navigateTo={navigateTo}
          onConfirm={handleBarterConfirm}
        />;
      case 'confirmation':
        return <ConfirmationScreen item={selectedItem} meetingSpot={selectedMeetingSpot} navigateTo={navigateTo} />;
      case 'full-listing-view':
        return <FullListingView listing={selectedItem} navigateTo={navigateTo} currentUser={currentUser} />;
      case 'my-listings':
        return <MyListingsScreen navigateTo={navigateTo} myListings={myListings} />;
      case 'style-guide':
        return <StyleGuide navigateTo={navigateTo} />;
      case 'privacy-settings':
        return <PrivacySettingsScreen navigateTo={navigateTo} />;
      case 'blocked-users':
        return <BlockedUsersScreen navigateTo={navigateTo} />;
      case 'safety-tips':
        return <SafetyTipsScreen navigateTo={navigateTo} />;
      case 'edit-profile':
        return <EditProfileScreen navigateTo={navigateTo} />;
      case 'change-password':
        return <ChangePasswordScreen navigateTo={navigateTo} />;
      case 'language-settings':
        return <LanguageSettingsScreen navigateTo={navigateTo} />;
      case 'help-center':
        return <HelpCenterScreen navigateTo={navigateTo} />;
      case 'send-feedback':
        return <SendFeedbackScreen navigateTo={navigateTo} />;
      case 'component-library':
        return <ComponentLibrary navigateTo={navigateTo} />;
      default:
        return <HomeScreen navigateTo={navigateTo} notificationCount={notificationCount} />;
    }
  };

  const mainScreens = ['home', 'circles-home', 'profile', 'settings'];
  const showBottomNav = mainScreens.includes(currentScreen);
  const { darkMode } = useDarkMode();

  return (
    <div className={`relative w-full min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'}`}>
      {/* Main Content */}
      <div className={showBottomNav ? 'pb-24' : ''}>
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <BottomNav activeScreen={currentScreen} navigateTo={navigateTo} />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() => setConfirmationModal({ ...confirmationModal, isOpen: false })}
        icon={confirmationModal.icon}
        title={confirmationModal.title}
        message={confirmationModal.message}
      />

      {/* Listing Detail Modal */}
      <ListingDetailModal
        isOpen={listingModal.isOpen}
        onClose={() => setListingModal({ isOpen: false, listing: null })}
        listing={listingModal.listing}
        onViewListing={() => {
          setListingModal({ isOpen: false, listing: null });
          setSelectedItem(listingModal.listing);
          setCurrentScreen('full-listing-view');
        }}
      />

      {/* Toast Notifications */}
      <Toaster position="top-center" />
    </div>
  );
}

function AppWrapper() {
  return (
    <DarkModeProvider>
        <CreditProvider>
            <AppContent />
        </CreditProvider>
    </DarkModeProvider>
  );
}

export default AppWrapper;