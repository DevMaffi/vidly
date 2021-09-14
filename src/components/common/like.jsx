import React from 'react';

function Like(props) {
  let classes = 'fa fa-heart';

  if (!props.liked) classes += '-o';

  return (
    <i
      onClick={props.onLikeToggle}
      style={{ cursor: 'pointer' }}
      className={classes}
      aria-hidden="true"
    ></i>
  );
}

export default Like;
