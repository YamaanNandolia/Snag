import { useState, useRef } from 'react';
import { ArrowLeft, Plus, X, GripVertical, Image as ImageIcon, CheckCircle, Shield, Clock, ArrowLeftRight } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Badge } from './ui/badge';

const TAGS = ['Textbooks', 'Furniture', 'Apparel', 'Dorm', 'Lab/Tech', 'Electronics', 'Kitchen', 'Seasonal'];
const MEETING_SPOTS = [
  { id: 1, name: 'Main Library Lobby', hours: '24/7', popular: true },
  { id: 2, name: 'Student Union Entrance', hours: '6am - 11pm', popular: true },
  { id: 3, name: 'Campus Coffee Shop', hours: '7am - 9pm', popular: false },
  { id: 4, name: 'Recreation Center Lobby', hours: '5am - 11pm', popular: false },
  { id: 5, name: 'Dining Hall Commons', hours: '7am - 10pm', popular: true }
];

interface PhotoPreview {
  id: number;
  file: File;
  url: string;
}

export default function CreateListingScreen({ navigateTo, onPublish }: any) {
  const [currentStep, setCurrentStep] = useState(1);
  
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [listingType, setListingType] = useState('credits');
  const [credits, setCredits] = useState(0);


  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [selectedRecommendedTime, setSelectedRecommendedTime] = useState<string | null>(null);
  const [useProposedTime, setUseProposedTime] = useState(false);

  const recommendedTimes = [
    { id: 'lunch', label: '12:00 PM – 2:00 PM', value: '12:00' },
    { id: 'afternoon', label: '3:00 PM – 5:00 PM', value: '15:00' },
    { id: 'evening', label: '5:00 PM – 7:00 PM', value: '17:00' }
  ];


  const step1Valid = photos.length >= 1;
  const step2Valid = 
    title.length >= 3 && 
    description.length >= 10 && 
    condition !== '' &&
    (listingType === 'barter' || (listingType === 'credits' && credits > 0));
  const step3Valid = selectedSpot !== null;

  const handleSelectRecommendedTime = (timeSlot: any) => {
    setSelectedRecommendedTime(timeSlot.id);
    setUseProposedTime(false);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    const year = tomorrow.getFullYear();
    // setMeetingDate(`${month}/${day}/${year}`);
    setMeetingDate(`${year}-${month}-${day}`);
    setMeetingTime(timeSlot.value);
  };

  const handleProposeTimeInput = () => {
    if (!useProposedTime) {
      setUseProposedTime(true);
      setSelectedRecommendedTime(null);
    }
  };

  const handleAddPhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && photos.length < 6) {
      const newPhoto: PhotoPreview = {
        id: Date.now(),
        file: file,
        url: URL.createObjectURL(file)
      };
      setPhotos([...photos, newPhoto]);
    }
  };

  const handleRemovePhoto = (id: number) => {
    const photoToRemove = photos.find(p => p.id === id);
    if (photoToRemove) {
      URL.revokeObjectURL(photoToRemove.url);
    }
    setPhotos(photos.filter(p => p.id !== id));
  };

  const handleNext = () => {
    if (currentStep === 1 && step1Valid) setCurrentStep(2);
    else if (currentStep === 2 && step2Valid) {
      setCurrentStep(3);
    }
    else if (currentStep === 3 && step3Valid) setCurrentStep(4);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handlePublish = () => {
    const formData = new FormData();

    if (photos.length > 0) {
      formData.append('image', photos[0].file); 
    }

    formData.append('title', title);
    formData.append('description', description);
    formData.append('condition', condition);
    formData.append('tags', JSON.stringify(selectedTags));
    formData.append('isBarter', String(listingType === 'barter'));
    formData.append('credits', String(listingType === 'credits' ? credits : 0));

    const selectedSpotData = MEETING_SPOTS.find(s => s.id === selectedSpot);
    formData.append('meetingSpot', selectedSpotData?.name || 'Not specified');
    
    const meetingTimestamp = meetingDate && meetingTime ? `${meetingDate} at ${meetingTime}` : undefined;
    if (meetingTimestamp) {
      formData.append('meetingTime', meetingTimestamp);
    }
    
    if (onPublish) {
      onPublish(formData);
    }
    navigateTo('home');
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const selectedSpotData = MEETING_SPOTS.find(s => s.id === selectedSpot);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-2xl bg-white/70 border-b border-white/40">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => currentStep === 1 ? navigateTo('home') : handleBack()}
              className="p-2 rounded-full hover:bg-white/50 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#222]" />
            </button>
            <h2 className="text-[#9333ea] font-semibold text-xl">Create Listing</h2>
            <div className="w-10" />
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  step <= currentStep
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600'
                    : 'bg-purple-200/40'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-[#555] font-medium">
              Step {currentStep} of 4
            </span>
            <span className="text-xs text-[#555] font-medium">
              {currentStep === 1 ? 'Photos' : currentStep === 2 ? 'Details' : currentStep === 3 ? 'Meeting' : 'Review'}
            </span>
          </div>
        </div>
      </div>


      <div className="max-w-md mx-auto px-4 py-6 pb-32">

        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-[#222] font-semibold mb-2">Add Photos</h3>
              <p className="text-[#555] text-sm mb-4">Add at least 1 photo of your item</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {photos.map((photo) => (
                <div key={photo.id} className="relative aspect-square group">
                  <div className="w-full h-full backdrop-blur-2xl bg-white/70 rounded-2xl border border-white/60 overflow-hidden">
                    <img src={photo.url} alt="Item preview" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => handleRemovePhoto(photo.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-100 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute top-2 left-2 p-1 rounded bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="w-4 h-4 text-white" />
                  </div>
                </div>
              ))}
              
              {photos.length < 6 && (
                <button
                  onClick={handleAddPhotoClick} 
                  className="aspect-square backdrop-blur-2xl bg-white/70 rounded-2xl border-2 border-dashed border-purple-300 hover:border-purple-500 hover:bg-white/80 transition-all flex flex-col items-center justify-center gap-2"
                >
                  <Plus className="w-6 h-6 text-purple-500" />
                  <span className="text-xs text-purple-600 font-medium">Add photo</span>
                </button>
              )}
            </div>

            {photos.length === 0 && (
              <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl p-4 border border-purple-300/40">
                <p className="text-[#555] text-sm">
                  📸 Tap "Add photo" to select images from your device
                </p>
              </div>
            )}
          </div>
        )}


        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-[#222] font-semibold mb-2">Item Details</h3>
              <p className="text-[#555] text-sm mb-4">Tell buyers about your item</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-[#555] text-xs mb-2 block">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Calculus Textbook"
                  className="backdrop-blur-xl bg-white/80 border-white/60 text-[#222]"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-[#555] text-xs mb-2 block">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the condition, features, or any details..."
                  className="backdrop-blur-xl bg-white/80 border-white/60 text-[#222] min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="condition" className="text-[#555] text-xs mb-2 block">Condition *</Label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger className="backdrop-blur-xl bg-white/80 border-white/60 text-[#222]">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  {/* ⬇️ ⬇️ ⬇️ 
                    여기가 수정된 부분입니다!
                    ⬇️ ⬇️ ⬇️
                  */}
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="listing-type" className="text-[#555] text-xs mb-2 block">Listing Type *</Label>
                <Select value={listingType} onValueChange={setListingType}>
                  <SelectTrigger id="listing-type" className="backdrop-blur-xl bg-white/80 border-white/60 text-[#222]">
                    <SelectValue placeholder="Select listing type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credits">Credit Only</SelectItem>
                    <SelectItem value="barter">Barter Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {listingType === 'credits' && (
                <div>
                  <Label htmlFor="credits" className="text-[#555] text-xs mb-2 block">Credits *</Label>
                  <Input
                    id="credits"
                    type="number"
                    value={credits}
                    onChange={(e) => setCredits(Number(e.target.value))}
                    placeholder="e.g., 15"
                    className="backdrop-blur-xl bg-white/80 border-white/60 text-[#222]"
                  />
                  <p className="text-[#777] text-xs mt-1">Set a price in credits.</p>
                </div>
              )}

              <div>
                <Label className="text-[#555] text-xs mb-2 block">Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-600'
                          : 'backdrop-blur-xl bg-white/60 text-[#555] border-white/60'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl p-4 border border-purple-300/40">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#222] font-medium mb-1">🔒 Safety First</p>
                    <p className="text-[#555] text-sm">
                      Always meet in safe, public campus spaces. Never share personal information or payment details outside the app.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Meeting Spot and Time */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-[#222] font-semibold mb-2">Meeting Location</h3>
              <p className="text-[#555] text-sm mb-4">Choose a safe campus location</p>
            </div>

            <div className="space-y-2">
              {MEETING_SPOTS.filter(s => s.popular).map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedSpot(spot.id)}
                  className={`w-full backdrop-blur-2xl rounded-2xl p-4 border transition-all text-left ${
                    selectedSpot === spot.id
                      ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-400/60 shadow-md'
                      : 'bg-white/70 border-white/60 hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#222] font-medium">{spot.name}</span>
                        <span className="backdrop-blur-xl bg-purple-500/20 text-purple-700 rounded-full px-2 py-0.5 text-xs font-medium">
                          Popular
                        </span>
                      </div>
                      <p className="text-[#555] text-sm">{spot.hours}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedSpot === spot.id ? 'border-purple-600 bg-purple-600' : 'border-purple-300'
                    }`}>
                      {selectedSpot === spot.id && <CheckCircle className="w-4 h-4 text-white" strokeWidth={2.5} />}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div>
              <h4 className="text-[#222] font-semibold mb-3 text-sm">More campus spots</h4>
              <div className="space-y-2">
                {MEETING_SPOTS.filter(s => !s.popular).map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedSpot(spot.id)}
                    className={`w-full backdrop-blur-2xl rounded-2xl p-4 border transition-all text-left ${
                      selectedSpot === spot.id
                        ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-400/60 shadow-md'
                        : 'bg-white/70 border-white/60 hover:bg-white/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#222] font-medium mb-1">{spot.name}</p>
                        <p className="text-[#555] text-sm">{spot.hours}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedSpot === spot.id ? 'border-purple-600 bg-purple-600' : 'border-purple-300'
                      }`}>
                        {selectedSpot === spot.id && <CheckCircle className="w-4 h-4 text-white" strokeWidth={2.5} />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-4 border border-white/60 space-y-3">
              <h4 className="text-[#222] font-semibold text-sm">Propose a time (optional)</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="date" className="text-[#555] text-xs mb-2 block">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="backdrop-blur-xl bg-white/80 border-white/60 text-[#222]"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-[#555] text-xs mb-2 block">Start Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="backdrop-blur-xl bg-white/80 border-white/60 text-[#222]"
                    onClick={handleProposeTimeInput}
                  />
                </div>
              </div>

              <div className="space-y-2">
                {recommendedTimes.map((timeSlot) => (
                  <button
                    key={timeSlot.id}
                    onClick={() => handleSelectRecommendedTime(timeSlot)}
                    className={`w-full backdrop-blur-2xl rounded-2xl p-4 border transition-all text-left ${
                      selectedRecommendedTime === timeSlot.id
                        ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-400/60 shadow-md'
                        : 'bg-white/70 border-white/60 hover:bg-white/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#222] font-medium mb-1">{timeSlot.label}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedRecommendedTime === timeSlot.id ? 'border-purple-600 bg-purple-600' : 'border-purple-300'
                      }`}>
                        {selectedRecommendedTime === timeSlot.id && <CheckCircle className="w-4 h-4 text-white" strokeWidth={2.5} />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review Details */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-[#222] font-semibold text-xl mb-2">Review Details</h3>
              <p className="text-[#555] text-sm mb-4">Check everything looks good</p>
            </div>

            <div className="backdrop-blur-2xl bg-white/70 rounded-3xl border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)] overflow-hidden">
              {photos.length > 0 && (
                <div className="aspect-[4/3] bg-purple-100/50">
                  <img src={photos[0].url} alt={title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[#222] font-semibold">{title || 'Item Title'}</h3>
                  {listingType === 'barter' ? (
                    <Badge className="backdrop-blur-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg font-medium flex items-center gap-1.5">
                      <ArrowLeftRight className="w-4 h-4" />
                      <span>Barter Only</span>
                    </Badge>
                  ) : (
                    <div className="backdrop-blur-xl bg-white/90 rounded-full px-3 py-1 border border-white/60 flex items-center gap-1">
                      <span className="text-[#222] font-medium text-sm">{credits} Cr</span>
                    </div>
                  )}
                </div>
                <p className="text-[#555] text-sm mb-3">{description || 'Item description'}</p>

                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedTags.map((tag) => (
                      <div
                        key={tag}
                        className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1 border border-purple-200/60"
                      >
                        <span className="text-purple-700 text-xs font-medium">{tag}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-3 border-t border-purple-200/40">
                  <p className="text-[#555] text-sm mb-1">
                    <span className="font-medium">Condition:</span> {condition}
                  </p>
                  <p className="text-[#555] text-sm mb-1">
                    <span className="font-medium">Meeting:</span> {selectedSpotData?.name}
                  </p>
                  {meetingDate && meetingTime && (
                    <p className="text-[#555] text-sm">
                      <span className="font-medium">Suggested time:</span> {meetingDate} at {meetingTime}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-2xl p-4 border border-green-300/40">
              <p className="text-green-900 font-medium mb-1">Ready to publish?</p>
              <p className="text-green-700 text-sm">
                Your listing will be visible to all students on campus
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-2xl bg-white/70 border-t border-white/40 p-4">
        <div className="max-w-md mx-auto flex gap-3">
          {currentStep > 1 && currentStep < 4 && (
            <button
              onClick={handleBack}
              className="px-6 py-4 rounded-2xl backdrop-blur-xl bg-white/60 text-[#222] font-medium border border-purple-200/60 shadow-sm transition-transform active:scale-[0.98]"
            >
              Back
            </button>
          )}
          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !step1Valid) ||
                (currentStep === 2 && !step2Valid) ||
                (currentStep === 3 && !step3Valid)
              }
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>Next</span>
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Publish Listing</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}