const styles = theme => ({
  root: {
    flexGrow: 1
  },

  logo: {
    width: 40
  },
  spacer: {
    flexGrow: 1
  },

  addIcon: {
    marginRight: theme.spacing.unit,
    borderRadius: 100,
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    padding: 2
  },

  shareButton: {
    margin: theme.spacing.unit,
    borderRadius: 100,
    color: 'black',
    height: 45
  },

  i: {
    marginRight: 10
  }
});

export default styles;
