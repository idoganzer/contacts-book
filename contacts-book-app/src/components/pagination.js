import React from 'react';
import './pagination.css';

const Pagination = props => {
  if (props.totalPagesCount < 2) {
    return null;
  }

  const pageRange = [];
  for (let i = 0; i < props.totalPagesCount; ++i) {
    pageRange.push(i);
  }

  return (
    <div>
        {
          pageRange.map(page => {
            const onClick = ev => {
              ev.preventDefault();
              props.onSetPage(page);
            };
            return (
              <span
                className={ page === props.currentPage ? 'page-item-active' : 'page-item' }
                onClick={onClick}
                key={page.toString()}>
                <a href="">{page + 1}</a>
              </span>
            );
          })
        }
    </div>
  );
};

export default Pagination;