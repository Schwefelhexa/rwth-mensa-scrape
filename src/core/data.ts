export interface Mensa {
	display_name: string;
	slug: string;
	address: string;
}

export const mensas: Mensa[] = [
	{ display_name: 'Academica', slug: 'academica', address: 'Pontwall 3, 52062 Aachen' },
	{ display_name: 'Vita', slug: 'vita', address: 'Helmertweg 1, 52074 Aachen' },
	{ display_name: 'Ahornstraße', slug: 'ahornstrasse', address: 'Ahornstraße 55, 52074 Aachen' },
]
export const getMensa = (slug: string) => mensas.find(m => m.slug === slug);
