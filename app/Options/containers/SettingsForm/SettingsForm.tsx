import { useEffect, useState } from "react";

import type { DocsMapper } from "~app/types";
import {
  STORAGE_KEY_DOCS_MAPPER,
  STORAGE_KEY_DOCS_URL,
  STORAGE_KEY_WEBSITE_URL
} from "~app/utils/vars";

const SettingsForm = () => {
  const [docsUrl, setDocsUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    chrome.storage.sync.get([STORAGE_KEY_DOCS_URL], (result) => {
      if (result[STORAGE_KEY_DOCS_URL]) {
        setDocsUrl(result[STORAGE_KEY_DOCS_URL]);
      }
    });

    chrome.storage.sync.get([STORAGE_KEY_WEBSITE_URL], (result) => {
      if (result[STORAGE_KEY_WEBSITE_URL]) {
        setWebsiteUrl(result[STORAGE_KEY_WEBSITE_URL]);
      }
    });
  }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(docsUrl);
      const data: DocsMapper = await response.json();

      chrome.storage.sync.set({ [STORAGE_KEY_DOCS_URL]: docsUrl }, () => {
        setStatus("Saved!");
        setTimeout(() => setStatus(""), 2000);
      });

      chrome.storage.sync.set({ [STORAGE_KEY_WEBSITE_URL]: websiteUrl }, () => {
        setStatus("Saved!");
        setTimeout(() => setStatus(""), 2000);
      });

      chrome.storage.sync.set({ [STORAGE_KEY_DOCS_MAPPER]: data }, () => {
        setStatus("Saved!");
        setTimeout(() => setStatus(""), 2000);
      });
    } catch (error) {
      console.error(error);
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
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "12px",
          fontSize: "16px"
        }}
      />
      <label
        htmlFor="website-url"
        style={{ display: "block", marginBottom: 8 }}>
        Website URL:
      </label>
      <input
        id="website-url"
        placeholder="Website URL"
        type="url"
        value={websiteUrl}
        onChange={(e) => setWebsiteUrl(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "12px",
          fontSize: "16px"
        }}
      />
      <button type="submit">Add Docs to website</button>
    </form>
  );
};

export default SettingsForm;
