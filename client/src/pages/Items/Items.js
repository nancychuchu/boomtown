import ItemsGrid from '../../components/ItemsGrid';
import React from 'react';
import PropTypes from 'prop-types';

const Items = ({ items }) => {
  return <ItemsGrid items={items} />;
};
Items.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Items;
