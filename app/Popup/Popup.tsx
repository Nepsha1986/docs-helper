const Popup = () => {
  const handleOpenOptions = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  };

  return (
    <div
      style={{
        padding: "16px",
        minWidth: "300px"
      }}>
      <h2>Documents Helper</h2>
      <p>
        This extension helps you find the right documentation for your project.
      </p>
      <p>
        To get started, please go to the{" "}
        <a href="/options.html" onClick={handleOpenOptions}>
          Options
        </a>{" "}
        page.
      </p>
    </div>
  );
};

export default Popup;
