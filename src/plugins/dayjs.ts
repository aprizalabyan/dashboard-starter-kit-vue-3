import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import "dayjs/locale/en";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale("id");

import type { App } from "vue";

export default {
  install(app: App) {
    app.config.globalProperties.$dayjs = dayjs;
    app.provide("dayjs", dayjs);
  },
};

export { dayjs };
