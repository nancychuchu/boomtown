const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.main,
    justifyContent: 'center'
  },
  profile: {
    paddingTop: 64
  },
  card: {
    height: 300,
    margin: 50
  },
  gravatar: {
    borderRadius: '50%'
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  ownerSection: {
    display: 'flex',
    padding: 0,
    marginBottom: 10
  },
  ownerInfo: {
    paddingLeft: 10,
    paddingTop: 10
  },
  header: {
    color: 'white',
    alignSelf: 'flex-start'
  }
});

export default styles;
