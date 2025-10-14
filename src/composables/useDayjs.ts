import { inject } from "vue";
import { dayjs as baseDayjs } from "@/plugins/dayjs";

export const useDayjs = () => {
  const dayjs = inject<typeof baseDayjs>("dayjs", baseDayjs);
  return dayjs;
};
