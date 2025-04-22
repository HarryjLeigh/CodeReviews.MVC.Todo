/**
 * Main application entry point.
 * Sets up event listeners for add, edit, and cancel actions,
 * and initializes the todo list display on page load.
 */
import * as API from './api.js';
import * as DOM from "./dom.js";

// Wait until the HTML document is fully loaded before initializing 
window.addEventListener('DOMContentLoaded', () => {
    // Get form and button elements by their IDs
    const addForm = document.getElementById('add__form');
    const editForm = document.getElementById('edit__form');
    const cancelEdit = document.getElementById('cancel__edit');

    // Load and display all existing todo items.
    API.GetItems();

    // Call the API module to create todo
    addForm.addEventListener('submit', e => {
        e.preventDefault();
        API.AddItem();
    });

    // Call the API module to update the selected todo
    editForm.addEventListener('submit', e => {
        e.preventDefault();
        API.UpdateItem();
    })

    // Hide the edit form and return to the main view
    cancelEdit.addEventListener('click', e => {
        e.preventDefault();
        DOM.closeInput()
    })
});