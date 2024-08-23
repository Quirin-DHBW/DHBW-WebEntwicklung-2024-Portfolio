document.addEventListener('DOMContentLoaded', () => {
    const columnsContainer = document.getElementById('columns-container');
    const newCardBtn = document.getElementById('new-card-btn');
    const newColumnBtn = document.getElementById('new-column-btn');
    const resetBtn = document.getElementById('reset-btn');
    const toggleModeBtn = document.getElementById('toggle-mode-btn');
    let columnCount = 0;
    let cardCount = 0;

    newCardBtn.addEventListener('click', createNewCard);
    newColumnBtn.addEventListener('click', createNewColumn);
    resetBtn.addEventListener('click', resetBoard);

    toggleModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            toggleModeBtn.textContent = '🌙'; // Moon symbol for light mode
        } else {
            toggleModeBtn.textContent = '☀'; // Sun symbol for dark mode
        }
    });

    function createNewCard() {
        const card = document.createElement('div');
        card.classList.add('card');
        card.draggable = true;
        card.innerHTML = '<textarea placeholder="Type here..."></textarea>';
        card.dataset.cardId = cardCount++;

        textarea = card.querySelector('textarea')
        // Detect when user clicks out of the textarea (blur event)
        textarea.addEventListener('blur', () => {
            saveStateToLocalStorage()
            console.log("CARD TEXT SAVED")
        });

        const deleteBtn = document.createElement('div');
        deleteBtn.classList.add('delete-btn-card');
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            card.remove();
            saveStateToLocalStorage()
            console.log("CARD REMOVAL SAVED")
        });
        card.appendChild(deleteBtn);

        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);

        const firstColumn = columnsContainer.querySelector('.column');
        if (firstColumn) {
            firstColumn.appendChild(card);
            positionCards(firstColumn);
        } else {
            alert('Create a column first.');
        }
        saveStateToLocalStorage()
        console.log("NEW CARD SAVED")
    }

    function createNewColumn() {
        columnCount++;
        const column = document.createElement('div');
        column.classList.add('column');
        column.dataset.columnId = columnCount;
        column.innerHTML = `
            <div class="column-title" contenteditable="true">Column ${columnCount}</div>
        `;

        titlearea = column.querySelector('div')
        titlearea.addEventListener('blur', () => {
            saveStateToLocalStorage()
            console.log("COLUMN TITLE SAVED")
        });
        
        const deleteBtn = document.createElement('div');
        deleteBtn.classList.add('delete-btn-col');
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', (e) => {
            column.remove();
            saveStateToLocalStorage()
            console.log("COLUMN REMOVAL SAVED")
        });
        column.appendChild(deleteBtn);
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('drop', handleDrop);
        columnsContainer.appendChild(column);
        saveStateToLocalStorage()
        console.log("NEW COLUMN SAVED")
    }

    function handleDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.dataset.cardId);
        event.target.classList.add('dragging');
    }

    function handleDragEnd(event) {
        event.target.classList.remove('dragging');
    }

    function handleDragOver(event) {
        event.preventDefault();
        const column = event.target.closest('.column');
        if (column) {
            column.classList.add('drag-over');
        }
    }

    function handleDrop(event) {
        event.preventDefault();
        const column = event.target.closest('.column');
        if (column) {
            column.classList.remove('drag-over');
            const cardId = event.dataTransfer.getData('text/plain');
            const card = document.querySelector(`.card[data-card-id='${cardId}']`);
            if (card) {
                const rect = column.getBoundingClientRect();
                const offsetY = event.clientY - rect.top;
                const cardElements = Array.from(column.querySelectorAll('.card'));
                let insertBeforeCard = null;
                
                for (let i = 0; i < cardElements.length; i++) {
                    const cardElement = cardElements[i];
                    const cardRect = cardElement.getBoundingClientRect();
                    if (offsetY < cardRect.top - rect.top + cardElement.offsetHeight / 2) {
                        insertBeforeCard = cardElement;
                        break;
                    }
                }
                
                column.insertBefore(card, insertBeforeCard);
                positionCards(column);
            }
        }
        saveStateToLocalStorage()
        console.log("CARD MOVEMENT SAVED")
    }

    function positionCards(column) {
        const cards = Array.from(column.querySelectorAll('.card'));
        let offsetTop = 0;
        cards.forEach(card => {
            card.style.marginBottom = '5px';
            card.style.top = `${offsetTop}px`;
            offsetTop += card.offsetHeight + 5;
        });
    }

    function saveStateToLocalStorage() {
        const data = {
            columns: []
        };
        document.querySelectorAll('.column').forEach(column => {
            const columnData = {
                id: column.dataset.columnId,
                title: column.querySelector('.column-title').textContent,
                cards: []
            };
            column.querySelectorAll('.card').forEach(card => {
                columnData.cards.push({
                    id: card.dataset.cardId,
                    content: card.querySelector('textarea').value
                });
            });
            data.columns.push(columnData);
        });
        const jsonData = JSON.stringify(data);
        localStorage.setItem('quirinFakeTrelloBoardData', jsonData);
        //console.log("Data saved to localStorage:", jsonData);
    }

    // Automatically load state from the cookie
    function importData() {
        const jsonData = localStorage.getItem('quirinFakeTrelloBoardData');
        if (jsonData) {
            const data = JSON.parse(jsonData);
            //console.log("Data imported from localStorage:", data);
            columnsContainer.innerHTML = '';
            columnCount = 0;
            cardCount = 0;
            data.columns.forEach(columnData => {
                columnCount = Math.max(columnCount, parseInt(columnData.id, 10));
                const column = document.createElement('div');
                column.classList.add('column');
                column.dataset.columnId = columnData.id;
                column.innerHTML = `
                    <div class="column-title" contenteditable="true">${columnData.title}</div>
                `;
                titlearea = column.querySelector('div')
                titlearea.addEventListener('blur', () => {
                    saveStateToLocalStorage()
                    console.log("COLUMN TITLE SAVED")
                });
                const deleteBtn = document.createElement('div');
                deleteBtn.classList.add('delete-btn-col');
                deleteBtn.textContent = '×';
                deleteBtn.addEventListener('click', (e) => {
                    column.remove();
                    saveStateToLocalStorage();
                    console.log("COLUMN REMOVAL SAVED")
                });
                column.appendChild(deleteBtn);
                column.addEventListener('dragover', handleDragOver);
                column.addEventListener('drop', handleDrop);
                columnsContainer.appendChild(column);
                columnData.cards.forEach(cardData => {
                    cardCount = Math.max(cardCount, parseInt(cardData.id, 10));
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.draggable = true;
                    card.dataset.cardId = cardData.id;
                    card.innerHTML = '<textarea placeholder="Type here..."></textarea>';
                    textarea = card.querySelector('textarea')
                    textarea.value = cardData.content;
                    // Detect when user clicks out of the textarea (blur event)
                    textarea.addEventListener('blur', () => {
                        saveStateToLocalStorage()
                        console.log("CARD TEXT SAVED")
                    });
                    const cardDeleteBtn = document.createElement('div');
                    cardDeleteBtn.classList.add('delete-btn-card');
                    cardDeleteBtn.textContent = '×';
                    cardDeleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        card.remove();
                        saveStateToLocalStorage();
                        console.log("CARD REMOVAL SAVED")
                    });
                    card.appendChild(cardDeleteBtn);
                    card.addEventListener('dragstart', handleDragStart);
                    card.addEventListener('dragend', handleDragEnd);
                    column.appendChild(card);
                });
                positionCards(column);
            });
            console.log("DATA LOADED SUCCESSFULLY")
        }
        else {
            console.log("DATA NOT FOUND!")
        }
    }

    // Call importData on DOMContentLoaded to load the state from the cookie
    window.onload = () => {
        console.log("ATTEMPTING TO LOAD DATA")
        importData();
    };

    // Clears all columns and cards
    function resetBoard() {
        columnsContainer.innerHTML = ''; // Remove all columns and their contents
        columnCount = 0; // Reset the column count
        cardCount = 0; // Reset the card count
        saveStateToLocalStorage(); // Save the empty state to localStorage
        console.log("BOARD RESET SAVED")
    }
});

