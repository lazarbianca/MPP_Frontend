import {Button, Dialog, Grid, TextField, Typography} from '@mui/material';
import axios from 'axios';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import usePaintingStore from '../stores/PaintingStore';

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
        fetchArtists,
    } = usePaintingStore();
    const {register, handleSubmit, reset} = useForm<Inputs>({});
    useEffect(() => {
        reset(selectedArtist);
    }, [selectedArtist]);
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            if (selectedArtist) {
                // If selectedArtist exists, update the artist
                await axios.put(
                    `http://localhost:5000/updateArtist/${selectedArtist.id}`,
                    data,
                );
            } else {
                // If selectedPainting does not exist, add a new painting
                const res = await axios.post(
                    'http://localhost:5000/addArtist',
                    data,
                );
                console.log(res.data);
                addArtist(res.data);
            }

            // Reset the form after successfully adding/editing the painting
            // reset();
            fetchArtists();
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
