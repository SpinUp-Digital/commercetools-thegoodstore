import React from 'react';
import { GetServerSideProps, Redirect } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { SDK } from 'sdk';
import { createClient, PageDataResponse, ResponseError } from 'frontastic';

type SlugProps = {
  // This needs an overhaul. Can be too many things in my opinion (*Marcel)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // data: RedirectResponse | PageDataResponse | ResponseError | { ok: string; message: string } | string;
  locale: string;
};

export default function Slug({ data }: SlugProps) {
  return <>Fetch only page</>;
}

export const getServerSideProps: GetServerSideProps | Redirect = async ({ params, locale, query, req, res }) => {
  SDK.configure(locale as string);

  const data = {
    _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Frontend\\PageDataResponse',
    page: {
      _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Page',
      pageId: '128f5754b95e5c9e1a1955fa1f6ea521',
      sections: {
        footer: {
          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Section',
          sectionId: 'footer',
          layoutElements: [
            {
              _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\LayoutElement',
              layoutElementId: '7c41b311-9452-4b4a-92ec-2d530368f3f2',
              configuration: {
                _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\LayoutElement\\Configuration',
                size: 12,
                mobile: true,
                tablet: true,
                desktop: true,
              },
              tastics: [
                {
                  _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Tastic',
                  tasticId: '908b3ae9-aca2-4334-a10f-c364adbe911f',
                  tasticType: 'commercetools/ui/footer',
                  configuration: {
                    _type: 'Frontastic\\Catwalk\\FrontendBundle\\Domain\\Tastic\\Configuration',
                    mobile: true,
                    tablet: true,
                    desktop: true,
                    headerCol1: 'About us',
                    linksCol1: [
                      {
                        name: 'About Interior Store',
                        reference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '/',
                          openInNewWindow: false,
                        },
                      },
                      {
                        name: 'Careers',
                        reference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '/',
                          openInNewWindow: false,
                        },
                      },
                      {
                        name: 'Sustainability',
                        reference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '/',
                          openInNewWindow: false,
                        },
                      },
                    ],
                    icon: 'question',
                    headerCol2: 'My Pages',
                    linksCol2: [
                      {
                        name: 'Order history',
                        reference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '/',
                          openInNewWindow: false,
                        },
                      },
                      {
                        name: 'Invoices',
                        reference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '/',
                          openInNewWindow: false,
                        },
                      },
                      {
                        name: 'Account',
                        reference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '/',
                          openInNewWindow: false,
                        },
                      },
                    ],
                    headerCol3: 'Terms & conditions',
                    linksCol3: [
                      {
                        name: 'General',
                        reference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '/',
                          openInNewWindow: false,
                        },
                      },
                      {
                        name: 'GDPR',
                        reference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '/',
                          openInNewWindow: false,
                        },
                      },
                      {
                        name: 'Cookies',
                        reference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '/',
                          openInNewWindow: false,
                        },
                      },
                    ],
                    copyright: 'commercetools',
                    copyrightLinks: [
                      {
                        name: {
                          en_GB: 'Cookies',
                        },
                        reference: {
                          type: 'link',
                          target: '/',
                        },
                      },
                      {
                        name: {
                          en_GB: 'Privacy policy',
                        },
                        reference: {
                          type: 'link',
                          target: '/',
                        },
                      },
                      {
                        name: {
                          en_GB: 'T&C',
                        },
                        reference: {
                          type: 'link',
                          target: '/',
                        },
                      },
                    ],
                    headerCol4: 'Customer service',
                    linksCol4: [
                      {
                        name: 'Contact us',
                        reference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '/',
                          openInNewWindow: false,
                        },
                      },
                      {
                        name: 'Returns',
                        reference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '/',
                          openInNewWindow: false,
                        },
                      },
                      {
                        name: 'FAQ',
                        reference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '/',
                          openInNewWindow: false,
                        },
                      },
                    ],
                    iconCol1: 'question',
                    iconCol2: 'inbox',
                    iconCol3: 'speaker',
                    logo: {
                      media: {
                        _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                        mediaId: 'mx6h9pe3i5qskpxvy17z',
                        resourceType: 'image',
                        name: 'Logo-footer',
                        tags: ['__none'],
                        file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1676462532/mx6h9pe3i5qskpxvy17z.png',
                        size: 37918,
                        width: 4975,
                        height: 481,
                        format: 'png',
                        created: '2023-02-15T12:02:12+00:00',
                        metaData: '_FILTERED_',
                      },
                      title: {
                        en_GB: 'logo',
                      },
                    },
                    socialMedia: [
                      {
                        logo: {
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'iwuvpf7edbm4hqqmagbh',
                            resourceType: 'image',
                            name: 'Instagram',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1668763885/iwuvpf7edbm4hqqmagbh.svg',
                            size: 436,
                            width: 24,
                            height: 24,
                            format: 'svg',
                            created: '2022-11-18T09:31:25+00:00',
                            metaData: '_FILTERED_',
                          },
                          title: {
                            en_GB: 'instagram',
                          },
                        },
                        reference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: 'https://www.instagram.com/lifeatcommercetools/',
                          openInNewWindow: true,
                        },
                        undefined: null,
                      },
                      {
                        logo: {
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'ajvljds3vrwkog1amvi6',
                            resourceType: 'image',
                            name: 'Facebook',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1668763885/ajvljds3vrwkog1amvi6.svg',
                            size: 339,
                            width: 24,
                            height: 24,
                            format: 'svg',
                            created: '2022-11-18T09:31:25+00:00',
                            metaData: '_FILTERED_',
                          },
                          title: {
                            en_GB: 'Facebook',
                          },
                        },
                        reference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: 'https://www.facebook.com/commercetools/',
                          openInNewWindow: true,
                        },
                        undefined: null,
                      },
                      {
                        logo: {
                          title: {
                            en_GB: 'facebook',
                          },
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'axwfqmwpvkza63herton',
                            resourceType: 'image',
                            name: 'Youtube',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1668763885/axwfqmwpvkza63herton.svg',
                            size: 601,
                            width: 24,
                            height: 24,
                            format: 'svg',
                            created: '2022-11-18T09:31:25+00:00',
                            metaData: '_FILTERED_',
                          },
                        },
                        reference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: 'https://www.youtube.com/c/commercetools',
                          openInNewWindow: true,
                        },
                        undefined: null,
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
        head: {
          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Section',
          sectionId: 'head',
          layoutElements: [
            {
              _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\LayoutElement',
              layoutElementId: 'd93ba0ce-7805-47fa-953b-8701521c76b3',
              configuration: {
                _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\LayoutElement\\Configuration',
                size: 12,
                mobile: true,
                tablet: true,
                desktop: true,
              },
              tastics: [
                {
                  _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Tastic',
                  tasticId: 'bce97a86-0496-47a2-bd07-37c2c98956c9',
                  tasticType: 'commercetools/ui/header',
                  configuration: {
                    _type: 'Frontastic\\Catwalk\\FrontendBundle\\Domain\\Tastic\\Configuration',
                    mobile: true,
                    tablet: true,
                    desktop: true,
                    logo: {
                      media: {
                        _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                        mediaId: 'dzseuok3zjub8o70bgko',
                        resourceType: 'image',
                        name: 'Logo-header',
                        tags: ['__none'],
                        file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1676462500/dzseuok3zjub8o70bgko.png',
                        size: 44805,
                        width: 4988,
                        height: 488,
                        format: 'png',
                        created: '2023-02-15T12:01:40+00:00',
                        metaData: '_FILTERED_',
                      },
                      title: {
                        en_GB: 'the good store',
                      },
                    },
                    links: [
                      {
                        name: {
                          en_GB: 'Women',
                        },
                        reference: {
                          type: 'link',
                          target: '/women',
                        },
                      },
                      {
                        name: {
                          en_GB: 'Men',
                        },
                        reference: {
                          type: 'link',
                          target: '/men',
                        },
                      },
                    ],
                    logoLink: {
                      _type:
                        'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderReferenceValue',
                      type: 'page-folder',
                      pageFolder: {
                        _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderValue',
                        pageFolderId: '128f5754b95e5c9e1a1955fa1f5caf0b',
                        name: 'Home',
                        configuration: {
                          path: '/',
                          pathTranslations: [],
                        },
                        hasLivePage: true,
                        _urls: {
                          'de_DE@EUR': '/',
                          'en_GB@GBP': '/',
                        },
                        _url: '/',
                      },
                      openInNewWindow: false,
                    },
                    searchLink: {
                      type: 'link',
                      target: '/search',
                    },
                    accountLink: {
                      _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                      type: 'link',
                      link: '/account',
                      openInNewWindow: false,
                    },
                    wishlistLink: {
                      _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                      type: 'link',
                      link: '/wishlist',
                      openInNewWindow: false,
                    },
                    cartLink: {
                      _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                      type: 'link',
                      link: '/cart',
                      openInNewWindow: false,
                    },
                    tileImage: {
                      media: {
                        _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                        mediaId: 'ms2cm5xyek34gvet721n',
                        resourceType: 'image',
                        name: 'Test-image',
                        tags: ['__none'],
                        file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1663955449/ms2cm5xyek34gvet721n.png',
                        size: 201571,
                        width: 506,
                        height: 256,
                        format: 'png',
                        created: '2022-09-23T17:50:49+00:00',
                        metaData: '_FILTERED_',
                      },
                      title: {
                        en_GB: 'Tile Image',
                      },
                    },
                    tileHeaderText: {
                      en_GB: 'Tableware & Serving',
                    },
                    tileButtonLabel: {
                      en_GB: 'SHOP NOW',
                    },
                    tileButtonLink: {
                      type: 'node',
                      target: '128f5754b95e5c9e1a1955fa1f5caf0b',
                    },
                    'secondary-logo': {
                      media: {
                        _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                        mediaId: 'nc8g15afy7rbmwo7stt5',
                        resourceType: 'image',
                        name: 'Home-placeholder',
                        tags: ['__none'],
                        file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1664377708/nc8g15afy7rbmwo7stt5.jpg',
                        size: 8615,
                        width: 330,
                        height: 104,
                        format: 'jpg',
                        created: '2022-09-28T15:08:28+00:00',
                        metaData: '_FILTERED_',
                      },
                      title: {
                        en_GB: 'Home',
                      },
                    },
                    secondaryLogo: {
                      media: {
                        _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                        mediaId: 'nc8g15afy7rbmwo7stt5',
                        resourceType: 'image',
                        name: 'Home-placeholder',
                        tags: ['__none'],
                        file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1664377708/nc8g15afy7rbmwo7stt5.jpg',
                        size: 8615,
                        width: 330,
                        height: 104,
                        format: 'jpg',
                        created: '2022-09-28T15:08:28+00:00',
                        metaData: '_FILTERED_',
                      },
                      title: {
                        en_GB: 'home furnishing store',
                      },
                    },
                    tiles: [
                      {
                        tileImage: {
                          title: {
                            en_GB: 'Tile Image 1',
                          },
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'evttc8mtgc59spx0j19j',
                            resourceType: 'image',
                            name: 'Spacejoy-k2pumSRYYss-unsplash',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1666122839/evttc8mtgc59spx0j19j.jpg',
                            size: 2155429,
                            width: 7111,
                            height: 3750,
                            format: 'jpg',
                            created: '2022-10-18T19:53:59+00:00',
                            metaData: '_FILTERED_',
                          },
                        },
                        tileHeaderText: 'Modern Sofas',
                        tileButtonLabel: 'SHOP NOW',
                        tileButtonLink: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '/eab8e720-8046-46fb-a9be-1a397ef24f21/c5a3d83f-0ada-408f-84fc-a754d6aca8be/9e3934ee-d53f-4f3c-af09-5bb279f30672?configure%5BclickAnalytics%5D=true&configure%5Bfilters%5D=categories.categoryId%3A9e3934ee-d53f-4f3c-af09-5bb279f30672',
                          openInNewWindow: false,
                        },
                        tileCategory: 'Furniture',
                        tileHeaderDecoration: 'uppercase',
                        tileButtonLabelDecoration: 'uppercase',
                      },
                      {
                        tileImage: {
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'r47edtqlooinexeyrdwe',
                            resourceType: 'image',
                            name: 'Background',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1663585143/r47edtqlooinexeyrdwe.jpg',
                            size: 209010,
                            width: 1074,
                            height: 806,
                            format: 'jpg',
                            created: '2022-09-19T10:59:03+00:00',
                            metaData: '_FILTERED_',
                          },
                          title: {
                            en_GB: 'TEST - 2',
                          },
                        },
                        tileHeaderText: 'Mood Candles',
                        tileButtonLabel: 'SHOP NOW',
                        tileButtonLink: {
                          _type:
                            'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderReferenceValue',
                          type: 'page-folder',
                          pageFolder: {
                            _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderValue',
                            pageFolderId: '128f5754b95e5c9e1a1955fa1f5caf0b',
                            name: 'Home',
                            configuration: {
                              path: '/',
                              pathTranslations: [],
                            },
                            hasLivePage: true,
                            _urls: {
                              'de_DE@EUR': '/',
                              'en_GB@GBP': '/',
                            },
                            _url: '/',
                          },
                          openInNewWindow: false,
                        },
                        tileCategory: 'Home Decor',
                        tileHeaderDecoration: 'uppercase',
                        tileButtonLabelDecoration: 'uppercase',
                      },
                      {
                        tileImage: {
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'jdrbzwz19qiw0a2duxek',
                            resourceType: 'image',
                            name: 'AdobeStock 513440521',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1663655978/jdrbzwz19qiw0a2duxek.jpg',
                            size: 9306078,
                            width: 6720,
                            height: 4480,
                            format: 'jpg',
                            created: '2022-09-20T06:39:38+00:00',
                            metaData: '_FILTERED_',
                          },
                          title: {
                            en_GB: 'Test - 3',
                          },
                        },
                        tileHeaderText: 'Classy Glasses',
                        tileButtonLabel: 'SHOP NOW',
                        tileButtonLink: {
                          _type:
                            'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderReferenceValue',
                          type: 'page-folder',
                          pageFolder: {
                            _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderValue',
                            pageFolderId: '128f5754b95e5c9e1a1955fa1f5caf0b',
                            name: 'Home',
                            configuration: {
                              path: '/',
                              pathTranslations: [],
                            },
                            hasLivePage: true,
                            _urls: {
                              'de_DE@EUR': '/',
                              'en_GB@GBP': '/',
                            },
                            _url: '/',
                          },
                          openInNewWindow: false,
                        },
                        tileCategory: 'Kitchen',
                        tileHeaderDecoration: 'uppercase',
                        tileButtonLabelDecoration: 'uppercase',
                      },
                      {
                        tileImage: {
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'l3x6iq067r7faazm2t3k',
                            resourceType: 'image',
                            name: 'Collov-home-design-js8AQlw71HA-unsplash',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1666122437/l3x6iq067r7faazm2t3k.jpg',
                            size: 1873569,
                            width: 4000,
                            height: 3000,
                            format: 'jpg',
                            created: '2022-10-18T19:47:17+00:00',
                            metaData: '_FILTERED_',
                          },
                          title: {
                            en_GB: 'TEST - 4',
                          },
                        },
                        tileHeaderText: 'Graphic Art',
                        tileButtonLabel: 'SHOP NOW',
                        tileButtonLink: {
                          _type:
                            'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderReferenceValue',
                          type: 'page-folder',
                          pageFolder: {
                            _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderValue',
                            pageFolderId: '128f5754b95e5c9e1a1955fa1f5caf0b',
                            name: 'Home',
                            configuration: {
                              path: '/',
                              pathTranslations: [],
                            },
                            hasLivePage: true,
                            _urls: {
                              'de_DE@EUR': '/',
                              'en_GB@GBP': '/',
                            },
                            _url: '/',
                          },
                          openInNewWindow: false,
                        },
                        tileCategory: 'New Arrivals',
                        tileHeaderDecoration: 'uppercase',
                        tileButtonLabelDecoration: 'uppercase',
                      },
                    ],
                    text: 'SUBSCRIBE FOR 10% OFF YOUR FIRST ORDER',
                    highlightedSubstring: 'SUBSCRIBE',
                    target: {
                      _type:
                        'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderReferenceValue',
                      type: 'page-folder',
                      pageFolder: {
                        _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderValue',
                        pageFolderId: '128f5754b95e5c9e1a1955fa1f5caf0b',
                        name: 'Home',
                        configuration: {
                          path: '/',
                          pathTranslations: [],
                        },
                        hasLivePage: true,
                        _urls: {
                          'de_DE@EUR': '/',
                          'en_GB@GBP': '/',
                        },
                        _url: '/',
                      },
                      openInNewWindow: true,
                    },
                    emptyCartImage: {
                      media: {
                        _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                        mediaId: 'mgr4ajzjlrgtrimten1z',
                        resourceType: 'image',
                        name: 'Empty Cart',
                        tags: ['__none'],
                        file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1669113003/mgr4ajzjlrgtrimten1z.svg',
                        size: 46701,
                        width: 197,
                        height: 96,
                        format: 'svg',
                        created: '2022-11-22T10:30:03+00:00',
                        metaData: '_FILTERED_',
                      },
                      title: {
                        en_GB: 'Empty cart',
                      },
                    },
                    emptyCartCategories: [
                      {
                        name: 'Furniture',
                        reference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '/furniture',
                          openInNewWindow: false,
                        },
                      },
                      {
                        name: 'Home Decor',
                        reference: {
                          _type:
                            'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderReferenceValue',
                          type: 'page-folder',
                          pageFolder: {
                            _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderValue',
                            pageFolderId: '128f5754b95e5c9e1a1955fa1f5caf0b',
                            name: 'Home',
                            configuration: {
                              path: '/',
                              pathTranslations: [],
                            },
                            hasLivePage: true,
                            _urls: {
                              'de_DE@EUR': '/',
                              'en_GB@GBP': '/',
                            },
                            _url: '/',
                          },
                          openInNewWindow: false,
                        },
                      },
                      {
                        name: 'Kitchen',
                        reference: {
                          _type:
                            'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderReferenceValue',
                          type: 'page-folder',
                          pageFolder: {
                            _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderValue',
                            pageFolderId: '128f5754b95e5c9e1a1955fa1f5caf0b',
                            name: 'Home',
                            configuration: {
                              path: '/',
                              pathTranslations: [],
                            },
                            hasLivePage: true,
                            _urls: {
                              'de_DE@EUR': '/',
                              'en_GB@GBP': '/',
                            },
                            _url: '/',
                          },
                          openInNewWindow: false,
                        },
                      },
                      {
                        name: 'New Arrivals',
                        reference: {
                          _type:
                            'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderReferenceValue',
                          type: 'page-folder',
                          pageFolder: {
                            _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderValue',
                            pageFolderId: '128f5754b95e5c9e1a1955fa1f5caf0b',
                            name: 'Home',
                            configuration: {
                              path: '/',
                              pathTranslations: [],
                            },
                            hasLivePage: true,
                            _urls: {
                              'de_DE@EUR': '/',
                              'en_GB@GBP': '/',
                            },
                            _url: '/',
                          },
                          openInNewWindow: false,
                        },
                      },
                    ],
                    emptyCartTitle: 'Your cart is empty.',
                    emptyCartSubtitle: 'Continue shopping?',
                    emptyWishlistTitle: 'Your wishlist is empty.  ',
                    emptyWishlistSubtitle: 'Continue shopping?',
                    emptyWishlistCategories: [
                      {
                        name: 'Furniture',
                        reference: {
                          _type:
                            'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderReferenceValue',
                          type: 'page-folder',
                          pageFolder: {
                            _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderValue',
                            pageFolderId: '128f5754b95e5c9e1a1955fa1f5caf0b',
                            name: 'Home',
                            configuration: {
                              path: '/',
                              pathTranslations: [],
                            },
                            hasLivePage: true,
                            _urls: {
                              'de_DE@EUR': '/',
                              'en_GB@GBP': '/',
                            },
                            _url: '/',
                          },
                          openInNewWindow: false,
                        },
                      },
                      {
                        name: 'Home Decor',
                        reference: {
                          _type:
                            'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderReferenceValue',
                          type: 'page-folder',
                          pageFolder: {
                            _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderValue',
                            pageFolderId: '128f5754b95e5c9e1a1955fa1f5caf0b',
                            name: 'Home',
                            configuration: {
                              path: '/',
                              pathTranslations: [],
                            },
                            hasLivePage: true,
                            _urls: {
                              'de_DE@EUR': '/',
                              'en_GB@GBP': '/',
                            },
                            _url: '/',
                          },
                          openInNewWindow: false,
                        },
                      },
                      {
                        name: 'Kitchen',
                        reference: {
                          _type:
                            'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderReferenceValue',
                          type: 'page-folder',
                          pageFolder: {
                            _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderValue',
                            pageFolderId: '128f5754b95e5c9e1a1955fa1f5caf0b',
                            name: 'Home',
                            configuration: {
                              path: '/',
                              pathTranslations: [],
                            },
                            hasLivePage: true,
                            _urls: {
                              'de_DE@EUR': '/',
                              'en_GB@GBP': '/',
                            },
                            _url: '/',
                          },
                          openInNewWindow: false,
                        },
                      },
                      {
                        name: 'New Arrivals',
                        reference: {
                          _type:
                            'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderReferenceValue',
                          type: 'page-folder',
                          pageFolder: {
                            _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderValue',
                            pageFolderId: '128f5754b95e5c9e1a1955fa1f5caf0b',
                            name: 'Home',
                            configuration: {
                              path: '/',
                              pathTranslations: [],
                            },
                            hasLivePage: true,
                            _urls: {
                              'de_DE@EUR': '/',
                              'en_GB@GBP': '/',
                            },
                            _url: '/',
                          },
                          openInNewWindow: false,
                        },
                      },
                    ],
                    emptyWishlistImage: {
                      media: {
                        _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                        mediaId: 'mgr4ajzjlrgtrimten1z',
                        resourceType: 'image',
                        name: 'Empty Cart',
                        tags: ['__none'],
                        file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1669113003/mgr4ajzjlrgtrimten1z.svg',
                        size: 46701,
                        width: 197,
                        height: 96,
                        format: 'svg',
                        created: '2022-11-22T10:30:03+00:00',
                        metaData: '_FILTERED_',
                      },
                      title: {
                        en_GB: 'Empty Wishlist Image',
                      },
                    },
                    logoMobile: {
                      title: {
                        en_GB: 'The good store menu',
                      },
                      media: {
                        _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                        mediaId: 'ysi35z3gmxnv6vyohghv',
                        resourceType: 'image',
                        name: 'THE GOOD STORE(1)',
                        tags: ['__none'],
                        file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1676369487/ysi35z3gmxnv6vyohghv.png',
                        size: 1596,
                        width: 158,
                        height: 15,
                        format: 'png',
                        created: '2023-02-14T10:11:27+00:00',
                        metaData: '_FILTERED_',
                      },
                    },
                    logoLinkMobile: {
                      _type:
                        'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderReferenceValue',
                      type: 'page-folder',
                      pageFolder: {
                        _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\PageFolderValue',
                        pageFolderId: '128f5754b95e5c9e1a1955fa1f5caf0b',
                        name: 'Home',
                        configuration: {
                          path: '/',
                          pathTranslations: [],
                        },
                        hasLivePage: true,
                        _urls: {
                          'de_DE@EUR': '/',
                          'en_GB@GBP': '/',
                        },
                        _url: '/',
                      },
                      openInNewWindow: false,
                    },
                    navigationCategories: [
                      {
                        categoryID: {
                          en_GB: '076ab018-de9f-4a55-a436-ffd18d22fc66',
                        },
                        categoryName: {
                          en_GB: 'New Arrivals',
                        },
                        categoryLink: {
                          type: 'link',
                          target: '076ab018-de9f-4a55-a436-ffd18d22fc66',
                        },
                        navigationSubCategories: null,
                        categoryId: {
                          en_GB: '076ab018-de9f-4a55-a436-ffd18d22fc66',
                        },
                        name: {
                          en_GB: 'New Arrivals',
                        },
                        slug: {
                          type: 'link',
                          target: '076ab018-de9f-4a55-a436-ffd18d22fc66',
                        },
                        subCategories: null,
                      },
                      {
                        categoryID: {
                          en_GB: 'eab8e720-8046-46fb-a9be-1a397ef24f21',
                        },
                        categoryName: {
                          en_GB: 'Furniture',
                        },
                        categoryLink: {
                          type: 'link',
                          target: 'eab8e720-8046-46fb-a9be-1a397ef24f21',
                        },
                        navigationSubCategories: [
                          {
                            categoryID: {
                              en_GB: 'c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            categoryName: {
                              en_GB: 'Bedroom Furniture',
                            },
                            categoryLink: {
                              type: 'link',
                              target: 'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            navigationSubCategories: [
                              {
                                categoryID: {
                                  en_GB: '7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                                categoryName: {
                                  en_GB: 'Beds',
                                },
                                categoryLink: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                            ],
                          },
                          {
                            categoryID: {
                              en_GB: 'c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            categoryName: {
                              en_GB: 'Bedroom Furniture',
                            },
                            categoryLink: {
                              type: 'link',
                              target: 'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            navigationSubCategories: [
                              {
                                categoryID: {
                                  en_GB: '7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                                categoryName: {
                                  en_GB: 'Beds',
                                },
                                categoryLink: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                            ],
                          },
                          {
                            categoryID: {
                              en_GB: 'c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            categoryName: {
                              en_GB: 'Bedroom Furniture',
                            },
                            categoryLink: {
                              type: 'link',
                              target: 'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            navigationSubCategories: [
                              {
                                categoryID: {
                                  en_GB: '7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                                categoryName: {
                                  en_GB: 'Beds',
                                },
                                categoryLink: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                              {
                                categoryID: {
                                  en_GB: '7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                                categoryName: {
                                  en_GB: 'Beds',
                                },
                                categoryLink: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                              {
                                categoryID: {
                                  en_GB: '7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                                categoryName: {
                                  en_GB: 'Beds',
                                },
                                categoryLink: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                            ],
                          },
                        ],
                        categoryId: {
                          en_GB: 'eab8e720-8046-46fb-a9be-1a397ef24f21',
                        },
                        name: {
                          en_GB: 'Furniture',
                        },
                        slug: {
                          type: 'link',
                          target: 'eab8e720-8046-46fb-a9be-1a397ef24f21',
                        },
                        subCategories: [
                          {
                            categoryId: {
                              en_GB: 'c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            name: {
                              en_GB: 'Bedroom Furniture',
                            },
                            slug: {
                              type: 'link',
                              target: 'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            subCategories: [
                              {
                                categoryId: {
                                  en_GB: '7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                                name: {
                                  en_GB: 'Beds',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '1c9de70f-5559-44b9-a48f-63b90cba8976',
                                },
                                name: {
                                  en_GB: 'Dressers',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/1c9de70f-5559-44b9-a48f-63b90cba8976',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: 'fffcaf52-62c5-45a7-a0ec-4768e7d33d48',
                                },
                                name: {
                                  en_GB: 'Bedside Tables',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/fffcaf52-62c5-45a7-a0ec-4768e7d33d48',
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        categoryID: {
                          en_GB: 'eab8e720-8046-46fb-a9be-1a397ef24f21',
                        },
                        categoryName: {
                          en_GB: 'Furniture',
                        },
                        categoryLink: {
                          type: 'link',
                          target: 'eab8e720-8046-46fb-a9be-1a397ef24f21',
                        },
                        navigationSubCategories: [
                          {
                            categoryID: {
                              en_GB: 'c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            categoryName: {
                              en_GB: 'Bedroom Furniture',
                            },
                            categoryLink: {
                              type: 'link',
                              target: 'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            navigationSubCategories: [
                              {
                                categoryID: {
                                  en_GB: '7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                                categoryName: {
                                  en_GB: 'Beds',
                                },
                                categoryLink: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                            ],
                          },
                          {
                            categoryID: {
                              en_GB: 'c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            categoryName: {
                              en_GB: 'Bedroom Furniture',
                            },
                            categoryLink: {
                              type: 'link',
                              target: 'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            navigationSubCategories: [
                              {
                                categoryID: {
                                  en_GB: '7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                                categoryName: {
                                  en_GB: 'Beds',
                                },
                                categoryLink: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                            ],
                          },
                          {
                            categoryID: {
                              en_GB: 'c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            categoryName: {
                              en_GB: 'Bedroom Furniture',
                            },
                            categoryLink: {
                              type: 'link',
                              target: 'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            navigationSubCategories: [
                              {
                                categoryID: {
                                  en_GB: '7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                                categoryName: {
                                  en_GB: 'Beds',
                                },
                                categoryLink: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                              {
                                categoryID: {
                                  en_GB: '7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                                categoryName: {
                                  en_GB: 'Beds',
                                },
                                categoryLink: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                              {
                                categoryID: {
                                  en_GB: '7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                                categoryName: {
                                  en_GB: 'Beds',
                                },
                                categoryLink: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                            ],
                          },
                        ],
                        categoryId: {
                          en_GB: '575a0a47-dfbf-4033-9dfa-ce83c02df046',
                        },
                        name: {
                          en_GB: 'Home Decor',
                        },
                        slug: {
                          type: 'link',
                          target: '575a0a47-dfbf-4033-9dfa-ce83c02df046',
                        },
                        subCategories: [
                          {
                            categoryId: {
                              en_GB: 'fae8b9af-3b41-474b-9301-772745e395b7',
                            },
                            name: {
                              en_GB: 'Planters',
                            },
                            slug: {
                              type: 'link',
                              target: '575a0a47-dfbf-4033-9dfa-ce83c02df046/fae8b9af-3b41-474b-9301-772745e395b7',
                            },
                            subCategories: [
                              {
                                categoryId: {
                                  en_GB: 'a4dea945-8878-41ea-b34a-823d54a62932',
                                },
                                name: {
                                  en_GB: 'Outdoor Planters',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/fae8b9af-3b41-474b-9301-772745e395b7/a4dea945-8878-41ea-b34a-823d54a62932',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '61bbf560-a5d4-4143-a79d-9b3fe40d3595',
                                },
                                name: {
                                  en_GB: 'Indoor Planters',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/fae8b9af-3b41-474b-9301-772745e395b7/61bbf560-a5d4-4143-a79d-9b3fe40d3595',
                                },
                              },
                            ],
                          },
                          {
                            categoryId: {
                              en_GB: 'b525d872-5fc3-402f-a2e7-f034b5246bde',
                            },
                            name: {
                              en_GB: 'Wall Art',
                            },
                            slug: {
                              type: 'link',
                              target: '575a0a47-dfbf-4033-9dfa-ce83c02df046/b525d872-5fc3-402f-a2e7-f034b5246bde',
                            },
                            subCategories: [
                              {
                                categoryId: {
                                  en_GB: '08ac4b0c-0d5d-499b-a1b6-428549d3e2d6',
                                },
                                name: {
                                  en_GB: 'Sculptures',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/b525d872-5fc3-402f-a2e7-f034b5246bde/08ac4b0c-0d5d-499b-a1b6-428549d3e2d6',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '52be52f3-f2e9-466e-baf5-c9408c75a65b',
                                },
                                name: {
                                  en_GB: 'Classical Art',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/b525d872-5fc3-402f-a2e7-f034b5246bde/52be52f3-f2e9-466e-baf5-c9408c75a65b',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: 'a850800b-2c64-460d-84d5-48123d5682fc',
                                },
                                name: {
                                  en_GB: 'Modern Art',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/b525d872-5fc3-402f-a2e7-f034b5246bde/a850800b-2c64-460d-84d5-48123d5682fc',
                                },
                              },
                            ],
                          },
                          {
                            categoryId: {
                              en_GB: 'a2b7fb69-4696-4929-944d-e238dab709c7',
                            },
                            name: {
                              en_GB: 'Pillows',
                            },
                            slug: {
                              type: 'link',
                              target: '575a0a47-dfbf-4033-9dfa-ce83c02df046/a2b7fb69-4696-4929-944d-e238dab709c7',
                            },
                            subCategories: [
                              {
                                categoryId: {
                                  en_GB: '20f6d3d8-5243-4790-8cd9-8914ee45c6a6',
                                },
                                name: {
                                  en_GB: 'Pillow Covers',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/a2b7fb69-4696-4929-944d-e238dab709c7/20f6d3d8-5243-4790-8cd9-8914ee45c6a6',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '9789ac68-5615-4f07-bbb8-3ce0ef070585',
                                },
                                name: {
                                  en_GB: 'Memory Foam',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/a2b7fb69-4696-4929-944d-e238dab709c7/9789ac68-5615-4f07-bbb8-3ce0ef070585',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '92ee3331-372a-47b4-a345-31f22946885c',
                                },
                                name: {
                                  en_GB: 'Feather',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/a2b7fb69-4696-4929-944d-e238dab709c7/92ee3331-372a-47b4-a345-31f22946885c',
                                },
                              },
                            ],
                          },
                          {
                            categoryId: {
                              en_GB: 'cbae1758-bda1-415e-833a-e298d4f44e54',
                            },
                            name: {
                              en_GB: 'Room Decor',
                            },
                            slug: {
                              type: 'link',
                              target: '575a0a47-dfbf-4033-9dfa-ce83c02df046/cbae1758-bda1-415e-833a-e298d4f44e54',
                            },
                            subCategories: [],
                          },
                        ],
                      },
                      {
                        categoryID: {
                          en_GB: 'eab8e720-8046-46fb-a9be-1a397ef24f21',
                        },
                        categoryName: {
                          en_GB: 'Furniture',
                        },
                        categoryLink: {
                          type: 'link',
                          target: 'eab8e720-8046-46fb-a9be-1a397ef24f21',
                        },
                        navigationSubCategories: [
                          {
                            categoryID: {
                              en_GB: 'c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            categoryName: {
                              en_GB: 'Bedroom Furniture',
                            },
                            categoryLink: {
                              type: 'link',
                              target: 'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            navigationSubCategories: [
                              {
                                categoryID: {
                                  en_GB: '7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                                categoryName: {
                                  en_GB: 'Beds',
                                },
                                categoryLink: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                            ],
                          },
                          {
                            categoryID: {
                              en_GB: 'c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            categoryName: {
                              en_GB: 'Bedroom Furniture',
                            },
                            categoryLink: {
                              type: 'link',
                              target: 'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            navigationSubCategories: [
                              {
                                categoryID: {
                                  en_GB: '7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                                categoryName: {
                                  en_GB: 'Beds',
                                },
                                categoryLink: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                            ],
                          },
                          {
                            categoryID: {
                              en_GB: 'c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            categoryName: {
                              en_GB: 'Bedroom Furniture',
                            },
                            categoryLink: {
                              type: 'link',
                              target: 'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            navigationSubCategories: [
                              {
                                categoryID: {
                                  en_GB: '7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                                categoryName: {
                                  en_GB: 'Beds',
                                },
                                categoryLink: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                              {
                                categoryID: {
                                  en_GB: '7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                                categoryName: {
                                  en_GB: 'Beds',
                                },
                                categoryLink: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                              {
                                categoryID: {
                                  en_GB: '7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                                categoryName: {
                                  en_GB: 'Beds',
                                },
                                categoryLink: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                            ],
                          },
                        ],
                        categoryId: {
                          en_GB: 'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4',
                        },
                        name: {
                          en_GB: 'Kitchen',
                        },
                        slug: {
                          type: 'link',
                          target: 'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4',
                        },
                        subCategories: [
                          {
                            categoryId: {
                              en_GB: '0',
                            },
                            name: {
                              en_GB: 'Bedroom Furniture',
                            },
                            slug: {
                              type: 'link',
                              target: 'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            subCategories: [
                              {
                                categoryId: {
                                  en_GB: '01',
                                },
                                name: {
                                  en_GB: 'Beds',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '11',
                                },
                                name: {
                                  en_GB: 'Beds',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '22',
                                },
                                name: {
                                  en_GB: 'Beds',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    categories: [
                      {
                        categoryId: {
                          en_GB: '076ab018-de9f-4a55-a436-ffd18d22fc66',
                        },
                        name: {
                          en_GB: 'New Arrivals',
                        },
                        slug: {
                          type: 'link',
                          target: '076ab018-de9f-4a55-a436-ffd18d22fc66',
                          en_GB: '/076ab018-de9f-4a55-a436-ffd18d22fc66',
                        },
                        subCategories: null,
                      },
                      {
                        categoryId: {
                          en_GB: 'eab8e720-8046-46fb-a9be-1a397ef24f21',
                        },
                        name: {
                          en_GB: 'Furniture',
                        },
                        slug: {
                          type: 'link',
                          target: 'eab8e720-8046-46fb-a9be-1a397ef24f21',
                          en_GB: '/eab8e720-8046-46fb-a9be-1a397ef24f21',
                        },
                        subCategories: [
                          {
                            categoryId: {
                              en_GB: 'c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            name: {
                              en_GB: 'Bedroom Furniture',
                            },
                            slug: {
                              type: 'link',
                              target: 'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac',
                              en_GB: '/eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac',
                            },
                            subCategories: [
                              {
                                categoryId: {
                                  en_GB: '7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                                name: {
                                  en_GB: 'Beds',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                  en_GB:
                                    '/eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/7165ecef-961d-4809-ab16-1a8c15531edc',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '1c9de70f-5559-44b9-a48f-63b90cba8976',
                                },
                                name: {
                                  en_GB: 'Dressers',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/1c9de70f-5559-44b9-a48f-63b90cba8976',
                                  en_GB:
                                    '/eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/1c9de70f-5559-44b9-a48f-63b90cba8976',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: 'fffcaf52-62c5-45a7-a0ec-4768e7d33d48',
                                },
                                name: {
                                  en_GB: 'Bedside Tables',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/fffcaf52-62c5-45a7-a0ec-4768e7d33d48',
                                  en_GB:
                                    '/eab8e720-8046-46fb-a9be-1a397ef24f21/c9f2b968-f5d3-4040-be9e-529219ef11ac/fffcaf52-62c5-45a7-a0ec-4768e7d33d48',
                                },
                              },
                            ],
                          },
                          {
                            categoryId: {
                              en_GB: 'c5a3d83f-0ada-408f-84fc-a754d6aca8be',
                            },
                            name: {
                              en_GB: 'Living Room Furniture',
                            },
                            slug: {
                              en_GB: '/eab8e720-8046-46fb-a9be-1a397ef24f21/c5a3d83f-0ada-408f-84fc-a754d6aca8be',
                            },
                            subCategories: [
                              {
                                categoryId: {
                                  en_GB: '9e3934ee-d53f-4f3c-af09-5bb279f30672',
                                },
                                name: {
                                  en_GB: 'Sofas',
                                },
                                slug: {
                                  en_GB:
                                    '/eab8e720-8046-46fb-a9be-1a397ef24f21/c5a3d83f-0ada-408f-84fc-a754d6aca8be/9e3934ee-d53f-4f3c-af09-5bb279f30672',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '826ab7ee-eb45-4f4f-9ae0-5cd6eea53c4b',
                                },
                                name: {
                                  en_GB: 'Chairs',
                                },
                                slug: {
                                  en_GB:
                                    '/eab8e720-8046-46fb-a9be-1a397ef24f21/c5a3d83f-0ada-408f-84fc-a754d6aca8be/826ab7ee-eb45-4f4f-9ae0-5cd6eea53c4b',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '2e51af19-440f-428d-9783-c9dd614abee2',
                                },
                                name: {
                                  en_GB: 'Coffee Tables',
                                },
                                slug: {
                                  en_GB:
                                    '/eab8e720-8046-46fb-a9be-1a397ef24f21/c5a3d83f-0ada-408f-84fc-a754d6aca8be/2e51af19-440f-428d-9783-c9dd614abee2',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: 'fae26257-81b4-4c57-9997-a0efefd77271',
                                },
                                name: {
                                  en_GB: 'Side Tables',
                                },
                                slug: {
                                  en_GB:
                                    '/eab8e720-8046-46fb-a9be-1a397ef24f21/c5a3d83f-0ada-408f-84fc-a754d6aca8be/fae26257-81b4-4c57-9997-a0efefd77271',
                                },
                              },
                            ],
                          },
                          {
                            categoryId: {
                              en_GB: 'bb26c6ec-244e-4390-962a-da377f1df8ff',
                            },
                            name: {
                              en_GB: 'Home Office Furniture',
                            },
                            slug: {
                              en_GB: '/eab8e720-8046-46fb-a9be-1a397ef24f21/bb26c6ec-244e-4390-962a-da377f1df8ff',
                            },
                            subCategories: [
                              {
                                categoryId: {
                                  en_GB: '92584630-d632-4449-b830-503077bc509e',
                                },
                                name: {
                                  en_GB: 'Desks and Chairs',
                                },
                                slug: {
                                  en_GB:
                                    '/eab8e720-8046-46fb-a9be-1a397ef24f21/bb26c6ec-244e-4390-962a-da377f1df8ff/92584630-d632-4449-b830-503077bc509e',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '6fc735c1-6a8d-40f8-9ec7-261088659738',
                                },
                                name: {
                                  en_GB: 'Bookcases',
                                },
                                slug: {
                                  en_GB:
                                    '/eab8e720-8046-46fb-a9be-1a397ef24f21/bb26c6ec-244e-4390-962a-da377f1df8ff/6fc735c1-6a8d-40f8-9ec7-261088659738',
                                },
                              },
                            ],
                          },
                          {
                            categoryId: {
                              en_GB: '3df55be6-ebce-4887-934e-bff43e183858',
                            },
                            name: {
                              en_GB: 'Collections',
                            },
                            slug: {
                              en_GB: '/eab8e720-8046-46fb-a9be-1a397ef24f21/3df55be6-ebce-4887-934e-bff43e183858',
                            },
                            subCategories: [
                              {
                                categoryId: {
                                  en_GB: '7c3f060a-0548-4d9c-90d5-718e23498ef4',
                                },
                                name: {
                                  en_GB: 'The Modernist',
                                },
                                slug: {
                                  en_GB:
                                    '/eab8e720-8046-46fb-a9be-1a397ef24f21/3df55be6-ebce-4887-934e-bff43e183858/7c3f060a-0548-4d9c-90d5-718e23498ef4',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '9c5ec253-dfc8-45c4-b79c-0686262c57d3',
                                },
                                name: {
                                  en_GB: 'The Traditionalist',
                                },
                                slug: {
                                  en_GB:
                                    '/eab8e720-8046-46fb-a9be-1a397ef24f21/3df55be6-ebce-4887-934e-bff43e183858/9c5ec253-dfc8-45c4-b79c-0686262c57d3',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: 'de27ed3f-9c2e-4ada-aa06-1ca86a972c43',
                                },
                                name: {
                                  en_GB: 'The Minimalist',
                                },
                                slug: {
                                  en_GB:
                                    '/eab8e720-8046-46fb-a9be-1a397ef24f21/3df55be6-ebce-4887-934e-bff43e183858/de27ed3f-9c2e-4ada-aa06-1ca86a972c43',
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        categoryId: {
                          en_GB: '575a0a47-dfbf-4033-9dfa-ce83c02df046',
                        },
                        name: {
                          en_GB: 'Home Decor',
                        },
                        slug: {
                          type: 'link',
                          target: '575a0a47-dfbf-4033-9dfa-ce83c02df046',
                          en_GB: '/575a0a47-dfbf-4033-9dfa-ce83c02df046',
                        },
                        subCategories: [
                          {
                            categoryId: {
                              en_GB: 'fae8b9af-3b41-474b-9301-772745e395b7',
                            },
                            name: {
                              en_GB: 'Planters',
                            },
                            slug: {
                              type: 'link',
                              target: '575a0a47-dfbf-4033-9dfa-ce83c02df046/fae8b9af-3b41-474b-9301-772745e395b7',
                              en_GB: '/575a0a47-dfbf-4033-9dfa-ce83c02df046/fae8b9af-3b41-474b-9301-772745e395b7',
                            },
                            subCategories: [
                              {
                                categoryId: {
                                  en_GB: 'a4dea945-8878-41ea-b34a-823d54a62932',
                                },
                                name: {
                                  en_GB: 'Outdoor Planters',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/fae8b9af-3b41-474b-9301-772745e395b7/a4dea945-8878-41ea-b34a-823d54a62932',
                                  en_GB:
                                    '/575a0a47-dfbf-4033-9dfa-ce83c02df046/fae8b9af-3b41-474b-9301-772745e395b7/a4dea945-8878-41ea-b34a-823d54a62932',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '61bbf560-a5d4-4143-a79d-9b3fe40d3595',
                                },
                                name: {
                                  en_GB: 'Indoor Planters',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/fae8b9af-3b41-474b-9301-772745e395b7/61bbf560-a5d4-4143-a79d-9b3fe40d3595',
                                  en_GB:
                                    '/575a0a47-dfbf-4033-9dfa-ce83c02df046/fae8b9af-3b41-474b-9301-772745e395b7/61bbf560-a5d4-4143-a79d-9b3fe40d3595',
                                },
                              },
                            ],
                          },
                          {
                            categoryId: {
                              en_GB: 'b525d872-5fc3-402f-a2e7-f034b5246bde',
                            },
                            name: {
                              en_GB: 'Wall Art',
                            },
                            slug: {
                              type: 'link',
                              target: '575a0a47-dfbf-4033-9dfa-ce83c02df046/b525d872-5fc3-402f-a2e7-f034b5246bde',
                              en_GB: '/575a0a47-dfbf-4033-9dfa-ce83c02df046/b525d872-5fc3-402f-a2e7-f034b5246bde',
                            },
                            subCategories: [
                              {
                                categoryId: {
                                  en_GB: '08ac4b0c-0d5d-499b-a1b6-428549d3e2d6',
                                },
                                name: {
                                  en_GB: 'Sculptures',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/b525d872-5fc3-402f-a2e7-f034b5246bde/08ac4b0c-0d5d-499b-a1b6-428549d3e2d6',
                                  en_GB:
                                    '/575a0a47-dfbf-4033-9dfa-ce83c02df046/b525d872-5fc3-402f-a2e7-f034b5246bde/08ac4b0c-0d5d-499b-a1b6-428549d3e2d6',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '52be52f3-f2e9-466e-baf5-c9408c75a65b',
                                },
                                name: {
                                  en_GB: 'Classical Art',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/b525d872-5fc3-402f-a2e7-f034b5246bde/52be52f3-f2e9-466e-baf5-c9408c75a65b',
                                  en_GB:
                                    '/575a0a47-dfbf-4033-9dfa-ce83c02df046/b525d872-5fc3-402f-a2e7-f034b5246bde/52be52f3-f2e9-466e-baf5-c9408c75a65b',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: 'a850800b-2c64-460d-84d5-48123d5682fc',
                                },
                                name: {
                                  en_GB: 'Modern Art',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/b525d872-5fc3-402f-a2e7-f034b5246bde/a850800b-2c64-460d-84d5-48123d5682fc',
                                  en_GB:
                                    '/575a0a47-dfbf-4033-9dfa-ce83c02df046/b525d872-5fc3-402f-a2e7-f034b5246bde/a850800b-2c64-460d-84d5-48123d5682fc',
                                },
                              },
                            ],
                          },
                          {
                            categoryId: {
                              en_GB: 'a2b7fb69-4696-4929-944d-e238dab709c7',
                            },
                            name: {
                              en_GB: 'Pillows',
                            },
                            slug: {
                              type: 'link',
                              target: '575a0a47-dfbf-4033-9dfa-ce83c02df046/a2b7fb69-4696-4929-944d-e238dab709c7',
                              en_GB: '/575a0a47-dfbf-4033-9dfa-ce83c02df046/a2b7fb69-4696-4929-944d-e238dab709c7',
                            },
                            subCategories: [
                              {
                                categoryId: {
                                  en_GB: '20f6d3d8-5243-4790-8cd9-8914ee45c6a6',
                                },
                                name: {
                                  en_GB: 'Pillow Covers',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/a2b7fb69-4696-4929-944d-e238dab709c7/20f6d3d8-5243-4790-8cd9-8914ee45c6a6',
                                  en_GB:
                                    '/575a0a47-dfbf-4033-9dfa-ce83c02df046/a2b7fb69-4696-4929-944d-e238dab709c7/20f6d3d8-5243-4790-8cd9-8914ee45c6a6',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '9789ac68-5615-4f07-bbb8-3ce0ef070585',
                                },
                                name: {
                                  en_GB: 'Memory Foam',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/a2b7fb69-4696-4929-944d-e238dab709c7/9789ac68-5615-4f07-bbb8-3ce0ef070585',
                                  en_GB:
                                    '/575a0a47-dfbf-4033-9dfa-ce83c02df046/a2b7fb69-4696-4929-944d-e238dab709c7/9789ac68-5615-4f07-bbb8-3ce0ef070585',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '92ee3331-372a-47b4-a345-31f22946885c',
                                },
                                name: {
                                  en_GB: 'Feather',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/a2b7fb69-4696-4929-944d-e238dab709c7/92ee3331-372a-47b4-a345-31f22946885c',
                                  en_GB:
                                    '/575a0a47-dfbf-4033-9dfa-ce83c02df046/a2b7fb69-4696-4929-944d-e238dab709c7/92ee3331-372a-47b4-a345-31f22946885c',
                                },
                              },
                            ],
                          },
                          {
                            categoryId: {
                              en_GB: 'cbae1758-bda1-415e-833a-e298d4f44e54',
                            },
                            name: {
                              en_GB: 'Room Decor',
                            },
                            slug: {
                              type: 'link',
                              target: '575a0a47-dfbf-4033-9dfa-ce83c02df046/cbae1758-bda1-415e-833a-e298d4f44e54',
                              en_GB: '/575a0a47-dfbf-4033-9dfa-ce83c02df046/cbae1758-bda1-415e-833a-e298d4f44e54',
                            },
                            subCategories: [
                              {
                                categoryId: {
                                  en_GB: 'c6d01af9-703d-411a-822d-60db50fbe32b',
                                },
                                name: {
                                  en_GB: 'Vases',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/cbae1758-bda1-415e-833a-e298d4f44e54/c6d01af9-703d-411a-822d-60db50fbe32b',
                                  en_GB:
                                    '/575a0a47-dfbf-4033-9dfa-ce83c02df046/cbae1758-bda1-415e-833a-e298d4f44e54/c6d01af9-703d-411a-822d-60db50fbe32b',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '82bd0a34-4b93-4ba9-aa7b-e339083aee06',
                                },
                                name: {
                                  en_GB: 'Candles',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/cbae1758-bda1-415e-833a-e298d4f44e54/82bd0a34-4b93-4ba9-aa7b-e339083aee06',
                                  en_GB:
                                    '/575a0a47-dfbf-4033-9dfa-ce83c02df046/cbae1758-bda1-415e-833a-e298d4f44e54/82bd0a34-4b93-4ba9-aa7b-e339083aee06',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '023d9c67-2ad0-4fe8-ba33-5d93fe1de09f',
                                },
                                name: {
                                  en_GB: 'Baskets',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    '575a0a47-dfbf-4033-9dfa-ce83c02df046/cbae1758-bda1-415e-833a-e298d4f44e54/023d9c67-2ad0-4fe8-ba33-5d93fe1de09f',
                                  en_GB:
                                    '/575a0a47-dfbf-4033-9dfa-ce83c02df046/cbae1758-bda1-415e-833a-e298d4f44e54/023d9c67-2ad0-4fe8-ba33-5d93fe1de09f',
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        categoryId: {
                          en_GB: 'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4',
                        },
                        name: {
                          en_GB: 'Kitchen',
                        },
                        slug: {
                          type: 'link',
                          target: 'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4',
                          en_GB: '/cdb77397-cf53-4afc-bbf7-b3db5f99dfe4',
                        },
                        subCategories: [
                          {
                            categoryId: {
                              en_GB: '3f30317c-ef62-4c59-a646-3b9e382f46df',
                            },
                            name: {
                              en_GB: 'Serveware',
                            },
                            slug: {
                              type: 'link',
                              target: 'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/3f30317c-ef62-4c59-a646-3b9e382f46df',
                              en_GB: '/cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/3f30317c-ef62-4c59-a646-3b9e382f46df',
                            },
                            subCategories: [
                              {
                                categoryId: {
                                  en_GB: '66951be4-a3ce-461e-9529-5c5f268479c3',
                                },
                                name: {
                                  en_GB: 'Bakeware',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/3f30317c-ef62-4c59-a646-3b9e382f46df/66951be4-a3ce-461e-9529-5c5f268479c3',
                                  en_GB:
                                    '/cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/3f30317c-ef62-4c59-a646-3b9e382f46df/66951be4-a3ce-461e-9529-5c5f268479c3',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '286156f7-b6de-4962-92d3-38023db1c2e6',
                                },
                                name: {
                                  en_GB: 'Cheese Trays',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/3f30317c-ef62-4c59-a646-3b9e382f46df/286156f7-b6de-4962-92d3-38023db1c2e6',
                                  en_GB:
                                    '/cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/3f30317c-ef62-4c59-a646-3b9e382f46df/286156f7-b6de-4962-92d3-38023db1c2e6',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: 'f4784457-09e7-4bb5-bc18-1fabd0ec5dc9',
                                },
                                name: {
                                  en_GB: 'Serving Platters',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/3f30317c-ef62-4c59-a646-3b9e382f46df/f4784457-09e7-4bb5-bc18-1fabd0ec5dc9',
                                  en_GB:
                                    '/cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/3f30317c-ef62-4c59-a646-3b9e382f46df/f4784457-09e7-4bb5-bc18-1fabd0ec5dc9',
                                },
                              },
                            ],
                          },
                          {
                            categoryId: {
                              en_GB: '0190c54c-de58-42f2-9790-81c2a6a6bd77',
                            },
                            name: {
                              en_GB: 'Bar and Glassware',
                            },
                            slug: {
                              type: 'link',
                              target: 'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/0190c54c-de58-42f2-9790-81c2a6a6bd77',
                              en_GB: '/cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/0190c54c-de58-42f2-9790-81c2a6a6bd77',
                            },
                            subCategories: [
                              {
                                categoryId: {
                                  en_GB: '3cdb27f4-673f-42a5-9f7e-48ea10fef85d',
                                },
                                name: {
                                  en_GB: 'Bar Accessories',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/0190c54c-de58-42f2-9790-81c2a6a6bd77/3cdb27f4-673f-42a5-9f7e-48ea10fef85d',
                                  en_GB:
                                    '/cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/0190c54c-de58-42f2-9790-81c2a6a6bd77/3cdb27f4-673f-42a5-9f7e-48ea10fef85d',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: 'f7850832-e22f-4487-8460-d62edd6e5804',
                                },
                                name: {
                                  en_GB: 'Coasters',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/0190c54c-de58-42f2-9790-81c2a6a6bd77/f7850832-e22f-4487-8460-d62edd6e5804',
                                  en_GB:
                                    '/cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/0190c54c-de58-42f2-9790-81c2a6a6bd77/f7850832-e22f-4487-8460-d62edd6e5804',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '36c8214a-68e1-48fb-ac27-0d2763bbf5c3',
                                },
                                name: {
                                  en_GB: 'Glassware',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/0190c54c-de58-42f2-9790-81c2a6a6bd77/36c8214a-68e1-48fb-ac27-0d2763bbf5c3',
                                  en_GB:
                                    '/cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/0190c54c-de58-42f2-9790-81c2a6a6bd77/36c8214a-68e1-48fb-ac27-0d2763bbf5c3',
                                },
                              },
                            ],
                          },
                          {
                            categoryId: {
                              en_GB: 'bb10ed31-b247-4aef-9166-4463ded2e32b',
                            },
                            name: {
                              en_GB: 'Dinnerware',
                            },
                            slug: {
                              type: 'link',
                              target: 'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/bb10ed31-b247-4aef-9166-4463ded2e32b',
                              en_GB: '/cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/bb10ed31-b247-4aef-9166-4463ded2e32b',
                            },
                            subCategories: [
                              {
                                categoryId: {
                                  en_GB: '47a52b0f-6c52-41f9-af0d-7b71886ec40e',
                                },
                                name: {
                                  en_GB: 'Plates',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/bb10ed31-b247-4aef-9166-4463ded2e32b/47a52b0f-6c52-41f9-af0d-7b71886ec40e',
                                  en_GB:
                                    '/cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/bb10ed31-b247-4aef-9166-4463ded2e32b/47a52b0f-6c52-41f9-af0d-7b71886ec40e',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '76b0a5c2-cd33-45e6-aaaa-ad29a116c05e',
                                },
                                name: {
                                  en_GB: 'Bowls',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/bb10ed31-b247-4aef-9166-4463ded2e32b/76b0a5c2-cd33-45e6-aaaa-ad29a116c05e',
                                  en_GB:
                                    '/cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/bb10ed31-b247-4aef-9166-4463ded2e32b/76b0a5c2-cd33-45e6-aaaa-ad29a116c05e',
                                },
                              },
                              {
                                categoryId: {
                                  en_GB: '9b8d2c88-e859-44fb-a5fd-5576e3621bc2',
                                },
                                name: {
                                  en_GB: 'Mugs',
                                },
                                slug: {
                                  type: 'link',
                                  target:
                                    'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/bb10ed31-b247-4aef-9166-4463ded2e32b/9b8d2c88-e859-44fb-a5fd-5576e3621bc2',
                                  en_GB:
                                    '/cdb77397-cf53-4afc-bbf7-b3db5f99dfe4/bb10ed31-b247-4aef-9166-4463ded2e32b/9b8d2c88-e859-44fb-a5fd-5576e3621bc2',
                                },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
            {
              _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\LayoutElement',
              layoutElementId: '8dc809aa-a9ae-4d92-b088-12297ebd5951',
              configuration: {
                _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\LayoutElement\\Configuration',
                size: 12,
                mobile: true,
                tablet: true,
                desktop: true,
              },
              tastics: [
                {
                  _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Tastic',
                  tasticId: 'debce0c4-3adc-47c3-a582-1ce22c4eecba',
                  tasticType: 'commercetools/ui/content/hero',
                  configuration: {
                    _type: 'Frontastic\\Catwalk\\FrontendBundle\\Domain\\Tastic\\Configuration',
                    mobile: true,
                    tablet: true,
                    desktop: true,
                    image: {
                      media: {
                        _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                        mediaId: 'wh5n97jfziij8wvpof6a',
                        resourceType: 'image',
                        name: 'AdobeStock 267566919',
                        tags: ['__none'],
                        file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1662554417/wh5n97jfziij8wvpof6a.jpg',
                        size: 729582,
                        width: 1600,
                        height: 889,
                        format: 'jpg',
                        created: '2022-09-07T12:40:17+00:00',
                        metaData: '_FILTERED_',
                      },
                      ratio: '16:9',
                      gravity: {
                        mode: 'custom',
                        coordinates: {
                          x: 3,
                          y: 9,
                        },
                      },
                    },
                    title: 'CURATED HOME DECOR',
                    subtitle: 'SELECT PIECES',
                    ctaLabel: 'To The Campaign',
                    ctaReference: {
                      _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                      type: 'link',
                      link: '/furniture',
                      openInNewWindow: false,
                    },
                  },
                },
              ],
            },
          ],
        },
        main: {
          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Section',
          sectionId: 'main',
          layoutElements: [
            {
              _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\LayoutElement',
              layoutElementId: 'ef469cd6-bbd8-4631-aa69-968587949977',
              configuration: {
                _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\LayoutElement\\Configuration',
                size: 12,
                mobile: true,
                tablet: true,
                desktop: true,
              },
              tastics: [
                {
                  _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Tastic',
                  tasticId: '3324b64d-0db7-425f-bd65-ad2239b0b171',
                  tasticType: 'commercetools/ui/content/spacer',
                  configuration: {
                    _type: 'Frontastic\\Catwalk\\FrontendBundle\\Domain\\Tastic\\Configuration',
                    mobile: true,
                    tablet: true,
                    desktop: true,
                    customMobile: 10,
                    customTablet: 12,
                    customDesktop: 24,
                    backgroundColor: 'neutral-200',
                  },
                },
                {
                  _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Tastic',
                  tasticId: 'c1f22554-8bed-49f6-bc4e-24e5e9948326',
                  tasticType: 'commercetools/ui/category-slider',
                  configuration: {
                    _type: 'Frontastic\\Catwalk\\FrontendBundle\\Domain\\Tastic\\Configuration',
                    mobile: true,
                    tablet: true,
                    desktop: true,
                    tiles: [
                      {
                        title: 'Sofas & Armchairs',
                        image: {
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'md2hnftoszqddlmls9ug',
                            resourceType: 'image',
                            name: 'Sofa',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1663585326/md2hnftoszqddlmls9ug.jpg',
                            size: 95129,
                            width: 1170,
                            height: 780,
                            format: 'jpg',
                            created: '2022-09-19T11:02:06+00:00',
                            metaData: '_FILTERED_',
                          },
                        },
                        target: null,
                      },
                      {
                        title: 'Office Desks and Chairs',
                        image: {
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'sr2yrr5juxgjjbgpd60o',
                            resourceType: 'image',
                            name: 'AdobeStock 415994706',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1662622847/sr2yrr5juxgjjbgpd60o.jpg',
                            size: 2851182,
                            width: 4320,
                            height: 4320,
                            format: 'jpg',
                            created: '2022-09-08T07:40:47+00:00',
                            metaData: '_FILTERED_',
                          },
                        },
                        target: null,
                      },
                      {
                        title: 'Memory Foam Pillows',
                        image: {
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'qlrmqnw7pcthdrjyatmk',
                            resourceType: 'image',
                            name: 'AdobeStock 326361719',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1663585387/qlrmqnw7pcthdrjyatmk.jpg',
                            size: 4465822,
                            width: 3840,
                            height: 3840,
                            format: 'jpg',
                            created: '2022-09-19T11:03:07+00:00',
                            metaData: '_FILTERED_',
                          },
                        },
                        target: null,
                      },
                      {
                        title: 'Indoor Planters',
                        image: {
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'zbijymquk4e30ilrd5xn',
                            resourceType: 'image',
                            name: 'AdobeStock 494651185',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1663657332/zbijymquk4e30ilrd5xn.jpg',
                            size: 1841888,
                            width: 3000,
                            height: 2001,
                            format: 'jpg',
                            created: '2022-09-20T07:02:12+00:00',
                            metaData: '_FILTERED_',
                          },
                        },
                        target: null,
                      },
                      {
                        title: 'Decór',
                        image: {
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'gitvrjsltwwedn1uzqxr',
                            resourceType: 'image',
                            name: 'Fig-rosewood-CIHvutNMN1M-unsplash',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1665676382/gitvrjsltwwedn1uzqxr.jpg',
                            size: 2533569,
                            width: 3998,
                            height: 4998,
                            format: 'jpg',
                            created: '2022-10-13T15:53:02+00:00',
                            metaData: '_FILTERED_',
                          },
                          title: [],
                        },
                        target: null,
                      },
                    ],
                  },
                },
                {
                  _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Tastic',
                  tasticId: '8e332a00-15df-44cc-afbe-77b8c865f503',
                  tasticType: 'commercetools/ui/content/spacer',
                  configuration: {
                    _type: 'Frontastic\\Catwalk\\FrontendBundle\\Domain\\Tastic\\Configuration',
                    mobile: true,
                    tablet: true,
                    desktop: true,
                    customMobile: 0,
                    customTablet: 12,
                    customDesktop: 24,
                    backgroundColor: 'neutral-200',
                  },
                },
                {
                  _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Tastic',
                  tasticId: 'cdf7fde8-b7ed-4e6a-addd-d8b0b8cae61f',
                  tasticType: 'commercetools/ui/content/tiles-group',
                  configuration: {
                    _type: 'Frontastic\\Catwalk\\FrontendBundle\\Domain\\Tastic\\Configuration',
                    mobile: true,
                    tablet: false,
                    desktop: false,
                    tiles: [
                      {
                        image: {
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'ktjcpw0he4yrkzkgamcg',
                            resourceType: 'image',
                            name: 'Photo-1618941027499-790b098c04b3',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1665480635/ktjcpw0he4yrkzkgamcg.avif',
                            size: 229387,
                            width: 1064,
                            height: 1330,
                            format: 'avif',
                            created: '2022-10-11T09:30:35+00:00',
                            metaData: '_FILTERED_',
                          },
                        },
                        title: 'Bedding & Bed sets',
                        subtitle: '40% OFF',
                        ctaLabel: 'Shop now',
                        ctaReference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '#',
                          openInNewWindow: false,
                        },
                        roundedBorders: true,
                      },
                      {
                        image: {
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'afbddilfzvvw9hdkwikv',
                            resourceType: 'image',
                            name: 'AdobeStock 510169269',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1662622862/afbddilfzvvw9hdkwikv.jpg',
                            size: 516362,
                            width: 1378,
                            height: 1378,
                            format: 'jpg',
                            created: '2022-09-08T07:41:02+00:00',
                            metaData: '_FILTERED_',
                          },
                        },
                        title: 'Alva Collection',
                        subtitle: '20% OFF',
                        ctaLabel: 'Shop now',
                        ctaReference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '#',
                          openInNewWindow: false,
                        },
                        roundedBorders: true,
                      },
                    ],
                  },
                },
                {
                  _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Tastic',
                  tasticId: '03330553-ff7e-49a6-977f-2f92bf135475',
                  tasticType: 'commercetools/ui/content/tiles-group',
                  configuration: {
                    _type: 'Frontastic\\Catwalk\\FrontendBundle\\Domain\\Tastic\\Configuration',
                    mobile: false,
                    tablet: true,
                    desktop: true,
                    tiles: [
                      {
                        image: {
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'ktjcpw0he4yrkzkgamcg',
                            resourceType: 'image',
                            name: 'Photo-1618941027499-790b098c04b3',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1665480635/ktjcpw0he4yrkzkgamcg.avif',
                            size: 229387,
                            width: 1064,
                            height: 1330,
                            format: 'avif',
                            created: '2022-10-11T09:30:35+00:00',
                            metaData: '_FILTERED_',
                          },
                        },
                        title: 'Bedding & Bed sets',
                        subtitle: '40% OFF',
                        ctaLabel: 'Shop now',
                        ctaReference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '#',
                          openInNewWindow: false,
                        },
                        roundedBorders: true,
                      },
                      {
                        image: {
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'afbddilfzvvw9hdkwikv',
                            resourceType: 'image',
                            name: 'AdobeStock 510169269',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1662622862/afbddilfzvvw9hdkwikv.jpg',
                            size: 516362,
                            width: 1378,
                            height: 1378,
                            format: 'jpg',
                            created: '2022-09-08T07:41:02+00:00',
                            metaData: '_FILTERED_',
                          },
                          ratio: '4:3',
                        },
                        title: 'Alva Collection',
                        subtitle: '20% OFF',
                        ctaLabel: 'Shop now',
                        ctaReference: {
                          _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                          type: 'link',
                          link: '#',
                          openInNewWindow: false,
                        },
                        roundedBorders: true,
                      },
                    ],
                  },
                },
                {
                  _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Tastic',
                  tasticId: 'afc354c6-5366-4608-8020-6a9a69655948',
                  tasticType: 'commercetools/ui/content/spacer',
                  configuration: {
                    _type: 'Frontastic\\Catwalk\\FrontendBundle\\Domain\\Tastic\\Configuration',
                    mobile: true,
                    tablet: true,
                    desktop: true,
                    customMobile: 20,
                    customTablet: 24,
                    customDesktop: 50,
                    backgroundColor: 'neutral-200',
                  },
                },
                {
                  _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Tastic',
                  tasticId: 'd65216a0-83d9-4597-b2ca-808498f3dddf',
                  tasticType: 'commercetools/ui/products/slider',
                  configuration: {
                    _type: 'Frontastic\\Catwalk\\FrontendBundle\\Domain\\Tastic\\Configuration',
                    mobile: true,
                    tablet: true,
                    desktop: true,
                    title: 'New Arrivals',
                    data: {
                      _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\DataSourceReference',
                      dataSourceId: '788eccfd-bc94-4a95-aa7d-7e9fee1ec8ee',
                    },
                    ctaLabel: 'Shop All',
                    ctaLink: {
                      _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
                      type: 'link',
                      link: '/men',
                      openInNewWindow: false,
                    },
                    subline: 'Explore our new arrivals and shop your favourites.',
                    titleVariant: 'lg',
                    subtitleVariant: 'lg',
                  },
                },
                {
                  _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Tastic',
                  tasticId: 'f4057287-dbd1-471f-bfc9-9e22e6ffd714',
                  tasticType: 'commercetools/ui/content/spacer',
                  configuration: {
                    _type: 'Frontastic\\Catwalk\\FrontendBundle\\Domain\\Tastic\\Configuration',
                    mobile: true,
                    tablet: true,
                    desktop: true,
                    customMobile: 24,
                    customTablet: 50,
                    customDesktop: 52,
                    backgroundColor: 'neutral-200',
                  },
                },
                {
                  _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Tastic',
                  tasticId: '1e79fb29-4621-4857-97d8-7244b9563219',
                  tasticType: 'commercetools/ui/content/spacer',
                  configuration: {
                    _type: 'Frontastic\\Catwalk\\FrontendBundle\\Domain\\Tastic\\Configuration',
                    mobile: true,
                    tablet: true,
                    desktop: true,
                    customMobile: 24,
                    customTablet: 24,
                    customDesktop: 40,
                    backgroundColor: 'white',
                  },
                },
                {
                  _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Tastic',
                  tasticId: '04de4988-085e-4653-8e14-ae1fb0d1e4ed',
                  tasticType: 'commercetools/ui/content/content-slider',
                  configuration: {
                    _type: 'Frontastic\\Catwalk\\FrontendBundle\\Domain\\Tastic\\Configuration',
                    mobile: true,
                    tablet: true,
                    desktop: true,
                    title: 'Get Inspired',
                    subtitle: 'Explore our editors guide of seasonal trends and favorites.',
                    slides: [
                      {
                        image: {
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'ghbmqwmrvcjdulesn2wn',
                            resourceType: 'image',
                            name: 'AdobeStock 408168940',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1663673618/ghbmqwmrvcjdulesn2wn.jpg',
                            size: 5765383,
                            width: 5000,
                            height: 3750,
                            format: 'jpg',
                            created: '2022-09-20T11:33:38+00:00',
                            metaData: '_FILTERED_',
                          },
                          gravity: {
                            mode: 'center',
                          },
                        },
                        title: 'Sustainable living in 10 steps',
                        target: null,
                        ctaLabel: 'Read more',
                        ctaReference: null,
                      },
                      {
                        image: {
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'sdtl9rm8nhyxblk8bpla',
                            resourceType: 'image',
                            name: 'AdobeStock 527188541',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1663673279/sdtl9rm8nhyxblk8bpla.jpg',
                            size: 2873872,
                            width: 3496,
                            height: 2504,
                            format: 'jpg',
                            created: '2022-09-20T11:27:59+00:00',
                            metaData: '_FILTERED_',
                          },
                          gravity: {
                            mode: 'center',
                          },
                        },
                        title: 'The Mint Story',
                        target: null,
                        ctaLabel: 'Read more',
                        ctaReference: null,
                      },
                      {
                        image: {
                          media: {
                            _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
                            mediaId: 'cru0ffd0gqzfjbe6hlsb',
                            resourceType: 'image',
                            name: 'AdobeStock 524930991',
                            tags: ['__none'],
                            file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1663659815/cru0ffd0gqzfjbe6hlsb.jpg',
                            size: 6212162,
                            width: 4420,
                            height: 4420,
                            format: 'jpg',
                            created: '2022-09-20T07:43:35+00:00',
                            metaData: '_FILTERED_',
                          },
                          gravity: {
                            mode: 'center',
                          },
                        },
                        title: '5 Cocktail Glasses You Need Right Now',
                        target: null,
                        ctaLabel: 'Read more',
                        ctaReference: null,
                      },
                    ],
                  },
                },
                {
                  _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\Tastic',
                  tasticId: '3fdc9939-1134-4ca0-823c-cc4e7679cd78',
                  tasticType: 'commercetools/ui/content/spacer',
                  configuration: {
                    _type: 'Frontastic\\Catwalk\\FrontendBundle\\Domain\\Tastic\\Configuration',
                    mobile: true,
                    tablet: true,
                    desktop: true,
                    customMobile: 21,
                    customTablet: 26,
                    customDesktop: 80,
                    backgroundColor: 'white',
                  },
                },
              ],
            },
          ],
        },
      },
      state: 'default',
    },
    pageFolder: {
      _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\PageFolder',
      pageFolderId: '128f5754b95e5c9e1a1955fa1f5caf0b',
      isDynamic: false,
      pageFolderType: 'landingpage',
      configuration: {
        path: '/',
        pathTranslations: {
          'de_DE@EUR': '/',
          'en_GB@GBP': '/',
        },
      },
      dataSourceConfigurations: [
        {
          streamId: '788eccfd-bc94-4a95-aa7d-7e9fee1ec8ee',
          type: 'frontastic/product-list',
          name: 'Product list',
          configuration: {
            query: '',
            productFilters: {
              filters: [
                {
                  field: 'categoryId',
                  type: 'enum',
                },
              ],
              values: {
                categoryId: '076ab018-de9f-4a55-a436-ffd18d22fc66',
              },
            },
          },
        },
        {
          streamId: '0847282c-4141-4050-8f0a-1f406bfb0805',
          type: 'frontastic/product-list',
          name: 'Product list',
          configuration: {
            productFilters: {
              filters: [
                {
                  field: 'categoryId',
                  type: 'enum',
                },
              ],
              values: {
                categoryId: '076ab018-de9f-4a55-a436-ffd18d22fc66',
              },
            },
          },
        },
        {
          streamId: 'c91eb329-4ba9-4a7d-b8f0-52e3858d56b4',
          type: 'frontastic/product-list',
          name: 'Product list',
          configuration: [],
        },
      ],
      name: 'Home',
      ancestorIdsMaterializedPath: '/',
      depth: 0,
      sort: 0,
      breadcrumbs: [],
    },
    data: {
      _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\PageViewData',
      dataSources: {
        '788eccfd-bc94-4a95-aa7d-7e9fee1ec8ee': {
          total: 10,
          items: [
            {
              productId: 'fdba72e8-715e-4ff5-aa5b-8d18a479b81c',
              version: '94',
              name: 'Geometric Pillow Case',
              categories: [
                {
                  categoryId: '20f6d3d8-5243-4790-8cd9-8914ee45c6a6',
                },
                {
                  categoryId: 'a2b7fb69-4696-4929-944d-e238dab709c7',
                },
                {
                  categoryId: '575a0a47-dfbf-4033-9dfa-ce83c02df046',
                },
                {
                  categoryId: '076ab018-de9f-4a55-a436-ffd18d22fc66',
                },
              ],
              variants: [
                {
                  id: '1',
                  sku: 'GPC-01',
                  images: [
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_393014656-_k6QZQka.jpeg',
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_428905072-yDh7ZXzp.jpeg',
                  ],
                  attributes: {
                    color: 'silver',
                    colorlabel: 'Silver',
                    productspec:
                      '- Velvet fabric\n- Cotton lining\n- Pillow case comes with zip for easy removal\n- Pillow not included\n- Washable',
                  },
                  price: {
                    fractionDigits: 2,
                    centAmount: 1999,
                    currencyCode: 'GBP',
                  },
                  isOnStock: true,
                },
                {
                  id: '2',
                  sku: 'GPC-02',
                  images: [
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_428905591-cqjZDCoa.jpeg',
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_428905072-jCMMBAQN.jpeg',
                  ],
                  attributes: {
                    color: 'lightpink',
                    colorlabel: 'Salmon Gold',
                    productspec:
                      '- Velvet fabric\n- Cotton lining\n- Pillow case comes with zip for easy removal\n- Pillow not included\n- Washable',
                  },
                  price: {
                    fractionDigits: 2,
                    centAmount: 1999,
                    currencyCode: 'GBP',
                  },
                  isOnStock: true,
                },
                {
                  id: '3',
                  sku: 'GPC-03',
                  images: [
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_428905063-7BiCdYkA.jpeg',
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_428905072-f5lSi4ra.jpeg',
                  ],
                  attributes: {
                    color: 'tan',
                    colorlabel: 'Ivory Tan',
                    productspec:
                      '- Velvet fabric\n- Cotton lining\n- Pillow case comes with zip for easy removal\n- Pillow not included\n- Washable',
                  },
                  price: {
                    fractionDigits: 2,
                    centAmount: 1999,
                    currencyCode: 'GBP',
                  },
                  isOnStock: true,
                },
              ],
              _url: '/geometric-pillow-case/p/GPC-01',
            },
            {
              productId: 'd7602214-7edc-4815-a173-69bcacc4666e',
              version: '72',
              name: 'Modern Glam Dresser',
              categories: [
                {
                  categoryId: 'eab8e720-8046-46fb-a9be-1a397ef24f21',
                },
                {
                  categoryId: '076ab018-de9f-4a55-a436-ffd18d22fc66',
                },
                {
                  categoryId: '7c3f060a-0548-4d9c-90d5-718e23498ef4',
                },
                {
                  categoryId: '1c9de70f-5559-44b9-a48f-63b90cba8976',
                },
                {
                  categoryId: 'c9f2b968-f5d3-4040-be9e-529219ef11ac',
                },
              ],
              variants: [
                {
                  id: '1',
                  sku: 'MGD-01',
                  images: [
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_305650073-NL2GuIBX.jpeg',
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_305650236-phU3WdJ7.jpeg',
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_305652757--mQZtlpW.jpeg',
                  ],
                  attributes: {
                    finish: 'silver',
                    finishlabel: 'Suede',
                    productspec: '- 3 large drawers\n- suede  and nickel finish on drawer handles\n- assembly on site',
                  },
                  price: {
                    fractionDigits: 2,
                    centAmount: 179900,
                    currencyCode: 'GBP',
                  },
                  isOnStock: true,
                },
              ],
              _url: '/modern-glam-dresser/p/MGD-01',
            },
            {
              productId: '4150d2d8-0b35-4c5e-b7dc-d3b00cd2253f',
              version: '88',
              name: 'Large Ceramic Plate',
              description: 'High quality dinner plates to serve meals in style',
              categories: [
                {
                  categoryId: 'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4',
                },
                {
                  categoryId: '47a52b0f-6c52-41f9-af0d-7b71886ec40e',
                },
                {
                  categoryId: 'bb10ed31-b247-4aef-9166-4463ded2e32b',
                },
                {
                  categoryId: '076ab018-de9f-4a55-a436-ffd18d22fc66',
                },
              ],
              variants: [
                {
                  id: '1',
                  sku: 'LCP-01',
                  images: [
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_301934007-L_4CrBFU.jpeg',
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_301935413-qxOvi5pU.jpeg',
                  ],
                  attributes: {
                    color: '#d8deb1',
                    colorlabel: 'Light Olive ',
                    productspec: '- Ceramic\n- Sold as 1 piece\n- Dishwasher safe\n- Microwave safe',
                  },
                  price: {
                    fractionDigits: 2,
                    centAmount: 399,
                    currencyCode: 'GBP',
                  },
                  isOnStock: true,
                },
                {
                  id: '2',
                  sku: 'LCP-02',
                  images: [
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_301934165-oaXhJdOH.jpeg',
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_301934702-XDrDFQRS.jpeg',
                  ],
                  attributes: {
                    color: '#ebebeb',
                    colorlabel: 'Light Gray',
                    productspec: '- Ceramic\n- Sold as 1 piece\n- Dishwasher safe\n- Microwave safe',
                  },
                  price: {
                    fractionDigits: 2,
                    centAmount: 399,
                    currencyCode: 'GBP',
                  },
                  isOnStock: true,
                },
              ],
              _url: '/large-ceramic-plate/p/LCP-01',
            },
            {
              productId: 'a7ea7f8f-a204-4806-a0e0-7142ce0dc171',
              version: '123',
              name: 'Traditional Three Seater Sofa',
              categories: [
                {
                  categoryId: 'c5a3d83f-0ada-408f-84fc-a754d6aca8be',
                },
                {
                  categoryId: '9e3934ee-d53f-4f3c-af09-5bb279f30672',
                },
                {
                  categoryId: 'eab8e720-8046-46fb-a9be-1a397ef24f21',
                },
                {
                  categoryId: '076ab018-de9f-4a55-a436-ffd18d22fc66',
                },
                {
                  categoryId: '9c5ec253-dfc8-45c4-b79c-0686262c57d3',
                },
                {
                  categoryId: '3df55be6-ebce-4887-934e-bff43e183858',
                },
              ],
              variants: [
                {
                  id: '1',
                  sku: 'TTSS-01',
                  images: [
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_305670594-0wqoZ-dr.jpeg',
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_305670456-WsI7wbFD.jpeg',
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_305671593-4T4P-rfg.jpeg',
                  ],
                  attributes: {
                    productspec: '- Three seater sofa\n- Velvet upholstery\n- Assembly on site',
                    color: '#09331c',
                    colorlabel: 'Emerald',
                    finish: '#202120',
                    finishlabel: 'Espresso',
                  },
                  price: {
                    fractionDigits: 2,
                    centAmount: 239900,
                    currencyCode: 'GBP',
                  },
                  discountedPrice: {
                    fractionDigits: 2,
                    centAmount: 215910,
                    currencyCode: 'GBP',
                  },
                  isOnStock: true,
                },
              ],
              _url: '/traditional-three-seater-sofa/p/TTSS-01',
            },
            {
              productId: '0137fe43-2114-40d2-9879-d70e82c4a6d4',
              version: '46',
              name: 'Purple Landscape Painting',
              description:
                'Riverbed at dawn is a painting in the style of the impressionist movement. The cool colors will give any room a calming and relaxing touch.',
              categories: [
                {
                  categoryId: '52be52f3-f2e9-466e-baf5-c9408c75a65b',
                },
                {
                  categoryId: 'b525d872-5fc3-402f-a2e7-f034b5246bde',
                },
                {
                  categoryId: '575a0a47-dfbf-4033-9dfa-ce83c02df046',
                },
                {
                  categoryId: '076ab018-de9f-4a55-a436-ffd18d22fc66',
                },
              ],
              variants: [
                {
                  id: '1',
                  sku: 'BLP-01',
                  images: [
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_460846480-_y6hLyeK.jpeg',
                  ],
                  attributes: {
                    productspec: '- Oil painting on canvas\n- Frame not included\n- Size: 4ft by 3ft',
                  },
                  price: {
                    fractionDigits: 2,
                    centAmount: 8999,
                    currencyCode: 'GBP',
                  },
                  isOnStock: true,
                },
              ],
              _url: '/purple-landscape-painting/p/BLP-01',
            },
            {
              productId: 'e3fbb56f-ef89-4ba6-88ed-15486e50cc6d',
              version: '49',
              name: 'Modern Landscape Painting',
              categories: [
                {
                  categoryId: '076ab018-de9f-4a55-a436-ffd18d22fc66',
                },
                {
                  categoryId: '575a0a47-dfbf-4033-9dfa-ce83c02df046',
                },
                {
                  categoryId: 'b525d872-5fc3-402f-a2e7-f034b5246bde',
                },
                {
                  categoryId: 'a850800b-2c64-460d-84d5-48123d5682fc',
                },
              ],
              variants: [
                {
                  id: '1',
                  sku: 'MLP-01',
                  images: [
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_211960511-y6iZlh8z.jpeg',
                  ],
                  attributes: {
                    productspec: '- Oil on canvas\n- Frame not included\n- 3ft by 4ft',
                  },
                  price: {
                    fractionDigits: 2,
                    centAmount: 5299,
                    currencyCode: 'GBP',
                  },
                  isOnStock: true,
                },
              ],
              _url: '/modern-landscape-painting/p/MLP-01',
            },
            {
              productId: '392b9743-6651-4ce7-a07a-f23278c3d169',
              version: '81',
              name: 'Abigail Lounge Chair',
              categories: [
                {
                  categoryId: 'c5a3d83f-0ada-408f-84fc-a754d6aca8be',
                },
                {
                  categoryId: 'eab8e720-8046-46fb-a9be-1a397ef24f21',
                },
                {
                  categoryId: '826ab7ee-eb45-4f4f-9ae0-5cd6eea53c4b',
                },
                {
                  categoryId: '076ab018-de9f-4a55-a436-ffd18d22fc66',
                },
              ],
              variants: [
                {
                  id: '1',
                  sku: 'ALC-01',
                  images: [
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_378975371-myB5QCrw.jpeg',
                  ],
                  attributes: {
                    color: 'lightpink',
                    colorlabel: 'Soft Pink',
                    finishlabel: 'Brass',
                    finish: 'goldenrod',
                    productspec: '- Comes with matching throw pillow\n- Velvet upholstery\n- Pre-assembled',
                  },
                  price: {
                    fractionDigits: 2,
                    centAmount: 75000,
                    currencyCode: 'GBP',
                  },
                  isOnStock: true,
                },
              ],
              _url: '/abigail-lounge-chair/p/ALC-01',
            },
            {
              productId: '9dd119f7-66c6-4937-b068-600603cace78',
              version: '66',
              name: 'Gold Rimmed Champagne Glasses',
              categories: [
                {
                  categoryId: '36c8214a-68e1-48fb-ac27-0d2763bbf5c3',
                },
                {
                  categoryId: '0190c54c-de58-42f2-9790-81c2a6a6bd77',
                },
                {
                  categoryId: 'cdb77397-cf53-4afc-bbf7-b3db5f99dfe4',
                },
                {
                  categoryId: '076ab018-de9f-4a55-a436-ffd18d22fc66',
                },
              ],
              variants: [
                {
                  id: '1',
                  sku: 'GRCG-01',
                  images: [
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_324635452-6Chpt8Bw.jpeg',
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_345693811-mWzNB9BD.jpeg',
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_344282685-LkqxUcRQ.jpeg',
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_347188911-LBNwmq_K.jpeg',
                  ],
                  attributes: {
                    productspec: '- Set of 5 glasses\n- Imported crystal\n- Gold polish on the rims',
                  },
                  price: {
                    fractionDigits: 2,
                    centAmount: 2799,
                    currencyCode: 'GBP',
                  },
                  isOnStock: true,
                },
              ],
              _url: '/gold-rimmed-champagne-glasses/p/GRCG-01',
            },
            {
              productId: 'cd9e0d15-a922-479a-bd82-a76d08633177',
              version: '74',
              name: 'Rustic Country Queen Bed',
              categories: [
                {
                  categoryId: 'c9f2b968-f5d3-4040-be9e-529219ef11ac',
                },
                {
                  categoryId: '7165ecef-961d-4809-ab16-1a8c15531edc',
                },
                {
                  categoryId: 'eab8e720-8046-46fb-a9be-1a397ef24f21',
                },
                {
                  categoryId: '076ab018-de9f-4a55-a436-ffd18d22fc66',
                },
              ],
              variants: [
                {
                  id: '1',
                  sku: 'RCQB-01',
                  images: [
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_321480725-j3db5-fj.jpeg',
                  ],
                  attributes: {
                    color: 'tan',
                    colorlabel: 'Tan',
                    finishlabel: 'Briarsmoke',
                    finish: 'rosybrown',
                    productspec: '- Leather upholstery\n- Standard Queen size\n- Assembly on site',
                  },
                  price: {
                    fractionDigits: 2,
                    centAmount: 329900,
                    currencyCode: 'GBP',
                  },
                  isOnStock: true,
                },
              ],
              _url: '/rustic-country-queen-bed/p/RCQB-01',
            },
            {
              productId: 'e72723d7-60fc-4c80-9986-dddbd2532b5f',
              version: '98',
              name: 'Minimalist Modern Side Table',
              categories: [
                {
                  categoryId: 'c5a3d83f-0ada-408f-84fc-a754d6aca8be',
                },
                {
                  categoryId: 'eab8e720-8046-46fb-a9be-1a397ef24f21',
                },
                {
                  categoryId: 'fae26257-81b4-4c57-9997-a0efefd77271',
                },
                {
                  categoryId: '076ab018-de9f-4a55-a436-ffd18d22fc66',
                },
                {
                  categoryId: 'de27ed3f-9c2e-4ada-aa06-1ca86a972c43',
                },
              ],
              variants: [
                {
                  id: '1',
                  sku: 'MMST-01',
                  images: [
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_308570068-ftaFzBEg.jpeg',
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_314247429-Qt_DKygA.jpeg',
                  ],
                  attributes: {
                    color: 'white',
                    colorlabel: 'White',
                    finish: 'white',
                    finishlabel: 'Marble',
                    productspec: '- 4 legged side table\n- Walnut legs\n- Pre-assembled',
                  },
                  price: {
                    fractionDigits: 2,
                    centAmount: 12000,
                    currencyCode: 'GBP',
                  },
                  isOnStock: true,
                },
                {
                  id: '2',
                  sku: 'MMST-02',
                  images: [
                    'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_308570077-dEUwL6Ta.jpeg',
                  ],
                  attributes: {
                    finishlabel: 'Walnut',
                    color: '#d69169',
                    colorlabel: 'Golden Pecan',
                    finish: '#d69169',
                    productspec: '- 4 legged side table\n- Walnut legs\n- Pre-assembled',
                  },
                  price: {
                    fractionDigits: 2,
                    centAmount: 4999,
                    currencyCode: 'GBP',
                  },
                  isOnStock: true,
                },
              ],
              _url: '/minimalist-modern-side-table/p/MMST-01',
            },
          ],
          count: 10,
          facets: [
            {
              type: 'range',
              identifier: 'variants.scopedPrice.value',
              label: 'variants.scopedPrice.value',
              key: 'variants.scopedPrice.value',
              min: 179900,
              max: 179900,
              selected: false,
            },
            {
              type: 'term',
              identifier: 'variants.attributes.finish',
              label: 'variants.attributes.finish',
              key: 'variants.attributes.finish',
              selected: false,
              terms: [
                {
                  identifier: 'white',
                  label: 'white',
                  count: 1,
                  key: 'white',
                  selected: false,
                },
                {
                  identifier: 'silver',
                  label: 'silver',
                  count: 1,
                  key: 'silver',
                  selected: false,
                },
                {
                  identifier: 'rosybrown',
                  label: 'rosybrown',
                  count: 1,
                  key: 'rosybrown',
                  selected: false,
                },
                {
                  identifier: 'goldenrod',
                  label: 'goldenrod',
                  count: 1,
                  key: 'goldenrod',
                  selected: false,
                },
                {
                  identifier: '#d69169',
                  label: '#d69169',
                  count: 1,
                  key: '#d69169',
                  selected: false,
                },
                {
                  identifier: '#202120',
                  label: '#202120',
                  count: 1,
                  key: '#202120',
                  selected: false,
                },
              ],
            },
            {
              type: 'term',
              identifier: 'variants.attributes.colorlabel',
              label: 'variants.attributes.colorlabel',
              key: 'variants.attributes.colorlabel',
              selected: false,
              terms: [
                {
                  identifier: 'White',
                  label: 'White',
                  count: 1,
                  key: 'White',
                  selected: false,
                },
                {
                  identifier: 'Tan',
                  label: 'Tan',
                  count: 1,
                  key: 'Tan',
                  selected: false,
                },
                {
                  identifier: 'Soft Pink',
                  label: 'Soft Pink',
                  count: 1,
                  key: 'Soft Pink',
                  selected: false,
                },
                {
                  identifier: 'Silver',
                  label: 'Silver',
                  count: 1,
                  key: 'Silver',
                  selected: false,
                },
                {
                  identifier: 'Salmon Gold',
                  label: 'Salmon Gold',
                  count: 1,
                  key: 'Salmon Gold',
                  selected: false,
                },
                {
                  identifier: 'Light Olive ',
                  label: 'Light Olive ',
                  count: 1,
                  key: 'Light Olive ',
                  selected: false,
                },
                {
                  identifier: 'Light Gray',
                  label: 'Light Gray',
                  count: 1,
                  key: 'Light Gray',
                  selected: false,
                },
                {
                  identifier: 'Ivory Tan',
                  label: 'Ivory Tan',
                  count: 1,
                  key: 'Ivory Tan',
                  selected: false,
                },
                {
                  identifier: 'Golden Pecan',
                  label: 'Golden Pecan',
                  count: 1,
                  key: 'Golden Pecan',
                  selected: false,
                },
                {
                  identifier: 'Emerald',
                  label: 'Emerald',
                  count: 1,
                  key: 'Emerald',
                  selected: false,
                },
              ],
            },
            {
              type: 'term',
              identifier: 'variants.attributes.color',
              label: 'variants.attributes.color',
              key: 'variants.attributes.color',
              selected: false,
              terms: [
                {
                  identifier: 'tan',
                  label: 'tan',
                  count: 2,
                  key: 'tan',
                  selected: false,
                },
                {
                  identifier: 'lightpink',
                  label: 'lightpink',
                  count: 2,
                  key: 'lightpink',
                  selected: false,
                },
                {
                  identifier: 'white',
                  label: 'white',
                  count: 1,
                  key: 'white',
                  selected: false,
                },
                {
                  identifier: 'silver',
                  label: 'silver',
                  count: 1,
                  key: 'silver',
                  selected: false,
                },
                {
                  identifier: '#ebebeb',
                  label: '#ebebeb',
                  count: 1,
                  key: '#ebebeb',
                  selected: false,
                },
                {
                  identifier: '#d8deb1',
                  label: '#d8deb1',
                  count: 1,
                  key: '#d8deb1',
                  selected: false,
                },
                {
                  identifier: '#d69169',
                  label: '#d69169',
                  count: 1,
                  key: '#d69169',
                  selected: false,
                },
                {
                  identifier: '#09331c',
                  label: '#09331c',
                  count: 1,
                  key: '#09331c',
                  selected: false,
                },
              ],
            },
            {
              type: 'term',
              identifier: 'variants.attributes.productspec',
              label: 'variants.attributes.productspec',
              key: 'variants.attributes.productspec',
              selected: false,
              terms: [
                {
                  identifier:
                    '- Velvet fabric\n- Cotton lining\n- Pillow case comes with zip for easy removal\n- Pillow not included\n- Washable',
                  label:
                    '- Velvet fabric\n- Cotton lining\n- Pillow case comes with zip for easy removal\n- Pillow not included\n- Washable',
                  count: 3,
                  key: '- Velvet fabric\n- Cotton lining\n- Pillow case comes with zip for easy removal\n- Pillow not included\n- Washable',
                  selected: false,
                },
                {
                  identifier: '- Ceramic\n- Sold as 1 piece\n- Dishwasher safe\n- Microwave safe',
                  label: '- Ceramic\n- Sold as 1 piece\n- Dishwasher safe\n- Microwave safe',
                  count: 2,
                  key: '- Ceramic\n- Sold as 1 piece\n- Dishwasher safe\n- Microwave safe',
                  selected: false,
                },
                {
                  identifier: '- 4 legged side table\n- Walnut legs\n- Pre-assembled',
                  label: '- 4 legged side table\n- Walnut legs\n- Pre-assembled',
                  count: 2,
                  key: '- 4 legged side table\n- Walnut legs\n- Pre-assembled',
                  selected: false,
                },
                {
                  identifier: '- Three seater sofa\n- Velvet upholstery\n- Assembly on site',
                  label: '- Three seater sofa\n- Velvet upholstery\n- Assembly on site',
                  count: 1,
                  key: '- Three seater sofa\n- Velvet upholstery\n- Assembly on site',
                  selected: false,
                },
                {
                  identifier: '- Set of 5 glasses\n- Imported crystal\n- Gold polish on the rims',
                  label: '- Set of 5 glasses\n- Imported crystal\n- Gold polish on the rims',
                  count: 1,
                  key: '- Set of 5 glasses\n- Imported crystal\n- Gold polish on the rims',
                  selected: false,
                },
                {
                  identifier: '- Oil painting on canvas\n- Frame not included\n- Size: 4ft by 3ft',
                  label: '- Oil painting on canvas\n- Frame not included\n- Size: 4ft by 3ft',
                  count: 1,
                  key: '- Oil painting on canvas\n- Frame not included\n- Size: 4ft by 3ft',
                  selected: false,
                },
                {
                  identifier: '- Oil on canvas\n- Frame not included\n- 3ft by 4ft',
                  label: '- Oil on canvas\n- Frame not included\n- 3ft by 4ft',
                  count: 1,
                  key: '- Oil on canvas\n- Frame not included\n- 3ft by 4ft',
                  selected: false,
                },
                {
                  identifier: '- Leather upholstery\n- Standard Queen size\n- Assembly on site',
                  label: '- Leather upholstery\n- Standard Queen size\n- Assembly on site',
                  count: 1,
                  key: '- Leather upholstery\n- Standard Queen size\n- Assembly on site',
                  selected: false,
                },
                {
                  identifier: '- Comes with matching throw pillow\n- Velvet upholstery\n- Pre-assembled',
                  label: '- Comes with matching throw pillow\n- Velvet upholstery\n- Pre-assembled',
                  count: 1,
                  key: '- Comes with matching throw pillow\n- Velvet upholstery\n- Pre-assembled',
                  selected: false,
                },
                {
                  identifier: '- 3 large drawers\n- suede  and nickel finish on drawer handles\n- assembly on site',
                  label: '- 3 large drawers\n- suede  and nickel finish on drawer handles\n- assembly on site',
                  count: 1,
                  key: '- 3 large drawers\n- suede  and nickel finish on drawer handles\n- assembly on site',
                  selected: false,
                },
              ],
            },
            {
              type: 'term',
              identifier: 'variants.attributes.finishlabel',
              label: 'variants.attributes.finishlabel',
              key: 'variants.attributes.finishlabel',
              selected: false,
              terms: [
                {
                  identifier: 'Walnut',
                  label: 'Walnut',
                  count: 1,
                  key: 'Walnut',
                  selected: false,
                },
                {
                  identifier: 'Suede',
                  label: 'Suede',
                  count: 1,
                  key: 'Suede',
                  selected: false,
                },
                {
                  identifier: 'Marble',
                  label: 'Marble',
                  count: 1,
                  key: 'Marble',
                  selected: false,
                },
                {
                  identifier: 'Espresso',
                  label: 'Espresso',
                  count: 1,
                  key: 'Espresso',
                  selected: false,
                },
                {
                  identifier: 'Briarsmoke',
                  label: 'Briarsmoke',
                  count: 1,
                  key: 'Briarsmoke',
                  selected: false,
                },
                {
                  identifier: 'Brass',
                  label: 'Brass',
                  count: 1,
                  key: 'Brass',
                  selected: false,
                },
              ],
            },
            {
              type: 'term',
              identifier: 'variants.attributes.type',
              label: 'variants.attributes.type',
              key: 'variants.attributes.type',
              selected: false,
              terms: [],
            },
            {
              type: 'range',
              identifier: 'variants.price',
              label: 'variants.price',
              key: 'variants.price',
              min: 399,
              max: 329900,
              selected: false,
            },
          ],
          query: {
            productIds: [],
            skus: [],
            category: '076ab018-de9f-4a55-a436-ffd18d22fc66',
            filters: [],
          },
        },
      },
    },
  };

  return {
    props: {
      data: { ...data } || null,
      locale: locale,
      ...(await serverSideTranslations(locale as string, [
        'common',
        'cart',
        'product',
        'checkout',
        'account',
        'customer-support',
        'error',
        'success',
        'wishlist',
        'newsletter',
        'orders',
        'thank-you',
      ])),
    },
  };
};
