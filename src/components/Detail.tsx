import {Grid, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import Painting from '../model/Painting';
import usePaintingStore from '../stores/PaintingStore';
import '../styles/TextFieldStyles.css';

const Detail = () => {
    const params = useParams();
    const [p, setPainting] = useState<Painting | undefined>(undefined);
    const {paintings} = usePaintingStore();
    React.useEffect(() => {
        if (params.id)
            setPainting(paintings.find((p) => p.id === parseInt(params.id!)));
    }, [params.id]);

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
                                label={p?.author || ''}
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
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Detail;
