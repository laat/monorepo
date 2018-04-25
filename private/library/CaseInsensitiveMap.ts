/**
 * CaseInsensitiveMap
 *
 * A Map implementation that maps from string to a value, where the key is case insensitive.
 */
export class CaseInsensitiveMap<T> implements Map<string, T> {
  private keyMap_: Map<string, string>;
  private valueMap_: Map<string, T>;

  constructor(entries?: ReadonlyArray<[string, T]>) {
    this.keyMap_ = new Map();
    this.valueMap_ = new Map();

    if (entries) {
      entries.forEach(([key, value]) => {
        const lowerKey = key.toLowerCase();
        this.keyMap_.set(lowerKey, key);
        this.valueMap_.set(lowerKey, value);
      });
    }
  }

  has(key: string) {
    return this.keyMap_.has(key.toLowerCase());
  }

  set(key: string, value: T) {
    const lowerKey = key.toLowerCase();

    if (!this.keyMap_.has(lowerKey)) {
      this.keyMap_.set(lowerKey, key);
    }

    this.valueMap_.set(lowerKey, value);
    return this;
  }

  get(key: string) {
    return this.valueMap_.get(key.toLowerCase());
  }

  delete(key: string) {
    const lowerKey = key.toLowerCase();
    this.keyMap_.delete(lowerKey);
    return this.valueMap_.delete(lowerKey);
  }

  clear() {
    this.keyMap_.clear();
    this.valueMap_.clear();
  }

  keys() {
    return this.keyMap_.values();
  }

  values() {
    return this.valueMap_.values();
  }

  get size() {
    return this.keyMap_.size;
  }

  entries() {
    const it = this.valueMap_.entries();
    const keyMap = this.keyMap_;
    return {
      next() {
        const res = it.next();
        res.value = res.value ? [keyMap.get(res.value[0])!, res.value[1]] : res.value;
        return res;
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  }
  [Symbol.iterator]() {
    return this.entries();
  }

  forEach(callbackfn: (value: T, key: string, map: Map<string, T>) => void, thisArg?: any) {
    const keyMap = this.keyMap_;
    this.valueMap_.forEach((value, key, map) => callbackfn(value, keyMap.get(key)!, this), thisArg);
  }

  readonly [Symbol.toStringTag] = "CaseInsensitiveMap" as "Map";
}
