import React from 'react';

export default function Badge({ type = 'neutral', children, style = {} }) {
  const badgeClass = `badge badge-${type}`;
  return (
    <span className={badgeClass} style={style}>
      {children}
    </span>
  );
}
