import SettingsForm from "./containers/SettingsForm/SettingsForm";

const Options = () => {
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

      <SettingsForm />
    </div>
  );
};

export default Options;
