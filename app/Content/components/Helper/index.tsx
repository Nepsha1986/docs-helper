import classnames from "classnames";
import { useState } from "react";

import ClipboardIcon from "~app/icons/ClipboardIcon";
import IconClose from "~app/icons/IconClose";

import styles from "./styles.module.scss";

type Props = {
  children: React.ReactNode;
};

const Helper = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const componentClass = classnames({
    [styles.helper]: true,
    [styles.helper_open]: isOpen
  });

  return (
    <div className={componentClass}>
      <button className={styles.helper__button} onClick={handleClick}>
        <span className={styles.helper__icon}>
          {isOpen ? <IconClose /> : <ClipboardIcon />}
        </span>
      </button>

      <div className={styles.helper__content}>{children}</div>
    </div>
  );
};

export default Helper;
