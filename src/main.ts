import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import logger from './logger';
import { showToast } from '@/utils'

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import '@hotwax/apps-theme';

import store from './store'
import permissionPlugin, { Actions, hasPermission } from '@/authorization';
import permissionRules from '@/authorization/Rules';
import permissionActions from '@/authorization/Actions';
import { dxpComponents } from '@hotwax/dxp-components'; 
import { login, logout, loader } from '@/utils/user';
import { getConfig, initialise, setUserLocale, setUserTimeZone, getAvailableTimeZones } from './adapter';
import localeMessages from '@/locales';

const app = createApp(App)
.use(IonicVue, {
  mode: 'md',
  innerHTMLTemplatesEnabled: true
})
.use(logger, {
  level: process.env.VUE_APP_DEFAULT_LOG_LEVEL
})
.use(router)
.use(store)
.use(permissionPlugin, {
  rules: permissionRules,
  actions: permissionActions
})
.use(dxpComponents, {
  Actions,
  defaultImgUrl: require("@/assets/images/defaultImage.png"),
  login,
  logout,
  loader,
  appLoginUrl: process.env.VUE_APP_LOGIN_URL as string,
  getConfig,
  initialise,
  localeMessages,
  setUserLocale,
  showToast,
  setUserTimeZone, 
  getAvailableTimeZones,
  hasPermission
  });

router.isReady().then(() => {
  app.mount('#app');
});