# Snag Authentication & Onboarding Flow

## Overview
Complete authentication and onboarding system with tag-based personalization.

## Flow Map

### New User Journey
```
Login Screen
    ↓ (Click "Sign Up")
Signup Screen (Account Creation)
    ↓ (Click "Next")
Select Interests (Tag Selection)
    ↓ (Click "Continue")
Review Profile (Optional Preview)
    ↓ (Click "Finish Setup")
Home Screen (Main App)
```

### Returning User Journey
```
Login Screen
    ↓ (Enter credentials + Click "Login")
Home Screen (Main App)
```

### Guest User Journey
```
Login Screen
    ↓ (Click "Continue as Guest")
Home Screen (Limited Features)
```

### Password Reset Journey
```
Login Screen
    ↓ (Click "Forgot Password?")
Forgot Password Screen
    ↓ (Enter email + Click "Send Reset Link")
Confirmation Modal
    ↓ (Click "Back to Login")
Login Screen
```

### Email Verification (Optional)
```
Signup Screen
    ↓ (Click "Next")
Verify Email Screen (6-digit code)
    ↓ (Enter code + Click "Verify")
Select Interests Screen
```

## Screen Details

### 1. Login Screen (`/components/LoginScreen.tsx`)
**Purpose:** Authenticate returning users

**Features:**
- Email input with validation
- Password input with show/hide toggle
- "Forgot Password?" link
- "Sign Up" link for new users
- "Continue as Guest" option
- Form validation with error messages

**Navigation:**
- → Home (on successful login)
- → Signup (click "Sign Up")
- → Forgot Password (click "Forgot Password?")

---

### 2. Signup Screen (`/components/SignupScreen.tsx`)
**Purpose:** Create new account

**Features:**
- Full name input
- Email input with validation
- Password input with show/hide toggle
- Confirm password with matching validation
- "Login" link for existing users
- Comprehensive error handling

**Validation:**
- Full name: Required, non-empty
- Email: Valid email format
- Password: Minimum 8 characters
- Confirm password: Must match password

**Navigation:**
- → Select Interests (on successful signup)
- → Login (click "Login")

---

### 3. Select Interests Screen (`/components/SelectInterestsScreen.tsx`)
**Purpose:** Personalize user experience with tag-based preferences

**Features:**
- 18 preset interest tags
- Custom tag creation
- Multi-select capability
- Visual selection counter
- "Skip for now" option

**Preset Interests:**
- Furniture, Kitchen Supplies, Dorm Decor
- Electronics, Clothing, Textbooks
- Move-Out Essentials, Cleaning Supplies
- Organization, International Student Essentials
- Seasonal Items, Halloween, Winter Gear
- Plants, Fitness, Gaming, Laundry, Lifestyle

**Navigation:**
- → Review Profile (click "Continue")
- → Review Profile (click "Skip for now")

---

### 4. Review Profile Screen (`/components/ReviewProfileScreen.tsx`)
**Purpose:** Preview and confirm account information

**Features:**
- Display name with edit link
- Display email with edit link
- Display selected interests with edit link
- "Finish Setup" button to complete onboarding

**Navigation:**
- → Home (click "Finish Setup")
- → Signup (click edit on name/email)
- → Select Interests (click edit on interests)

---

### 5. Forgot Password Screen (`/components/ForgotPasswordScreen.tsx`)
**Purpose:** Password recovery

**Features:**
- Email input with validation
- "Send Reset Link" button
- Success confirmation modal
- Back navigation to login

**Flow:**
1. User enters email
2. Validation checks email format
3. Shows confirmation modal
4. Returns to login screen

**Navigation:**
- → Login (click "Back to Login")

---

### 6. Verify Email Screen (`/components/VerifyEmailScreen.tsx`)
**Purpose:** Email verification (optional feature)

**Features:**
- 6-digit code input with auto-focus
- Paste support for codes
- Resend code functionality with 60s cooldown
- Real-time validation
- Error handling for invalid/expired codes

**Navigation:**
- → Select Interests (on successful verification)
- → Signup (click "Back")

---

## Integration with Main App

### User Data Storage
After signup/onboarding, the following user data is collected:
- Full name
- Email
- Password (hashed in production)
- Selected interests (array of strings)

