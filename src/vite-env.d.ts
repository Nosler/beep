/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_DISCOVERY_SERVER_URL: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
