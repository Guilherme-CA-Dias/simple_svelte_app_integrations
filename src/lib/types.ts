export interface IntegrationApp {
  integrations: {
    find: () => Promise<{ items: any[] }>;
  };
  integration: (key: string) => {
    open: () => void;
  };
} 