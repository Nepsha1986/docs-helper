import { useEffect, useState } from "react";

const STORAGE_KEY_ENABLED = "documentsHelperEnabled";

const Popup = () => {
  const [data, setData] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get([STORAGE_KEY_ENABLED], (result) => {
      setEnabled(result[STORAGE_KEY_ENABLED]);
    });
  }, []);
  const handleEnabledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnabled(e.target.checked);
    chrome.storage.sync.set({ [STORAGE_KEY_ENABLED]: e.target.checked });
    window.location.reload();
  };

  return (
    <div
      style={{
        padding: 16
      }}>
      <h2>
        Welcome to your{" "}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>

      <div>
        <label htmlFor="enabled">
          <input
            type="checkbox"
            id="enabled"
            checked={enabled}
            onChange={handleEnabledChange}
          />
          Enabled
        </label>
      </div>
    </div>
  );
};

export default Popup;
