import { useEffect, useState } from "react"

const STORAGE_KEY = "documentsHelperJsonUrl"
const STORAGE_KEY_DOCS_MAPPER = "documentsHelperDocsMapper"

type Link = {
  text: string
  url: string
}

type InfoBlock = {
  title: string
  description: string
  links: Link[]
}

export type DocsMapper = {
  [key: string]: InfoBlock
}

const Options = () => {
  const [url, setUrl] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    chrome.storage.sync.get([STORAGE_KEY], (result) => {
      if (result[STORAGE_KEY]) {
        setUrl(result[STORAGE_KEY])
      }
    })
  }, [])

  const handleSave = async () => {
    const response = await fetch(url)
    const data: DocsMapper = await response.json()

    chrome.storage.sync.set({ [STORAGE_KEY]: url }, () => {
      setStatus("Saved!")
      setTimeout(() => setStatus(""), 2000)
    })

    chrome.storage.sync.set({ [STORAGE_KEY_DOCS_MAPPER]: data }, () => {
      setStatus("Saved!")
      setTimeout(() => setStatus(""), 2000)
    })
  }

  return (
    <div
      style={{
        padding: 24,
        fontFamily: "sans-serif",
        maxWidth: 500,
        margin: "0 auto"
      }}>
      <h1>Documents Helper – Options</h1>
      <p>
        Provide the URL of a JSON file that contains mappings for your document
        links.
      </p>
      <label htmlFor="json-url" style={{ display: "block", marginBottom: 8 }}>
        JSON Mapping File URL:
      </label>
      <input
        id="json-url"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/documents.json"
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "12px",
          fontSize: "16px"
        }}
      />
      <button
        onClick={handleSave}
        style={{
          padding: "8px 16px",
          fontSize: "16px",
          cursor: "pointer"
        }}>
        Save
      </button>
      {status && <p style={{ color: "green", marginTop: 10 }}>{status}</p>}
    </div>
  )
}

export default Options
