import { common } from './common';
import { home } from './home';
import { tools } from './tools';
import { compressor } from './compressor';
import { resizer } from './resizer';
import { banner } from './banner';
import { channelName } from './channelName';
import { tagGenerator } from './tagGenerator';
import { descriptionGenerator } from './descriptionGenerator';
import { logoRemover } from './logoRemover';
import { shorts } from './shorts';
import { titleChecker } from './titleChecker';
import { calculator } from './calculator';
import { studio } from './studio';
import { checklist } from './checklist';
import { guides } from './guides';
import { pages } from './pages';
import { linkGenerator } from './linkGenerator';
import { profilePicture } from './profilePicture';
import { engagement } from './engagement';
import { thumbnailDownloader } from './thumbnailDownloader';
import { thumbnailTester } from './thumbnailTester';

export const messagesEn = {
  common,
  home,
  tools,
  compressor,
  resizer,
  banner,
  channelName,
  tagGenerator,
  descriptionGenerator,
  logoRemover,
  shorts,
  titleChecker,
  calculator,
  studio,
  checklist,
  guides,
  pages,
  linkGenerator,
  profilePicture,
  engagement,
  thumbnailDownloader,
  thumbnailTester,
};

export type Messages = typeof messagesEn;
export default messagesEn;

