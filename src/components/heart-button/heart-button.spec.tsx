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

  it("abbreviate count for large numbers", () => {
    this.btn.count = 645;
    expect(this.btn.abbrevCount()).toBe("645");
    this.btn.count = 1245;
    expect(this.btn.abbrevCount()).toBe("1.25K");
    this.btn.count = 2115;
    expect(this.btn.abbrevCount()).toBe("2K");
    this.btn.count = 12745;
    expect(this.btn.abbrevCount()).toBe("12.75K");
  });
});
