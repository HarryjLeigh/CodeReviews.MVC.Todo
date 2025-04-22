import * as Dom from "./dom.js";

// Base API endpoint fro todo items
const uri = "api/todoItems";

// Fetch al todo items from the server and display them
export function GetItems() {
    fetch(uri)
        .then(res => res.json())
        .then(data => Dom.displayItems(data))
        .catch(err => console.log("Error fetching items: ", err));
}

// Add a new todo tiem based on text input value
export function AddItem() {
    // Read and trim user input
    const input = document.querySelector("#add__name");
    const inputTrimmed = input.value.trim();

    // Prepare the new todo object
    const todo = {
        isComplete: false,
        name: inputTrimmed
    }

    // Validate name
    if (todo.name === null || todo.name === "") {
        Dom.displayErrorMessage(true);
        return;
    }

    // Remove error if todo name is populated
    Dom.displayErrorMessage(false);

    // Send POST request to add the todo
    fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(todo)
    })
        .then(res => res.json())
        .then(data => GetItems())
        .catch(err => console.log("Error adding item: ", err));

}

// Delete a todo item by its ID
export function DeleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    })
        .then(() => GetItems())
        .catch(err => console.log("Error deleting item: ", err));
}

// Update an existing todo from the edit form inputs.
export function UpdateItem() {
    // Read values from edit form/
    const editForm = document.querySelector("#editForm");
    const todoId = document.getElementById("edit-id").value;

    // Prepare the new todo object
    const todo = {
        Id: parseInt(todoId, 10),
        Name: document.getElementById("edit-name").value.trim(),
        IsComplete: document.getElementById("edit-isComplete").checked,
    }

    // Hide the form UI immediately
    editForm.style.display = "none";

    // Send PUT request to update the item
    fetch(`${uri}/${todo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(todo)
    })
        .then(data => {
                GetItems()
                Dom.displaySuccessMessage(true)
            }
        )
        .catch(err => console.log("Error updating item: ", err));
}