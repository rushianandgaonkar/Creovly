import { common } from './common';
import { home } from './home';
import { tools } from './tools';
import { compressor } from './compressor';
import { resizer } from './resizer';
import { banner } from './banner';
import { logoRemover } from './logoRemover';
import { shorts } from './shorts';
import { titleChecker } from './titleChecker';
import { calculator } from './calculator';
import { studio } from './studio';
import { checklist } from './checklist';
import { guides } from './guides';
import { pages } from './pages';

export const messagesEn = {
  common,
  home,
  tools,
  compressor,
  resizer,
  banner,
  logoRemover,
  shorts,
  titleChecker,
  calculator,
  studio,
  checklist,
  guides,
  pages,
};

export type Messages = typeof messagesEn;
export default messagesEn;

