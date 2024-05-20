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

function Overview() {
    const navigate = useNavigate();
    const {deletePainting, handleOpen, filterPaintings, paintings} =
        usePaintingStore();
    const {handleOpenArtist} = usePaintingStore();
    const handleConfirmation = (p: Painting) => {
        console.log(`Painting id: ${p.paintingId}`);
        // Perform action upon confirmation
        deletePainting(p.paintingId).then(() => {
            fetchPaintings();
        });
        console.log('Confirmed!');
    };
    //const {register} = useForm<ArtMovement>({});
    const [value, setValue] = useState('');
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
    useEffect(() => {
        console.log(`Set textfield to ${value}`);
        setValue('');
    }, [paintings]);

    // DATA RETRIEVAL //////////////////////////////////////////////////////
    const {filteredPaintings, fetchPaintings} = usePaintingStore();
    const {artists, fetchArtists} = usePaintingStore();

    useEffect(() => {
        console.log('*');
        fetchPaintings();
    }, []);

    useEffect(() => {
        console.log('*');
        fetchArtists();
    }, []);
    ////////////////////////////////////////////////////////////////////////
    const {deleteArtist} = usePaintingStore();
    const handleConfirmationArtists = (a: Artist) => {
        // Perform action upon confirmation
        deleteArtist(a.artistId).then(() => {
            fetchArtists();
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

    function getArtistNameFromId(artistId) {
        // Find the artist object with the given ID
        const artist = artists.find((artist) => artist.artistId === artistId);

        // Return the name of the artist if found, otherwise return null
        return artist ? artist.name : null;
    }

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
                                    {getArtistNameFromId(p.Artist.id)}
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
                                    //onClick={() => handleOpen(a)}
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
