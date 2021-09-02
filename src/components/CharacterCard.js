//import './EpisodeCard.css';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const CharacterCard = ({ id, name, image, classes }) => {
    return (<Grid item key={id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                image={image}
                title={name}
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">
                    View
                </Button>
                <Button size="small" color="primary">
                    Edit
                </Button>
                <Button size="small" color="secondary">
                    Delete
                </Button>
            </CardActions>
        </Card>
    </Grid>);
}

export default CharacterCard;