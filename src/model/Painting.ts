export default interface Painting {
    id: number;
    title: string;
    author: string;
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
