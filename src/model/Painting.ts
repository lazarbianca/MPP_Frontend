export default interface Painting {
    id: number;
    title: string;
    author: string;
    year: number;
    movement: string;
    imageUrl: string;
    museum?: string;
}
export enum ArtMovement {
    RENAISSANCE = 'Renaissance',
    BAROQUE = 'Baroque',
    ROMANTICISM = 'Romanticism',
    REALISM = 'Realsim',
    IMPRESSIONISM = 'Impressionism',
    SURREALISM = 'Surrealism',
    POSTMODERNISM = 'Post Modernism',
}
