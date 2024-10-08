import { Tab } from '../config';
import { ConfigTab } from './ConfigTab';
import { PeerTab } from './PeerTab';
import { SelfTab } from './SelfTab';
import cog from '../assets/cog.svg';
import self from '../assets/self.svg';
import peer from '../assets/peer.svg';

export const tabs: Tab[] = [
    { title: 'NET', color: 'cyan', icon: peer, component: PeerTab },
    { title: 'SELF', color: 'magenta', icon: self, component: SelfTab },
    { title: 'CONF', color: 'yellow', icon: cog, component: ConfigTab },
];
