import {
    Button,
    Dialog,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ArtMovement} from '../model/Painting';
import usePaintingStore from '../stores/PaintingStore';
import ReactHookFormSelect from './ReactHookFormSelect';
interface Inputs {
    // Painting but without ID
    title: string;
    author: string;
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
        editPainting,
        filterPaintings,
    } = usePaintingStore();
    const {register, handleSubmit, control, reset} = useForm<Inputs>({});
    useEffect(() => {
        reset(selectedPainting);
    }, [selectedPainting]);
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (selectedPainting) {
            editPainting({
                ...selectedPainting,
                ...data,
            });
            filterPaintings('');
        } else {
            addPainting({
                id: Math.floor(Math.random() * 1000),
                ...data,
            });
            filterPaintings('');
        }
        reset();
        handleClose();
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
                            label='Author'
                            fullWidth
                            {...register('author', {required: true})}
                        />
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
