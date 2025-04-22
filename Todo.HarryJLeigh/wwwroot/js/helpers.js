// Get Dom element by ID.
export function getById(id) {
    return document.getElementById(id);
}

// Remove all child nodes of a given element, clearing its content.
export function clearElement(element) {
    element.innerHTML = '';
}

// Create a paragraph element with text content and an optional CSS class.
export function makeParagraph(text, className = "") {
    const p = document.createElement("p");
    p.textContent = text;
    if (className) {
        p.className = className;
    }
    return p;
}

// Create a button element with label, click handler and optional CSS class.
export function makeButton(text, onClick, className = "") {
    const btn = document.createElement("button");
    btn.textContent = text;
    if (className) btn.className = className;
    btn.addEventListener("click", onClick);
    return btn;
}