import React from 'react';

function ListGroup(props) {
  const { items, valueProp, textProp, selectedItem, onItemSelect } = props;

  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProp]}
          className={
            selectedItem === item ? 'list-group-item active' : 'list-group-item'
          }
        >
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
