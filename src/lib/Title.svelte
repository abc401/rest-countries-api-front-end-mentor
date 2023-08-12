<script>
	import { theme } from './stores/theme';
	function switchTheme() {
		if ($theme === 'light') {
			$theme = 'dark';
		} else {
			$theme = 'light';
		}
	}
</script>

<div
	class="sticky inset-0 top-0 z-[9999] flex justify-between bg-neutral-100 px-4 py-6 shadow-md dark:bg-darkblue-700"
>
	<h1 class="sm:text-2xl">Where in the world?</h1>
	<button on:click={switchTheme}>
		<i class="fa-regular" class:fa-moon={$theme === 'dark'} class:fa-sun={$theme === 'light'} />
		<span class="hidden text-xs font-semibold sm:text-base xs:inline">
			{#if $theme === 'dark'}
				Dark Mode
			{:else}
				Light Mode
			{/if}
		</span>
	</button>
</div>
