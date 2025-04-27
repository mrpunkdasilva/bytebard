export const BRAND = {
  name: "ByteBard",
  tagline: "Forge Digital Tales in Neon Light",
  slogan: "Where Code Meets Creativity, Stories Come Alive",
  
  colors: {
    primary: "#FF00FF", // Neon Pink
    secondary: "#00FFFF", // Neon Cyan
    accent: "#FFD700", // Cyber Gold
    background: "#0A0A0A", // Deep Black
    foreground: "#FFFFFF", // Pure White
    
    // Gradients
    gradientPrimary: "linear-gradient(135deg, #FF00FF 0%, #00FFFF 100%)",
    gradientSecondary: "linear-gradient(45deg, #FFD700 0%, #FF00FF 100%)",
    
    // Effects
    glow: {
      primary: "0 0 10px #FF00FF, 0 0 20px #FF00FF50",
      secondary: "0 0 10px #00FFFF, 0 0 20px #00FFFF50",
    }
  },
  
  fonts: {
    heading: "var(--font-geist-sans)",
    body: "var(--font-geist-sans)",
    code: "var(--font-geist-mono)",
  }
} as const;