import { displayBookmarks } from '../script.js'; 
import * as storage from '../storage.js'; 

jest.mock('../storage.js');

describe('Bookmark List Display', () => {
  test('Should display "No bookmarks available" message when bookmarks are empty', () => {
    storage.getData.mockReturnValue([]);
    document.body.innerHTML = `
      <select id="userSelect">
        <option value="1">User 1</option>
      </select>
      <ul id="bookmarksList"></ul>
      <p id="bookmarkMessage" style="display: none">No bookmarks available for this user.</p>
    `;
    const userSelect = document.getElementById('userSelect');
    const bookmarkMessage = document.getElementById('bookmarkMessage');
    userSelect.value = '1';
    userSelect.dispatchEvent(new Event('change'));

    displayBookmarks();

    expect(bookmarkMessage.style.display).toBe('block');
    expect(bookmarkMessage.textContent).toBe('No bookmarks available for this user.');
    const bookmarkList = document.getElementById('bookmarksList');
    expect(bookmarkList.children.length).toBe(0);
  });
});
