import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { md3 } from "vuetify/blueprints";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

const light = {
  dark: false,
  colors: {
    primary: "#2569E0",
    background: "#F0F4F8",
  },
};

const dark = {
  dark: false,
  colors: {
    primary: "#2C3E50",
    background: "#181818",
  },
};

export const vuetify = createVuetify({
  components,
  directives,
  blueprint: md3,
  defaults: {
    global: {
      ripple: false,
    },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light,
      dark,
    },
  },
  icons: { defaultSet: "mdi", aliases, sets: { mdi } },
});
