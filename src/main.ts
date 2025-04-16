import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import ui from "@nuxt/ui/vue-plugin";

const app = createApp(App);
app.use(ui);
app.mount("#app");
