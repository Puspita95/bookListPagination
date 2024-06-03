import React from 'react';
import classes from './Pagination.module.css'

const Pagination = ({ booksPerPage, length,handlePagination,currentPage }) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / booksPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className={classes.pagination}>
      {paginationNumbers.map((pageNumber) => (
        <button 
        className={currentPage === pageNumber ? classes.active : ''}
        key={pageNumber} onClick={()=>handlePagination(pageNumber)}>{pageNumber} </button>
      ))}
    </div>
  );
};

export default Pagination;