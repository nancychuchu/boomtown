import React from 'react';
import ItemCard from '../ItemCard';
// import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const ShareItemPreview = ({ shareItemPreview }) => {
  console.log(shareItemPreview);
  return <ItemCard item={shareItemPreview} />;
};

//map reducer from redux as a prop to react.
//Don't need to import it because connect from react-redux already connects the store to the react component
const mapStateToProps = ({ shareItemPreview }) => ({ shareItemPreview });

export default connect(mapStateToProps)(ShareItemPreview);
