<script lang="ts">
	import clsx from 'clsx';
	import { createEventDispatcher } from 'svelte';

	export let maxPageLinks: number;
	export let currentPage: number;
	export let maxPage: number;

	$: console.log('Max page: ', maxPage);

	let className: string | undefined = undefined;
	export { className as class };

	$: firstLink = Math.floor((currentPage - 1) / maxPageLinks) * maxPageLinks + 1;
	$: lastLink = Math.min(firstLink + maxPageLinks, maxPage + 1);

	$: console.log('First link: ', firstLink);
	$: console.log('Last link: ', lastLink);

	const dispatch = createEventDispatcher<{ navigate: { pageNumber: number } }>();

	function navigateTo(pageNumber: number) {
		dispatch('navigate', { pageNumber });
	}
</script>

<nav
	aria-label="Page Navigation"
	class={clsx(
		'inline-flex rounded-md bg-neutral-100 px-4 text-xs shadow-md dark:bg-darkblue-700 sm:text-sm',
		className
	)}
>
	<button
		class="fa-solid fa-angles-left | px-2 py-4 hover:outline hover:outline-2 hover:outline-darkblue-700 dark:hover:outline-neutral-100 sm:p-3"
		on:click={() => navigateTo(1)}
	/>
	<button
		class="fa-solid fa-chevron-left | px-2 py-4 hover:outline hover:outline-2 hover:outline-darkblue-700 dark:hover:outline-neutral-100 sm:p-3"
		on:click={() => {
			if (currentPage - 1 > 0) navigateTo(currentPage - 1);
		}}
	/>
	{#each { length: lastLink - firstLink } as _, i}
		<button
			disabled={currentPage === firstLink + i}
			class={clsx(' px-2 py-4  sm:p-3', {
				'bg-darkblue-700 text-neutral-100 dark:bg-neutral-100 dark:text-darkblue-900':
					currentPage === firstLink + i,
				'hover:outline hover:outline-2 hover:outline-darkblue-700 dark:hover:outline-neutral-100':
					currentPage !== firstLink + i
			})}
			on:click={() => navigateTo(firstLink + i)}>{firstLink + i}</button
		>
	{/each}
	<button
		class="fa-solid fa-chevron-right | px-2 py-4 hover:outline hover:outline-2 hover:outline-darkblue-700 dark:hover:outline-neutral-100 sm:p-3"
		on:click={() => {
			if (currentPage + 1 <= maxPage) navigateTo(currentPage + 1);
		}}
	/>
	<button
		class="fa-solid fa-angles-right | px-2 py-4 hover:outline hover:outline-2 hover:outline-darkblue-700 dark:hover:outline-neutral-100 sm:p-3"
		on:click={() => navigateTo(maxPage)}
	/>
</nav>
