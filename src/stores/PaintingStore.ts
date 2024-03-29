import {create} from 'zustand';
import Painting from '../model/Painting';
import PaintingsList from '../service/PaintingApi';

interface usePaintingStoreProps {
    opened: boolean;
    handleOpen: (p?: Painting) => void;
    handleClose: () => void;
    paintings: Painting[];
    filteredPaintings: Painting[];
    deletePainting: (pId: number) => void;
    addPainting: (p: Painting) => void;
    selectedPainting: Painting;
    editPainting: (p: Painting) => void;
    filterPaintings: (m: string) => void;
    openedDiagram: boolean;
    handleDiagramOpen: () => void;
}

const usePaintingStore = create<usePaintingStoreProps>((set) => ({
    opened: false,
    selectedPainting: {} as Painting,
    handleOpen: (p?: Painting) => set({opened: true, selectedPainting: p}),
    editPainting: (p: Painting) => {
        set((state) => ({
            paintings: state.paintings.map((paint) =>
                paint.id === p.id ? p : paint,
            ),
        }));
    },
    handleClose: () => set({opened: false, selectedPainting: {} as Painting}),
    paintings: PaintingsList,
    filteredPaintings: PaintingsList,
    addPainting: (p: Painting) =>
        set((state) => ({paintings: [...state.paintings, p]})),
    deletePainting: (pId: number) =>
        set((state) => ({
            paintings: state.paintings.filter((paint) => paint.id !== pId),
        })),
    filterPaintings: (artMovementToFilterBy: string) =>
        set((state) => ({
            filteredPaintings: !artMovementToFilterBy
                ? state.paintings
                : state.paintings.filter(
                      (paint) => paint.movement == artMovementToFilterBy,
                  ),
        })),
    openedDiagram: false,
    handleDiagramOpen: () => set({openedDiagram: true}),
}));

export default usePaintingStore;
