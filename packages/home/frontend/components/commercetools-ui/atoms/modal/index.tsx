import { FC, useEffect } from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
//import useScrollBlock from 'helpers/hooks/useScrollBlock';
import { desktop } from 'helpers/utils/screensizes';

const Modal: FC<ReactModalProps> = ({ children, style, ...props }) => {
  const [isDesktopSize] = useMediaQuery(desktop);

  //const { blockScroll } = useScrollBlock();

  const modalStyle: ReactModalProps['style'] = {
    overlay: {
      zIndex: 51,
      backgroundColor: 'rgba(127 ,127, 127, .3)',
      ...style?.overlay,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      maxWidth: isDesktopSize ? 800 : '100%',
      position: 'relative',
      padding: 0,
      ...style?.content,
    },
  };

  useEffect(() => {
    document.body.style.overflow = props.isOpen ? 'hidden' : 'auto';
  }, [props.isOpen]);
  /*
  useEffect(() => {
    blockScroll(props.isOpen);
  }, [props.isOpen, blockScroll]);*/

  return (
    <ReactModal {...props} style={modalStyle}>
      {children}
    </ReactModal>
  );
};

export default Modal;
