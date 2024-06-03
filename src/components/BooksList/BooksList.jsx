import { useEffect, useState } from "react";
import { getBookDetails } from "../../services/bookService";
import Books from "../Books/Books";
import classes from "./BooksList.module.css";
import Pagination from "../Pagination/Pagination";
import { useFetch } from "../../hooks/useFetch";

export const BooksList = () => {
  const [bookList, setBookList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(4);
  const [expandedBookId, setExpandedBookId] = useState(null);

  const handleExpandClick = (bookId) => {
    setExpandedBookId(expandedBookId === bookId ? null : bookId);
  };

  const { data, fetchLoading, fetchError } = useFetch(
    "https://www.googleapis.com/books/v1/volumes?q=javascript"
  );

  useEffect(() => {
    if (data) {
      const bookData = getBookDetails(data);
      setBookList(bookData);
    }
  }, [data]);

  // useEffect(() => {
  //   const fetchBookDetails = async () => {
  //     try {
  //       setLoading(true);
  //       const bookList = await fetchBookslist();
  //       setLoading(false);
  //       setBookList(bookList);
  //     } catch (error) {
  //       setError(error);
  //       throw error;
  //     }
  //   };
  //   fetchBookDetails();
  // }, []);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastBook = currentPage * booksPerPage; //4
  const indexOfFirstBook = indexOfLastBook - booksPerPage; //0
  const currentBooks = bookList.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Books List</h1>
      <div>
        <div className={classes.container}>
          {fetchError && <div> Some error occured.</div>}
          {fetchLoading && <div>Loading..</div>}
          {currentBooks &&
            currentBooks.map((item) => {
              return (
                <Books
                  book={item}
                  key={item.id}
                  expanded={expandedBookId === item.id}
                  onExpandClick={() => handleExpandClick(item.id)}
                />
              );
            })}
        </div>

        <Pagination
          length={bookList.length}
          booksPerPage={booksPerPage}
          currentPage={currentPage}
          handlePagination={handlePagination}
        />
      </div>
    </>
  );
};
