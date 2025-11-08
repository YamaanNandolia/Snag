import { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Building2, Coffee, BookOpen, Dumbbell, Utensils, CheckCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';

const meetingSpots = [
  { id: 1, name: 'Main Library Lobby', distance: '0.2 mi', hours: '24/7', popular: true, icon: BookOpen },
  { id: 2, name: 'Student Union Entrance', distance: '0.3 mi', hours: '6am - 11pm', popular: true, icon: Building2 },
  { id: 3, name: 'Campus Coffee Shop', distance: '0.4 mi', hours: '7am - 9pm', popular: false, icon: Coffee },
  { id: 4, name: 'Recreation Center Lobby', distance: '0.5 mi', hours: '5am - 11pm', popular: false, icon: Dumbbell },
  { id: 5, name: 'Dining Hall Commons', distance: '0.6 mi', hours: '7am - 10pm', popular: true, icon: Utensils }
];

export default function MeetingScreen({ item, navigateTo, onSelectSpot }: any) {
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [selectedRecommendedTime, setSelectedRecommendedTime] = useState<string | null>(null);
  const [useProposedTime, setUseProposedTime] = useState(false);

  const recommendedTimes = [
    { id: 'lunch', label: '12:00 PM – 2:00 PM', value: '12:00 PM' },
    { id: 'afternoon', label: '3:00 PM – 5:00 PM', value: '3:00 PM' },
    { id: 'evening', label: '5:00 PM – 7:00 PM', value: '5:00 PM' }
  ];

  if (!item) return null;

  const handleSelectSpot = (spotId: number, spotName: string) => {
    setSelectedSpot(spotId);
    if (onSelectSpot) onSelectSpot(spotName);
  };

  const handleSelectRecommendedTime = (timeSlot: any) => {
    setSelectedRecommendedTime(timeSlot.id);
    setUseProposedTime(false);
    // Auto-set tomorrow as date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    const year = tomorrow.getFullYear();
    setMeetingDate(`${month}/${day}/${year}`);
    setMeetingTime(timeSlot.value);
  };

  const handleProposeTimeInput = () => {
    if (!useProposedTime) {
      setUseProposedTime(true);
      setSelectedRecommendedTime(null);
    }
  };

  const handleConfirm = () => {
    if (selectedSpot) {
      navigateTo('confirmation', item);
    }
  };

  const recommendedSpots = meetingSpots.filter(spot => spot.popular);
  const moreSpots = meetingSpots.filter(spot => !spot.popular);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-2xl bg-white/70 border-b border-white/40">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigateTo('item-detail', item)}
            className="p-2 rounded-full hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#222]" />
          </button>
          <h2 className="text-[#9333ea] font-semibold text-xl">Choose Meeting Spot</h2>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 pb-32 space-y-4">
        {/* Info Card */}
        <div className="backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-3xl p-6 border border-purple-300/40">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-[#222] font-semibold mb-1">Select a Safe Meeting Location</h3>
              <p className="text-[#555] text-sm">
                Choose a public campus location for your transaction
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Locations */}
        <div>
          <h3 className="text-[#222] font-semibold px-2 mb-3">Recommended</h3>
          <div className="space-y-2">
            {recommendedSpots.map((spot) => (
              <MeetingSpotRow
                key={spot.id}
                spot={spot}
                isSelected={selectedSpot === spot.id}
                onSelect={() => handleSelectSpot(spot.id, spot.name)}
              />
            ))}
          </div>
        </div>

        {/* More Campus Spots */}
        <div>
          <h3 className="text-[#222] font-semibold px-2 mb-3">More campus spots</h3>
          <div className="space-y-2">
            {moreSpots.map((spot) => (
              <MeetingSpotRow
                key={spot.id}
                spot={spot}
                isSelected={selectedSpot === spot.id}
                onSelect={() => handleSelectSpot(spot.id, spot.name)}
              />
            ))}
          </div>
        </div>

        {/* Recommended Times */}
        <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-4 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-purple-600" />
            <h3 className="text-[#222] font-semibold">Recommended Times</h3>
          </div>
          <div className="space-y-2">
            {recommendedTimes.map((timeSlot) => (
              <button
                key={timeSlot.id}
                onClick={() => handleSelectRecommendedTime(timeSlot)}
                className={`w-full backdrop-blur-xl rounded-xl p-3 border transition-all text-left ${
                  selectedRecommendedTime === timeSlot.id
                    ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-400/60'
                    : 'bg-white/60 border-white/60 hover:bg-white/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#222] font-medium">{timeSlot.label}</span>
                  {selectedRecommendedTime === timeSlot.id && (
                    <CheckCircle className="w-5 h-5 text-purple-600" strokeWidth={2.5} />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Propose a Time */}
        <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-4 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-purple-600" />
            <h3 className="text-[#222] font-semibold">Propose a time</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="date" className="text-[#555] text-xs mb-2 block">Date</Label>
              <Input
                id="date"
                type="date"
                value={meetingDate}
                onChange={(e) => {
                  setMeetingDate(e.target.value);
                  setSelectedRecommendedTime(null); // Clear recommended when manually editing
                }}
                className="backdrop-blur-xl bg-white/80 border-white/60 text-[#222]"
              />
            </div>
            <div>
              <Label htmlFor="time" className="text-[#555] text-xs mb-2 block">Start time</Label>
              <Input
                id="time"
                type="time"
                value={meetingTime}
                onChange={(e) => {
                  setMeetingTime(e.target.value);
                  setSelectedRecommendedTime(null); // Clear recommended when manually editing
                }}
                className="backdrop-blur-xl bg-white/80 border-white/60 text-[#222]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-2xl bg-white/70 border-t border-white/40 p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleConfirm}
            disabled={!selectedSpot}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Confirm Meeting
          </button>
        </div>
      </div>
    </div>
  );
}

interface MeetingSpotRowProps {
  spot: any;
  isSelected: boolean;
  onSelect: () => void;
}

function MeetingSpotRow({ spot, isSelected, onSelect }: MeetingSpotRowProps) {
  const IconComponent = spot.icon;

  return (
    <button
      onClick={onSelect}
      className={`w-full backdrop-blur-2xl rounded-2xl p-4 border transition-all active:scale-[0.98] text-left ${
        isSelected
          ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-400/60 shadow-md'
          : 'bg-white/70 border-white/60 shadow-sm hover:shadow-[0_8px_24px_rgba(139,92,246,0.15)]'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            isSelected
              ? 'bg-gradient-to-br from-purple-500 to-purple-600'
              : 'bg-gradient-to-br from-purple-100 to-purple-200'
          }`}>
            <IconComponent className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-purple-600'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#222] font-medium">{spot.name}</span>
              {spot.popular && !isSelected && (
                <span className="backdrop-blur-xl bg-purple-500/20 text-purple-700 rounded-full px-2 py-0.5 text-xs font-medium">
                  Popular
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-[#555] text-sm font-light">
              <span>{spot.distance}</span>
              <span>·</span>
              <span>{spot.hours}</span>
            </div>
          </div>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          isSelected
            ? 'border-purple-600 bg-purple-600'
            : 'border-purple-300'
        }`}>
          {isSelected && <CheckCircle className="w-4 h-4 text-white" strokeWidth={2.5} />}
        </div>
      </div>
    </button>
  );
}