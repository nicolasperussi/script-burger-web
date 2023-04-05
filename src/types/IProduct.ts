export interface IProduct {
	id: string;
	name: string;
	slug: string;
	description: string;
	overview: string;
	price: number;
	category: { id: string; name: string };
}
