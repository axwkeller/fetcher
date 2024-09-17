<script lang="ts">
	import type { Dog, DogSearchResult } from '$lib/models/Dog';
	import Api from '$lib/utils/Api';
	import { onMount } from 'svelte';

	let loadingSearch = $state(false);
	let loadingDogs = $state(false);
	let searchResults: DogSearchResult = $state({ resultIds: [], total: 0, next: '', prev: '' });
	let dogs: Dog[] = $state([]);

	onMount(async () => {
		await searchDogs();
		await getDogs(searchResults.resultIds);
	});

	async function searchDogs() {
		loadingSearch = true;
		try {
			const response = await Api.searchDogs();
			if (response.ok) {
				const body = await response.json();
				searchResults = body;
			}
		} catch (err) {
			console.error(err);
		} finally {
			loadingSearch = false;
		}
	}

	async function getDogs(ids: string[]) {
		loadingDogs = true;
		console.log(ids);
		try {
			const response = await Api.getDogs(ids);
			if (response.ok) {
				const body = await response.json();
				console.log('BODY', body);
				dogs = body;
			}
		} catch (err) {
			console.error(err);
		} finally {
			loadingDogs = false;
		}
	}
</script>

<h1>Fetch a Pet!</h1>
{#if loadingDogs || loadingSearch}
	<h1>Loading</h1>
{:else if dogs.length > 0}
	<ul>
		{#each dogs as dog}
			<li>{dog.name}</li>
		{/each}
	</ul>
{:else}
	<p>No dogs found.</p>
{/if}
