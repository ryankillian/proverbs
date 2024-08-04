<script lang="ts">
	import '@picocss/pico';
	import './styles.css';
	import Header from '$lib/components/Header.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<footer>Hello, I'm the footer.</footer>
