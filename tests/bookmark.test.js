// describe('User existence functionality', () => {
  
//     beforeEach(() => {
//       // Reset localStorage mock before each test
//       global.localStorage = {
//         getItem: jest.fn(),
//         setItem: jest.fn(),
//         removeItem: jest.fn(),
//       };
//     });
  
//     it('should return user data if user exists', () => {
//       // Mock localStorage to return a user object
//       const mockUser = { id: 1, name: 'John Doe' };
//       global.localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockUser));
  
//       // Call the function to check if user exists
//       const user = getUser();
  
//       // Assert that the returned user data is correct
//       expect(user).toEqual(mockUser);
//     });
  
//     it('should return null if user does not exist', () => {
//       // Mock localStorage to return null
//       global.localStorage.getItem.mockReturnValueOnce(null);
  
//       // Call the function to check if user exists
//       const user = getUser();
  
//       // Assert that no user data is found
//       expect(user).toBeNull();
//     });
//   });
  