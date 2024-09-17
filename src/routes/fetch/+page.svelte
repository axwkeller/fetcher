<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';

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

<h1 class="mb-4 text-2xl font-bold">Fetch a Pet!</h1>
{#if loadingDogs || loadingSearch}
	<h1 class="text-xl">Loading</h1>
{:else if dogs.length > 0}
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each dogs as dog}
			<Card.Root>
				<Card.Content class="flex items-center p-4">
					<Avatar.Root class="h-20 w-20">
						<Avatar.Image src={dog.img} alt={dog.name} />
						<Avatar.Fallback>{dog.name[0]}</Avatar.Fallback>
					</Avatar.Root>
					<div class="ml-4">
						<Card.Title>{dog.name}</Card.Title>
						<Card.Description>{dog.breed}</Card.Description>
					</div>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
{:else}
	<p class="text-lg">No dogs found.</p>
{/if}
