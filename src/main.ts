import './scss/global.scss'
import App from './App.svelte';
import { hash } from './store';

const app = new App({ target: document.body });

export default app;

// TODO show one time massage: Pressing on a paragraph will mark it as read, indicated by the dot in front not being visible. 

/* document.addEventListener('DOMContentLoaded', (event) => {
  const
    about = JSON.parse(localStorage.getItem('about_view') || 'true'),
    book = JSON.parse(localStorage.getItem('book_view') || 'false')

  const open: [string][] = []
  if (about) open.push(['about'])
  if (book) open.push(['book'])

  console.log(...open)

  hash.set(...open)
}) */