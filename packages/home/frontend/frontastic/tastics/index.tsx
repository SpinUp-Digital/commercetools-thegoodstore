import dynamic from 'next/dynamic';

import Header from './header';
import Footer from './footer';
import SpacerTastic from './spacer';
import Tile from './content/tile';
//import Markdown from './content/markdown';
//import Newsletter from './newsletter';
import NotFound from './not-found';
import ProductSlider from './products/slider';
import CategorySliderTastic from './category-slider';
import TilesGroupTastic from './content/tiles-group';
import AnnouncementBarTastic from './bar/announcment';
import ContentSliderTastic from './content-slider';
import HeroTastic from './content/hero';

const AccountDetails = dynamic(() => import('./account/details'));
const AccountLogin = dynamic(() => import('./account/login'));
const AccountOrdersHistory = dynamic(() => import('./account/orders'));
const AccountRegister = dynamic(() => import('./account/register'));
const ResetPassword = dynamic(() => import('./account/reset-password'));
//const Cart = dynamic(() => import('./cart'));
const Checkout = dynamic(() => import('./checkout'));
const ThankYou = dynamic(() => import('./checkout/thank-you'));
const ProductDetails = dynamic(() => import('./products/details'));
const ProductList = dynamic(() => import('./products/product-list'));
const SimilarProducts = dynamic(() => import('./products/similar-products'));
const OtherProducts = dynamic(() => import('./products/other-products'));
const Showcase = dynamic(() => import('./showcase'));
//const Wishlist = dynamic(() => import('./wishlist'));
const ContentfulBlogTastic = dynamic(() => import('./contentful-blog'));

export const tastics = {
  'commercetools/ui/checkout': Checkout,
  'commercetools/ui/thank-you': ThankYou,
  //'commercetools/ui/cart': Cart,
  'commercetools/ui/footer': Footer,
  'commercetools/ui/header': Header,
  'commercetools/ui/content/tile': Tile,
  'commercetools/ui/content/hero': HeroTastic,
  'commercetools/ui/content/spacer': SpacerTastic,
  'commercetools/ui/content/showcase': Showcase,
  //'commercetools/ui/content/markdown': Markdown,
  //'commercetools/ui/content/newsletter': Newsletter,
  'commercetools/ui/products/details': ProductDetails,
  'commercetools/ui/products/product-list': ProductList,
  'commercetools/ui/products/slider': ProductSlider,
  'commercetools/ui/products/similar-products': SimilarProducts,
  'commercetools/ui/products/other-products': OtherProducts,
  //'commercetools/ui/wishlist': Wishlist,
  'commercetools/ui/account/details': AccountDetails,
  'commercetools/ui/account/login': AccountLogin,
  'commercetools/ui/account/register': AccountRegister,
  'commercetools/ui/account/orders': AccountOrdersHistory,
  'commercetools/ui/account/reset-password': ResetPassword,
  'commercetools/ui/content/contentful/blog': ContentfulBlogTastic,
  'commercetools/ui/category-slider': CategorySliderTastic,
  'commercetools/ui/content/announcement-bar': AnnouncementBarTastic,
  'commercetools/ui/content/content-slider': ContentSliderTastic,
  'commercetools/ui/content/tiles-group': TilesGroupTastic,
  default: NotFound,
};
