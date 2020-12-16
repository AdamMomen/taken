// <rootDir>/__mocks__/k6.ts
export = {
  group: jest.fn((name, callback) => callback()),
  check: jest.fn(() => true),
  fail: jest.fn(() => {
    throw new Error("Error");
  }),
};
