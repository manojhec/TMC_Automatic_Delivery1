import { x3DDashboardUtils } from './lib/widget';
import Vue from 'vue';
import App from './app.vue';
import i18n from './i18n'
// vuetify
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export const bus = new Vue();

function start() {
    x3DDashboardUtils.disableCSS(true);

    window.title = 'TMC_Automatic_Delivery';
    widget.setTitle(window.title);

    const mainComponent = new Vue({
        vuetify: new Vuetify({}),
        i18n,
        render: h => h(App),
    });

    mainComponent.$mount('app');
}
/**
 * Entry point for both standalone & 3DDashboard modes
 * Assuming widget object has been loaded through widget-starter module
 */
export default function () {
    widget.addEvent('onLoad', () => {
        start();
    });
    widget.addEvent('onRefresh', () => {
        window.location.reload();
    });
}
