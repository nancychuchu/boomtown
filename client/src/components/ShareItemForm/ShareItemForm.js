import React, { Component } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
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
import { Mutation } from 'react-apollo';
import { ADD_ITEM_MUTATION, ALL_ITEMS_QUERY } from '../../apollo/queries';
import { ViewerContext } from '../../context/ViewerProvider';
import { withRouter } from 'react-router';

import FullScreenLoader from '../../components/FullScreenLoader';

class ShareForm extends Component {
  constructor(props) {
    super(props);

    this.fileInput = React.createRef();

    this.state = {
      fileSelected: false,
      done: false,
      selectedTags: []
    };
  }

  handleSelectTag = e => {
    this.setState({
      selectedTags: e.target.value
    });
  };

  handleSelectFile = e => {
    this.setState({
      fileSelected: this.fileInput.current.files[0]
    });
  };

  //convert array of tags into array of objects
  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }

  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader(); //FileReader is a JavaScript class
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }

  triggerClick = () => {
    this.fileInput.current.click();
  };

  resetFileInput = () => {
    this.fileInput.current.value = '';
    this.props.resetImage();
    this.setState({
      fileSelected: false
    });
  };

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  }

  dispatchUpdate(values, tags, updateItem) {
    console.log(values);
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateItem({
          imageurl
        });
      });
    }
    updateItem({
      ...values,
      tags: this.applyTags(tags)
    });
  }

  saveItem = async (values, tags, addItem) => {
    try {
      const newItem = {
        ...values,
        tags: this.applyTags(tags)
      };
      await addItem({
        variables: {
          item: newItem
        }
      });
    } catch (e) {
      throw Error(e);
    }
  };

  render() {
    const { classes, tags, resetImage, resetItem, updateItem } = this.props;
    const { selectedTags, fileSelected } = this.state;

    return (
      <Mutation
        // refetchQueries={() => [
        //   { query: ALL_ITEMS_QUERY, variables: { id: viewer.id } }
        // ]}
        mutation={ADD_ITEM_MUTATION}
      >
        {addItem => (
          <Form
            onSubmit={async values => {
              addItem({
                variables: { item: { ...values, tags: this.applyTags(tags) } }
              });
              resetItem();
            }}
            render={({ handleSubmit, pristine, invalid, form }) => {
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
                    onClick={
                      fileSelected ? this.resetFileInput : this.triggerClick
                    }
                    variant="contained"
                    className={
                      fileSelected ? classes.selected : classes.unselected
                    }
                  >
                    <input
                      hidden
                      type="file"
                      ref={this.fileInput}
                      onChange={e => this.handleSelectFile(e)}
                      accept="image/*"
                      id="fileInput"
                    />
                    {fileSelected ? (
                      <div> RESET IMAGE </div>
                    ) : (
                      <div> SELECT AN IMAGE </div>
                    )}
                  </Button>

                  <form onSubmit={handleSubmit}>
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
                          <TextField
                            name="title"
                            className={classes.textInput}
                            onChange={input.onChange}
                            id="standard-name"
                            margin="normal"
                            placeholder="Name your item"
                          />
                          {meta.touched &&
                            meta.error && <span>{meta.error}</span>}
                        </div>
                      )}
                    />
                    <Field
                      name="description"
                      className={classes.form}
                      render={({ input, meta }) => (
                        <div>
                          <TextField
                            name="description"
                            className={classes.textInput}
                            onChange={input.onChange}
                            id="description"
                            multiline
                            rows="4"
                            placeholder="Describe your item"
                            margin="normal"
                          />
                          {meta.touched &&
                            meta.error && <span>{meta.error}</span>}
                        </div>
                      )}
                    />
                    <FormControl className={classes.formControl}>
                      <Field name="tags">
                        {({ input, meta }) => {
                          return (
                            <Select
                              multiple
                              value={selectedTags}
                              onChange={e => this.handleSelectTag(e)}
                              className={classes.textInput}
                              placeholder="Add some tags"
                              renderValue={selected => {
                                return this.generateTagsText(tags, selected);
                              }}
                            >
                              {tags &&
                                tags.map(tag => (
                                  <MenuItem key={tag.id} value={tag.id}>
                                    <Checkbox
                                      checked={
                                        selectedTags.indexOf(tag.id) > -1
                                      }
                                    />
                                    <ListItemText primary={tag.title} />
                                  </MenuItem>
                                ))}
                            </Select>
                          );
                        }}
                      </Field>
                    </FormControl>

                    <Button
                      type="submit"
                      disabled={pristine || invalid}
                      className={classes.shareButton}
                    >
                      Share
                    </Button>
                  </form>
                </div>
              );
            }}
          />
        )}
      </Mutation>
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
)(withRouter(withStyles(styles)(ShareForm)));
