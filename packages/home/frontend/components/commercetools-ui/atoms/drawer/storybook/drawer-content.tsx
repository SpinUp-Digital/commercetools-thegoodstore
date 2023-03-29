import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Drawer from '..';
import Modal from '../../modal';
import Toaster from '../../toaster';
import Typography from '../../typography';

const DrawerContent = () => {
  const [isOpenLeftMenu, setIsOpenLeftMenu] = useState(false);
  const [isOpenRightMenu, setIsOpenRightMenu] = useState(false);
  const [isOpenTopMenu, setIsOpenTopMenu] = useState(false);
  const [isOpenBottomMenu, setIsOpenBottomMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const showToast = (variant: string) => {
    const msg = "Hello, I'm a toast!";
    switch (variant) {
      case 'info':
        return toast(msg);
      case 'success':
        return toast.success(msg);
      case 'error':
        return toast.error(msg);
    }
  };
  return (
    <div className="ml-44">
      <Typography fontSize={28} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
        Menu Components
      </Typography>
      <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
        Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
        usage and look at something cool we have made, here you will see the components and it&apos;s variants in order
        to show how much is the client capable to customize
      </Typography>

      <div className="mt-40 w-full">
        <button
          className="rounded-md bg-primary-black px-16 py-8 text-white transition hover:bg-neutral-500"
          onClick={() => setIsOpenLeftMenu(!isOpenLeftMenu)}
        >
          Open left drawer
        </button>
        <Drawer direction="left" isOpen={isOpenLeftMenu} onClose={() => setIsOpenLeftMenu(false)}>
          <div className="h-full w-full min-w-[300px] bg-white p-24">
            Hello there, I&apos;m a left Menu; click outside to close me!
          </div>
        </Drawer>
      </div>

      <div className="mt-20 w-full">
        <button
          className="rounded-md bg-primary-black px-16 py-8 text-white transition hover:bg-neutral-500"
          onClick={() => setIsOpenRightMenu(!isOpenRightMenu)}
        >
          Open right drawer
        </button>
        <Drawer direction="right" isOpen={isOpenRightMenu} onClose={() => setIsOpenRightMenu(false)}>
          <div className="h-full w-full min-w-[300px] bg-white p-24">
            Hello there, I&apos;m a right Menu; click outside to close me!
          </div>
        </Drawer>
      </div>

      <div className="mt-20 w-full">
        <button
          className="rounded-md bg-primary-black px-16 py-8 text-white transition hover:bg-neutral-500"
          onClick={() => setIsOpenTopMenu(!isOpenTopMenu)}
        >
          Open top drawer
        </button>
        <Drawer direction="top" isOpen={isOpenTopMenu} onClose={() => setIsOpenTopMenu(false)}>
          <div className="h-full w-full min-w-[300px] bg-white p-24">
            Hello there, I&apos;m a Top Menu; click outside to close me!
          </div>
        </Drawer>
      </div>

      <div className="mt-20 w-full">
        <button
          className="rounded-md bg-primary-black px-16 py-8 text-white transition hover:bg-neutral-500"
          onClick={() => setIsOpenBottomMenu(!isOpenBottomMenu)}
        >
          Open bottom drawer
        </button>
        <Drawer direction="bottom" isOpen={isOpenBottomMenu} onClose={() => setIsOpenBottomMenu(false)}>
          <div className="h-full w-full min-w-[300px] bg-white p-24">
            Hello there, I&apos;m a Bottom Menu; click outside to close me!
          </div>
        </Drawer>
      </div>

      <div className="mt-20 w-full">
        <button
          className="rounded-md bg-primary-black px-16 py-8 text-white transition hover:bg-neutral-500"
          onClick={() => setIsOpenModal(!isOpenModal)}
        >
          Open modal
        </button>
        <Modal isOpen={isOpenModal} onRequestClose={() => setIsOpenModal(false)}>
          <div className="min-h-[300px] bg-white p-24">Hello there! I&apos;m a modal click outside to close me</div>
        </Modal>
      </div>

      <div className="mt-20 w-full">
        <button
          onClick={() => showToast('success')}
          className="rounded-md border border-secondary-black p-8 hover:shadow-300"
        >
          Make a Success Toast
        </button>
        <Toaster />
      </div>

      <div className="mt-20 w-full">
        <button
          onClick={() => showToast('info')}
          className="rounded-md border border-secondary-black p-8 hover:shadow-300"
        >
          Make an Info Toast
        </button>
        <Toaster />
      </div>

      <div className="mt-20 w-full">
        <button
          onClick={() => showToast('error')}
          className="rounded-md border border-secondary-black p-8 hover:shadow-300"
        >
          Make an Error Toast
        </button>
        <Toaster />
      </div>
    </div>
  );
};

export default DrawerContent;
