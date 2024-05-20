import axios from 'axios';
import {create} from 'zustand';
import Artist from '../model/Artist';
import Painting from '../model/Painting';

interface usePaintingStoreProps {
    opened: boolean;
    handleOpen: (p?: Painting) => void;
    handleClose: () => void;
    paintings: Painting[];
    filteredPaintings: Painting[];
    deletePainting: (pId: number) => Promise<undefined>;
    addPainting: (p: Painting) => void;
    selectedPainting: Painting;
    editPainting: (p: Painting) => void;
    filterPaintings: (m: string) => void;
    openedDiagram: boolean;
    handleDiagramOpen: () => void;
    fetchPaintings: () => void;

    artists: Artist[];
    fetchArtists: () => void;
    deleteArtist: (aId: number) => Promise<undefined>;
    openedArtist: boolean;
    handleOpenArtist: (a?: Artist) => void;
    handleClosedArtist: () => void;
    selectedArtist: Artist;
}

const usePaintingStore = create<usePaintingStoreProps>((set) => ({
    opened: false,
    selectedPainting: {} as Painting,
    handleOpen: (p?: Painting) => set({opened: true, selectedPainting: p}),
    editPainting: (p: Painting) => {
        set((state) => ({
            paintings: state.paintings.map((paint) =>
                paint.paintingId === p.paintingId ? p : paint,
            ),
        }));
    },
    handleClose: () => set({opened: false, selectedPainting: {} as Painting}),
    paintings: [], // Initialize with an empty array
    filteredPaintings: [],
    // Fetch paintings from your backend API
    fetchPaintings: async () => {
        try {
            const response = await fetch('http://localhost:5000/getPaintings');
            const data = await response.json();
            console.log(data);
            set({filteredPaintings: data});
        } catch (error) {
            console.error('Error fetching paintings:', error);
        }
    },
    addPainting: (p: Painting) =>
        set((state) => ({filteredPaintings: [...state.paintings, p]})),
    deletePainting: async (pId: number) => {
        try {
            // Make a DELETE request to the backend endpoint to delete the painting
            return axios.delete(`http://localhost:5000/deletePainting/${pId}`);
            // // Update the state by removing the deleted painting
            // set((state) => ({
            //     paintings: state.paintings.filter((paint) => paint.id !== pId),
            // }));
        } catch (error) {
            console.error('Error deleting painting:', error);
        }
    },
    filterPaintings: (artMovementToFilterBy: string) =>
        set((state) => ({
            filteredPaintings:
                artMovementToFilterBy === ''
                    ? state.filteredPaintings
                    : state.filteredPaintings.filter(
                          (paint) => paint.movement == artMovementToFilterBy,
                      ),
        })),

    openedDiagram: false,
    handleDiagramOpen: () => set({openedDiagram: true}),

    artists: [],
    fetchArtists: async () => {
        try {
            const response = await fetch('http://localhost:5000/getArtists');
            const data = await response.json();
            console.log(data);
            set({artists: data});
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    },
    deleteArtist: async (aId: number) => {
        try {
            return axios.delete(`http://localhost:5000/deleteArtist/${aId}`);
            // // Update the state by removing the deleted painting
            // set((state) => ({
            //     paintings: state.paintings.filter((paint) => paint.id !== pId),
            // }));
        } catch (error) {
            console.error('Error deleting artist:', error);
        }
    },
    handleOpenArtist: (a?: Artist) =>
        set({openedArtist: true, selectedArtist: a}),
    openedArtist: false,
    selectedArtist: {} as Artist,
    handleClosedArtist: () =>
        set({openedArtist: false, selectedArtist: {} as Artist}),
    addArtist: (a: Artist) =>
        set((state) => ({artists: [...state.artists, a]})),
}));

// usePaintingStore.subscribe((state) => {
//     if (state.paintings.length === 0) {
//         console.log('in if');
//         state.fetchPaintings();
//     }
// });

export default usePaintingStore;
