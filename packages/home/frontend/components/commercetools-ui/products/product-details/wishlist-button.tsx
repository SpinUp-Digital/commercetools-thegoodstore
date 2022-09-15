import React from 'react';
import { HeartIcon } from '@heroicons/react/outline';
import { Variant } from '@Types/product/Variant';

export interface WishlistButtonProps {
  onAddToWishlist: (variant: Variant, num: number) => void;
  variant: Variant;
}

export default function WishlistButton({ onAddToWishlist, variant }: WishlistButtonProps) {
  const handleAddToWishlist = () => {
    onAddToWishlist(variant, 1);
  };

  return (
    <button
      type="button"
      onClick={() => handleAddToWishlist()}
      className={`text-primary-400 hover:bg-accent-400 active:bg-accent-500 ml-5 items-center justify-center rounded-md border-2 border-slate-300 bg-white py-3 px-4 text-base  font-medium ring-transparent hover:border-transparent hover:text-[#fff]  active:text-[#fff] active:outline-none`}
    >
      <HeartIcon className="h-6 w-6 shrink-0 " aria-hidden="true" />
    </button>
  );
}
