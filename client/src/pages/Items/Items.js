import ItemsGrid from '../../components/ItemsGrid';
import React from 'react';
//import Gravatar from 'react-gravatar';

const Items = ({ classes, items }) => {
  return (
    // <div>
    //   <p>
    //     This is the items page located at <code>/items</code>.
    //   </p>
    //   {items.map(item => (
    //     <div key={item.id}>
    //       <h2>{item.title}</h2>
    //       <p>
    //         id: {item.id} <br />
    //         description: {item.description}
    //       </p>
    //     </div>
    //   ))}
    //   <h1>THIS IS MY GRAVATAR!!!</h1>
    //   <Gravatar email="nancy.q.chu@gmail.com" />
    // </div>

    <ItemsGrid items={items} />
  );
};

export default Items;
