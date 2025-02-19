import { getUserIds } from '../storage.js';
import { displayBookmarks } from '../script.js'; // Import your function
// import { displayBookmarks } from './script.js'; // Import the function to be tested
import * as storage from '../storage.js'; // Import the storage functions for mocking

test('getUserIds returns an array of user ids', () => {
  expect(getUserIds()).toEqual(expect.arrayContaining([expect.any(String)]));
});




// Mocking the storage functions before running the tests
jest.mock('./storage.js');

describe('Bookmark List Display', () => {
  test('Should display "No bookmarks available" message when bookmarks are empty', () => {
    // Mock the getData function to return an empty list of bookmarks
    storage.getData.mockReturnValue([]); // Simulating no bookmarks

    // Mock DOM setup
    document.body.innerHTML = `
      <select id="userSelect">
        <option value="1">User 1</option>
        <option value="2">User 2</option>
      </select>
      <ul id="bookmarksList"></ul>
      <p id="bookmarkMessage" style="display: none">No bookmarks available for this user.</p>
    `;

    const userSelect = document.getElementById('userSelect');
    const bookmarkMessage = document.getElementById('bookmarkMessage');

    // Simulate selecting a user (User 1)
    userSelect.value = '1';
    userSelect.dispatchEvent(new Event('change'));

    // Call the function to display bookmarks
    displayBookmarks();

    // Assert that the "No bookmarks available" message is shown
    expect(bookmarkMessage.style.display).toBe('block');
    expect(bookmarkMessage.textContent).toBe('No bookmarks available for this user.');

    // Ensure that no bookmarks are rendered in the list
    const bookmarkList = document.getElementById('bookmarksList');
    expect(bookmarkList.children.length).toBe(0); // Should be empty
  });
});

