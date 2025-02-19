import { displayBookmarks } from '../script.js'; 
import * as storage from '../storage.js'; 

jest.mock('../storage.js');

describe('Bookmark List Display', () => {
  test('Should add a bookmark and display it in the list', () => {
    const newBookmark = {
      url: 'https://example.com',
      title: 'Example Title',
      description: 'An example description',
      createdAt: Date.now(),
    };

    // Mock getData to return an empty list initially
    storage.getData.mockReturnValue([newBookmark]);

    // Mock DOM setup
    document.body.innerHTML = `
      <select id="userSelect">
        <option value="1">User 1</option>
      </select>
      <ul id="bookmarksList"></ul>
      <p id="bookmarkMessage" style="display: none">No bookmarks available for this user.</p>
      <form id="bookmarkForm">
        <input type="url" id="url" value="${newBookmark.url}">
        <input type="text" id="title" value="${newBookmark.title}">
        <textarea id="description">${newBookmark.description}</textarea>
        <button type="submit">Add Bookmark</button>
      </form>
    `;

    const userSelect = document.getElementById('userSelect');
    const bookmarkMessage = document.getElementById('bookmarkMessage');
    const bookmarkList = document.getElementById('bookmarksList');
    const bookmarkForm = document.getElementById('bookmarkForm');

    // Simulate user selecting a user
    userSelect.value = '1';
    userSelect.dispatchEvent(new Event('change'));

    // Simulate form submission to add a bookmark
    bookmarkForm.dispatchEvent(new Event('submit'));

    // Call the function to display the updated bookmarks
    displayBookmarks();

    // Assert that the "No bookmarks available" message is hidden after adding a bookmark
    expect(bookmarkMessage.style.display).toBe('none');

    // Assert that a bookmark is added to the list
    expect(bookmarkList.children.length).toBe(1);  // Should be 1 bookmark in the list
    expect(bookmarkList.children[0].textContent).toContain(newBookmark.title);
    expect(bookmarkList.children[0].textContent).toContain(newBookmark.url);
  });
});
