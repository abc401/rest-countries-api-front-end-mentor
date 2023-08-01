<script>
	import { theme } from './stores/theme';
</script>

<div class="sticky inset-0 top-0 z-[9999] flex justify-between bg-neutral-100 px-4 py-6 shadow-md">
	<h1 class="">Where in the world?</h1>
	<button>
		{#if $theme === 'light'}
			<i class="fa-regular fa-moon" />
			<span class="hidden text-xs font-semibold xs:inline">Dark Mode</span>
		{:else}
			<i class="fa-regular fa-sun" />
			<span class="hidden text-xs font-semibold xs:inline">Light Mode</span>
		{/if}
	</button>
</div>
