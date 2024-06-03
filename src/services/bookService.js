import axios from "axios";

export const fetchBookslist = async () => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=javascript"
    );
    return getBookDetails(response.data);
  } catch (error) {
    console.log("error form fetchBookslist", error);
    throw error;
  }
};

export const getBookDetails = (data) => {
  let bookDetailsList = [];

  data.items.forEach((element) => {
    const displayBookDetail = {
      id: element.id,
      title: element.volumeInfo.title,
      subtitle: element?.volumeInfo?.subtitle,
      authors: element.volumeInfo.authors,
      publishedDate: element.volumeInfo.publishedDate,
      publisher: element.volumeInfo.publisher,
      image: element.volumeInfo.imageLinks.thumbnail,
      price: element.saleInfo.retailPrice?.amount,
      currencyCode: element.saleInfo.retailPrice?.currencyCode,
      previewLink:element.volumeInfo.previewLink,
      buyLink:element.saleInfo.buyLink,
      description:element.volumeInfo.description
    };
    bookDetailsList.push(displayBookDetail);
  });
  return bookDetailsList;
};
