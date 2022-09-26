import HeartIcon from 'components/icons/heart';
import { FC } from 'react';

interface wishlistButtonProps {
  onWishlist: boolean;
  onClick?: () => void;
}

const wishlistButton: FC<wishlistButtonProps> = ({ onWishlist, onClick }) => {
  return (
    <HeartIcon
      className="absolute top-0 right-0 h-24 w-24 cursor-pointer"
      pathClassName={`transition duration-150 ease-out hover:fill-accent-red hover:stroke-accent-red ${
        onWishlist ? 'fill-accent-red stroke-accent-red' : 'fill-transparent stroke-secondary-black'
      }`}
      onClick={onClick}
    />
  );
};

export default wishlistButton;
