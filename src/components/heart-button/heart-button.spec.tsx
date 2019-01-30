import { HeartButton } from "./heart-button";

describe("<heart-button>", () => {
  beforeEach(() => {
    this.getCountFn = HeartButton.prototype.getCount = jest.fn();
    this.getCountFn.mockResolvedValue(123);
    this.btn = new HeartButton();
    this.btn.componentWillLoad();
  });

  it("should initialize total", () => {
    expect(this.getCountFn).toHaveBeenCalledTimes(1);
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

  it("should initialize count", () => {
    expect(this.btn.count).toBe(123);
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

  it("should handle empty count values gracefully", () => {
    expect(this.btn.abbrevCount()).toBe("123");
  });

  it("should de-dupe prior to save", () => {
    expect(this.btn.removeDuplicates(["a,", "b", "c", "c"])).toEqual([
      "a,",
      "b",
      "c"
    ]);
  });
});
