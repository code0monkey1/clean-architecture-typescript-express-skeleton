describe.skip('First Test', () => {
  it('one should be one', () => {
    expect(1).toBe(1);
  });
});

afterAll(() => {
  jest.clearAllMocks();
});
