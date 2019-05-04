const styles = theme => ({
  root: {
    height: '100%'
  },
  quote: {
    color: theme.palette.primary.main,
    fontSize: '1.3rem',
    fontWeight: 500,
    lineHeight: 1.5,
    textAlign: 'center',

    width: 400
  },
  container: {
    margin: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});

export default styles;
