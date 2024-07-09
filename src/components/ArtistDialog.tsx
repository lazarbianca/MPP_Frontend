import {Button, Dialog, Grid, TextField, Typography} from '@mui/material';
import axios from 'axios';
import {useContext, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import AuthContext from '../stores/AuthContext';
import usePaintingStore from '../stores/PaintingStore';
import useFetchPaintings from './ReactHookFetchPaintings';

interface Inputs {
    name: string;
    birthYear: number;
    deathYear: number;
}

const ArtistDialog = () => {
    const {
        openedArtist,
        handleClosedArtist,
        selectedArtist,
        addArtist,
        setArtists,
    } = usePaintingStore();
    const {register, handleSubmit, reset} = useForm<Inputs>({});
    useEffect(() => {
        console.log('Dialog open state:', openedArtist);
        console.log('Selected Artist:', selectedArtist);
        reset(selectedArtist);
    }, [selectedArtist, openedArtist, reset]);

    const {fetchArtists} = useFetchPaintings();
    const actualFetchAndRefreshArtists = async () => {
        const getArtists = async () => {
            const artists = await fetchArtists();
            setArtists(artists);
        };
        getArtists();
    };
    const authContext = useContext(AuthContext);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            console.log('Submitting');
            if (selectedArtist) {
                // If selectedArtist exists, update the artist
                await axios.put(
                    `https://mpp-backend-l6xq.onrender.com/updateArtist/${selectedArtist.artistId}`,
                    data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authContext?.auth.token}`,
                        },
                    },
                );
            } else {
                // If selectedPainting does not exist, add a new painting
                const res = await axios.post(
                    'https://mpp-backend-l6xq.onrender.com/addArtist',
                    data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authContext?.auth.token}`,
                        },
                    },
                );
                console.log('ARTIST DIALOG', res.data);
                addArtist(res.data);
            }

            // Reset the form after successfully adding/editing the painting
            // reset();
            console.log('Fetch artists - ARTIST DIALOG');
            actualFetchAndRefreshArtists();
        } catch (error) {
            console.error('Error adding/editing artist:', error);
        }
    };
    return (
        <Dialog
            open={openedArtist}
            onClose={handleClosedArtist}
            fullWidth
            maxWidth='sm'
            fullScreen={false}
        >
            <form style={{padding: 16}} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h5'>Add a new artist</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Name'
                            fullWidth
                            {...register('name', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Birth Year'
                            type='number'
                            fullWidth
                            {...register('birthYear', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Death Year'
                            type='number'
                            fullWidth
                            {...register('deathYear', {required: true})}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        display={'flex'}
                        justifyContent={'flex-end'}
                    >
                        <Button variant='contained' type='submit' sx={{mr: 2}}>
                            Submit
                        </Button>
                        <Button
                            variant='outlined'
                            aria-label='close'
                            onClick={handleClosedArtist}
                        >
                            Close
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Dialog>
    );
};

export default ArtistDialog;
