export default interface Painting {
    paintingId: number;
    title: string;
    Artist: {
        id?: number;
        name?: string;
    };
    year: number;
    movement: ArtMovement;
    imageUrl: string;
    museum?: string;
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
