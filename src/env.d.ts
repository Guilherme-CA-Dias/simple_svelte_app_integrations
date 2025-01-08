/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WORKSPACE_KEY: string;
  readonly VITE_WORKSPACE_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 