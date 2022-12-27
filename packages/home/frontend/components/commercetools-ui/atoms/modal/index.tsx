import { FC, useEffect } from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { desktop } from 'helpers/utils/screensizes';

const Modal: FC<ReactModalProps> = ({ children, ...props }) => {
  const [isDesktopSize] = useMediaQuery(desktop);

  const modalStyle: ReactModalProps['style'] = {
    overlay: {
      zIndex: 51,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: isDesktopSize ? 800 : 650,
      position: 'relative',
      padding: 0,
    },
  };

  useEffect(() => {
    document.body.style.overflow = props.isOpen ? 'hidden' : 'auto';
  }, [props.isOpen]);

  return (
    <ReactModal style={modalStyle} {...props}>
      {children}
    </ReactModal>
  );
};

export default Modal;
