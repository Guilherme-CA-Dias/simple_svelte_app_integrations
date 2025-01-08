import { IntegrationAppClient } from '@integration-app/react';
import type { IntegrationApp } from './types';

let integrationApp: IntegrationApp | undefined;

export function initializeIntegrationApp(token: string): IntegrationApp {
  integrationApp = new IntegrationAppClient({
    token,
  }) as IntegrationApp;
  return integrationApp;
}

export function getIntegrationApp(): IntegrationApp {
  if (!integrationApp) {
    throw new Error('Integration App has not been initialized.');
  }
  return integrationApp;
}
