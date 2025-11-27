<script lang="ts">
	const beaconData = `{"token": "9c5128a378544c00ab7342a0b80d192c"}`;
</script>

<svelte:head>
	<script
		defer
		src="https://static.cloudflareinsights.com/beacon.min.js"
		data-cf-beacon={beaconData}
	></script>
</svelte:head>
