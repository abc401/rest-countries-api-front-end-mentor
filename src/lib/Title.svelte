<script>
	import { theme } from './stores/theme';
</script>

<div class="sticky inset-0 top-0 z-[9999] flex justify-between bg-neutral-100 px-4 py-6 shadow-md">
	<h1 class="sm:text-2xl">Where in the world?</h1>
	{#if $theme === 'light'}
		<button
			on:click={function () {
				$theme = 'dark';
			}}
		>
			<i class="fa-regular fa-moon" />
			<span class="hidden text-xs font-semibold sm:text-base xs:inline">Dark Mode</span>
		</button>
	{:else}
		<button
			on:click={function () {
				$theme = 'light';
			}}
		>
			<i class="fa-regular fa-sun" />
			<span class="hidden text-xs font-semibold sm:text-base xs:inline">Light Mode</span>
		</button>
	{/if}
</div>
