import { useEffect, useState } from "react";
import type { DocsMapper } from "~app/types";
import {
  STORAGE_KEY_DOCS_MAPPER,
  STORAGE_KEY_DOCS_URL,
  STORAGE_KEY_WEBSITE_URL
} from "~app/utils/vars";

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "12px",
  fontSize: "16px"
};

const SettingsForm = () => {
  const [docsUrl, setDocsUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    chrome.storage.sync.get([STORAGE_KEY_DOCS_URL, STORAGE_KEY_WEBSITE_URL], (result) => {
      if (result[STORAGE_KEY_DOCS_URL]) {
        setDocsUrl(result[STORAGE_KEY_DOCS_URL]);
      }
      if (result[STORAGE_KEY_WEBSITE_URL]) {
        setWebsiteUrl(result[STORAGE_KEY_WEBSITE_URL]);
      }
    });
  }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!docsUrl || !websiteUrl) {
      setStatus("Both URLs are required.");
      setTimeout(() => setStatus(""), 2000);
      return;
    }

    try {
      const response = await fetch(docsUrl);
      if (!response.ok) throw new Error("Failed to fetch JSON");
      const data: DocsMapper = await response.json();

      await chrome.storage.sync.set({
        [STORAGE_KEY_DOCS_URL]: docsUrl,
        [STORAGE_KEY_WEBSITE_URL]: websiteUrl,
        [STORAGE_KEY_DOCS_MAPPER]: data
      });

      setStatus("Saved!");
      setTimeout(() => setStatus(""), 2000);
    } catch (error) {
      setStatus("Error saving settings.");
      setTimeout(() => setStatus(""), 2000);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <label htmlFor="json-url" style={{ display: "block", marginBottom: 8 }}>
        JSON Mapping File URL:
      </label>
      <input
        id="json-url"
        placeholder="Docs URL"
        type="url"
        value={docsUrl}
        onChange={(e) => setDocsUrl(e.target.value)}
        style={inputStyle}
      />
      <label htmlFor="website-url" style={{ display: "block", marginBottom: 8 }}>
        Website URL:
      </label>
      <input
        id="website-url"
        placeholder="Website URL"
        type="url"
        value={websiteUrl}
        onChange={(e) => setWebsiteUrl(e.target.value)}
        style={inputStyle}
      />
      <button type="submit">Add Docs to website</button>
      {status && <p style={{ marginTop: 12 }}>{status}</p>}
    </form>
  );
};

export default SettingsForm;
