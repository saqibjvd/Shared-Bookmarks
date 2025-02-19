import { getUserIds } from '../storage.js';

test('getUserIds returns an array of user ids', () => {
  expect(getUserIds()).toEqual(expect.arrayContaining([expect.any(String)]));
});
