import { Factory } from 'fishery';
import type { Dog, DogSearchResult } from '$lib/models/Dog';

export const dogFactory = Factory.define<Dog>(({ sequence }) => ({
	id: `dog${sequence}`,
	img: `dog${sequence}/image`,
	name: `doggy${sequence}`,
	age: 1,
	zip_code: '12345',
	breed: 'French Bulldog'
}));

export const dogSearchResultFactory = Factory.define<DogSearchResult>(() => ({
	resultIds: ['1'],
	total: 100,
	next: '',
	prev: ''
}));
