// This file defines all the styles used by the Home screen in a React Native app.

import { StyleSheet } from "react-native"; // Import StyleSheet from React Native — used to create an optimized style object for native platforms.
import { COLORS } from "../../constants/colors"; // Import COLORS constant which holds the app's color palette so styles stay consistent and easy to change.

// Export a named constant `styles` which holds all style rules for the Home screen.
export const styles = StyleSheet.create({
  // Root container that fills the screen and sets the background color for the whole screen.
  container: {
    flex: 1, // Makes this container expand to fill all available space in its parent (commonly the whole screen).
    backgroundColor: COLORS.background, // Uses a theme color for the screen background so visual theme is consistent across the app.
  },

  // Content wrapper inside the container that provides inner padding.
  content: {
    padding: 20, // Adds spacing inside the content area so children don't touch edges of the screen.
    paddingBottom: 0, // Overrides bottom padding to 0 (useful when you want different spacing at the bottom).
  },

  // Header area that contains top-level controls (logo, welcome, icons) arranged horizontally.
  header: {
    flexDirection: "row", // Lays out child elements horizontally (left to right) inside the header.
    justifyContent: "space-between", // Distributes extra space between children so first and last are at edges.
    alignItems: "center", // Vertically centers children within the header row for consistent alignment.
    marginBottom: 20, // Adds space under the header separating it from content below.
    paddingHorizontal: 0, // No additional horizontal padding — header contents can use full width if needed.
    paddingVertical: 12, // Adds vertical padding to increase touch target area and visual spacing.
  },

  // Left section of the header that groups logo and welcome text together.
  headerLeft: {
    flex: 1, // Gives this area flexible width so it can take available space next to right-side icons.
    flexDirection: "row", // Arrange logo and text horizontally inside this left section.
    alignItems: "center", // Vertically center items like logo and username for even alignment.
  },

  // Style for the logo image in the header.
  headerLogo: {
    width: 75, // Sets the width of the logo image in pixels.
    height: 75, // Sets the height of the logo image in pixels.
  },

  // Container for the welcome texts (small label + username).
  welcomeContainer: {
    flex: 1, // Allows welcomeContainer to take the rest of the space in the header left area.
  },

  // Small label text above the username that gives context (like "Welcome back").
  welcomeText: {
    fontSize: 14, // A small readable text size for subtle information.
    color: COLORS.textLight, // Uses a lighter text color for secondary information so it doesn't compete with primary text.
    marginBottom: 2, // Small space below this label to separate it from the username.
  },

  // Username text style — more prominent than the welcome label.
  usernameText: {
    fontSize: 16, // Slightly larger font size to make username readable and prominent.
    fontWeight: "600", // Semi-bold weight to give the username visual importance.
    color: COLORS.text, // Uses the main text color from theme for clarity and contrast.
  },

  // Right side of header that holds small action icons (add, logout, etc.).
  headerRight: {
    flexDirection: "row", // Arrange right-side icons horizontally next to each other.
    alignItems: "center", // Vertically center icons for neat alignment with the header.
    gap: 12, // Provides horizontal spacing between action icons (gap is supported by React Native newer versions or on web via RNW).
  },

  // Large title text displayed near the top of the screen (e.g., "Overview").
  headerTitle: {
    fontSize: 28, // Big font size for the screen title so it stands out.
    fontWeight: "bold", // Bold weight to emphasize importance of the title.
    color: COLORS.text, // Primary text color for maximum readability.
  },

  // Button used to add a new transaction — visually prominent with primary color and rounded corners.
  addButton: {
    backgroundColor: COLORS.primary, // Primary theme color used to indicate main action.
    paddingHorizontal: 16, // Left and right padding to enlarge the touch area horizontally.
    paddingVertical: 10, // Top and bottom padding to enlarge the touch area vertically.
    borderRadius: 24, // Rounded corners to match modern mobile UI patterns and give friendly look.
    flexDirection: "row", // If the button has icon + text, lay them out side-by-side.
    alignItems: "center", // Vertically center the icon and text inside the button.
    shadowColor: "#000", // Shadow color — used for elevation effect on iOS (shadow) and Android uses elevation prop.
    shadowOffset: { width: 0, height: 2 }, // Shadow offset to position the shadow slightly below the element.
    shadowOpacity: 0.1, // How dark the shadow appears on iOS.
    shadowRadius: 4, // Blurriness of the shadow on iOS.
    elevation: 3, // Android elevation — creates consistent shadow-like effect on Android devices.
  },

  // Text inside the Add button.
  addButtonText: {
    color: COLORS.white, // Button text should contrast with primary background, so white is used.
    fontWeight: "600", // Semi-bold text to look clear on small screens.
    marginLeft: 4, // Small space between icon and text if icon exists to avoid cramping.
  },

  // Styling for the logout/profile icon button.
  logoutButton: {
    padding: 10, // Extra padding makes hit area bigger for better UX when tapping small icons.
    borderRadius: 20, // Rounded corners for icon container to visually separate it from flat content.
    backgroundColor: COLORS.card, // Use card color so icon appears on a small surface matching cards elsewhere.
    shadowColor: "#000", // Subtle shadow to lift the button off the background slightly.
    shadowOffset: { width: 0, height: 1 }, // Light shadow offset downward.
    shadowOpacity: 0.05, // Very faint shadow on iOS for minimal elevation.
    shadowRadius: 2, // Slight blur for the shadow on iOS.
    elevation: 1, // Small elevation on Android for consistent visual lift.
  },

  // Card that shows balance and quick stats — uses rounded shape and shadow.
  balanceCard: {
    backgroundColor: COLORS.card, // Card color (usually white) to make content stand out from background.
    borderRadius: 20, // Rounded corners to match app's aesthetic.
    padding: 20, // Internal spacing so content inside the card doesn't touch edges.
    marginBottom: 20, // Space below the card to separate it from the next block.
    shadowColor: COLORS.shadow, // Use theme shadow color for subtle depth.
    shadowOffset: {
      width: 0, // Horizontal shadow offset.
      height: 2, // Vertical shadow offset to place shadow below the card.
    },
    shadowOpacity: 0.1, // Slight shadow opacity for visible but not overpowering depth.
    shadowRadius: 3, // How soft the shadow looks on iOS.
    elevation: 3, // Android elevation that matches the visual depth on Android.
  },

  // Small label inside balance card (e.g., "Total balance").
  balanceTitle: {
    fontSize: 16, // Legible size for labels.
    color: COLORS.textLight, // Secondary text color to make it less dominant than the numeric value.
    marginBottom: 8, // Space below label separating it from the amount.
  },

  // The numeric balance amount style — big and bold to be the focus.
  balanceAmount: {
    fontSize: 32, // Large font to emphasize the number as the most important data on the card.
    fontWeight: "bold", // Bold weight to make it visually dominant.
    color: COLORS.text, // Primary text color for strong contrast and readability.
    marginBottom: 20, // Space below the number to separate it from stats/controls.
  },

  // Container that holds income/expense stats side-by-side.
  balanceStats: {
    flexDirection: "row", // Arrange stat items horizontally (income and expense side by side).
    justifyContent: "space-between", // Distribute available space between stat items.
  },

  // Each stat item inside balanceStats.
  balanceStatItem: {
    flex: 1, // Allows stat items to grow equally and share available space.
    alignItems: "center", // Center content inside each stat item horizontally.
  },

  // A vertical divider style used between the two stats — subtle separation.
  statDivider: {
    borderRightWidth: 1, // Draws a vertical line on the right side for separation.
    borderColor: COLORS.border, // Use theme border color so divider matches the design system.
  },

  // Label above each stat amount (e.g., "Income" or "Expense").
  balanceStatLabel: {
    fontSize: 14, // Slightly smaller font for descriptive labels.
    color: COLORS.textLight, // Secondary color for less visual emphasis.
    marginBottom: 4, // Small space between label and the number.
  },

  // The amount inside the stat (e.g., "₹1,200").
  balanceStatAmount: {
    fontSize: 18, // Medium-large font for numbers to be readable but not overpowering.
    fontWeight: "600", // Semi-bold for clear readability.
  },

  // Title style for different sections on the screen.
  sectionTitle: {
    fontSize: 18, // Reasonable heading size for section titles.
    fontWeight: "600", // Semi-bold to highlight the section name.
    color: COLORS.text, // Primary text color for consistency.
    marginBottom: 15, // Space under the title separating it from content.
  },

  // Card for each transaction row — horizontal layout containing icon, text and amount.
  transactionCard: {
    backgroundColor: COLORS.card, // Card color to separate each list item from the screen background.
    borderRadius: 12, // Rounded corners for each transaction to appear as a chip/card.
    marginBottom: 10, // Space between consecutive transaction cards.
    flexDirection: "row", // Place icon, title, and amount horizontally.
    alignItems: "center", // Vertically center children inside the transaction row.
    shadowColor: COLORS.shadow, // Subtle shadow to lift each row slightly.
    shadowOffset: {
      width: 0, // No horizontal offset for this shadow.
      height: 1, // Small vertical offset so shadow is beneath the row.
    },
    shadowOpacity: 0.1, // Light shadow opacity for barely noticeable depth.
    shadowRadius: 2, // Small blur radius for the shadow.
    elevation: 2, // Android elevation for consistent visual subtlety.
  },

  // Content wrapper within transaction card for spacing and layout.
  transactionContent: {
    flex: 1, // Use remaining horizontal space so content area can grow/shrink.
    flexDirection: "row", // Align left section (icon + text) and right section horizontally.
    padding: 15, // Inner padding so content doesn't touch the card edges.
    alignItems: "center", // Vertically center items inside the content area.
  },

  // Circle background for category icon.
  categoryIconContainer: {
    width: 40, // Fixed width so all icons look equal.
    height: 40, // Fixed height for square shape which becomes circle with borderRadius.
    borderRadius: 20, // Half of width/height to make it a perfect circle.
    backgroundColor: "#F5F5F5", // Light neutral background so icons stand out.
    justifyContent: "center", // Center the icon horizontally.
    alignItems: "center", // Center the icon vertically.
    marginRight: 12, // Space between the icon and the transaction text.
  },

  // Left column inside transaction row containing title and category text.
  transactionLeft: {
    flex: 1, // Allow left section to take available space so title/desc can grow.
  },

  // Title of the transaction (what it was for).
  transactionTitle: {
    fontSize: 16, // Readable font size for the main text in a list.
    fontWeight: "500", // Medium weight for clear but not heavy emphasis.
    color: COLORS.text, // Primary text color to stand out on card.
    marginBottom: 4, // Small space between title and category text.
  },

  // Category or description text that appears below the title.
  transactionCategory: {
    fontSize: 14, // Slightly smaller font for secondary information.
    color: COLORS.textLight, // Lighter color to show it's less important than the title.
  },

  // Right side column of the transaction row (amount + date).
  transactionRight: {
    alignItems: "flex-end", // Align amount and date to the right so they appear flush-right.
  },

  // Style for the transaction amount (could be green for income, red for expense in dynamic code).
  transactionAmount: {
    fontSize: 16, // Size matching title to balance visual hierarchy.
    fontWeight: "600", // Slightly heavier weight to make amount clear and noticeable.
    marginBottom: 4, // Small gap between amount and date below.
  },

  // Date text under the amount, smaller and lighter.
  transactionDate: {
    fontSize: 12, // Small font for auxiliary information like date.
    color: COLORS.textLight, // Use secondary text color to make it less dominant.
  },

  // Delete button area on the right with thin divider.
  deleteButton: {
    padding: 15, // Make touch target large so users can tap easily.
    borderLeftWidth: 1, // Divider line that separates delete area from main content.
    borderLeftColor: COLORS.border, // Use theme border color so it integrates with the design system.
  },

  // Wrapper for the full transactions list block.
  transactionsContainer: {
    marginBottom: 20, // Space below the list block to separate it from other sections.
  },

  // Loading container used when fetching data — centers spinner in the screen.
  loadingContainer: {
    flex: 1, // Fill available space so the loader can center vertically.
    justifyContent: "center", // Center children vertically inside the container.
    alignItems: "center", // Center children horizontally as well.
    backgroundColor: COLORS.background, // Keep background consistent while loading.
  },

  // Empty state card shown when there are no transactions.
  emptyState: {
    backgroundColor: COLORS.card, // Use card color so empty message appears on a distinct surface.
    borderRadius: 16, // Rounded corners to match the app's cards style.
    padding: 30, // Large padding so empty state feels spacious and friendly.
    alignItems: "center", // Center contents horizontally for a balanced empty state layout.
    justifyContent: "center", // Center contents vertically for even alignment.
    marginTop: 10, // Slight top margin to separate from header or previous content.
    shadowColor: COLORS.shadow, // Shadow color from theme for subtle elevation.
    shadowOffset: { width: 0, height: 1 }, // Slight shadow offset.
    shadowOpacity: 0.1, // Soft shadow opacity for iOS.
    shadowRadius: 2, // Blur radius for shadow.
    elevation: 2, // Android elevation matching the visual depth.
  },

  // Icon area inside the empty state card (often an illustration).
  emptyStateIcon: {
    marginBottom: 16, // Space between the icon and title to keep layout airy.
  },

  // Title text for the empty state (e.g., "No transactions yet").
  emptyStateTitle: {
    fontSize: 18, // Headline size for the empty state.
    fontWeight: "600", // Semi-bold to make the title clear and friendly.
    color: COLORS.text, // Primary text color for readability.
    marginBottom: 8, // Space below the title before descriptive text.
  },

  // Description text explaining the empty state and next actions.
  emptyStateText: {
    color: COLORS.textLight, // Secondary color to make it less visually heavy than the title.
    fontSize: 14, // Normal body font size for readability.
    textAlign: "center", // Center-align text so it looks neat under the title.
    marginBottom: 20, // Space after description and before the call-to-action button.
    lineHeight: 20, // Line height improves readability when text wraps to multiple lines.
  },

  // Button shown inside the empty state card to take action (like "Add your first transaction").
  emptyStateButton: {
    backgroundColor: COLORS.primary, // Primary action color to attract attention.
    flexDirection: "row", // If button has icon + text, lay them out horizontally.
    alignItems: "center", // Center icon and text vertically.
    paddingVertical: 10, // Vertical padding to make the button easy to tap.
    paddingHorizontal: 16, // Horizontal padding to keep text comfortable inside the button.
    borderRadius: 20, // Rounded pill-like button for friendly aesthetics.
    shadowColor: "#000", // Subtle shadow to lift the button visually.
    shadowOffset: { width: 0, height: 2 }, // Shadow position below the button.
    shadowOpacity: 0.1, // Soft shadow opacity.
    shadowRadius: 3, // Blur radius for shadow on iOS.
    elevation: 2, // Android elevation for consistent visual effect.
  },

  // Text style for the button inside the empty state.
  emptyStateButtonText: {
    color: COLORS.white, // White text contrasts with the primary button background.
    fontWeight: "600", // Semi-bold for readability on small buttons.
    marginLeft: 6, // Small gap between an optional icon and the text.
  },

  // Container for the header above the transaction list with title and action button.
  transactionsHeaderContainer: {
    flexDirection: "row", // Layout children (title and actions) horizontally.
    justifyContent: "space-between", // Put title on left and actions on right with space between.
    alignItems: "center", // Vertically center both title and actions.
    marginBottom: 10, // Space below header before the list starts.
    paddingBottom: 5, // Small padding at bottom for visual separation.
  },

  // Outer style for the list of transactions — gives side margins.
  transactionsList: {
    flex: 1, // Allow list to expand and fill available vertical space.
    marginHorizontal: 20, // Left and right margin so list content doesn't touch screen edges.
  },

  // Content container style used by FlatList to add bottom padding for scroll area.
  transactionsListContent: {
    paddingBottom: 20, // Ensure there's space at the bottom of scrollable content so last item is not obscured.
  },
});
