import Content from "./app/Content/Content";
import styleText from "~/app/Content/components/styleText";

import type { PlasmoGetStyle } from "plasmo";
 
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style");
  style.textContent = styleText;
  
  return style
}

export default Content;
