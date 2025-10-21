// This file contains all styles for the "Create" screen (where user creates a transaction).

import { StyleSheet } from "react-native"; // Import StyleSheet from React Native to create optimized styles for native platforms.
import { COLORS } from "../../constants/colors"; // Import the shared COLORS object so the styles use the app's theme and remain consistent.

// Export a named `styles` object using StyleSheet.create — this improves performance and validates properties.
export const styles = StyleSheet.create({
  // Root container for the create screen that fills the screen and sets background.
  container: {
    flex: 1, // Makes this view expand to fill available vertical space (usually the full screen). Without it the layout could collapse.
    backgroundColor: COLORS.background, // Uses the theme background color so the screen matches the app's visual design.
  },

  // Header row that holds back button, title, save button etc.
  header: {
    flexDirection: "row", // Layout children horizontally (left to right) inside the header.
    justifyContent: "space-between", // Places first child at the left and last child at the right with space between.
    alignItems: "center", // Vertically centers header contents so icons and text align nicely.
    padding: 20, // Adds outer spacing inside the header so items are not flush to the edges.
    borderBottomWidth: 1, // Adds a thin bottom border to visually separate header from content below.
    borderBottomColor: COLORS.border, // Uses theme border color for consistency with other UI elements.
  },

  // Title text in the header (e.g., "Create Transaction").
  headerTitle: {
    fontSize: 18, // Readable font size for a header label.
    fontWeight: "600", // Semi-bold weight to make the header distinguishable from normal text.
    color: COLORS.text, // Primary text color from the theme for good contrast.
  },

  // Small tappable area for the back button to improve usability.
  backButton: {
    padding: 5, // Ensures the back icon has a comfortable touch area without looking too big.
  },

  // Container for save button and possible other actions in header (aligned horizontally).
  saveButtonContainer: {
    flexDirection: "row", // Arrange the save label and icon horizontally.
    alignItems: "center", // Center items vertically inside the container for balanced alignment.
    gap: 4, // Small gap between icon and text for spacing (supported in newer RN versions or web).
  },

  // Style applied to save button when it should look disabled.
  saveButtonDisabled: {
    opacity: 0.5, // Lowers opacity to visually indicate the button is disabled and not tappable.
  },

  // Text style for save button when enabled.
  saveButton: {
    fontSize: 16, // Clear and readable size for action text in header.
    color: COLORS.primary, // Use primary theme color to mark it as an important action.
    fontWeight: "600", // Semi-bold for clarity and emphasis.
  },

  // Card-style container used for grouping form elements (rounded + shadow).
  card: {
    backgroundColor: COLORS.card, // Card color (usually white) to make content stand out from background.
    margin: 16, // Outer spacing so the card doesn't touch screen edges; separates it from other sections.
    borderRadius: 16, // Rounded corners for modern, friendly appearance and consistency across cards.
    padding: 16, // Inner spacing so content inside the card has breathing room.
    shadowColor: "#000", // Shadow color for iOS shadow rendering (Android uses elevation).
    shadowOffset: { width: 0, height: 2 }, // Slight shadow offset to position shadow underneath the card.
    shadowOpacity: 0.1, // Soft shadow opacity to keep elevation subtle.
    shadowRadius: 4, // How blurred the shadow appears on iOS.
    elevation: 3, // Android elevation to create a similar raised visual effect on Android devices.
  },

  // Row of buttons to select transaction type (income/expense).
  typeSelector: {
    flexDirection: "row", // Arrange type buttons horizontally so they sit next to each other.
    marginBottom: 20, // Space below selector separating it from following inputs.
    gap: 10, // Space between type buttons to prevent them from touching (supported in newer RN versions or web).
  },

  // Style for each type button (neutral state).
  typeButton: {
    flex: 1, // Let each button expand equally so they share available width (good for two or more options).
    flexDirection: "row", // If the button has an icon and text, arrange them horizontally.
    alignItems: "center", // Center icon and text vertically for balanced appearance.
    justifyContent: "center", // Horizontally center the content within the button area.
    paddingVertical: 12, // Vertical padding for a comfortable tappable height.
    borderRadius: 25, // Rounded pill-like shape which is common for segmented controls.
    borderWidth: 1, // Thin border to define the button boundary in neutral state.
    borderColor: COLORS.border, // Use theme border color so button matches overall design.
  },

  // Active state for the type button to indicate selection.
  typeButtonActive: {
    backgroundColor: COLORS.primary, // Fill with primary color when selected to make it visually distinct.
    borderColor: COLORS.primary, // Match border to background so active state looks cohesive.
  },

  // Small margin right for icons inside type buttons.
  typeIcon: {
    marginRight: 8, // Space between icon and text so they don't appear cramped.
  },

  // Text style for type button when not active.
  typeButtonText: {
    color: COLORS.text, // Use primary text color so the label is readable in neutral state.
    fontSize: 16, // Comfortable label size for tap targets and readability.
    fontWeight: "500", // Medium weight to make the label clear but not overly bold.
  },

  // Text style for type button when active (selected).
  typeButtonTextActive: {
    color: COLORS.white, // White text on primary-colored background ensures contrast and readability.
  },

  // Container that holds currency symbol and amount input arranged horizontally.
  amountContainer: {
    flexDirection: "row", // Place currency symbol and amount input side-by-side.
    alignItems: "center", // Align both vertically so they align on the same baseline.
    borderBottomWidth: 1, // Thin bottom border to visually separate amount area from the rest.
    borderBottomColor: COLORS.border, // Theme border color for consistent look.
    paddingBottom: 16, // Space below content before the next element.
    marginBottom: 20, // Space between this section and the next, keeping layout airy.
  },

  // Currency symbol style (large to match amount emphasis).
  currencySymbol: {
    fontSize: 32, // Large font so the currency symbol visually pairs with the amount input.
    fontWeight: "bold", // Bold to give it visual weight and match amount's importance.
    color: COLORS.text, // Primary text color for readability.
    marginRight: 8, // Space between symbol and amount input for separation.
  },

  // Amount input text style (very large for emphasis on value entry).
  amountInput: {
    flex: 1, // Allow input to take remaining width next to currency symbol.
    fontSize: 36, // Extra-large font so the entered number is immediately prominent and obvious.
    fontWeight: "bold", // Bold weight to improve legibility at large sizes.
    color: COLORS.text, // Primary text color for high contrast.
  },

  // Container around regular text inputs with border and background.
  inputContainer: {
    flexDirection: "row", // If there is an icon + input, align them horizontally.
    alignItems: "center", // Vertically center content inside the input container.
    borderWidth: 1, // Border to define the input area clearly.
    borderColor: COLORS.border, // Use theme border color for a consistent look.
    borderRadius: 12, // Rounded corners to match other inputs and cards.
    padding: 4, // Small padding to give a little space between border and inner input.
    marginBottom: 20, // Space below container separating it from next section.
    backgroundColor: COLORS.white, // White background ensures text input is readable and stands out.
  },

  // Margin for icons inside input container to keep distance from text.
  inputIcon: {
    marginHorizontal: 12, // Horizontal margin so icon doesn't touch input text or container edges.
  },

  // Text input style used inside inputContainer.
  input: {
    flex: 1, // Allow the text input to grow and fill available horizontal space.
    padding: 12, // Inner padding to give characters breathing room inside the input field.
    fontSize: 16, // Comfortable font size for typing and reading.
    color: COLORS.text, // Primary text color for readability and theme consistency.
  },

  // Section title used to label different parts of the form (e.g., "Category").
  sectionTitle: {
    fontSize: 18, // Size suitable for section headings — visible but not too large.
    fontWeight: "600", // Semi-bold to indicate importance without being overpowering.
    color: COLORS.text, // Primary text color for consistency across headings.
    marginBottom: 15, // Space below the title before the section content starts.
    marginTop: 10, // Space above the title to separate it from previous elements.
    flexDirection: "row", // If the title includes an icon next to text, lay them out horizontally.
    alignItems: "center", // Vertically center icon and title text for neat alignment.
  },

  // Grid container for category buttons allowing wrapping.
  categoryGrid: {
    flexDirection: "row", // Place category buttons in a horizontal row that can wrap.
    flexWrap: "wrap", // Allow buttons to move to the next line when space runs out (responsive layout).
    gap: 10, // Space between buttons so they don't touch (supported in newer RN versions or web).
  },

  // Style for individual category button in the grid (neutral state).
  categoryButton: {
    flexDirection: "row", // If button shows icon + text, arrange them horizontally.
    alignItems: "center", // Vertically center icon and label inside the button.
    paddingHorizontal: 16, // Horizontal padding to keep label away from edges.
    paddingVertical: 10, // Vertical padding to make the button comfortably tappable.
    borderRadius: 20, // Rounded pill-like shape to match other rounded UI elements.
    borderWidth: 1, // Border to define the button shape in neutral state.
    borderColor: COLORS.border, // Theme border color to keep consistent design.
    backgroundColor: COLORS.white, // White background for neutral appearance and contrast.
  },

  // Active state for category button when selected.
  categoryButtonActive: {
    backgroundColor: COLORS.primary, // Fill selected category with primary color to indicate active selection.
    borderColor: COLORS.primary, // Match border to background when active for a cleaner look.
  },

  // Small spacing to the right of category icon.
  categoryIcon: {
    marginRight: 6, // Space between icon and label inside category button for visual clarity.
  },

  // Text style for category label when not active.
  categoryButtonText: {
    color: COLORS.text, // Use primary text color for neutral state readability.
    fontSize: 14, // Slightly smaller size appropriate for label text inside compact buttons.
  },

  // Text color for category label when active (on primary background).
  categoryButtonTextActive: {
    color: COLORS.white, // White text contrasts with primary background when selected.
  },

  // Container used to center a loading spinner while performing async save operations.
  loadingContainer: {
    padding: 20, // Padding around loader so it doesn't touch edges when shown inside a card or container.
    alignItems: "center", // Center loader horizontally inside container.
    justifyContent: "center", // Center loader vertically inside container for balanced layout.
  },
});
