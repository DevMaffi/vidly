import React from 'react';

function Like(props) {
  let classes = 'clickable fa fa-heart';

  if (!props.liked) classes += '-o';

  return (
    <i onClick={props.onLikeToggle} className={classes} aria-hidden="true"></i>
  );
}

export default Like;
