module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          darkest: '#0A0A0A',       // Deepest Black
          dark: '#222222',          // Darker Gray
          body: '#333333',          // Dark Gray
          medium: '#666666',        // Medium Gray
          glow: '#AAAAAA',          // Medium Light Gray
          border: '#CCCCCC',        // Light Gray
          feature: '#E0E0E0',       // Very Light Gray (borders)
          background: '#EFEFEF',    // Very Light Gray (body bg)
          placeholder: '#F8F8F8',   // Light Off-White
        },
        white: '#FFFFFF',
        black: '#0A0A0A'
      }
    }
  },
  plugins: [],
};
