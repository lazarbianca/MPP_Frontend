import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import usePaintingStore from '../stores/PaintingStore';
import '../styles/CardStyles.css';
function Overview() {
    const navigate = useNavigate();
    const {paintings, deletePainting, handleOpen} = usePaintingStore();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} alignItems={'center'}>
                {/** TITLE */}
                <Typography align='center' variant='h4'>
                    Painting Overview
                </Typography>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={12}>
                <Grid item xs={4} display={'flex'}>
                    {/** ADD ICON */}
                    <IconButton onClick={() => handleOpen()} aria-label='add'>
                        <AddIcon sx={{color: 'white'}} />
                    </IconButton>
                </Grid>
            </Grid>
            {/** mapping the ITEMS */}
            {paintings.map((p) => (
                <Grid key={p.id} item xs={12} md={3} display={'flex'}>
                    <Card
                        sx={{maxWidth: 345, width: 345}}
                        className='portCardCl'
                    >
                        <CardActionArea
                            // onClick={() => console.log(`tapped!${p.id}`)}
                            onClick={() => navigate(`/paintings/${p.id}`)}
                            className='portBodyCl'
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
                                // sx={{position: 'relative', margin: 0}}
                            >
                                <DeleteIcon
                                    onClick={() => deletePainting(p.id)}
                                    aria-label='delete'
                                    sx={{color: '#212121'}}
                                />
                            </IconButton>
                            <IconButton size='small'>
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
