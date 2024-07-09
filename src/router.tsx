import {Suspense, lazy} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import {AuthProvider} from './stores/AuthContext';

const AppRouter = () => {
    const Overview = lazy(() => import('./components/Overview'));
    const DetailPage = lazy(() => import('./components/Detail'));
    const Chart = lazy(() => import('./components/PieDiagram'));
    return (
        <AuthProvider>
            <BrowserRouter>
                <Suspense fallback={<></>}>
                    <Routes>
                        {/* Define login route */}
                        <Route
                            path='/'
                            element={<Navigate replace to='/auth/login' />}
                        />
                        <Route path='/auth/login' element={<Login />} />
                        <Route path='/auth/register' element={<Register />} />
                        {/* Protected routes */}
                        <Route
                            element={
                                <Layout>
                                    <Overview />
                                </Layout>
                            }
                            path={'/paintings'}
                        />
                        <Route
                            element={<DetailPage />}
                            path={'/paintings/:id'}
                        />
                        <Route
                            element={<Chart />}
                            path='/paintings/statistics'
                        />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </AuthProvider>
        // <AuthProvider>
        //     <BrowserRouter>
        //         <Suspense fallback={<></>}>
        //             <Routes>
        //                 <Route
        //                     path='/'
        //                     element={<Navigate replace to='/paintings' />}
        //                 />
        // <Route
        //     element={
        //         <Layout>
        //             <Overview />
        //         </Layout>
        //     }
        //     path={'/paintings'}
        // />
        //                 <Route
        //                     element={<DetailPage />}
        //                     path={'/paintings/:id'}
        //                 />
        //                 <Route
        //                     element={<Chart />}
        //                     path='/paintings/statistics'
        //                 />
        //             </Routes>
        //         </Suspense>
        //     </BrowserRouter>
        // </AuthProvider>
    );
};

export default AppRouter;
