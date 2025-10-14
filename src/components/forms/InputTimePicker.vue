<template>
  <v-menu
    v-model="openPicker"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="0"
    :disabled="disabled || readonly"
  >
    <template #activator="{ props: menuProps }">
      <InputTextfield
        v-model="timeValue"
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
          <v-icon class="me-1" icon="mdi-clock" />
        </template>
      </InputTextfield>
    </template>

    <v-time-picker
      v-model="timeValue"
      class="pt-4"
      bg-color="white"
      rounded="lg"
      hide-title
      :min="min"
      :max="max"
      :format="timeFormat"
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
    timeFormat?: "ampm" | "24hr";
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
    timeFormat: "24hr",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const openPicker = ref(false);

const timeValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit("update:modelValue", val);
  },
});
</script>

<style scoped></style>
