import IdentityCache from "./identity_cache";
import Cacheable from "./cacheable";

describe("IdentityCache", () => {
  let cache = new IdentityCache();
  let cached = {id: 1};
  it("stores and fetches", () => {
    expect(cache.store(cached)).toBe(cached);
  });

  it("overwrites on multiple store", () => {
    cache.store(cached);
    cache.store({id: 1, name: "Foo"});
    expect(cache.fetch(1)).toBe(cached);
    expect(cache.fetch(1).name).toEqual("Foo");
  });

});
