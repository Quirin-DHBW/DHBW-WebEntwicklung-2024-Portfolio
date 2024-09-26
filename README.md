# Documentation for the Portfolioprojekt on the Topic "Web Entwicklung"

---

### Link to the website (for demo purposes)
https://quirin-dhbw.github.io/DHBW-WebEntwicklung-2024-Portfolio/


---
---

This project is a web-based note-keeping application inspired by [Trello](https://trello.com/), built as part of a submission for a DHBW Web Development project. It allows users to create draggable columns and cards, track tasks, and save the board’s state persistently using `localStorage`. This app also features a light/dark mode toggle, simulating modern web-based productivity tools.

---

## **Table of Contents**
1. [Installation](#installation)
2. [Concept](#concept)
3. [Architecture](#architecture)
4. [Detailed Functionality](#detailed-functionality)
   - [Card and Column Creation](#card-and-column-creation)
   - [Saving and Loading State](#saving-and-loading-state)
   - [Drag and Drop Functionality](#drag-and-drop-functionality)
   - [Light/Dark Mode Toggle](#light-dark-mode-toggle)
   - [Reset Functionality](#reset-functionality)
   - [Card Positioning (Gravity)](#card-positioning-gravity)
6. [Technologies Used](#technologies-used)

---

## **Installation**

To run this project, you don't need any special installations or setups. Follow these steps:

1. Clone or download the project repository.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, etc.).
3. No additional installations, frameworks, or packages are required, as everything runs client-side.

---

## **Concept**

The goal of this project was to simulate a task management tool akin to Trello. Users can create columns, fill them with cards (notes), drag and drop the cards between columns, and delete items when no longer needed. The application persists the state in the browser’s `localStorage`, so even if the page is refreshed or closed, the board state remains.

---

## **Architecture**

The application follows a simple structure consisting of HTML, CSS, and JavaScript. The key architecture choices include:

- **Columns and Cards**: 
   - Cards are nested within columns, allowing for drag-and-drop functionality. 
   - Each column and card has a unique ID to help track movement and state changes.
   
- **Persistence**: 
   - Board state (columns and cards) is saved in `localStorage`, enabling data persistence across page reloads.
   
- **Event Listeners**:
   - `DOMContentLoaded` ensures that event listeners for buttons (new column, new card, reset, toggle mode) are set up when the DOM is ready.
   
- **Drag-and-Drop Logic**:
   - Cards can be dragged between columns. The application recalculates their positioning within the columns to ensure they are always aligned properly. 
   
- **Styling**: 
   - CSS is used to style the layout and support dark and light modes.

---

## **Detailed Functionality**

### **Card and Column Creation**

- **createNewCard()** and **createNewColumn()** functions are responsible for dynamically generating new cards and columns.
  - **Columns**: New columns are created with a title that can be edited inline (`contenteditable`). Each column is represented as a `div` with a delete button that appears on hover.
  - **Cards**: Cards are also `div` elements with a draggable property. Each card contains a `textarea` where the user can type notes. Like columns, cards have a delete button for removal.

### **Saving and Loading State**

- **saveStateToLocalStorage()**: Every action (creating, editing, deleting columns/cards) triggers the function that serializes the current board state and saves it to `localStorage`. The state is saved as a JSON object representing each column and its associated cards.
  
- **importData()**: When the page loads, it checks `localStorage` for any previously saved board state. If a saved state exists, it dynamically rebuilds the columns and cards based on the stored data.

### **Drag and Drop Functionality**

- The drag-and-drop mechanism allows for moving cards between columns.
  - **handleDragStart()**: Initiates dragging by setting the card’s ID in the `dataTransfer` object.
  - **handleDrop()**: Handles dropping the card into a new column and recalculating the card's position.
  - **positionCards()**: After cards are dragged and dropped, this function repositions them to maintain proper vertical alignment within the column.

### **Light/Dark Mode Toggle**

- The light/dark mode functionality is controlled via a button in the header.
  - **toggleModeBtn** toggles the `light-mode` class on the `body` element, switching between dark (default) and light modes.
  - The mode is purely cosmetic, changing background colors and text color across the interface without altering functionality.

### **Reset Functionality**

- **resetBoard()**: Clears all the columns and cards from the board and resets the application state.
  - The reset also updates the `localStorage` to reflect the new, empty board.

### **Card Positioning (Gravity)**

- When cards are added, removed, or moved between columns, the application recalculates their positions so that they are evenly spaced and aligned with the top of the column.
  - This prevents gaps or overlaps between cards, creating a more seamless user experience.


## **Technologies Used**

- **HTML5**: Structuring the layout of the application.
- **CSS3**: Styling and visual customization, including responsive design and theming (light/dark mode).
- **JavaScript (ES6)**: 
   - DOM manipulation for dynamic creation and updating of columns/cards.
   - Event handling for drag-and-drop, button clicks, and localStorage operations.
   - Persistent state management using `localStorage`.

---
---

