import { HeartButton } from "./heart-button";

describe("heart button", () => {
  beforeEach(() => {
    this.btn = new HeartButton();
  });

  it("should set the key property", () => {
    expect(this.btn.key).toBe("crds-hearts");
  });

  it("should set return likes array", () => {
    expect(this.btn.likes()).toEqual([]);
  });

  it("should set return likes array", () => {
    expect(this.btn.likes()).toEqual([]);
  });

  it("should return count", () => {
    this.btn.getCount().then(() => {
      expect(this.btn.count).toBe(0);
    });
  });
});
