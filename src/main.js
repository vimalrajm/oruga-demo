import { createApp } from 'vue';
import { Table, } from '@oruga-ui/oruga-next';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App)
  .use(Table)
  .use(store)
  .use(router)
  .mount('#app');
