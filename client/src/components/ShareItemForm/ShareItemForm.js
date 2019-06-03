import React, { Component } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles';
import {
  TextField,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  Typography,
  Button,
  withStyles,
  InputLabel,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@material-ui/core';
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
import validate from './helpers/validation';
import { Link } from 'react-router-dom';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      fileSelected: false,
      done: false,
      selectedTags: [],
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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

  dispatchUpdate(viewer, values, tags, updateItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateItem({
          imageurl
        });
      });
    }
    updateItem({
      itemowner: {
        fullname: viewer.fullname,
        email: viewer.email,
        id: viewer.id
      },
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
    const { classes, tags, resetItem, updateItem } = this.props;
    const { selectedTags, fileSelected } = this.state;
    return (
      <ViewerContext.Consumer>
        {({ loading, viewer }) => {
          if (loading) return <FullScreenLoader />;
          return (
            <Mutation
              refetchQueries={() => [
                {
                  query: ALL_ITEMS_QUERY,
                  variables: { filter: viewer.id }
                }
              ]}
              mutation={ADD_ITEM_MUTATION}
            >
              {addItem => (
                <Form
                  onSubmit={values => {
                    this.saveItem(values, tags, addItem);
                  }}
                  validate={validate}
                  render={({ handleSubmit, pristine, invalid, form }) => {
                    return (
                      <div>
                        <Typography variant="display3" gutterBottom>
                          Share. <br /> Borrow. <br /> Prosper.
                        </Typography>
                        <Button
                          onClick={
                            fileSelected
                              ? this.resetFileInput
                              : this.triggerClick
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
                                this.dispatchUpdate(
                                  viewer,
                                  values,
                                  tags,
                                  updateItem
                                );
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
                                  autoComplete="off"
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
                                  margin="normal"
                                  placeholder="Describe your item"
                                  autoComplete="off"
                                />
                                {meta.touched &&
                                  meta.error && <span>{meta.error}</span>}
                              </div>
                            )}
                          />

                          <Field name="tags">
                            {({ input, meta }) => {
                              return (
                                <FormControl className={classes.formControl}>
                                  <InputLabel htmlFor="select-multiple-checkbox">
                                    Add Some Tags
                                  </InputLabel>
                                  <Select
                                    multiple
                                    value={selectedTags}
                                    onChange={e => {
                                      input.onChange(e);
                                      this.handleSelectTag(e);
                                    }}
                                    className={classes.textInput}
                                    label="Add some tags"
                                    renderValue={selected => {
                                      return this.generateTagsText(
                                        tags,
                                        selected
                                      );
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
                                </FormControl>
                              );
                            }}
                          </Field>

                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={pristine || invalid}
                            className={classes.shareButton}
                            onClick={this.handleClickOpen}
                          >
                            Share
                          </Button>

                          <Dialog
                            open={this.state.open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                          >
                            <DialogTitle id="alert-dialog-slide-title">
                              {'Your item was added!'}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-slide-description">
                                You may add another item if you like. To add
                                another item click 'Add another item'. To view
                                your item, click 'Back to items page'.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <a href="/share">
                                <Button
                                  onClick={() => {
                                    form.reset();
                                    this.handleClose();
                                    resetItem();
                                  }}
                                  color="primary"
                                >
                                  ADD ANOTHER ITEM
                                </Button>
                              </a>

                              <Button
                                onClick={this.handleClose}
                                color="secondary"
                              >
                                <Link to="/items">BACK TO ITEMS PAGE</Link>
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </form>
                      </div>
                    );
                  }}
                />
              )}
            </Mutation>
          );
        }}
      </ViewerContext.Consumer>
    );
  }
}

ShareItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string.isRequired)),
  updateItem: PropTypes.func.isRequired,
  resetItem: PropTypes.func.isRequired,
  resetImage: PropTypes.func.isRequired
};

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

export default connect(
  null,
  mapDispatchToProps
)(withRouter(withStyles(styles)(ShareItemForm)));
