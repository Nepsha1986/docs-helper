import { useState } from "react";
import type { DocsMapper } from "~app/types";
import DocsList from "../DocsList";
import classnames from 'classnames';

import styles from "./styles.module.scss"
import IconClose from "~app/icons/IconClose";
import ClipboardIcon from "~app/icons/ClipboardIcon";
type Props = {
  docs: DocsMapper;
};

const Helper = ({ docs }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  const componentClass = classnames({
    [styles.helper]: true,
    [styles.helper_open]: isOpen,
  });

  return (
    <div className={componentClass}>
      <button className={styles.helper__button} onClick={handleClick}>
        <span className={styles.helper__icon}>{
            isOpen ? <IconClose /> : <ClipboardIcon />
        }</span>
      </button>

      <div className={styles.helper__content}>
        <DocsList docs={docs} />
      </div>
    </div>
  );
};

export default Helper;
