export interface Mensa {
	display_name: string;
	slug: string;
}

export const mensas: Mensa[] = [
	{ display_name: 'Academica', slug: 'academica' },
	{ display_name: 'Vita', slug: 'vita' },
	{ display_name: 'Ahornstraße', slug: 'ahornstrasse' },
]
export const getMensa = (slug: string) => mensas.find(m => m.slug === slug);
