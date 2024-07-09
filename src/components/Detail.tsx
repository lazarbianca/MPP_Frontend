import {Button, Grid, TextField, Typography} from '@mui/material';
import axios from 'axios';
import React, {useContext, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import Painting from '../model/Painting';
import AuthContext from '../stores/AuthContext';
import usePaintingStore from '../stores/PaintingStore';
import '../styles/TextFieldStyles.css';

interface Inputs {
    price: number;
}

const Detail = () => {
    // const [evaluationExists, setEvaluationExists] = useState<boolean>(false);
    const authContext = useContext(AuthContext);
    const {register, handleSubmit, reset} = useForm<Inputs>({});
    const params = useParams();
    const [p, setPainting] = useState<Painting | undefined>(undefined);
    const {filteredPaintings} = usePaintingStore();
    React.useEffect(() => {
        if (params.id) {
            console.log('DETAIL Painting: ', p);
            const painting = filteredPaintings.find(
                (p) => p.paintingId === parseInt(params.id!),
            );
            setPainting(painting);
            if (painting && painting.Evaluation) {
                reset({price: painting.Evaluation.price});
            }
        }
    }, [params.id]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            if (p) {
                // Check if the evaluation exists and update the price
                console.log('p Evaluation is: ', p.Evaluation);
                if (p.Evaluation && p.Evaluation.length > 0) {
                    // Update the existing evaluation
                    console.log(
                        'Updating evaluation for painting:',
                        p.paintingId,
                        'with price:',
                        data.price,
                        'and user:',
                        authContext?.auth.user.userId,
                    );
                    await axios.put(
                        `https://mpp-backend-l6xq.onrender.com/updateEval/${p.paintingId}`,
                        {
                            ...data,
                            userId: authContext?.auth.user.userId, // Add userId to the data
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${authContext?.auth.token}`,
                            },
                        },
                    );
                } else {
                    // Add a new evaluation
                    console.log(
                        'Adding new evaluation for painting:',
                        p.paintingId,
                        'with price:',
                        data.price,
                    );
                    await axios.post(
                        `https://mpp-backend-l6xq.onrender.com/eval/${p.paintingId}`,
                        {
                            ...data,
                            userId: authContext?.auth.user.userId, // Add userId to the data
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${authContext?.auth.token}`,
                            },
                        },
                    );
                }
                // Reset the form after successfully adding/editing the painting
                reset({price: data.price});
            }
        } catch (error) {
            console.error('Error adding/editing painting:', error);
        }
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <img
                        src={p?.imageUrl}
                        alt={p?.title}
                        style={{width: '100%', height: 'auto'}}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h3' color={'whitesmoke'}>
                                {p?.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='h6' color={'whitesmoke'}>
                                <i>Author:</i>
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                disabled={true}
                                label={p?.Artist.name || ''}
                                className='textfield__label'
                                multiline={true}
                                sx={{width: 350}}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='h6' color={'whitesmoke'}>
                                <i>Year:</i>
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                disabled={true}
                                value={p?.year || ''}
                                className='textfield__label'
                                multiline={true}
                                sx={{width: 350}}
                            ></TextField>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='h6' color={'whitesmoke'}>
                                <i>Movement:</i>
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                disabled={true}
                                value={p?.movement || ''}
                                className='textfield__label'
                                multiline={true}
                                sx={{width: 350}}
                            ></TextField>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='h6' color={'whitesmoke'}>
                                <i>Museum:</i>
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                disabled={true}
                                value={p?.museum || ''}
                                //value='very very very very long text'
                                className='textfield__label'
                                multiline={true}
                                sx={{width: 350}}
                            ></TextField>
                        </Grid>
                        <form
                            style={{padding: 16}}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Grid item xs={2}>
                                <Typography variant='h6' color={'whitesmoke'}>
                                    <i>Evaluate:</i>
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    defaultValue={p?.Evaluation[0]?.price || ''}
                                    className='textfield__label'
                                    type='number'
                                    multiline={true}
                                    sx={{width: 350}}
                                    {...register('price', {
                                        required: false,
                                        valueAsNumber: true,
                                    })}
                                ></TextField>
                            </Grid>
                            <Button
                                variant='contained'
                                type='submit'
                                sx={{mr: 2}}
                            >
                                Evaluate
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Detail;
