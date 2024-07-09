import ArtistDialog from './ArtistDialog';
import PaintingDialog from './PaintingDialog';

interface LayoutProps {
    children: React.ReactNode;
}
const Layout = ({children}: LayoutProps) => {
    return (
        <>
            <PaintingDialog />
            <ArtistDialog />
            {children}
        </>
    );
};

export default Layout;
