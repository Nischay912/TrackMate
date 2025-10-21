// This file defines multiple color themes for the app and exports the currently active color set.

// Define a "coffee" color theme as an object of named color tokens used across the UI.
const coffeeTheme = {
  primary: "#8B593E", // Primary accent color for buttons and main actions — a warm brown like coffee.
  background: "#FFF8F3", // Background color for screens — a very light warm tone to match the theme.
  text: "#4A3428", // Primary text color — dark brown for high contrast on the background.
  border: "#E5D3B7", // Border color for inputs/cards — subtle warm tone that complements the background.
  white: "#FFFFFF", // Utility white used for cards/inputs and to ensure consistent white value across the app.
  textLight: "#9A8478", // Secondary text color used for captions and less prominent text.
  expense: "#E74C3C", // Red color used to show negative values or errors (e.g., expense amounts).
  income: "#2ECC71", // Green color used to show positive values (e.g., income amounts).
  card: "#FFFFFF", // Card background color — typically white to make content stand out from the screen background.
  shadow: "#000000", // Shadow color used for elevation visuals (platforms apply opacity).
};

// Define a "forest" color theme — green-based palette for a nature look.
const forestTheme = {
  primary: "#2E7D32", // Primary green used for main actions in the forest theme.
  background: "#E8F5E9", // Very light green background to keep the app soft and natural.
  text: "#1B5E20", // Dark green used for primary text for good contrast.
  border: "#C8E6C9", // Pale green border for subtle separation of elements.
  white: "#FFFFFF", // Standard white kept for consistency in card or input backgrounds.
  textLight: "#66BB6A", // Lighter green for secondary text or subtle accents.
  expense: "#C62828", // Red tone for expenses — chosen to remain visible against forest palette.
  income: "#388E3C", // Green tone for incomes matching the forest theme.
  card: "#FFFFFF", // Card color remains white to keep content readable and consistent.
  shadow: "#000000", // Shadow color value reused across themes for elevation effects.
};

// Define a "purple" color theme — vibrant purple palette for a different aesthetic.
const purpleTheme = {
  primary: "#6A1B9A", // Purple primary color for actions and highlights.
  background: "#F3E5F5", // Light purple/pink background to give a soft look to screens.
  text: "#4A148C", // Deep purple used for primary readable text.
  border: "#D1C4E9", // Muted purple border color for inputs/cards.
  white: "#FFFFFF", // White utility color for cards and surfaces.
  textLight: "#BA68C8", // Lighter purple used for secondary text and subtle accents.
  expense: "#D32F2F", // Red for expense indicators; keeps standard meaning of red for loss/error.
  income: "#388E3C", // Green for incomes; shared with other themes for consistent meaning.
  card: "#FFFFFF", // Card surface color remains white for readability.
  shadow: "#000000", // Shared shadow color token for elevation visuals.
};

// Define an "ocean" color theme — blue-based palette for cool, calm UI.
const oceanTheme = {
  primary: "#0277BD", // Deep ocean blue for primary buttons and accents.
  background: "#E1F5FE", // Pale blue background to give a breezy, light feeling to screens.
  text: "#01579B", // Strong blue for primary readable text.
  border: "#B3E5FC", // Very light blue border for subtle separation.
  white: "#FFFFFF", // White utility color for surfaces and cards.
  textLight: "#4FC3F7", // Lighter blue for secondary text or highlight usage.
  expense: "#EF5350", // Red-toned expense color; remains consistent in meaning across themes.
  income: "#26A69A", // Teal/green color for income values fitting the ocean palette.
  card: "#FFFFFF", // Card color for content surfaces.
  shadow: "#000000", // Shadow token reused across themes for depth effects.
};

// Export an object that groups all available theme objects so they can be accessed by name.
export const THEMES = {
  coffee: coffeeTheme, // Make coffeeTheme accessible via THEMES.coffee
  forest: forestTheme, // Make forestTheme accessible via THEMES.forest
  purple: purpleTheme, // Make purpleTheme accessible via THEMES.purple
  ocean: oceanTheme, // Make oceanTheme accessible via THEMES.ocean
};

// we will change this to switch theme

// So, now : COLORS.coffee, COLORS.forest, COLORS.purple, COLORS.ocean will give different themes colors based on the theme name in other files wherever we export this COLORS thus here below.

// so now in other files : COLORS.background will give the background color of the active theme i.e. if COLORS.coffee is active then COLORS.background will give the background color of coffee theme and so on... thus here below.

export const COLORS = THEMES.coffee; // Export the active color set as COLORS — change this assignment to switch the app's theme.
