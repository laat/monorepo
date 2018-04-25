export interface Trie {
  chars: { [char: string]: Trie };
  terminal?: boolean;
}

export const addToTrie = (text: string, trie: Trie) => {
  let node = trie;
  for (let pos = 0; pos < text.length; pos++) {
    const letter = text.charAt(pos);
    if (node.chars[letter] == null) {
      node.chars[letter] = { chars: {} };
    }
    node = node.chars[letter];
  }
  node.terminal = true;
};

export const findLongestMatch = (text: string, start: number, trie: Trie) => {
  let node = trie;
  let best = start - 1;
  for (let pos = start; pos < text.length; pos++) {
    const letter = text.charAt(pos);
    if (node.chars[letter] == null) {
      break;
    }
    node = node.chars[letter];
    if (node.terminal) {
      best = pos;
    }
  }
  return best - start + 1;
};

export type Match = {
  body: string;
  start: number;
  end: number;
  match: boolean;
};
export const findMatches = (query: string, trie: Trie): Array<Match> => {
  const results = [];

  let letters = [];
  let pos = 0;
  while (pos < query.length) {
    const length = findLongestMatch(query, pos, trie);
    if (length === 0) {
      letters.push(query.charAt(pos));
      pos += 1;
    } else {
      if (letters.length !== 0) {
        // Unknown word
        results.push({
          body: letters.join(""),
          start: pos - letters.length,
          end: pos,
          match: false
        });
        letters = [];
      }
      results.push({
        body: query.substring(pos, pos + length),
        start: pos,
        end: pos + length,
        match: true
      });
      pos += length;
    }
  }
  if (letters.length !== 0) {
    // Unknown word
    results.push({
      body: letters.join(""),
      start: pos - letters.length,
      end: pos,
      match: false
    });
    letters = [];
  }
  return results;
};
