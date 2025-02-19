// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.



// Import necessary functions from the storage module
import { getData, getUserIds, setData, clearData } from "./storage.js";

// Export the displayBookmarks function for potential use in tests or elsewhere
export function displayBookmarks() {
  const userSelect = document.getElementById("userSelect");
  const bookmarkList = document.getElementById("bookmarksList");
  const bookmarkMessage = document.getElementById("bookmarkMessage");

  let currentUserId = userSelect.value; // Get the currently selected user
  if (!currentUserId) return;

  // Get the bookmarks associated with the selected user
  let bookmarks = getData(currentUserId); // getData comes from storage.js
  if (!bookmarks) bookmarks = []; // Initialize bookmarks as an empty array if null

  bookmarkList.innerHTML = ""; // Clear previous list of bookmarks

  // Check if there are any bookmarks
  if (bookmarks.length === 0) {
    bookmarkMessage.style.display = "block"; // Show the "No bookmarks available" message
  } else {
    bookmarkMessage.style.display = "none"; // Hide the "No bookmarks available" message
    bookmarks.forEach((bookmark, index) => {
      // Create a list item for each bookmark
      const listItem = document.createElement("li");

      // Create a title for the bookmark
      const title = document.createElement("h4");
      title.textContent = bookmark.title;

      // Create a link for the bookmark URL
      const titleLink = document.createElement("a");
      titleLink.href = bookmark.url;
      titleLink.target = "_blank";
      titleLink.textContent = bookmark.url;

      // Create a description for the bookmark
      const description = document.createElement("p");
      description.textContent = bookmark.description;

      // Display the timestamp when the bookmark was created
      const timeStamp = document.createElement("small");
      timeStamp.textContent = `posted at: ${new Date(bookmark.createdAt).toLocaleString()}`;

      // Create a delete button for the bookmark
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");

      // Append the created elements to the list item
      listItem.appendChild(title);
      listItem.appendChild(titleLink);
      listItem.appendChild(description);
      listItem.appendChild(timeStamp);
      listItem.appendChild(deleteButton);

      // Add the list item to the bookmark list
      bookmarkList.appendChild(listItem);

      // Add the delete functionality for the bookmark
      deleteButton.addEventListener("click", () =>
        deleteBookmark(index, bookmark.title)
      );
    });
  }
}

// Define the deleteBookmark function (it needs to be defined before it's used)
function deleteBookmark(index, title) {
  const confirmation = confirm(
    `Are you sure you want to delete this bookmark titled: ${title}?`
  );
  if (confirmation) {
    const currentUserId = document.getElementById("userSelect").value;
    let bookmarks = getData(currentUserId);
    if (!bookmarks) return;
    bookmarks.splice(index, 1);
    setData(currentUserId, bookmarks);
    displayBookmarks(); // Re-render the updated bookmarks
  }
}

// Set up event listeners after the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  const userSelect = document.getElementById("userSelect");
  const bookmarkList = document.getElementById("bookmarksList");
  const bookmarkMessage = document.getElementById("bookmarkMessage");
  const bookmarkForm = document.getElementById("bookmarkForm");
  const urlInput = document.getElementById("url");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");

  const clearBookmarksBtn = document.getElementById("clearBookmarksBtn");

  let currentUserId = null;

  function displayUsers() {
    const userIds = getUserIds();
    userSelect.innerHTML = ""; // Clear previous options

    userIds.forEach((userId) => {
      const option = document.createElement("option");
      option.value = userId;
      option.textContent = `user: ${userId}`;
      userSelect.appendChild(option);
    });
  }

  // Handle user selection change
  userSelect.addEventListener("change", (e) => {
    currentUserId = e.target.value;
    displayBookmarks();
  });

  // Handle form submission
  bookmarkForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newBookmark = {
      url: urlInput.value,
      title: titleInput.value,
      description: descriptionInput.value,
      createdAt: Date.now(), // current time
    };

    let existingBookmarks = getData(currentUserId);
    if (!existingBookmarks) existingBookmarks = [];

    // Add new bookmark
    existingBookmarks.push(newBookmark);
    setData(currentUserId, existingBookmarks);

    // Clear input fields after submission
    urlInput.value = "";
    titleInput.value = "";
    descriptionInput.value = "";

    urlInput.focus(); // Focus back to URL input

    // Display the updated list of bookmarks
    displayBookmarks();
  });

  // Clear all bookmarks for the selected user
  clearBookmarksBtn.addEventListener("click", () => {
    if (currentUserId) {
      const confirmation = confirm(
        "Are you sure you want to clear all bookmarks for this user?"
      );
      if (confirmation) {
        clearData(currentUserId); // Clear all bookmarks for the selected user
        displayBookmarks(); // Re-display bookmarks (will show "No bookmarks available" if cleared)
      }
    } else {
      alert("Please select a user first!");
    }
  });

  // Display users and their bookmarks
  displayUsers();
});
