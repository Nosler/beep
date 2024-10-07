import { Tab } from '../config';
import { ConfigTab } from './ConfigTab';
import { PeerTab } from './PeerTab';
import { SelfTab } from './SelfTab';
import cog from '../assets/cog.svg';

export const tabs: Tab[] = [
    { title: 'PEER', color: 'cyan', icon: cog, component: PeerTab },
    { title: 'SELF', color: 'magenta', icon: cog, component: SelfTab },
    { title: 'CONF', color: 'yellow', icon: cog, component: ConfigTab },
];
