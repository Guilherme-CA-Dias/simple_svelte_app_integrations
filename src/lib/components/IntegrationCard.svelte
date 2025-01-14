<script lang="ts">
    export let title: string;
    export let url: string;
    export let logo: string;
    export let connectionStatus: string;
    export let connectIntegration: () => void;
    export let isIntegration: boolean;
</script>

<style>
    .integration-card {
        background: var(--color-surface);
        border-radius: 8px;
        padding: 20px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .logo {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        margin-bottom: 10px;
    }

    .status {
        margin: 10px 0;
        font-size: 0.9em;
        color: var(--color-text-secondary);
    }

    button {
        background: var(--color-primary);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        opacity: 0.9;
    }
</style>

<div class="integration-card">
    <img class="logo" src={logo} alt={title} />
    <h3>{title}</h3>
    <p class="status">Status: {connectionStatus}</p>
    <button on:click={connectIntegration}>
        Connect {title}
    </button>
</div> 