import { useState } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { useDarkMode } from '../contexts/DarkModeContext';

interface CreateCircleScreenProps {
  navigateTo: (screen: string, data?: any) => void;
  onCreate: (circle: any) => void;
}

const CATEGORIES = ['Move-Out', 'Textbooks', 'Clothing', 'Tech', 'Furniture', 'Kitchen', 'Sports', 'Art', 'Other'];

export default function CreateCircleScreen({ navigateTo, onCreate }: CreateCircleScreenProps) {
  const { darkMode } = useDarkMode();
  const [circleName, setCircleName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState('');

  // Add error states
  const [circleNameError, setCircleNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const handleCreate = () => {
    setAttemptedSubmit(true);

    if (!circleName.trim()) {
      setCircleNameError('Please enter a circle name');
      return;
    }
    if (!description.trim()) {
      setDescriptionError('Please enter a description');
      return;
    }
    if (!category) {
      setCategoryError('Please select a category');
      return;
    }

    const newCircle = {
      id: Date.now(),
      name: circleName,
      description: description,
      category: category,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400',
      activePosts: 0,
      isJoined: true
    };

    toast.success('Circle created successfully!');
    onCreate(newCircle);
  };

  const handleAddImage = () => {
    const placeholder = 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400';
    setCoverImage(placeholder);
    toast.success('Image added!');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 backdrop-blur-xl ${darkMode ? 'bg-black/70 border-white/10' : 'bg-white/10 border-white/30'} border-b`}>
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('circles-home')}
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-white/10' : 'hover:bg-white/50'} transition-colors`}
            >
              <ArrowLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#222]'}`} />
            </button>
            <h2 className={`${darkMode ? 'text-white' : 'text-[#9333ea]'} font-semibold text-xl`}>Create a Circle</h2>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6 pb-32">
        {/* Circle Name */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-3xl p-6 border shadow-[0_8px_24px_rgba(139,92,246,0.12)]`}>
          <Label htmlFor="circle-name" className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold mb-2 block`}>
            Circle Name
          </Label>
          <Input
            id="circle-name"
            value={circleName}
            onChange={(e) => setCircleName(e.target.value)}
            placeholder="e.g., Move-Out Sale 2025"
            className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' : 'bg-white/80 border-purple-200/60 text-[#222] placeholder:text-[#888]'} rounded-2xl focus-visible:ring-purple-400/50`}
          />
          {attemptedSubmit && circleNameError && <p className="text-red-500 text-sm mt-1">{circleNameError}</p>}
        </div>

        {/* Description */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-3xl p-6 border shadow-[0_8px_24px_rgba(139,92,246,0.12)]`}>
          <Label htmlFor="description" className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold mb-2 block`}>
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what this circle is about..."
            className={`min-h-32 backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' : 'bg-white/80 border-purple-200/60 text-[#222] placeholder:text-[#888]'} rounded-2xl resize-none focus-visible:ring-purple-400/50`}
          />
          {attemptedSubmit && descriptionError && <p className="text-red-500 text-sm mt-1">{descriptionError}</p>}
        </div>

        {/* Category */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-3xl p-6 border shadow-[0_8px_24px_rgba(139,92,246,0.12)]`}>
          <Label className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold mb-2 block`}>
            Category
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-white/80 border-purple-200/60 text-[#222]'} rounded-2xl focus:ring-purple-400/50`}>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {attemptedSubmit && categoryError && <p className="text-red-500 text-sm mt-1">{categoryError}</p>}
        </div>

        {/* Cover Image */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-3xl p-6 border shadow-[0_8px_24px_rgba(139,92,246,0.12)]`}>
          <Label className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold mb-3 block`}>
            Cover Image (Optional)
          </Label>
          
          {coverImage ? (
            <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-3">
              <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
              <button
                onClick={() => setCoverImage('')}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddImage}
              className={`w-full h-40 ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/80 border-purple-200/60'} rounded-2xl border-2 border-dashed hover:border-purple-500 transition-all flex flex-col items-center justify-center gap-3`}
            >
              <Upload className="w-8 h-8 text-purple-500" />
              <span className="text-purple-600 font-medium">Add Cover Image</span>
            </button>
          )}
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className={`fixed bottom-0 left-0 right-0 backdrop-blur-2xl ${darkMode ? 'bg-black/70 border-white/10' : 'bg-white/70 border-white/40'} border-t p-4`}>
        <div className="max-w-md mx-auto">
          <button
            onClick={handleCreate}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center mx-auto"
          >
            Create Circle
          </button>
        </div>
      </div>
    </div>
  );
}