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
    TextField,
    Typography,
} from '@mui/material';
import {SetStateAction, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Painting from '../model/Painting';
import usePaintingStore from '../stores/PaintingStore';
import '../styles/CardStyles.css';
import ConfirmationDialog from './ModalPopup';
//import AlertDialog from './DeleteAlertDialog';
function Overview() {
    const navigate = useNavigate();
    const {
        deletePainting,
        handleOpen,
        filterPaintings,
        filteredPaintings,
        paintings,
    } = usePaintingStore();
    const handleConfirmation = (p: Painting) => {
        // Perform action upon confirmation
        deletePainting(p.id);
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
            {/** mapping the ITEMS */}
            {filteredPaintings.map((p) => (
                <Grid key={p.id} item xs={12} md={3} display={'flex'}>
                    <Card
                        sx={{maxWidth: 345, width: 345}}
                        className='portCardCl'
                    >
                        <CardActionArea
                            // onClick={() => console.log(`tapped!${p.id}`)}
                            onClick={() => navigate(`/paintings/${p.id}`)}
                            className='portBodyCl'
                            aria-label={`card-action-area-${p.id}`}
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
                                    {p.author}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        {/* <CardActionArea className='portBodyCl'> */}
                        <CardActions className='portButCl'>
                            <IconButton
                                size='small'
                                aria-label={`delete-${p.id}`}
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
                                aria-label={`edit-${p.id}`}
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
        </Grid>
    );
}
export default Overview;
