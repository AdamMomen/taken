// <rootDir>/__mocks__/k6/http.ts
export default {
  request: jest.fn(() => {
    return {
      json: jest.fn((key) => key),
      status: 200,
      timings: {
        duration: 0,
      },
    };
  }),
};
