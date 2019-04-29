import React from 'react';
import { Form, Field } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const photoInput = React.createRef();

function handleClick() {
  photoInput.current.click();
}

const shareForm = ({ classes, tags }) => {
  return (
    <Form
      onSubmit={() => console.log('sumbitted')}
      render={() => {
        return (
          <div>
            <Typography
              variant="display3"
              className={classes.typography}
              gutterBottom
            >
              Share. <br /> Borrow. <br /> Prosper.
            </Typography>

            <Button
              onClick={handleClick}
              variant="contained"
              className={classes.button}
            >
              <input
                hidden
                type="file"
                ref={photoInput}
                accept="image/*"
                id="fileInput"
              />
              SELECT AN IMAGE
            </Button>

            <form>
              <Field
                name="title"
                render={({ input, meta }) => (
                  <div>
                    {console.log(input)}
                    {console.log(meta)}
                    <TextField
                      className={classes.textInput}
                      id="standard-name"
                      margin="normal"
                      placeholder="Name your item"
                    />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              />

              <Field
                name="Description "
                className={classes.form}
                render={({ input, meta }) => (
                  <div>
                    <TextField
                      className={classes.textInput}
                      id="standard-name"
                      multiline
                      rows="4"
                      placeholder="Describe your item"
                      margin="normal"
                    />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              />

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
                <Select
                  multiple
                  value={tags.map(tag => tag.title)}
                  // onChange={this.handleChange}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected => selected.join(', ')}
                  // MenuProps={MenuProps}
                >
                  {tags.map(tag => (
                    <MenuItem key={tag.id} value={tag.title}>
                      <Checkbox checked={tags.indexOf(tag.title) > -1} />
                      <ListItemText primary={tag.title} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button>Share</Button>
            </form>
          </div>
        );
      }}
    />
  );
};

export default withStyles(styles)(shareForm);
