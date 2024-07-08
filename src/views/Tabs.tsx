import { Tab } from '../config';
import { ConfigTab } from './ConfigTab';
import { PeerTab } from './PeerTab';
import { SelfTab } from './SelfTab';

export const tabs: Tab[] = [
    { title: 'PEER', color: 'cyan', component: PeerTab },
    { title: 'SELF', color: 'magenta', component: SelfTab },
    { title: 'CONF', color: 'yellow', component: ConfigTab },
];
