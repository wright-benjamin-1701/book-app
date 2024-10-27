import axios from 'axios';

const processBooks = (responseData:any) => {
  if (!responseData || !responseData.docs) return [];
  return responseData.docs.map((doc:any) => ({
        title: doc?.title,
        author: doc?.author_name?.[0],
        year: doc?.first_publish_year,
        isbn: doc?.isbn?.[0]
  }));
}

async function searchBooksRequest(searchString: string) {
  const apiUrl = 'https://openlibrary.org/search.json'; 
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',

  };

  try {
    const response = await axios.get(apiUrl, { params: {q: searchString,
        limit:20,
        fields: 'title,author_name,cover_i,publishers,first_publish_year,isbn'

    }, 
    headers:headers } );
    return processBooks(response.data);
  } catch (error) {
    console.error('Error making API request:', error);
    throw error;
  }
}


export default searchBooksRequest;
