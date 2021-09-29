import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
  params: {
    apikey: 'dcf789b17cee73ea0c9aa9874c5894da',
    ts: '1',
    hash: 'c13131675e8f63eb01139406bfd06526',
  },
});
