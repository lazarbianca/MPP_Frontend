import AddIcon from '@mui/icons-material/Add';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import PaintingsList from '../service/PaintingApi';

// const p = {
//     id: 1,
//     title: 'Mona Lisa',
//     author: 'Leonardo da Vinci',
//     year: 1503,
//     movement: ArtMovement.RENAISSANCE,
//     imageUrl:
//         'https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
//     museum: 'Louvre Museum',
// };

function Overview() {
    const navigate = useNavigate();
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
                    <IconButton aria-label='add'>
                        <AddIcon sx={{color: 'white'}} />
                    </IconButton>
                </Grid>
            </Grid>
            {/** mapping the ITEMS */}
            {PaintingsList.map((p) => (
                <Grid key={p.id} item xs={12} md={3} display={'flex'}>
                    <Card sx={{maxWidth: 345, width: 345}}>
                        <CardActionArea
                            // onClick={() => console.log(`tapped!${p.id}`)}
                            onClick={() => navigate(`/paintings/${p.id}`)}
                        >
                            <CardMedia
                                sx={{height: 300}}
                                image={p.imageUrl}
                                title={p.title}
                            />

                            <CardContent sx={{height: 105}}>
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
                    </Card>
                </Grid>
            ))}
            {/* {PaintingsList.map((p) => (
                <Grid key={p.id} item xs={4} md={3}>
                    <Card sx={{maxWidth: 345}}>
                        <Card>
                            <CardMedia
                                sx={{height: 140}}
                                image={p.imageUrl}
                                title={p.title}
                            />
                        </Card>
                    </Card>
                </Grid>
            ))} */}
        </Grid>
    );
}
export default Overview;
