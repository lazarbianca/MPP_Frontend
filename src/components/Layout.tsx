import PaintingDialog from './PaintingDialog';

interface LayoutProps {
    children: React.ReactNode;
}
const Layout = ({children}: LayoutProps) => {
    return (
        <>
            <PaintingDialog />
            {children}
        </>
    );
};

export default Layout;
