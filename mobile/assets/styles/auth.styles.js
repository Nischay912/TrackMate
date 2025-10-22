// This file defines styles for the authentication screens (login, signup, verification).

import { StyleSheet } from "react-native"; // Import StyleSheet to create an optimized style object for native platforms.
import { COLORS } from "../../constants/colors"; // Import the shared COLORS object so we use the same theme colors across the app ; the colors file has different themes based on the COLORS variable there ; so we import it here and update the theme based on that here too below.

// Export a named `styles` object created with StyleSheet.create for performance and validation.
export const styles = StyleSheet.create({
  // Root container covering entire screen for auth pages.
  container: {
    flex: 1, // Makes the container expand to fill the full height of its parent (the screen). Important so background and layout behave predictably.
    backgroundColor: COLORS.background, // Uses the theme background color so the screen matches the app theme.
    padding: 20, // Adds space inside the container so child elements aren't flushed to the edges—improves readability and touch targets.
    justifyContent: "center", // Vertically centers content (useful for auth screens to keep forms centered on the screen).
  },

  // Illustration (image) shown at the top of the auth screen.
  illustration: {
    // width: "100%", // Make the image as wide as the parent container so it scales across device widths ; maintaing its proportions because of "contain" class used here too below.
    width: 300, // Make the image as wide as the parent container so it scales across device widths.
    height: 310, // Fixed height to control visual layout and keep the image proportionate on most screens.
    resizeMode: "contain", // Ensures the full image is visible without distortion; it fits within the width/height while preserving aspect ratio.
  },

  // Main title on auth screen (e.g., "Welcome Back" or "Create account").
  title: {
    fontSize: 32, // Large text to act as the primary heading—easy to read and gives hierarchy.
    fontWeight: "bold", // Bold weight to make the heading clearly stand out from other texts.
    color: COLORS.text, // Uses primary text color from the theme for good contrast against the background.
    marginVertical: 15, // Adds top and bottom margin to separate title from image above and inputs below.
    textAlign: "center", // Centers the title horizontally which is common in auth screens for a focused layout.
  },

  // Common text input style used for email/password fields.
  input: {
    backgroundColor: COLORS.white, // White background for inputs gives clear contrast and a familiar look.
    borderRadius: 12, // Rounded corners for a modern, friendly UI and to match other elements like cards/buttons.
    padding: 15, // Inner spacing so typed text doesn't touch the input edges—improves legibility and touch comfort.
    marginBottom: 16, // Space below each input to separate inputs and other elements vertically.
    borderWidth: 1, // A thin border to define the input edge so it feels like a tappable field.
    borderColor: COLORS.border, // Theme border color keeps visual consistency with other bordered elements.
    fontSize: 16, // Comfortable font size for typing on mobile devices.
    color: COLORS.text, // Text color ensures typed text has good contrast and matches theme.
  },

  // Variation of input used when there's a validation error.
  errorInput: {
    borderColor: COLORS.expense, // Use the 'expense' (red) color to indicate an error visually—users expect red for problems.
  },

  // Primary button (e.g., "Sign in" / "Continue").
  button: {
    backgroundColor: COLORS.primary, // Button uses the primary theme color to signify the main action.
    borderRadius: 12, // Rounded corners to match input and card styling for a cohesive look.
    padding: 16, // Sufficient padding increases the tappable area and makes the button comfortable to touch.
    alignItems: "center", // Center the button text horizontally inside the button.
    marginTop: 10, // Small space above button so it doesn't stick to inputs.
    marginBottom: 20, // Larger space below button to separate it from footer links or other elements.
  },

  // Text inside the button.
  buttonText: {
    color: COLORS.white, // White text contrasts well with primary colored buttons for readability.
    fontSize: 18, // Slightly larger font size helps call-to-action text be easily readable.
    fontWeight: "600", // Semi-bold weight to make button label prominent and easy to scan.
  },

  // Footer row containing helper text like "Don't have an account? Sign up".
  footerContainer: {
    flexDirection: "row", // Arrange footer elements horizontally (label + link).
    justifyContent: "center", // Center the footer row horizontally in the parent container.
    alignItems: "center", // Vertically center items so the text and link align nicely.
    gap: 8, // Horizontal spacing between footer items to avoid cramping (supported in newer RN versions or RNW).
  },

  // Normal footer label text style.
  footerText: {
    color: COLORS.text, // Primary text color to keep footer readable but not overpowering.
    fontSize: 16, // Standard readable size for footer informational text.
  },

  // Link text style in footer (e.g., "Sign up" or "Forgot password?").
  linkText: {
    color: COLORS.primary, // Link uses primary color to indicate it's an actionable item and attract attention.
    fontSize: 16, // Same size as footer text to keep the line uniform.
    fontWeight: "600", // Slightly bolder to make it look tappable and important.
  },

  // Container for verification screen (e.g., OTP input) that centers contents.
  verificationContainer: {
    flex: 1, // Fill the available screen height so centering works predictably.
    backgroundColor: COLORS.background, // Use same background color for consistent theme.
    padding: 20, // Inner spacing so verification UI doesn't touch screen edges.
    justifyContent: "center", // Vertically center verification UI for focus and good UX.
    alignItems: "center", // Horizontally center children like title and input fields.
  },

  // Title used in verification screen (smaller than main auth title).
  verificationTitle: {
    fontSize: 24, // Slightly smaller than the main auth title but still prominent.
    fontWeight: "bold", // Bold to emphasize the verification step.
    color: COLORS.text, // Primary text color for readability.
    marginBottom: 20, // Space below title before the verification input or instructions.
    textAlign: "center", // Centered text for focused, step-based UI.
  },

  // Input used for numerical code (OTP) entry.
  verificationInput: {
    backgroundColor: COLORS.white, // White background to make digits readable.
    borderRadius: 12, // Rounded corners for visual consistency with other inputs.
    padding: 15, // Padding ensures digits aren't cramped inside the input.
    marginBottom: 16, // Space below before additional actions like "Resend".
    borderWidth: 1, // Thin border to define the input area.
    borderColor: COLORS.border, // Theme border color for consistency.
    fontSize: 16, // Standard readable font size for input.
    color: COLORS.text, // Text color for good contrast.
    width: "100%", // Make OTP input take full width of parent container for ease of interaction.
    textAlign: "center", // Center digits so OTP looks cleaner and easier to read.
    letterSpacing: 2, // Slight spacing between digits to improve readability of code input.
  },

  // 🔴 Error box shown when something goes wrong (e.g., invalid OTP or login failure).
  errorBox: {
    backgroundColor: "#FFE5E5", // Pale red background to subtly indicate an error without being harsh.
    padding: 12, // Inner padding so error message text has breathing room.
    borderRadius: 8, // Slightly rounded corners to match the app's visual language.
    borderLeftWidth: 4, // Thick left border as a visual accent to draw attention to the error.
    borderLeftColor: COLORS.expense, // Use the 'expense' (red) theme color to match the error meaning.
    marginBottom: 16, // Space below the error box so it doesn't crowd following elements.
    flexDirection: "row", // Layout possible icon + text horizontally inside the box.
    alignItems: "center", // Vertically center the icon and text for visual balance.
    width: "100%", // Make the error box match the width of inputs for consistent alignment.
  },

  // Error message text inside the error box.
  errorText: {
    color: COLORS.text, // Use normal text color to keep the error message readable on the pale background.
    marginLeft: 8, // Space between an optional error icon and the message text.
    flex: 1, // Allow text to take up remaining horizontal space and wrap as needed.
    fontSize: 14, // Slightly smaller font for message body so it doesn't overpower titles.
  },
});
