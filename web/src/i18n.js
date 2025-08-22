import messages from './assets/nls/languageSupport.json'
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const getBrowserLocale = () => {
 const lang = navigator.language || navigator.userLanguage;

 const widgetLang =  window['widget']?.lang;
 return widgetLang||lang.split('-')[0];

};

const locale = getBrowserLocale();
const fallbackLocale = 'en';

export default new VueI18n({
  locale: messages[locale] ? locale : fallbackLocale,
  fallbackLocale,
  messages,
});
