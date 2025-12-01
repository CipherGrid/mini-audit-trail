import { v4 as uuidv4 } from "uuid";
import { getAll, addVersion } from "../service/storage.js";
import { diffWords } from "../service/diff.js";
import { formatTimestamp } from "../utils/time.js";

async function getVersions(req, res) {
  try {
    const versions = getAll();
    const safe = versions.map((v) => {
      const { _rawContent, ...rest } = v;
      return rest;
    });
    res.json({ ok: true, versions: safe });
  } catch (err) {
    console.error("getVersions error:", err);
    res
      .status(500)
      .json({ ok: false, error: "Server error reading versions." });
  }
}

async function saveVersion(req, res) {
  try {
    const { content } = req.body;
    if (typeof content !== "string") {
      return res
        .status(400)
        .json({ ok: false, error: "'content' must be a string." });
    }

    const versions = getAll();
    const prev = versions.length > 0 ? versions[0] : null;
    const prevContent = prev ? prev._rawContent || "" : "";

    const { addedWords, removedWords } = diffWords(prevContent, content);

    const versionObj = {
      id: uuidv4(),
      timestamp: formatTimestamp(new Date()),
      addedWords,
      removedWords,
      oldLength: prevContent.length,
      newLength: content.length,
      _rawContent: content,
    };

    addVersion(versionObj);

    const { _rawContent, ...responseVersion } = versionObj;

    res.json({ ok: true, version: responseVersion });
  } catch (err) {
    console.error("saveVersion error:", err);
    res.status(500).json({ ok: false, error: "Server error saving version." });
  }
}

export { getVersions, saveVersion };
