import axios from 'axios';
import {useContext} from 'react';
import AuthContext from '../stores/AuthContext'; // Adjust the import path accordingly

const useFetchPaintings = () => {
    const authContext = useContext(AuthContext);

    const fetchPaintings = async () => {
        console.log('fetchPaintings called');
        try {
            // send userId and price as well

            const response = await fetch(
                'https://mpp-backend-l6xq.onrender.com/getPaintings',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authContext?.auth.token}`,
                    },
                    body: JSON.stringify({
                        userId: authContext?.auth.user.userId,
                    }),
                },
            );
            const data = await response.json();
            console.log('ReactHookFetchPaintings', data);
            return data;
        } catch (error) {
            console.error('Error fetching paintings:', error);
            return [];
        }
    };

    const deletePainting = async (pId: number) => {
        try {
            // Make a DELETE request to the backend endpoint to delete the painting
            return axios.delete(
                `https://mpp-backend-l6xq.onrender.com/deletePainting/${pId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authContext?.auth.token}`,
                    },
                },
            );
        } catch (error) {
            console.error('Error deleting painting:', error);
        }
    };

    const fetchArtists = async () => {
        console.log('fetchArtists called');
        try {
            const response = await fetch(
                'https://mpp-backend-l6xq.onrender.com/getArtists',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authContext?.auth.token}`,
                    },
                },
            );
            const data = await response.json();
            console.log('PaintingStore', data);
            return data;
            // set({artists: data});
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    };

    const deleteArtist = async (aId: number) => {
        try {
            return axios.delete(
                `https://mpp-backend-l6xq.onrender.com/deleteArtist/${aId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authContext?.auth.token}`,
                    },
                },
            );
        } catch (error) {
            console.error('Error deleting artist:', error);
        }
    };

    return {fetchPaintings, deletePainting, fetchArtists, deleteArtist};
};

export default useFetchPaintings;
