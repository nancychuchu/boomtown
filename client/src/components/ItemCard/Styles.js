const styles = theme => ({
  card: {
    width: 400,
    height: 550,
    margin: 10,
    position: 'relative'
  },
  media: {
    height: 230
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
  tags: {
    display: 'flex',
    padding: 0
    // whiteSpace: 'nowrap'
  },
  button: {
    position: 'absolute',
    color: 'black',
    bottom: 20
  },

  success: {
    backgroundColor: 'green'
  },
  error: {
    backgroundColor: 'red'
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
});

export default styles;
