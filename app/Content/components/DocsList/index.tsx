import type { DocsMapper } from "~app/types";

import styles from "./styles.module.scss";

type Props = {
  docs: DocsMapper;
};

const DocsList = ({ docs }: Props) => {
  if (Object.keys(docs).length === 0) {
    return (
      <div className={styles.container}>
        <p>This page doesn't have any docs</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ul style={{ listStyle: "none" }}>
        {Object.keys(docs).map((doc) => (
          <li key={doc}>
            <h3>{docs[doc].title}</h3>
            {docs[doc].description && <p>{docs[doc].description}</p>}

            <ul>
              {docs[doc].links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    style={{ color: "#1C64F2" }}
                    target="_blank"
                    rel="noopener noreferrer">
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

export default DocsList;
