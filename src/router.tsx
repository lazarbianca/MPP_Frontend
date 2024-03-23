import {Suspense, lazy} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

const AppRouter = () => {
    const Overview = lazy(() => import('./components/Overview'));
    const DetailPage = lazy(() => import('./components/Detail'));
    return (
        <BrowserRouter>
            <Suspense fallback={<></>}>
                <Routes>
                    <Route
                        path='/'
                        element={<Navigate replace to='/paintings' />}
                    />
                    <Route element={<Overview />} path={'/paintings'} />
                    <Route element={<DetailPage />} path={'/paintings/:id'} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRouter;
