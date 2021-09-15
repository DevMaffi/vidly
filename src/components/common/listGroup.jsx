import React from 'react';

function ListGroup(props) {
  const { items, valueProp, textProp } = props;

  return (
    <ul className="list-group">
      {items.map(item => (
        <li key={item[valueProp]} className="list-group-item">
          {item[textProp]}
        </li>
      ))}
    </ul>
  );
}

ListGroup.defaultProps = {
  valueProp: '_id',
  textProp: 'name',
};

export default ListGroup;
