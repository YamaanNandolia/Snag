import { useState } from 'react';
import { ArrowLeft, Plus, X, Image as ImageIcon, Shield, MapPin, Clock, Eye } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { useDarkMode } from '../contexts/DarkModeContext';

const TAGS = ['Textbook', 'Furniture', 'Apparel', 'Electronics', 'Sports', 'Dorm', 'Vintage', 'Audio'];
const MEETING_SPOTS = [
  { id: 1, name: 'Main Library Lobby', hours: '24/7', verified: true },
  { id: 2, name: 'Student Union Entrance', hours: '6am - 11pm', verified: true },
  { id: 3, name: 'Campus Coffee Shop', hours: '7am - 9pm', verified: true },
  { id: 4, name: 'Recreation Center Lobby', hours: '5am - 11pm', verified: true },
  { id: 5, name: 'Dining Hall Commons', hours: '7am - 10pm', verified: true }
];
import {addDoc, collection, doc, getDoc, serverTimestamp, updateDoc, arrayUnion, increment} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import {sendNotification} from "../utils/sendNotifications"; // if you need current user

interface Photo {
  id: number;
  url: string;
}

export default function CreateListingScreen({ navigateTo, onPublish, prefilledCircle, customTags = [], onAddCustomTag }: any) {
  const { darkMode } = useDarkMode();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState('');
  const [suggestedCredits, setSuggestedCredits] = useState(15);
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const [selectedRecommendedTime, setSelectedRecommendedTime] = useState<string | null>(null);
  const [customTime, setCustomTime] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [timeError, setTimeError] = useState('');
  const [dateError, setDateError] = useState('');
  const [selectedCircle, setSelectedCircle] = useState<any>(prefilledCircle || null);

  // Add error states for all fields
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [tagsError, setTagsError] = useState('');
  const [meetingSpotError, setMeetingSpotError] = useState('');
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const allTags = [...TAGS, ...customTags];

  const recommendedTimes = [
    { id: 'lunch', label: '12:00 PM – 2:00 PM' },
    { id: 'afternoon', label: '3:00 PM – 5:00 PM' },
    { id: 'evening', label: '5:00 PM – 7:00 PM' }
  ];

  const handleAddPhoto = () => {
    const newPhoto = {
      id: Date.now(),
      url: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=400&h=400&fit=crop`
    };
    setPhotos([...photos, newPhoto]);
  };

  const handleRemovePhoto = (id: number) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
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

    const handlePublish = async () => {
        setAttemptedSubmit(true);

        // 🔹 Frontend validation (keep your existing validation logic)
        if (photos.length === 0) {
            toast.error('Please add at least one photo');
            return;
        }
        if (!title || title.length < 3) {
            setTitleError('Title must be at least 3 characters');
            return;
        }
        if (!description || description.length < 10) {
            setDescriptionError('Description must be at least 10 characters');
            return;
        }
        if (!condition) {
            toast.error('Please select item condition');
            return;
        }
        if (!selectedSpot) {
            setMeetingSpotError('Please select a pickup spot');
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

        try {
            const user = auth.currentUser;
            if (!user) {
                toast.error("You must be logged in to create a listing.");
                return;
            }

            //Fetch seller data from Firestore
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);


            let userData = { trustScore: 0, trades: 0 }; // defaults if no data yet
            if (userSnap.exists()) {
                const data = userSnap.data();
                userData = {
                    trustScore: data.trustScore ?? 0,
                    trades: data.trades ?? 0,
                };
            }

            const listingData = {
                title,
                description,
                condition,
                tags: selectedTags,
                credits: suggestedCredits,
                images: photos.map(p => p.url),
                meetingSpot: MEETING_SPOTS.find(s => s.id === selectedSpot)?.name,
                meetingTime: selectedRecommendedTime
                    ? recommendedTimes.find(t => t.id === selectedRecommendedTime)?.label
                    : `${customTime}, ${customDate}`,
                seller: {
                    id: user.uid,
                    name: user.displayName || user.email || "Anonymous",
                    rating: userData.trustScore,
                    trades: userData.trades,
                },
                createdAt: serverTimestamp(),
                isBarter: false,
                status: true,
                pendingConfirmation: false,
                proposedSpot: "",
                proposedTime: "",
                time: "Just now",
            };

            const docRef = await addDoc(collection(db, "listings"), listingData);
            await updateDoc(docRef, { id: docRef.id }); // ✅ store ID in document
            const userListingsRef = doc(db, "users", user.uid);
            await updateDoc(userListingsRef, {
                myListings: arrayUnion(docRef.id),
            });
            // ⭐ Add 10 credits to the user
            await updateDoc(userListingsRef, {
                credits: increment(10),
            });
            console.log("✅ Created listing with ID:", docRef.id);
            await sendNotification({
                userId: user.uid,
                title: "Your listing is live!",
                message: `You posted "${title}" successfully.`,
                type: "listing",
            });
            onPublish({ ...listingData, id: docRef.id });
            toast.success("🎉 Listing published successfully!");
            navigateTo("home");
        } catch (err) {
            console.error("🔥 Error publishing listing:", err);
            toast.error("Failed to publish listing.");
        }
    };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 backdrop-blur-xl ${darkMode ? 'bg-black/70 border-white/10' : 'bg-white/10 border-white/30'} border-b`}>
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateTo('home')}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-white/10' : 'hover:bg-white/50'} transition-colors`}
              >
                <ArrowLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#222]'}`} />
              </button>
              <h2 className={`font-semibold text-xl ${darkMode ? 'text-purple-400' : 'text-[#9333ea]'}`}>Create Listing</h2>
            </div>
            <button
              onClick={handlePublish}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium hover:shadow-lg transition-all"
            >
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Single Scroll Form */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6 pb-32">
          {/* Section A: Photos */}
          <div
              className={`backdrop-blur-xl ${
                  darkMode ? "bg-white/10 border-white/20" : "bg-white/60 border-white/60"
              } rounded-3xl border p-4`}
          >
              <h3
                  className={`font-semibold mb-3 flex items-center gap-2 ${
                      darkMode ? "text-white" : "text-[#222]"
                  }`}
              >
                  <ImageIcon className="w-5 h-5 text-purple-600" />
                  Photos
              </h3>

              {/* Photo grid */}
              <div className="grid grid-cols-3 gap-3 mb-3">
                  {photos.map((photo) => (
                      <div key={photo.id} className="relative aspect-square">
                          <img
                              src={photo.url}
                              alt="Product"
                              className="w-full h-full object-cover rounded-xl"
                          />
                          <button
                              onClick={() => handleRemovePhoto(photo.id)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                          >
                              <X className="w-4 h-4 text-white" />
                          </button>
                      </div>
                  ))}
                  {photos.length < 6 && (
                      <button
                          onClick={handleAddPhoto}
                          className="aspect-square border-2 border-dashed border-purple-300 rounded-xl flex flex-col items-center justify-center gap-1 hover:border-purple-500 hover:bg-purple-50/50 transition-colors"
                      >
                          <Plus className="w-6 h-6 text-purple-600" />
                          <span className="text-xs text-purple-600">Random</span>
                      </button>
                  )}
              </div>

              {/* New: URL input for manual image */}
              {photos.length < 6 && (
                  <div className="flex items-center gap-2">
                      <Input
                          type="text"
                          placeholder="Enter image URL (e.g. https://...)"
                          id="imageUrlInput"
                          className="flex-1"
                      />
                      <button
                          onClick={() => {
                              const input = document.getElementById(
                                  "imageUrlInput"
                              ) as HTMLInputElement;
                              const url = input.value.trim();
                              if (!url) {
                                  toast.error("Please enter a valid image URL");
                                  return;
                              }
                              setPhotos((prev) => [
                                  ...prev,
                                  { id: Date.now(), url },
                              ]);
                              input.value = "";
                              toast.success("✅ Image added from URL");
                          }}
                          className="px-3 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                      >
                          Add
                      </button>
                  </div>
              )}
          </div>

        {/* Section B: Details */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/60'} rounded-3xl border p-4 space-y-4`}>
          <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#222]'}`}>Item Details</h3>
          
          <div>
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Calculus Textbook"
              className="mt-1"
            />
            {attemptedSubmit && titleError && (
              <p className="text-xs text-red-600 mt-1">{titleError}</p>
            )}
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your item..."
              rows={3}
              className="mt-1"
            />
            {attemptedSubmit && descriptionError && (
              <p className="text-xs text-red-600 mt-1">{descriptionError}</p>
            )}
          </div>

          <div>
            <Label>Condition</Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select item condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="like-new">Like New</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="used">Used</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/80 text-[#555] border border-white/60'
                  }`}
                >
                  {tag}
                </button>
              ))}
              {onAddCustomTag && (
                <div className="flex items-center gap-2">
                  <Input
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    placeholder="Add new tag"
                    className="w-24"
                  />
                  <button
                    onClick={() => {
                      if (newTagInput && !allTags.includes(newTagInput)) {
                        onAddCustomTag(newTagInput);
                        setNewTagInput('');
                      }
                    }}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-purple-600 text-white"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
            {attemptedSubmit && tagsError && (
              <p className="text-xs text-red-600 mt-1">{tagsError}</p>
            )}
          </div>

          <div>
            <Label>Auto-Suggested Price</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input
                type="number"
                value={suggestedCredits}
                onChange={(e) => setSuggestedCredits(Number(e.target.value))}
                className="w-24"
              />
              <span className="text-sm text-[#666]">credits</span>
            </div>
          </div>
        </div>

        {/* Section B2: Post to Circle (Optional) */}
        {selectedCircle && (
          <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/60'} rounded-3xl border p-4`}>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#222]'}`}>Post to Circle</h3>
            <div className={`${darkMode ? 'bg-purple-500/20 border-purple-500/40' : 'bg-purple-100/60 border-purple-200/60'} rounded-2xl border p-3`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#222]'}`}>{selectedCircle.name}</h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-[#555]'}`}>{selectedCircle.description}</p>
                </div>
                <button
                  onClick={() => setSelectedCircle(null)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section C: Meeting Spot */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/60'} rounded-3xl border p-4`}>
          <h3 className={`font-semibold mb-2 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#222]'}`}>
            <MapPin className="w-5 h-5 text-purple-600" />
            Pickup Spot
          </h3>
          <div className="backdrop-blur-xl bg-purple-50/50 border border-purple-200/50 rounded-xl p-3 mb-3 flex items-start gap-2">
            <Shield className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <p className="text-purple-700 text-xs">Meet in campus-verified locations for your safety</p>
          </div>
          <div className="space-y-2">
            {MEETING_SPOTS.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setSelectedSpot(spot.id)}
                className={`w-full p-3 rounded-xl border transition-colors text-left ${
                  selectedSpot === spot.id
                    ? 'bg-purple-100/50 border-purple-300'
                    : 'bg-white/80 border-white/60 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[#222]">{spot.name}</span>
                  {spot.verified && (
                    <span className="text-[10px] bg-green-500/20 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      Snag Verified Zone
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#666]">{spot.hours}</span>
              </button>
            ))}
          </div>
          {attemptedSubmit && meetingSpotError && (
            <p className="text-xs text-red-600 mt-1">{meetingSpotError}</p>
          )}
        </div>

        {/* Section D: Time */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/60'} rounded-3xl border p-4`}>
          <h3 className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#222]'}`}>
            <Clock className="w-5 h-5 text-purple-600" />
            Preferred Pickup Time
          </h3>
          
          {/* Recommended Slots */}
          <div className="mb-4">
            <Label className="text-xs text-[#666]">Recommended Slots</Label>
            <div className="space-y-2 mt-2">
              {recommendedTimes.map((time) => (
                <button
                  key={time.id}
                  onClick={() => handleSelectRecommendedTime(time.id)}
                  className={`w-full p-3 rounded-xl border transition-colors text-left ${
                    selectedRecommendedTime === time.id
                      ? 'bg-purple-100/50 border-purple-300'
                      : 'bg-white/80 border-white/60 hover:bg-white'
                  }`}
                >
                  <span className="text-sm font-medium text-[#222]">{time.label}</span>
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
                Proposed Time {selectedRecommendedTime && '(Disabled - slot selected)'}
              </Label>
              <Input
                value={customTime}
                onChange={(e) => handleCustomTimeChange(e.target.value)}
                placeholder="HH:MM AM/PM (e.g., 2:30 PM)"
                disabled={!!selectedRecommendedTime}
                className={`mt-1 ${selectedRecommendedTime ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              {timeError && (
                <p className="text-xs text-red-600 mt-1">{timeError}</p>
              )}
            </div>

            <div>
              <Label className="text-xs text-[#666]">
                Proposed Date {selectedRecommendedTime && '(Disabled - slot selected)'}
              </Label>
              <Input
                value={customDate}
                onChange={(e) => handleCustomDateChange(e.target.value)}
                placeholder="MM/DD/YYYY (e.g., 12/25/2024)"
                disabled={!!selectedRecommendedTime}
                className={`mt-1 ${selectedRecommendedTime ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              {dateError && (
                <p className="text-xs text-red-600 mt-1">{dateError}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section E: Preview */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/60'} rounded-3xl border p-4`}>
          <h3 className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#222]'}`}>
            <Eye className="w-5 h-5 text-purple-600" />
            Preview
          </h3>
          <div className={`${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/80 border-white/60'} rounded-2xl border overflow-hidden`}>
            {photos.length > 0 && (
              <img src={photos[0].url} alt="Preview" className="w-full h-40 object-cover" />
            )}
            <div className="p-3">
              <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#222]'}`}>{title || 'Your Title'}</h4>
              <p className={`text-sm mb-2 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-[#555]'}`}>{description || 'Your description...'}</p>
              <div className={`flex items-center gap-2 text-xs ${darkMode ? 'text-gray-400' : 'text-[#666]'}`}>
                <span>{suggestedCredits} credits</span>
                <span>•</span>
                <span>{condition || 'Condition'}</span>
              </div>
            </div>
          </div>
        </div>
          {/* Bottom Publish Button */}
          <div className="pt-4 pb-16">
              <button
                  onClick={handlePublish}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium hover:shadow-lg transition-all"
              >
                  Publish
              </button>
          </div>
      </div>
    </div>
  );
}