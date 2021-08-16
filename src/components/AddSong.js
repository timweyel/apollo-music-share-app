import React from 'react';
import { TextField, InputAdornment, Button } from "@material-ui/core";
import { Link, AddBoxOutlined } from '@material-ui/icons'

function AddSong() {
  return (
    <div>
      <TextField
        placeholder = "Add Youtube or Soundcloud Url"
        fullWidth
        margin = "normal"
        type= "url"
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <Link />
            </InputAdornment>
          )
        }}
      />
      <Button
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
    </div>
  )
}

export default AddSong;