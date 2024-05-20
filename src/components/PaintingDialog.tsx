import {
    Button,
    Dialog,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ArtMovement} from '../model/Painting';
import usePaintingStore from '../stores/PaintingStore';
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

    const {artists, fetchArtists} = usePaintingStore();

    useEffect(() => {
        console.log('artists');
        fetchArtists();
    }, []);
    const {fetchPaintings} = usePaintingStore();
    const [selectedArtist, setSelectedArtist] = useState<string>('');
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            if (selectedPainting) {
                // If selectedPainting exists, update the painting
                await axios.put(
                    `http://localhost:5000/updatePainting/${selectedPainting.id}`,
                    data,
                );
            } else {
                // If selectedPainting does not exist, add a new painting
                const res = await axios.post(
                    'http://localhost:5000/addPainting',
                    data,
                );
                console.log(res.data);
                addPainting(res.data);
            }

            // Reset the form after successfully adding/editing the painting
            // reset();
            fetchPaintings();
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
