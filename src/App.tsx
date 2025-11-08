import { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import EventsScreen from './components/EventsScreen';
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
import { CheckCircle, Package, ArrowLeftRight, Calendar } from 'lucide-react';
import { Toaster } from './components/ui/sonner';

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  listingData?: any;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('splash');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedMeetingSpot, setSelectedMeetingSpot] = useState<string>('');
  const [showSplash, setShowSplash] = useState(true);
  const [latestListing, setLatestListing] = useState<any>(null);
  const [myListings, setMyListings] = useState<any[]>([]); 
  const [currentUser, setCurrentUser] = useState({ id: 'user_1', name: 'Ryan Mehta' });
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


  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        setCurrentScreen('home');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);


  useEffect(() => {

    if (!showSplash) {
      console.log('앱 시작: 서버에서 물품 리스트를 가져옵니다...');
      fetch('/api/listings') 
        .then(res => res.json())
        .then((data: any[]) => {
          console.log('서버에서 물품 리스트 가져오기 성공:', data);
          setMyListings(data); 
        })
        .catch(err => {
          console.error('서버에서 물품 리스트를 가져오는 데 실패했습니다:', err);
        });
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
    // (기존 코드 - 변경 없음)
    if (notification.type === 'listing' && notification.listingData) {
      setListingModal({
        isOpen: true,
        listing: notification.listingData
      });
    }
  };


  const handleListingPublish = async (formData: FormData) => {
    

    const newId = Date.now();
    formData.append('id', String(newId)); 
    formData.append('sellerId', currentUser.id);
    formData.append('sellerName', currentUser.name);
    formData.append('sellerVerified', String(currentUser.verified)); 
    formData.append('status', 'active');
    formData.append('views', '0');
    formData.append('postedTime', 'Just now');
    

    try {
      console.log('Sending FormData to server...');

      const response = await fetch('/api/listings', {
        method: 'POST',
        body: formData, 
      });

      if (!response.ok) {
        throw new Error('Fail to save server.');
      }
      
      const createdListing = await response.json();
      console.log('Save successed on server:', createdListing.title);

      setMyListings(prev => [createdListing, ...prev]);
      setLatestListing(createdListing);
      
      addNotification('listing', 'Listing published', 'Your item is now visible to all campus students', createdListing);
      
      showConfirmation(
        <Package className="w-8 h-8 text-white" />,
        'Listing Published!',
        'Your item is now visible to all students'
      );

    } catch (error) {
      console.error('Error in Posting new:', error);
    }
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

  const handleProfileUpdate = (newProfileData: { name: string }) => {

  setCurrentUser(prevUser => ({
    ...prevUser,
    name: newProfileData.name, 
  }));

  console.log('사용자 이름이 변경되었습니다:', newProfileData.name);
  navigateTo('settings');
};

  const navigateTo = (screen: string, data?: any) => {

    if (screen === 'confirmation') {
      addNotification('meeting', 'Meeting confirmed', `Your meeting at ${selectedMeetingSpot || 'Main Library Lobby'} has been scheduled`);
      showConfirmation(
        <Calendar className="w-8 h-8 text-white" />,
        'Meeting Confirmed!',
        `Your meetup is scheduled at ${selectedMeetingSpot || 'Main Library Lobby'}`
      );
    }

    if (screen === 'notifications') {
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
      case 'home':
        return <HomeScreen navigateTo={navigateTo} notificationCount={notificationCount} listings={myListings} />;
      case 'events':
        return <EventsScreen navigateTo={navigateTo} />;
      case 'create':
        return <CreateListingScreen navigateTo={navigateTo} onPublish={handleListingPublish} />;
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
        return <EditProfileScreen 
          navigateTo={navigateTo} 
          currentUser={currentUser} // ⬅️ 현재 사용자 정보 전달
          onProfileUpdate={handleProfileUpdate} // ⬅️ 프로필 업데이트 함수 전달
        />;
      case 'change-password':
        return <ChangePasswordScreen navigateTo={navigateTo} />;
      case 'language-settings':
        return <LanguageSettingsScreen navigateTo={navigateTo} />;
      case 'help-center':
        return <HelpCenterScreen navigateTo={navigateTo} />;
      case 'send-feedback':
        return <SendFeedbackScreen navigateTo={navigateTo} />;
      default:
        return <HomeScreen navigateTo={navigateTo} notificationCount={notificationCount} />;
    }
  };

  const mainScreens = ['home', 'events', 'profile', 'settings'];
  const showBottomNav = mainScreens.includes(currentScreen);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100">
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