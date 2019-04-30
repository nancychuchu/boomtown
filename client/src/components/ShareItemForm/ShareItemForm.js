import React, { Component } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import { connect } from 'react-redux';

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
import {
  updateItem,
  resetItem,
  resetImage
} from '../../redux/ShareItemPreview/reducer';

const photoInput = React.createRef();
const selectedTags = [];

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoInput: React.createRef(),
      selectedTags: []
    };
  }

  handleClick() {
    this.state.photoInput.current.click();
  }

  handleChange(e) {
    this.state.selectedTags.push(e.target.value);
  }

  dispatchUpdate(values, tags, updateItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateItem({
          imageurl
        });
      });
    }
    updateItem({
      ...values
      // tags: this.applyTags(tags)
    });
  }
  render() {
    const { classes, tags } = this.props;
    return (
      <Form
        onSubmit={values => this.saveItem(values, tags)}
        render={() => {
          console.log(this.props);

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
                onClick={this.handleClick}
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
                <FormSpy
                  subscription={{ values: true }}
                  component={({ values }) => {
                    if (values) {
                      this.dispatchUpdate(values, tags, updateItem);
                    }
                    return '';
                  }}
                />

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
                  <InputLabel htmlFor="select-multiple-checkbox">
                    Tag
                  </InputLabel>
                  <Select
                    className={classes.textInput}
                    multiple
                    value={selectedTags}
                    onChange={this.handleChange}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(', ')}
                    // MenuProps={MenuProps}
                  >
                    {tags.map(tag => (
                      <MenuItem key={tag.id} value={tag.title}>
                        <Checkbox
                          checked={selectedTags.indexOf(tag.title) > -1}
                        />
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
  }
}

const mapDispatchToProps = dispatch => ({
  updateItem(item) {
    dispatch(updateItem(item));
  },
  resetImage() {
    dispatch(resetImage());
  },
  resetItem() {
    dispatch(resetItem());
  }
});

//the first connect parameter is mapStateToProps. If you don't have it, use null.
export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ShareForm));
