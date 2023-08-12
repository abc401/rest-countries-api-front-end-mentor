<script>
	import '$/app.css';
	import Title from '$lib/Title.svelte';
	import { theme } from '$lib/stores/theme';
	import clsx from 'clsx';
</script>

<div class={clsx({ dark: $theme === 'dark' })}>
	<div class="min-h-screen bg-neutral-150 text-sm dark:bg-darkblue-800 dark:text-neutral-100">
		<Title />
		<slot />
	</div>
</div>
