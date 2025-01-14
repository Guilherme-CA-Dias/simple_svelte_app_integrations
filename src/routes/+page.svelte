<script lang="ts">
    import { onMount } from 'svelte';
    import { initializeIntegrationApp } from '$lib/integrationApp';
    import { connectionStatus, integrations } from '$lib/stores';
    import type { IntegrationApp } from '$lib/types';
    import IntegrationCard from '$lib/components/IntegrationCard.svelte';
  
    let integrationApp: IntegrationApp | undefined;
    let error: string | null = null;
  
    // Simulated customer information
    const customerId = '12345';
    const customerName = 'John Doe';
  
    onMount(async () => {
        let error;
        try {
            // Fetch the token from the API endpoint
            const response = await fetch(`/api/generate-token?id=${customerId}&name=${customerName}`);
            const data = await response.json();

            if (data.token) {
                const token = data.token;
                console.log('Token received:', token);

                // Initialize Integration App SDK
                integrationApp = initializeIntegrationApp(token);
                console.log('Integration app initialized:', integrationApp);

                // Fetch available integrations
                const { items } = await integrationApp.integrations.find();
                console.log('Integrations found:', items);
                integrations.update((current) => ({ ...current, items }));

            } else {
                error = data.error || 'Unknown error';
                console.error('Failed to retrieve token:', error);
                connectionStatus.set('Failed to retrieve token');
            }
        } catch (err) {
            error = err instanceof Error ? err.message : 'Unknown error';
            console.error('Error during initialization:', err);
            connectionStatus.set('Error during initialization');
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
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        padding: 20px;
    }
</style>

<section class="[ u-grid-container stack ]">
    <h1 class="[ h3 ]">Integrations</h1>
    <div class="integration-list">
        {#each $integrations.items as integration (integration.id)}
            <IntegrationCard
                title={integration.name}
                url={integration.infoUrl}
                logo={integration.logoUri}
                connectionStatus={integration.connection?.disconnected === false ? 'Connected' : 'Not Connected'}
                connectIntegration={() => connectIntegration(integration.key)}
                isIntegration={true}
            />
        {/each}
    </div>
</section>
  