const api = 'https://reactnd-books-api.udacity.com';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token
};

export const get = bookId => {
  return fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book);
};

export const getAll = () => {
  return fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books);
};

export const update = (book, shelf) => {
  const options = {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ shelf })
  };

  return fetch(`${api}/books/${book.id}`, options)
    .then(res => res.json());
};

export const search = query => {
  const options = {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  };

  return fetch(`${api}/search`, options)
    .then(res => res.json())
    .then(data => data.books);
};
