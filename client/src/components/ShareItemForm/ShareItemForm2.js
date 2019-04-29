import React, { Component } from 'react';
import styles from './styles.js';
import { withStyles } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
// import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Form>
        render{() => (
          <div className={classes.root}>
            <h2>hello</h2>
            <form
              onSubmit={() => {
                console.log('Submitted');
              }}
              className={classes.shareForm}
            >
              {/* {!this.state.formToggle && (
              <FormControl fullWidth className={classes.formControl}> */}
              <InputLabel htmlFor="fullname">Name of Item</InputLabel>
              <Field>
                <Input
                  id="fullname"
                  type="text"
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  value={''}
                />
              </Field>
              {/* </FormControl> */}
              )}
              {/* 
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="email">Email</InputLabel>

              <Field>
                <Input
                  id="email"
                  type="text"
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  value={''}
                />
              </Field>
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Field>
                <Input
                  id="password"
                  type="password"
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  value={''}
                />
              </Field>
            </FormControl>

            <FormControl className={classes.formControl}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Button
                  type="submit"
                  className={classes.formButton}
                  variant="contained"
                  size="large"
                  color="secondary"
                  disabled={
                    false // @TODO: This prop should depend on pristine or valid state of form
                  }
                >
                  {this.state.formToggle ? 'Enter' : 'Create Account'}
                </Button>
                <Typography>
                  <button
                    className={classes.formToggle}
                    type="button"
                    onClick={() => {
                      // @TODO: Reset the form on submit
                      this.setState({
                        formToggle: !this.state.formToggle
                      });
                    }}
                  >
                    {this.state.formToggle
                      ? 'Create an account.'
                      : 'Login to existing account.'}
                  </button>
                </Typography>
              </Grid>
            </FormControl>*/}
            </form>
          </div>
        )}
      </Form>
    );
  }
}
export default withStyles(styles)(ShareForm);
