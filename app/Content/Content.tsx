import { useEffect, useMemo, useState } from "react";

import type { DocsMapper } from "~app/types";
import { STORAGE_KEY_DOCS_MAPPER, STORAGE_KEY_ENABLED } from "~app/utils/vars";

import DocsList from "./components/DocsList";
import Helper from "./components/Helper";

const PlasmoContent = () => {
  const [testIds, setTestIds] = useState<string[]>([]);
  const [docs, setDocs] = useState<DocsMapper>({});

  const getAllTestIds = () => {
    const testIds = document.querySelectorAll("[data-testid]");
    setTestIds(
      Array.from(testIds).map(
        (testId) => testId.getAttribute("data-testid") || ""
      )
    );
  };

  useEffect(() => {
    chrome.storage.sync.get([STORAGE_KEY_DOCS_MAPPER], (result) => {
      setDocs(result[STORAGE_KEY_DOCS_MAPPER]);
    });
  }, []);

  const pageDocs: DocsMapper = useMemo(() => {
    return Object.keys(docs).reduce((acc, doc) => {
      if (testIds.includes(doc)) {
        acc[doc] = docs[doc];
      }
      return acc;
    }, {} as DocsMapper);
  }, [testIds, docs]);

  useEffect(() => {
    const onPageLoad = () => {
      getAllTestIds();

      const observer = new MutationObserver(() => {
        getAllTestIds();
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return () => observer.disconnect();
    };

    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", onPageLoad);
      return () => window.removeEventListener("DOMContentLoaded", onPageLoad);
    } else {
      onPageLoad();
    }
  }, []);

  return (
    <Helper>
      <DocsList docs={pageDocs} />
    </Helper>
  );
};

const AppWrapper = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get([STORAGE_KEY_ENABLED], (result) => {
      setEnabled(result[STORAGE_KEY_ENABLED]);
    });
  }, []);

  if (!enabled) {
    return null;
  }

  return <PlasmoContent />;
};
export default AppWrapper;
