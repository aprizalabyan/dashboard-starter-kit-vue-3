<template>
  <v-menu
    v-model="openPicker"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="auto"
    :disabled="disabled || readonly"
  >
    <template #activator="{ props: menuProps }">
      <InputTextfield
        v-model="dateValue"
        :label="label"
        :placeholder="placeholder"
        :rules="rules"
        :disabled="disabled"
        :required="required"
        :readonly="true"
        class="w-100"
        width="auto"
        variant="outlined"
        v-bind="menuProps"
      >
        <template #prepend-inner>
          <v-icon class="me-1" icon="mdi-calendar" />
        </template>
      </InputTextfield>
    </template>

    <v-date-picker
      v-model="dateValue"
      bg-color="white"
      rounded="lg"
      hide-header
      show-adjacent-months
      :min="min"
      :max="max"
    />
  </v-menu>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import InputTextfield from "./InputTextfield.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    min?: any;
    max?: any;
    withTime?: boolean;
    format?: string;
    label?: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    rules?: ValidationRule[];
  }>(),
  {
    modelValue: "",
    format: "YYYY-MM-DD",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const dayjs = useDayjs();
const openPicker = ref(false);

const dateValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    const newDate = new Date(val);
    emit("update:modelValue", val ? dayjs(newDate).format(props.format) : "");
  },
});
</script>

<style scoped></style>
