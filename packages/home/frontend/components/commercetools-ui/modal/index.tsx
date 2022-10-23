import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { desktop } from 'helpers/utils/screensizes';
import { FC } from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';

const Modal: FC<ReactModalProps> = ({ children, ...props }) => {
  const [isDesktopSize] = useMediaQuery(desktop);

  const modalStyle: ReactModalProps['style'] = {
    overlay: {
      zIndex: 12,
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

  return (
    <ReactModal style={modalStyle} {...props}>
      {children}
    </ReactModal>
  );
};

export default Modal;
