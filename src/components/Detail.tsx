import {Grid, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import Painting from '../model/Painting';
import PaintingsList from '../service/PaintingApi';
import '../styles/TextFieldStyles.css';

const Detail = () => {
    const params = useParams();
    const [p, setPainting] = useState<Painting | undefined>(undefined);
    React.useEffect(() => {
        if (params.id)
            setPainting(
                PaintingsList.find((p) => p.id === parseInt(params.id!)),
            );
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
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='h6' color={'whitesmoke'}>
                                <i>Museum:</i>
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                disabled={true}
                                label={p?.museum || ''}
                                className='textfield__label'
                            ></TextField>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Detail;
