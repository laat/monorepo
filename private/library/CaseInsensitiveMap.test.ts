import { CaseInsensitiveMap } from "./CaseInsensitiveMap";

describe("CaseInsensitiveMap", () => {
  it("should be able to construct", () => {
    const map: Map<string, string> = new CaseInsensitiveMap<string>();
  });
  it("should be able to construct with values", () => {
    const map: Map<string, string> = new CaseInsensitiveMap<string>([["key", "value"], ["key2", "value2"]]);
  });
  it("has case insensitive keys", () => {
    const map: Map<string, string> = new CaseInsensitiveMap<string>([["KEY", "value"]]);
    expect(map.has("key")).toBeTruthy();
    expect(map.has("KEY")).toBeTruthy();
    expect(map.has("KeY")).toBeTruthy();
  });
  it("can delete case insensitive", () => {
    const map: Map<string, string> = new CaseInsensitiveMap<string>([["KEY", "value"]]);
    expect(map.has("key")).toBeTruthy();
    expect(map.delete("key")).toBeTruthy();
    expect(map.delete("key")).toBeFalsy();
    expect(map.has("key")).toBeFalsy();
    expect(map.has("KEY")).toBeFalsy();
  });
  it("can set/get case insensitive", () => {
    const map: Map<string, string> = new CaseInsensitiveMap<string>();
    map.set("KeY", "value");
    expect(map.get("key")).toEqual("value");
  });
  it("returns the original keys used. in their proper casing. keys()", () => {
    const map: Map<string, string> = new CaseInsensitiveMap<string>();
    map.set("KeY", "value");
    map.set("Foo", "value");
    map.set("bAAr", "value");
    expect(Array.from(map.keys())).toEqual(["KeY", "Foo", "bAAr"]);
  });
  it("returns the original keys used. in their proper casing. entries()", () => {
    const map: Map<string, string> = new CaseInsensitiveMap<string>();
    map.set("KeY", "value");
    map.set("Foo", "value");
    map.set("bAAr", "value");
    expect(Array.from(map.entries())).toEqual([["KeY", "value"], ["Foo", "value"], ["bAAr", "value"]]);
  });
  it("gives the original keys in forEach()", () => {
    const map: Map<string, string> = new CaseInsensitiveMap<string>();
    map.set("KeY", "value");
    map.set("Foo", "value");
    map.set("bAAr", "value");

    let found: string[] = [];

    map.forEach((value, key) => {
      found.push(key);
    });
    expect(found).toEqual(["KeY", "Foo", "bAAr"]);
  });
});
