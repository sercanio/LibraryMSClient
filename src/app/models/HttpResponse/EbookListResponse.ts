export interface EBookListResponse {
	id: string;
	isbnCode: string;
	eBookTitle: string;
	authorName: string;
	releaseDate: number;
	pageCount: number;
	categoryId: number;
	categoryName: string;
	fileUrl: string;
	imageUrl: string;
}
