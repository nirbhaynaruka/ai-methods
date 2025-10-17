# TODO: Secure Onboarding Keys with Firebase Functions

## Steps to Complete
- [x] Create Firebase Function in functions/index.js to serve client onboarding data securely
- [x] Update src/lib/onboardingKeys.ts to fetch data from the Firebase Function instead of hardcoded map
- [x] Update components using getClientData (e.g., ClientOnboarding.tsx, onboarding page) to handle async fetch
- [x] Remove hardcoded clientOnboardingMap from onboardingKeys.ts
- [x] Test the Firebase Function locally
- [x] Deploy Firebase Functions
- [x] Verify client-side functionality after changes
- [x] Build the Next.js application successfully
- [x] Deploy Firebase Hosting
