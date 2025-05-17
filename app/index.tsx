import type { DocsMapper } from "~options"

type Props = {
  docs: DocsMapper
}

const App = ({ docs }: Props) => {
  return (
    <div style={{ padding: "10px", backgroundColor: "lightblue" }}>
      <h1>My Small React App</h1>
      <ul>
        {Object.keys(docs).map((doc) => (
          <li key={doc}>
            <h3>{docs[doc].title}</h3>
            <p>{docs[doc].description}</p>

            <ul>
              {docs[doc].links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
