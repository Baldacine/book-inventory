export interface GoogleBookVolumeInfo {
    title?: string;
    authors?: string[];
    category?: string[];
    publishedDate?: string;
    publisher?: string;
    description?: string;
    imageLinks: {
        thumbnail?: string;
    };
}

export interface GoogleBookItem {

    searchInfo?: {
        textSnippet?: string;
    };
    id: string;
    volumeInfo: GoogleBookVolumeInfo;
}

export interface GoogleBooksResponse {
    totalItems: number;
    items?: GoogleBookItem[];
}