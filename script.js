// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./storage.js";

// window.onload = function () {
//   const users = getUserIds();
//   document.querySelector("body").innerText = `There are ${users.length} users`;
// };

document.addEventListener('DOMContentLoaded', () => {
  const userSelect = document.getElementById("userSelect");
  const bookmarkList = document.getElementById("bookmarksList");
  const bookmarkMessage = document.getElementById("bookmarkMessage");
  const bookmarkForm = document.getElementById("bookmarkForm");
  const urlInput = document.getElementById("url");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description") 

  let currentUserId = null;

  function displayUsers() {
    const userIds = getUserIds()
    console.log(userIds, "users")
    userIds.forEach(userId => {
      const option = document.createElement("option");
      option.value = userId;
      option.textContent = `user: ${userId}`;
      userSelect.appendChild(option)
    })

  }
  
  displayUsers()
})