import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/icommon/style.css";
import { createPinia } from "pinia";
import "@/assets/styles/index.css";
import router from "./router";
import i18n from "@/plugins/i18n";
import definePlugins from "@/plugins";
import ApiService from "@/services/ApiService";

export const pinia = createPinia();
export const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(i18n);
ApiService.init(app);

definePlugins(app);

app.mount("#app");
