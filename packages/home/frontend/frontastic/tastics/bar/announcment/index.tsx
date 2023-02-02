import React from 'react';
import AnnouncementBar, { Props as AnnouncementBarProps } from 'components/commercetools-ui/organisms/announcement-bar';

interface Props {
  data: AnnouncementBarProps;
}

const AnnouncementBarTastic: React.FC<Props> = ({ data }) => {
  return <AnnouncementBar {...data} />;
};

export default AnnouncementBarTastic;
