import { createApp } from 'vue'
import App from './App.vue'
import myGlobal from '@/common/js/myGlobal'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

console.log('11111', myGlobal);
const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(myGlobal);
app.mount('#app')
