export interface Mensa {
	display_name: string;
	slug: string;
	address: string;
}

export const mensas: Mensa[] = [
	{ display_name: 'Academica', slug: 'academica', address: 'Pontwall 3, 52062 Aachen' },
	{ display_name: 'Vita', slug: 'vita', address: 'Helmertweg 1, 52074 Aachen' },
	{ display_name: 'Ahornstraße', slug: 'ahornstrasse', address: 'Ahornstraße 55, 52074 Aachen' },

	{ display_name: 'Bistro Templergraben', slug: 'templergraben', address: 'Templergraben 55, 52062 Aachen' },
	{ display_name: 'Bayernallee', slug: 'bayernallee', address: 'Bayernallee 9, 52066 Aachen' },
	{ display_name: 'Eupener Straße', slug: 'eupenerstrasse', address: 'Eupener Straße 70, 52066 Aachen' },
	{ display_name: 'KMAC', slug: 'kmac', address: 'Kármánstraße 17, 52062 Aachen' },
	{ display_name: 'Südpark', slug: 'suedpark', address: 'Eulersweg 15, 52074 Aachen' },
	{ display_name: 'Jülich', slug: 'juelich', address: 'Wilhelm-Johnen-Straße, 52428 Jülich' },
].sort((a, b) => a.display_name.localeCompare(b.display_name));
export const getMensa = (slug: string) => mensas.find(m => m.slug === slug);
