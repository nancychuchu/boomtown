import React, { Component } from 'react';
import validate from './helpers/validation';
import { Form, Field } from 'react-final-form';
import { Typography, Button, Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import styles from './styles';
// import PropTypes from 'prop-types';

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTags: []
    };
  }

  handleSubmit = async values => {
    this.setState({ submitted: true });
    // const item = {};
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.header}>Share. Borrow. Grow.</Typography>
        <Form

        >
          render{() => (
            <div>
              <Field>
                <Button variant="contained"> SELECT AN IMAGE </Button>
              </Field>

              <Field>
                <Input
                  id="fullname"
                  type="text"
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  value={''}
                  placeholder="Type here"
                />
              </Field>

              <Field />
            </div>
          )}
        </Form>
      </div>
    );
  }
}

export default withStyles(styles)(ShareForm);
