import { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Shield, CheckCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { useDarkMode } from '../contexts/DarkModeContext';

const meetingSpots = [
  { id: 1, name: 'Main Library Lobby', distance: '0.2 mi', hours: '24/7', verified: true },
  { id: 2, name: 'Student Union Entrance', distance: '0.3 mi', hours: '6am - 11pm', verified: true },
  { id: 3, name: 'Campus Coffee Shop', distance: '0.4 mi', hours: '7am - 9pm', verified: true },
  { id: 4, name: 'Recreation Center Lobby', distance: '0.5 mi', hours: '5am - 11pm', verified: true },
  { id: 5, name: 'Dining Hall Commons', distance: '0.6 mi', hours: '7am - 10pm', verified: true }
];

export default function MeetingScreen({ item, navigateTo, onSelectSpot }: any) {
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const [selectedRecommendedTime, setSelectedRecommendedTime] = useState<string | null>(null);
  const [customTime, setCustomTime] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [timeError, setTimeError] = useState('');
  const [dateError, setDateError] = useState('');

  const recommendedTimes = [
    { id: 'lunch', label: '12:00 PM – 2:00 PM' },
    { id: 'afternoon', label: '3:00 PM – 5:00 PM' },
    { id: 'evening', label: '5:00 PM – 7:00 PM' }
  ];

  if (!item) return null;

  const handleSelectSpot = (spotId: number) => {
    const spot = meetingSpots.find(s => s.id === spotId);
    setSelectedSpot(spotId);
    if (onSelectSpot && spot) onSelectSpot(spot.name);
  };

  const handleSelectRecommendedTime = (timeId: string) => {
    setSelectedRecommendedTime(timeId);
    setCustomTime('');
    setCustomDate('');
    setTimeError('');
    setDateError('');
  };

  const handleCustomTimeChange = (value: string) => {
    if (value) {
      setSelectedRecommendedTime(null);
    }
    
    // Auto-format: HH:MM AM/PM
    let formatted = value.replace(/[^\d:APMapm\s]/g, '');
    if (formatted.length === 2 && !formatted.includes(':')) {
      formatted += ':';
    }
    setCustomTime(formatted);

    // Validate time format
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM|am|pm)$/;
    if (formatted && !timeRegex.test(formatted)) {
      setTimeError('Format: HH:MM AM/PM (e.g., 2:30 PM)');
    } else {
      setTimeError('');
    }
  };

  const handleCustomDateChange = (value: string) => {
    if (value) {
      setSelectedRecommendedTime(null);
    }

    // Auto-format: MM/DD/YYYY
    let formatted = value.replace(/[^\d/]/g, '');
    if (formatted.length === 2 && !formatted.includes('/')) {
      formatted += '/';
    } else if (formatted.length === 5 && formatted.split('/').length === 2) {
      formatted += '/';
    }
    
    // Limit year to 4 digits
    const parts = formatted.split('/');
    if (parts[2] && parts[2].length > 4) {
      setDateError('Year must be 4 digits');
      return;
    }
    
    setCustomDate(formatted);

    // Validate date format and check if past
    const dateRegex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (formatted && dateRegex.test(formatted)) {
      const [month, day, year] = formatted.split('/').map(Number);
      const selectedDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        setDateError('Cannot select past dates');
      } else {
        setDateError('');
      }
    } else if (formatted.length >= 8) {
      setDateError('Format: MM/DD/YYYY (e.g., 12/25/2024)');
    } else {
      setDateError('');
    }
  };

  const handleConfirm = () => {
    if (!selectedSpot) {
      toast.error('Please select a meeting spot');
      return;
    }
    if (!selectedRecommendedTime && (!customTime || !customDate)) {
      toast.error('Please select a time or enter custom time/date');
      return;
    }
    if (timeError || dateError) {
      toast.error('Please fix time/date errors');
      return;
    }

    navigateTo('confirmation', item);
  };

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
          <h2 className="text-[#9333ea] font-semibold text-xl">Schedule Meeting</h2>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 pb-32 space-y-6">
        {/* Safety Prompt */}
        <div className="backdrop-blur-xl bg-purple-50/50 border border-purple-200/50 rounded-2xl p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-purple-900 font-medium mb-1">Meet in campus-verified locations</h3>
            <p className="text-purple-700 text-sm">
              For your safety, only verified campus locations are available for meetups.
            </p>
          </div>
        </div>

        {/* Unified Scheduler Module */}
        {/* Meeting Spots */}
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/60 p-4">
          <h3 className="text-[#222] font-semibold mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-600" />
            Meeting Location
          </h3>
          <div className="space-y-2">
            {meetingSpots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => handleSelectSpot(spot.id)}
                className={`w-full p-3 rounded-xl border transition-all text-left ${
                  selectedSpot === spot.id
                    ? 'bg-purple-100/50 border-purple-300 shadow-md'
                    : 'bg-white/80 border-white/60 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-[#222]">{spot.name}</span>
                  </div>
                  {spot.verified && (
                    <span className="text-[10px] bg-green-500/20 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      Snag Verified Zone
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-6">
                  <span className="text-xs text-[#666]">{spot.distance}</span>
                  <span className="text-xs text-[#999]">•</span>
                  <span className="text-xs text-[#666]">{spot.hours}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/60 p-4">
          <h3 className="text-[#222] font-semibold mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            Meeting Time
          </h3>

          {/* Recommended Slots */}
          <div className="mb-4">
            <Label className="text-xs text-[#666]">Recommended Time Slots</Label>
            <div className="space-y-2 mt-2">
              {recommendedTimes.map((time) => (
                <button
                  key={time.id}
                  onClick={() => handleSelectRecommendedTime(time.id)}
                  className={`w-full p-3 rounded-xl border transition-all text-left ${
                    selectedRecommendedTime === time.id
                      ? 'bg-purple-100/50 border-purple-300 shadow-md'
                      : 'bg-white/80 border-white/60 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#222]">{time.label}</span>
                    {selectedRecommendedTime === time.id && (
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* OR Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-white/60" />
            <span className="text-xs text-[#666] font-medium">OR</span>
            <div className="flex-1 h-px bg-white/60" />
          </div>

          {/* Custom Time Inputs */}
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-[#666]">
                Custom Time {selectedRecommendedTime && '(Disabled - slot selected)'}
              </Label>
              <Input
                value={customTime}
                onChange={(e) => handleCustomTimeChange(e.target.value)}
                placeholder="HH:MM AM/PM (e.g., 2:30 PM)"
                disabled={!!selectedRecommendedTime}
                className={`mt-1 ${selectedRecommendedTime ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              {timeError && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <span>⚠️</span>
                  {timeError}
                </p>
              )}
            </div>

            <div>
              <Label className="text-xs text-[#666]">
                Custom Date {selectedRecommendedTime && '(Disabled - slot selected)'}
              </Label>
              <Input
                value={customDate}
                onChange={(e) => handleCustomDateChange(e.target.value)}
                placeholder="MM/DD/YYYY (e.g., 12/25/2024)"
                disabled={!!selectedRecommendedTime}
                className={`mt-1 ${selectedRecommendedTime ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              {dateError && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <span>⚠️</span>
                  {dateError}
                </p>
              )}
              {!dateError && customDate && (
                <p className="text-xs text-green-600 mt-1">✓ Date valid</p>
              )}
            </div>
          </div>

          {/* Overlapping Availability (Placeholder) */}
          {(selectedRecommendedTime || (customTime && customDate && !timeError && !dateError)) && (
            <div className="mt-4 p-3 bg-green-50/50 border border-green-200/50 rounded-xl">
              <p className="text-xs text-green-700 font-medium mb-1">✓ Availability Match</p>
              <p className="text-xs text-green-600">
                This time works for both parties based on their schedules
              </p>
            </div>
          )}
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={!selectedSpot || (!selectedRecommendedTime && (!customTime || !customDate)) || !!timeError || !!dateError}
          className="w-full py-4 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
        >
          Confirm Meeting
        </button>
      </div>
    </div>
  );
}
