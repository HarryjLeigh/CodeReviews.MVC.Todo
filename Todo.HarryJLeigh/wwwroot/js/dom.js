import {DeleteItem, GetItems} from "./api.js"
import * as helper from "./helpers.js";

// Local state
let todos = [];

// Show or hide the main UI (add box and todo table)
export function toggleUI(shouldDisplay) {
    helper.getById("add__box").style.display = shouldDisplay ? "block" : "none";
    helper.getById("displayTodos").style.display = shouldDisplay ? "table" : "none";
    helper.getById('delete__message').style.display = "none";
}

// Close the edit form and return to main UI
export function closeInput() {
    helper.getById("editForm").style.display = 'none';
    toggleUI(true);
}

// Render the list of todos in the table
export function displayItems(data) {
    // Update local state
    todos = data;

    // Show main UI and clear existing rows
    toggleUI(true);
    const tBody = helper.getById("todos");
    helper.clearElement(tBody);

    // Create a row for each todo item
    data.forEach(item => {
        const tr = tBody.insertRow();

        // Add checkbox is complete
        const isCompleteCheckbox = document.createElement("input");
        isCompleteCheckbox.type = "checkbox";
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;
        const td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);

        // Todo text
        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.name);
        td2.appendChild(textNode);

        // Edit button
        let td3 = tr.insertCell(2);
        const editBtn = helper.makeButton(
            "Edit", () => displayEditForm(item.id))
        td3.appendChild(editBtn);

        // Delete button
        let td4 = tr.insertCell(3);
        const deleteBtn = helper.makeButton(
            "Delete", () => displayDeleteMessage(item.id))
        td4.appendChild(deleteBtn);
    });
}

// Show the edit form for a specific todo
export function displayEditForm(id) {
    // Hide previous error
    displaySuccessMessage(false);
    displayErrorMessage(false)

    //Prepare form
    const editForm = helper.getById("editForm")
    const oldHint = document.querySelector(".editMessage")
    if (oldHint != null) editForm.removeChild(oldHint);
    toggleUI(false)

    // Populate inputs
    const item = todos.find(item => item.id === id);
    helper.getById("edit-name").value = item.name;
    helper.getById("edit-id").value = item.id;
    helper.getById("edit-isComplete").checked = item.isComplete;

    // Show form and add message
    editForm.style.display = 'block';
    const editMessage = helper.makeParagraph(
        "Press 'Save' to update to-do.",
        "editMessage");
    editForm.appendChild(editMessage);
}

// Display a temporary success message
export function displaySuccessMessage(shouldDisplay) {
    const successMessage = helper.getById("success__message");
    helper.clearElement(successMessage);


    let message = helper.makeParagraph("Todo has been updated!");
    successMessage.appendChild(message);
    successMessage.style.display = shouldDisplay ? "block" : "none";

    setTimeout(() => {
        successMessage.style.display = "none";
    }, 2000);
}

// Display an error message for invalid input
export function displayErrorMessage(shouldDisplay) {
    const errorMessage = helper.getById("error__message");
    helper.clearElement(errorMessage);


    let message = helper.makeParagraph("Todo cannot be empty!");
    errorMessage.appendChild(message);
    errorMessage.style.display = shouldDisplay ? "block" : "none";
}

// Show a confirmation dialog before deleting a todo
export function displayDeleteMessage(id) {
    // Reset messages and UI
    displaySuccessMessage(false);
    displayErrorMessage(false);
    toggleUI(false);

    // Gather todo details
    const todo = todos.find(item => item.id === id);
    const deleteMessageDiv = helper.getById('delete__message');
    helper.clearElement(deleteMessageDiv);

    // Build dialog
    let deleteHeader = document.createElement("h3");
    deleteHeader.innerText = "Delete";

    // Confirmation buttons 
    const yesBtn = helper.makeButton("Yes", () => DeleteItem(id))
    const noBtn = helper.makeButton("No", GetItems)

    // Add elements to div, div style to block
    deleteMessageDiv.append(
        deleteHeader,
        helper.makeParagraph(
            `Is Complete: ${todo.isComplete ? "Yes" : "No"}`),
        helper.makeParagraph(`To-do: ${todo.name}`),
        helper.makeParagraph("Are you sure you want to delete?"),
        yesBtn,
        noBtn
    )
    deleteMessageDiv.style.display = "block";
}

