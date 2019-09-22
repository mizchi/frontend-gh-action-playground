import assert from "assert";

jest.retryTimes(10);

it("flaky", () => {
  assert.ok(Math.random() > 0.25);
});
