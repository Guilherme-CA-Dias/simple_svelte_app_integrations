<script lang="ts">
    import { onMount } from 'svelte';
    import { initializeIntegrationApp } from '$lib/integrationApp';
    import type { IntegrationApp } from '$lib/types';
  
    let integrations: any[] = [];
    let integrationApp: IntegrationApp | undefined;
  
    // Simulated customer information
    const customerId = '12345';
    const customerName = 'John Doe';
  
    onMount(async () => {
      try {
        // Fetch the token from the API endpoint
        const response = await fetch(`/api/generate-token?id=${customerId}&name=${customerName}`);
        const data = await response.json();
  
        if (data.token) {
          const token = data.token;
  
          // Initialize Integration App SDK
          integrationApp = initializeIntegrationApp(token);
  
          // Fetch available integrations
          const { items } = await integrationApp.integrations.find();
          integrations = items;
        } else {
          console.error('Failed to retrieve token:', data.error || 'Unknown error');
        }
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    });
  
    function connectIntegration(key: string) {
      if (integrationApp) {
        integrationApp.integration(key).open();
      }
    }
  </script>
  
  <style>
    .integration-list {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    .integration-item {
      text-align: center;
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 8px;
    }
  </style>
  
  <div>
    <h1>Integration App</h1>
    <p>Below are the available integrations:</p>
  
    <div class="integration-list">
      {#each integrations as integration (integration.id)}
        <div class="integration-item">
          <button on:click={() => connectIntegration(integration.key)}>
            <img src={integration.logoUri} alt={integration.name} />
          </button>
          <p>{integration.name}</p>
        </div>
      {/each}
    </div>
  </div>
  