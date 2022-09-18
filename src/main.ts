import './scss/global.scss'
import App from './App.svelte';
import { hash } from './store';

const app = new App({ target: document.body });

export default app;
