import React from 'react';

function ListGroup(props) {
  const { items, textProp, selectedItem, onItemSelect } = props;

  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[textProp]}
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
  textProp: 'name',
};

export default ListGroup;
