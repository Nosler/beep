/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_DISCOVERY_SERVER_URL: string;
    readonly VITE_DEBUG_LEVEL: string;
    readonly VITE_JWT_PUBLIC_KEY: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
