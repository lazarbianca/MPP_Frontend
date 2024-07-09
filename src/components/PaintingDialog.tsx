import {
    Button,
    Dialog,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ArtMovement} from '../model/Painting';
import AuthContext from '../stores/AuthContext';
import usePaintingStore from '../stores/PaintingStore';
import useFetchPaintings from './ReactHookFetchPaintings';
import ReactHookFormSelect from './ReactHookFormSelect';
interface Inputs {
    // Painting but without ID
    title: string;
    artistId: number;
    artistName: string;
    year: number;
    movement: ArtMovement;
    imageUrl: string;
    museum?: string;
}
const PaintingDialog = () => {
    const {
        opened,
        handleClose,
        addPainting,
        selectedPainting,
        //editPainting,
        // filterPaintings,
    } = usePaintingStore();
    const {register, handleSubmit, control, reset} = useForm<Inputs>({});
    useEffect(() => {
        reset(selectedPainting);
    }, [selectedPainting]);

    const {artists, setArtists} = usePaintingStore();
    const {fetchArtists} = useFetchPaintings();
    const actualFetchAndRefreshArtists = async () => {
        const getArtists = async () => {
            const artists = await fetchArtists();
            setArtists(artists);
        };
        getArtists();
    };
    useEffect(() => {
        console.log('Fetch artists - PAINTING DIALOG');
        actualFetchAndRefreshArtists();
    }, []);
    const {fetchPaintings} = useFetchPaintings();
    const setFilteredPaintings = usePaintingStore(
        (state) => state.setFilteredPaintings,
    );
    const [selectedArtist, setSelectedArtist] = useState<string>('');
    const authContext = useContext(AuthContext);
    const actualFetchAndRefresh = async () => {
        const getPaintings = async () => {
            const filteredPaintings = await fetchPaintings();
            setFilteredPaintings(filteredPaintings);
        };
        getPaintings();
    };
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            if (selectedPainting) {
                // If selectedPainting exists, update the painting
                await axios.put(
                    `https://mpp-backend-l6xq.onrender.com/updatePainting/${selectedPainting.paintingId}`,
                    data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authContext?.auth.token}`,
                        },
                    },
                );
                console.log('axios put painting');
            } else {
                // If selectedPainting does not exist, add a new painting
                const res = await axios.post(
                    'https://mpp-backend-l6xq.onrender.com/addPainting',
                    data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authContext?.auth.token}`,
                        },
                    },
                );
                console.log('axios post painting', res.data);
                addPainting(res.data);
            }

            // Reset the form after successfully adding/editing the painting
            // reset();
            actualFetchAndRefresh();
        } catch (error) {
            console.error('Error adding/editing painting:', error);
        }
    };
    return (
        <Dialog
            open={opened}
            onClose={handleClose}
            fullWidth
            maxWidth='sm'
            fullScreen={false}
        >
            <form style={{padding: 16}} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h5'>Add a new painting</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Title'
                            fullWidth
                            {...register('title', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label='Artist'
                            fullWidth
                            {...register('artistId', {required: true})}
                            value={selectedArtist}
                            onChange={(e) => setSelectedArtist(e.target.value)}
                            required
                        >
                            {artists.map((artist) => (
                                <MenuItem
                                    key={artist.artistId}
                                    value={artist.artistId}
                                >
                                    {artist.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Image URL'
                            fullWidth
                            {...register('imageUrl', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Year'
                            type='number'
                            fullWidth
                            {...register('year', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Museum'
                            fullWidth
                            {...register('museum', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ReactHookFormSelect
                            label='Art Movement'
                            control={control}
                            defaultValue={''}
                            name={'movement'}
                        >
                            {Object.keys(ArtMovement).map((m) => {
                                const value =
                                    ArtMovement[m as keyof typeof ArtMovement];
                                return (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                );
                            })}
                        </ReactHookFormSelect>
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
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Dialog>
    );
};

export default PaintingDialog;
