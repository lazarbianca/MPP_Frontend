export default interface Painting {
    paintingId: number;
    title: string;
    Artist: {
        artistId?: number;
        name?: string;
    };
    year: number;
    movement: ArtMovement;
    imageUrl: string;
    museum?: string;
    Evaluation?: {
        price: number;
    };
}
export enum ArtMovement {
    RENAISSANCE = 'Renaissance',
    BAROQUE = 'Baroque',
    ROMANTICISM = 'Romanticism',
    REALISM = 'Realism',
    IMPRESSIONISM = 'Impressionism',
    SURREALISM = 'Surrealism',
    POSTMODERNISM = 'Post Modernism',
}
