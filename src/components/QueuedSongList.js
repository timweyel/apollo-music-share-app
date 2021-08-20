import { useMutation } from '@apollo/client';
import { Avatar, IconButton, Typography, makeStyles, useMediaQuery } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';

const useStyles = makeStyles({
  avatar: {
    width: 44,
    height: 44
  },
  text: {
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  container: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '50px auto 50px',
    gridGap: 12,
    alignItems: 'center',
    marginTop: 10
  },
  songInfoContainer: {
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
});

function QueuedSongList({ queue }) {
  console.log({ queue });
  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));

  // const song = {
  //   title: "Tenth Avenue Freeze Out",
  //   artist: "Springsteen",
  //   thumbnail: "https://cdn.mos.cms.futurecdn.net/EjnCZRe2ZLzr8v46LZXdGH-970-80.jpg.webp"
  // }

  return ( 
    greaterThanMd && ( 
    <div style={{ margin: '10px 0' }}>
      <Typography color="textSecondary" variant="button">
        QUEUE ({queue.length})
      </Typography>
      {queue.map((song, i) => (
        <QueuedSong key={i} song={song} />
      ))}
    </div>
  )
);
}

function QueuedSong({ song }) {
  const classes = useStyles();  
  const { thumbnail, artist, title } = song;
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: data => {
      localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue))
    }
  });

  function handleAddOrRemoveFromQueue() {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: 'Song' }}
    })
  }

  return (
    <div className={classes.container}>
      <Avatar src={thumbnail} alt="song thumbnail" className={classes.avatar} />
      <div className={classes.songInfoContainer}>
        <Typography variant="subtitle2" className={classes.text}>
          {title}
        </Typography>
        <Typography color="textSecondary" variant="body2" className={classes.text}>
          {artist}
        </Typography>
      </div>
      <IconButton onClick={handleAddOrRemoveFromQueue}>
        <Delete color="error" />
      </IconButton>
    </div>
  )
}

export default QueuedSongList;