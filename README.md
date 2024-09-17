# Documentation for the Portfolioprojekt on the Topic "Web Entwicklung"

---

### Link to the website (for demo purposes)
https://quirin-dhbw.github.io/DHBW-WebEntwicklung-2024-Portfolio/


---
---

## "Installation"

- Have a modern Browser. Open the `index.html`.


---
---

## Concept

This WebApplication was written as a hand-in Project for the DHBW, and is an immitation of the TODO-List website [Trello](https://trello.com/).


---
---

## Architecture

This section touches on the architecture of the JavaScript Code, and why it was chosen that way.

Columns contain Cards, and the buttons create new ones with appropriate ID values. These id values allow for cards to then be targeted and moved with Javascript.

The board state is saved in localStorage to allow for persistence.


---
---

## Function Functionality

There's a small handful of functions, which create Columns and Cards, can Save the data, Load the data, and Delete Columns and Cards.
Additionally there are some functions to enable "snapping" of Cards to Columns, as well as ensuring they are pleasant to move by "pushing" other cards out of the way, and having a sort of "gravity" that keeps cards aligned with the top even if a Card in the middle of a Column is removed or moved.

#### createNewCard and createNewColumn

These two functions allow for the creation of new Columns and Cards. Columns are div objects which are put into the `columnContainer` div in the html, and each have an ID to manage their position and deletion/loading. The Column additionally contains a text field to hold it's Title, allowing the user to rename the Column. On hover a delete button also appears in the corner, allowing for the Column to be removed as well.\
Similarly Cards are created as div objects inside of a Column, also each with their own Card ID for moving, deletion, and loading. A Card also comes with a deletion button, as well as a Textbox for keeping the actual notes.

#### Saving and Deletion

Whenever a Column is Created, Renamed, or Deleted, or a Card is Created, Deleted, Edited, or Moved the program saves the new board state to `localStorage`. When first loading the page the presence of a save-file is detected, in which case that file is loaded. This iteratively reads the columns and their cards, and places them appropriately.

#### Dark Mode

The only correct option. A button toggles the addition of a "light-mode" css tag, which overrides only the dark-colors with eye-burning ones instead. As this additional class only overrides the color, all other formating remains intakt. Hitting the toggle button again simply removes this class from the objects, making them return to the one and only truth: dark mode.

#### Faux Gravity

When a Card is moved, created, or removed, the offset of all cards in that column are recalculated to be displayed properly. This allows for the Cards to align themselves vertically with the top of each column, and adjust to Cards moving, being added, or removed, properly.


---
---

