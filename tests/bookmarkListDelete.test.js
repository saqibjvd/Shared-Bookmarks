import { displayBookmarks } from '../script.js';
import * as storage from '../storage.js';

jest.mock('../storage.js');

// Mock window.confirm to simulate a "Yes" response
window.confirm = jest.fn().mockImplementation(() => true);

describe('Bookmark List Display', () => {
  test('Should delete a bookmark when confirmed', () => {
    // Mock data setup
    const mockBookmarks = [
      { title: 'Test Bookmark 1', url: 'http://example.com', description: 'Test 1', createdAt: Date.now() },
      { title: 'Test Bookmark 2', url: 'http://example.com', description: 'Test 2', createdAt: Date.now() },
    ];
    storage.getData.mockReturnValue(mockBookmarks);
    storage.setData.mockImplementation(() => {}); // Mock setData to prevent actual changes

    // Mock DOM setup
    document.body.innerHTML = `
      <select id="userSelect">
        <option value="1">User 1</option>
      </select>
      <ul id="bookmarksList"></ul>
      <p id="bookmarkMessage" style="display: none">No bookmarks available for this user.</p>
    `;

    const userSelect = document.getElementById('userSelect');
    const bookmarkMessage = document.getElementById('bookmarkMessage');
    const bookmarkList = document.getElementById('bookmarksList');

    // Simulate selecting a user
    userSelect.value = '1';
    userSelect.dispatchEvent(new Event('change'));

    // Initial rendering of bookmarks
    displayBookmarks();

    // Check initial state
    expect(bookmarkList.children.length).toBe(2);  // Should have 2 bookmarks initially

    // Trigger delete action on the first bookmark
    const deleteButton = bookmarkList.querySelector('button');
    deleteButton.click();

    // Re-render the bookmarks after deletion
    displayBookmarks();

    // Assert that the bookmark was deleted and the list is now empty
    expect(bookmarkList.children.length).toBe(1);  // Should have only 1 bookmark left after deletion
    expect(window.confirm).toHaveBeenCalledWith(
      expect.stringContaining('Are you sure you want to delete this bookmark')
    );
  });
});