### Interests Integration
User interests are used to:
1. **Home Feed**: Personalize item recommendations
2. **Circle Suggestions**: Recommend relevant Snag Circles
3. **Create Listing**: Pre-fill tag suggestions
4. **Profile Display**: Show user interests on profile

### Profile Screen Updates
The Profile Screen now displays:
- User interests as tag chips
- Editable via Settings → Edit Profile

### Edit Profile Integration
Edit Profile Screen includes:
- Interests section with preset + custom tags
- Add/remove interests functionality
- Visual tag management

---

## Design System Compliance

All authentication screens follow Snag's design principles:

### Visual Design
- ✅ Liquid glass aesthetic (backdrop-blur-xl)
- ✅ Purple branding (#9333ea, #a855f7)
- ✅ Soft shadows and translucent backgrounds
- ✅ Rounded corners (rounded-xl, rounded-2xl)

### Dark Mode
- ✅ Full dark mode support
- ✅ Automatic theme switching
- ✅ Proper contrast ratios
- ✅ Dark-mode specific colors

### Error Handling
- ✅ Red borders on invalid inputs
- ✅ Inline error messages
- ✅ Real-time validation
- ✅ Clear error messaging

### Button Alignment
- ✅ All primary buttons center-aligned
- ✅ Consistent button styling
- ✅ Proper hover/active states

### Accessibility
- ✅ Proper input labels
- ✅ Error announcements
- ✅ Keyboard navigation
- ✅ Touch-friendly targets

---

## Development Notes

### Starting the App
The app now starts at the Login screen by default:
```typescript
const [currentScreen, setCurrentScreen] = useState<string>('login');
const [showSplash, setShowSplash] = useState(false);
```

### Screen Routing
Add these cases to App.tsx `renderScreen()`:
- `'login'` → LoginScreen
- `'signup'` → SignupScreen
- `'select-interests'` → SelectInterestsScreen
- `'review-profile'` → ReviewProfileScreen
- `'forgot-password'` → ForgotPasswordScreen
- `'verify-email'` → VerifyEmailScreen

### Data Flow
User data is passed through navigation:
```typescript
navigateTo('select-interests', userData);
navigateTo('review-profile', completeUserData);
```

---

## Future Enhancements

### Backend Integration
- [ ] Real authentication API calls
- [ ] Password hashing (bcrypt)
- [ ] JWT token management
- [ ] Session persistence
- [ ] Email verification service
- [ ] Password reset emails

### Features
- [ ] Social login (Google, Apple)
- [ ] Two-factor authentication
- [ ] Remember me functionality
- [ ] Biometric authentication (mobile)
- [ ] Account deletion workflow

### Analytics
- [ ] Track signup completion rate
- [ ] Monitor interest selection patterns
- [ ] A/B test onboarding flows
- [ ] User engagement metrics

---

## Testing Checklist

### Login Screen
- [ ] Valid email/password → navigates to home
- [ ] Invalid email → shows error
- [ ] Short password → shows error
- [ ] Show/hide password toggle works
- [ ] "Continue as Guest" → navigates to home
- [ ] "Sign Up" link → navigates to signup
- [ ] "Forgot Password?" → navigates to forgot password

### Signup Screen
- [ ] All fields required → shows errors
- [ ] Email validation works
- [ ] Password minimum length enforced
- [ ] Passwords must match
- [ ] Show/hide toggles work on both fields
- [ ] "Login" link → navigates to login
- [ ] "Next" → navigates to interests

### Select Interests
- [ ] Can select multiple preset interests
- [ ] Can add custom interests
- [ ] Can remove custom interests
- [ ] Selection counter updates
- [ ] "Continue" → navigates to review
- [ ] "Skip" → navigates to review with empty interests

### Review Profile
- [ ] Displays all entered information
- [ ] Edit links navigate back to correct screens
- [ ] "Finish Setup" → navigates to home

### Forgot Password
- [ ] Email validation works
- [ ] Shows confirmation modal
- [ ] "Back to Login" returns to login

### Dark Mode
- [ ] All screens properly styled in dark mode
- [ ] Inputs readable in both modes
- [ ] Error states visible in both modes
- [ ] Buttons properly contrasted
