import assert from "assert";

jest.retryTimes(10);
beforeEach(() => {
  console.log("xxx");
});

it("flaky", () => {
  assert.ok(Math.random() > 0.25);
});
