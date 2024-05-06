export interface MemberSetting {
	id: number;
	uiTheme: string;
	language: string;
}

export interface MemberBookLocation {
	id: string;
	name: string;
	shelfNo: number;
	floorNo: number;
	shelfName: string;
}

export interface MemberBookAuthor {
	id: string;
	firstName: string;
	lastName: string;
}

export interface MemberBook {
	id: string;
	isbnCode: string;
	bookTitle: string;
	bookEdition: number;
	releaseDate: number;
	pageCount: number;
	status: number;
	categoryName: string;
	publisherName: string;
	location: MemberBookLocation;
	authors: MemberBookAuthor[];
}

export interface MemberResponse {
	id: string;
	userId: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	dateOfBirth: string;
	subscribe: boolean;
	memberSetting: MemberSetting;
	imageUrl: string;
	books: MemberBook[];
}