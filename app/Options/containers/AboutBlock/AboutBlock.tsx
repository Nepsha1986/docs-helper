const AboutBlock = () => {
  return (
    <div>
      <h2>About</h2>
      <p>
        This extension helps you find the right documentation for your project.
      </p>
      <h3>How does it work?</h3>
      <p>
        The extension will show a popup with the documentation for the current
        page. It scans the page for the documentation links and shows them in a
        popup.
      </p>
      <h3>How do I add documentation?</h3>
      <p>
        You can add documentation by going to the{" "}
        <a href="/options.html">options</a> page and adding the documentation
        links. You need to add a JSON file link ( can be hosted on your own
        server or a public one ) that contains the documentation links.
        The JSON file should have the following format: 
      </p>
      <pre> 
        {`
        "block_testid": {
          "title": "Title of the block", 
          "description": "Description of the block",
          "links": [
            {
              "text": "Text of the link",
              "url": "https://example.com/link"
            },
            {
              "text": "Text of the link",
              "url": "https://example.com/link-2"
            }
          ]
        },
        "block_testid_2": {
          ...
        },
        "block_testid_3": {
          ...
        }
      `}
      </pre>
      <p>
        The extension will scan the page for the related to the components that have the "data-testid" attribute and shows related documentation in a popup.
      </p>
    </div>
  );
};

export default AboutBlock;
