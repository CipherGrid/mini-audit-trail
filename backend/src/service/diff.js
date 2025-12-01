function normalizeText(s = "") {
  return s
    .toLowerCase()
    .replace(/[.,!?;:"'(){}\[\]<>\/\\|@#\$%\^&\*\-_+=~`]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toFreqMap(text) {
  const norm = normalizeText(text);
  if (!norm) return {};
  return norm
    .split(" ")
    .filter(Boolean)
    .reduce((map, w) => {
      map[w] = (map[w] || 0) + 1;
      return map;
    }, {});
}

function diffWords(oldText = "", newText = "") {
  const oldMap = toFreqMap(oldText);
  const newMap = toFreqMap(newText);

  const added = [];
  const removed = [];

  for (const w of Object.keys(newMap)) {
    const n = newMap[w] || 0;
    const o = oldMap[w] || 0;
    if (n > o) added.push(w);
  }

  for (const w of Object.keys(oldMap)) {
    const o = oldMap[w] || 0;
    const n = newMap[w] || 0;
    if (o > n) removed.push(w);
  }

  return { addedWords: added, removedWords: removed };
}

export { diffWords, normalizeText, toFreqMap };
