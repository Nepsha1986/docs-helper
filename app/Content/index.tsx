import type { DocsMapper } from "../Options/Options";

type Props = {
  docs: DocsMapper;
};

const App = ({ docs }: Props) => {
  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "lightblue",
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "300px",
        height: "300px",
        zIndex: 1000
      }}>
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
  );
};

export default App;
