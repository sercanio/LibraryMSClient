import { BookResponse } from "./BookResspone";
import { EbookResponse } from "./EbookResponse";
import { MagazineResponse } from "./MagazineResponse";

export interface CatalogResponse {
	id: string;
	name: string;
	books: BookResponse[];
	magazines: MagazineResponse[];
	materials: any[];
	eBooks: EbookResponse[];
    imageUrl: string;
}