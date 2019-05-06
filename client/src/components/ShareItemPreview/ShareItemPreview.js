import React from 'react';
import ItemCard from '../ItemCard';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const ShareItemPreview = ({ shareItemPreview }) => {
  return <ItemCard item={shareItemPreview} />;
};

ShareItemPreview.propType = {
  shareItemPreview: PropTypes.shape({
    borrower: PropTypes.string,
    description: PropTypes.string.isRequired,
    id: PropTypes.string,
    imageurl: PropTypes.string,
    itemowner: PropTypes.objectOf(PropTypes.string.isRequired),
    tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string.isRequired)),
    title: PropTypes.string.isRequired
  })
};
//map reducer from redux as a prop to react.
//Don't need to import it because connect from react-redux already connects the store to the react component
const mapStateToProps = ({ shareItemPreview }) => ({ shareItemPreview });

export default connect(mapStateToProps)(ShareItemPreview);
