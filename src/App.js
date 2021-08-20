import React from 'react'; 
import AddSong from './components/AddSong';
import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Grid, useMediaQuery, Hidden } from '@material-ui/core';
import songReducer from './reducer';
 
export const SongContext = React.createContext({
  song: {
    id: "4a39b4d5-41f9-4cc2-b245-1a7044aa26a0",
    title: "Born To Run",
    artist: "Bruce Springsteen & the E Street Band",
    thumbnail: "https://images-na.ssl-images-amazon.com/images/I/71SUIo-gibL._SL1500_.jpg",
    url: "https://soundcloud.com/brucespringsteen/sets/born-to-run-1",
    duration: 250
  },
  isPlaying: false
})
function App() {
  const initialSongState = React.useContext(SongContext);
  const [state, dispatch] = React.useReducer(songReducer, initialSongState);
  const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container spacing={3}>
        <Grid style={{
          paddingTop: greaterThanSm ?  80 : 10
        }}
          item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid 
          style={
            greaterThanMd 
            ? {
            postion: 'fixed',
            width: '100%',
            right: 0,
            top: 70
          } : {
            position: 'fixed',
            width: '100%',
            left: 0,
            bottom: 0
          }} item xs={12} md={5}>
          <SongPlayer />

        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}

export default App;
