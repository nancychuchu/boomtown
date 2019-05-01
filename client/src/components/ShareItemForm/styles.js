const styles = theme => ({
  formControl: {
    width: '100%',
    paddingLeft: 50
  },

  selected: {
    width: '70%',
    backgroundColor: 'transparent'
  },

  unselected: {
    width: '70%',
    backgroundColor: theme.palette.primary.main
  },

  textInput: {
    width: '70%'
  }
});

export default styles;
