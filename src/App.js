import React, { Component } from 'react';
import CharacterCard from './components/CharacterCard';
import Sidebar from './components/Sidebar';
import WithCharacters from './components/WithCharacters';
import './App.css';
//material ui
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';

const styles = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});

const SidebarWithCharacters = WithCharacters(Sidebar, { a: 'some props' });
class App extends Component {
  constructor() {
    super();
    this._isMounted = false;
  }
  baseUrl = 'https://rickandmortyapi.com/api/character';

  state = {
    results: [],
    actualPage: 1,
    open: false
  }

  getCharactersFromPage = async (page = 1) => {
    const response = await fetch(`${this.baseUrl}?page=${page}`);
    const data = await response.json();
    return data;
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      open: true
    });
    this.getCharactersFromPage(0).then(data => {
      if (this._isMounted) {
        this.setState({
          ...data,
          actualPage: 1,
          open: false
        });
      }
    }).catch(error => console.log(error));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClickPage = async (page) => {
    this.setState({
      open: true
    });
    const data = await this.getCharactersFromPage(page);
    this.setState({
      ...data,
      actualPage: page,
      open: false
    });
  }

  render() {
    const { classes } = this.props;
    const { results, open, info } = this.state;
    const pagesLength = info?.pages;
    const pages = [];

    for (let i = 1; i < pagesLength; i++) {
      pages.push(<Button disabled={i === this.state.actualPage} variant="contained" color="primary" key={i} onClick={() => this.handleClickPage(i)}>{i}</Button>);
    }

    return (
      // <><main>
      //   <section className="episodes-wrapper">
      //     <h2>Episodes</h2>
      //     {this.state.results.length === 0 && <p>Loading...</p>}
      //     {this.state.results && this.state.results.map(({name, episode, air_date}) => <EpisodeCard key={episode} name={name} air_date={air_date} />)}
      //   </section>
      //   <SidebarWithCharacters/>
      // </main>
      // <Footer>{pages}</Footer>
      // </>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Characters
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <img src="./assets/logo.png" alt="logo" />
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Rick And Morty API with React
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Main call to action
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      Secondary action
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {results && results.map(({ id, name, image }) => <CharacterCard key={id} id={id} name={name} image={image} classes={classes} />)}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          {pages}
          <Pagination count={10} />
        </footer>
        {/* End footer */}
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);

