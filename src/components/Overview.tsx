import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PieChartIcon from '@mui/icons-material/PieChart';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Pagination,
    TextField,
    Typography,
} from '@mui/material';
import React, {SetStateAction, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Artist from '../model/Artist';
import Painting from '../model/Painting';
import usePaintingStore from '../stores/PaintingStore';
import '../styles/CardStyles.css';
import ConfirmationDialog from './ModalPopup';
import useFetchPaintings from './ReactHookFetchPaintings';

function Overview() {
    const navigate = useNavigate();
    const {artists, setArtists} = usePaintingStore();
    const [value, setValue] = useState('');
    const {fetchPaintings, deletePainting, fetchArtists, deleteArtist} =
        useFetchPaintings();
    const {handleOpen, filterPaintings, paintings, handleOpenArtist} =
        usePaintingStore();
    useEffect(() => {
        console.log(`Set textfield to ${value}`);
        setValue('');
    }, [paintings]);
    const actualFetchAndRefresh = async () => {
        const getPaintings = async () => {
            const filteredPaintings = await fetchPaintings();
            setFilteredPaintings(filteredPaintings);
        };
        getPaintings();
    };
    const actualFetchAndRefreshArtists = async () => {
        const getArtists = async () => {
            const artists = await fetchArtists();
            setArtists(artists);
        };
        getArtists();
    };
    const handleConfirmation = (p: Painting) => {
        console.log(`Painting id: ${p.paintingId}`);
        // Perform action upon confirmation
        deletePainting(p.paintingId).then(() => {
            console.log('re-fetching after delete!');
            actualFetchAndRefresh();
        });
        console.log('Confirmed!');
    };
    //const {register} = useForm<ArtMovement>({});
    const handleTextfieldChange = (e: {
        target: {value: SetStateAction<string>};
    }) => {
        console.log(`Typed ${e.target.value}`);
        setValue(e.target.value);
    };
    //const [filteredUsers, setFilteredUsers] = useState(paintings);
    const handleFilter = (m: string) => {
        filterPaintings(m);
    };

    // DATA RETRIEVAL //////////////////////////////////////////////////////
    const setFilteredPaintings = usePaintingStore(
        (state) => state.setFilteredPaintings,
    );
    const filteredPaintings = usePaintingStore(
        (state) => state.filteredPaintings,
    );

    // useEffect(() => {
    //     console.log('Fetch paintings - OVERVIEW');
    //     filteredPaintings = fetchPaintings();
    // }, []);

    useEffect(() => {
        actualFetchAndRefresh();
    }, []);

    useEffect(() => {
        console.log('Fetch artists - OVERVIEW');
        actualFetchAndRefreshArtists();
    }, []);
    ////////////////////////////////////////////////////////////////////////
    const handleConfirmationArtists = (a: Artist) => {
        // Perform action upon confirmation
        deleteArtist(a.artistId).then(() => {
            console.log('Fetch artists - DELETE ARTIST');
            actualFetchAndRefreshArtists();
        });
        console.log('Confirmed!');
    };

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    const itemsPerPage = 4;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(
        startIndex + itemsPerPage,
        filteredPaintings.length,
    );

    const displayedPaintings = filteredPaintings.slice(startIndex, endIndex);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} alignItems={'center'}>
                {/** TITLE */}
                <Typography align='center' variant='h4'>
                    Online Art Gallery
                </Typography>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={12}>
                <Grid item xs={6} display={'flex'}>
                    {/** ADD ICON */}
                    <IconButton onClick={() => handleOpen()} aria-label='add'>
                        <AddIcon sx={{color: 'white'}} />
                    </IconButton>
                    {/* * FILTER ICON */}
                    <TextField
                        disabled={false}
                        label='Art Movement'
                        fullWidth
                        sx={{bgcolor: 'lightgray'}}
                        className='textfield__label'
                        value={value}
                        onChange={handleTextfieldChange}
                    ></TextField>
                    <IconButton
                        onClick={() => handleFilter(value)}
                        aria-label='filter'
                        title='Filter by Art Movement'
                    >
                        <FilterAltIcon sx={{color: 'white'}} />
                    </IconButton>
                    {/** CHART DIAGRAM */}
                    <IconButton
                        onClick={() => navigate(`/paintings/statistics`)}
                        aria-label='diagram'
                        title='Statistics'
                    >
                        <PieChartIcon sx={{color: 'white'}}></PieChartIcon>
                    </IconButton>
                </Grid>
            </Grid>
            {/** mapping the PAINTINGS */}
            {displayedPaintings.map((p) => (
                <Grid key={p.paintingId} item xs={12} md={3} display={'flex'}>
                    <Card
                        sx={{maxWidth: 345, width: 345}}
                        className='portCardCl'
                    >
                        <CardActionArea
                            // onClick={() => console.log(`tapped!${p.id}`)}
                            onClick={() =>
                                navigate(`/paintings/${p.paintingId}`)
                            }
                            className='portBodyCl'
                            aria-label={`card-action-area-${p.paintingId}`}
                        >
                            <CardMedia
                                image={p.imageUrl}
                                title={p.title}
                                sx={{
                                    height: 300,
                                    width: 345,
                                    objectFit: 'cover',
                                }}
                            />

                            <CardContent sx={{height: 'auto'}}>
                                <Typography
                                    gutterBottom
                                    variant='h5'
                                    component='div'
                                >
                                    {`${p.title}`}
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant='body1'
                                    fontStyle={'oblique'}
                                    component='div'
                                >{`${p.movement}`}</Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                >
                                    {p.Artist
                                        ? p.Artist.name
                                        : 'Unknown Artist'}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        {/* <CardActionArea className='portBodyCl'> */}
                        <CardActions className='portButCl'>
                            <IconButton
                                size='small'
                                aria-label={`delete-${p.paintingId}`}
                            >
                                <ConfirmationDialog
                                    title='Confirmation'
                                    description='Are you sure you want to proceed?'
                                    response={() => handleConfirmation(p)}
                                >
                                    {(showDialog) => (
                                        <DeleteIcon
                                            //onClick={() => deletePainting(p.id)}
                                            onClick={showDialog}
                                            sx={{color: '#212121'}}
                                        />
                                    )}
                                </ConfirmationDialog>
                            </IconButton>
                            <IconButton
                                size='small'
                                aria-label={`edit-${p.paintingId}`}
                            >
                                <EditIcon
                                    onClick={() => handleOpen(p)}
                                    aria-label='edit'
                                    sx={{color: '#212121'}}
                                />
                            </IconButton>
                        </CardActions>
                        {/* </CardActionArea> */}
                    </Card>
                </Grid>
            ))}
            <Grid item xs={12}>
                <Pagination
                    count={Math.ceil(filteredPaintings.length / itemsPerPage)}
                    page={page}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} display={'flex'}>
                {/** ADD ICON */}
                <IconButton onClick={() => handleOpenArtist()} aria-label='add'>
                    <AddIcon sx={{color: 'white'}} />
                </IconButton>
            </Grid>
            {/** mapping the ARTISTS */}
            {artists.map((a) => (
                <Grid key={a.artistId} item xs={12} md={3} display={'flex'}>
                    <Card
                        sx={{maxWidth: 345, width: 345}}
                        className='portCardCl'
                    >
                        <CardActionArea
                            // onClick={() => console.log(`tapped!${p.id}`)}
                            onClick={() => navigate(`/artists/${a.artistId}`)}
                            className='portBodyCl'
                            aria-label={`card-action-area-${a.artistId}`}
                        >
                            <CardMedia
                                title={a.name}
                                sx={{
                                    height: 0,
                                    width: 5,
                                    objectFit: 'cover',
                                }}
                            />

                            <CardContent sx={{height: 'auto'}}>
                                <Typography
                                    gutterBottom
                                    variant='h5'
                                    component='div'
                                >
                                    {`${a.name}`}
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant='body1'
                                    fontStyle={'oblique'}
                                    component='div'
                                >{`${a.birthYear} - ${a.deathYear}`}</Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className='portButCl'>
                            <IconButton
                                size='small'
                                aria-label={`delete-${a.artistId}`}
                            >
                                <ConfirmationDialog
                                    title='Confirmation'
                                    description='Are you sure you want to proceed?'
                                    response={() =>
                                        handleConfirmationArtists(a)
                                    }
                                >
                                    {(showDialog) => (
                                        <DeleteIcon
                                            //onClick={() => deletePainting(p.id)}
                                            onClick={showDialog}
                                            sx={{color: '#212121'}}
                                        />
                                    )}
                                </ConfirmationDialog>
                            </IconButton>
                            <IconButton
                                size='small'
                                aria-label={`edit-${a.artistId}`}
                            >
                                <EditIcon
                                    onClick={() => handleOpenArtist(a)}
                                    aria-label='edit'
                                    sx={{color: '#212121'}}
                                />
                            </IconButton>
                        </CardActions>
                        {/* </CardActionArea> */}
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
export default Overview;
