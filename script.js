// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getData, getUserIds, setData } from "./storage.js";

// window.onload = function () {
//   const users = getUserIds();
//   document.querySelector("body").innerText = `There are ${users.length} users`;
// };

document.addEventListener("DOMContentLoaded", () => {
  const userSelect = document.getElementById("userSelect");
  const bookmarkList = document.getElementById("bookmarksList");
  const bookmarkMessage = document.getElementById("bookmarkMessage");
  const bookmarkForm = document.getElementById("bookmarkForm");
  const urlInput = document.getElementById("url");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");

  let currentUserId = null;

  function displayUsers() {
    const userIds = getUserIds();
    userIds.forEach((userId) => {
      const option = document.createElement("option");
      option.value = userId;
      option.textContent = `user: ${userId}`;
      userSelect.appendChild(option);
    });
  }

  // handle user  selectionchange
  userSelect.addEventListener("change", (e) => {
    currentUserId = e.target.value;
    console.log(currentUserId);
    diplayBookmarks();
  });

  // display bookmarks
  function diplayBookmarks() {
    if (!currentUserId) return;

    let bookmarks = getData(currentUserId);
    // If null, initialize as empty array
    if (!bookmarks) bookmarks = [];

    bookmarkList.innerHTML = "";

    if (bookmarks.length === 0) {
      bookmarkMessage.style.display = "block";
    } else {
      bookmarkMessage.style.display = "none";
      bookmarks.forEach((bookmark, index) => {
        // creating li
        const listItem = document.createElement("li");

        // create title
        const title = document.createElement("h4");
        title.textContent = bookmark.title;

        // create link
        const titleLink = document.createElement("a");
        titleLink.href = bookmark.url;
        titleLink.target = "_blank";
        titleLink.textContent = bookmark.url;

        // create description
        const description = document.createElement("p");
        description.textContent = bookmark.description;

        // time stamp
        const timeStamp = document.createElement("small");
        timeStamp.textContent = `posted at: ${new Date(
          bookmark.createdAt
        ).toLocaleString()}`;

        // delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";
        deleteButton.classList.add("delete-button");

        // append elements to the list
        listItem.appendChild(title);
        listItem.appendChild(titleLink);
        listItem.appendChild(description);
        listItem.appendChild(timeStamp);
        listItem.appendChild(deleteButton);

        bookmarkList.appendChild(listItem);

        deleteButton.addEventListener("click", () => deleteBookmark(index));
      });
    }
  }


  // handle form submission
  bookmarkForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newBookmark = {
      url: urlInput.value,
      title: titleInput.value,
      description: descriptionInput.value,
      createdAt: Date.now() // current time
    }

    let existingBookmarks = getData(currentUserId);
    if(!existingBookmarks) existingBookmarks = [];

    // add new bookmark
    existingBookmarks.push(newBookmark);
    setData(currentUserId, existingBookmarks)

    // clear input after submit
    urlInput.value = "";
    titleInput.value = "";
    descriptionInput.value = "";

    // display the updated list of bookmarks
    diplayBookmarks()
  })



  // delete single bookmark
  function deleteBookmark(index) {
    let bookmarks = getData(currentUserId);
    if (!bookmarks) return;
    bookmarks.splice(index, 1);
    setData(currentUserId, bookmarks);
    diplayBookmarks();
  }

  displayUsers();
  diplayBookmarks();
});
