<template>
  <div class="d-flex flex-column gap-2 w-100">
    <label v-if="label" :for="inputId">
      <span class="text-p16 font-weight-medium">{{ label }}</span>
      <span v-if="required" class="text-red">*</span>
    </label>

    <v-textarea
      :id="inputId"
      v-model="modelValueProxy"
      class="pa-0"
      :class="{ 'custom-textarea': textSmall, 'no-padding': noPadding }"
      :rows="rows"
      :max-rows="maxRows"
      :variant="variant"
      :placeholder="placeholder"
      :hide-details="hideDetails"
      :readonly="readonly"
      :rules="rules"
      :disabled="disabled"
      :base-color="baseColor"
      :bg-color="bgColor"
      :color="color"
      :rounded="rounded"
      :flat="flat"
      :auto-grow="autoGrow"
      @update="$emit('update:modelValue', $event.target.value)"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </v-textarea>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    rows?: string | number;
    maxRows?: string | number;
    autoGrow?: boolean;
    label?: string;
    placeholder?: string;
    required?: boolean;
    hideDetails?: "auto" | boolean;
    rounded?: boolean | string;
    flat?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    variant?:
      | "outlined"
      | "filled"
      | "plain"
      | "underlined"
      | "solo"
      | "solo-inverted"
      | "solo-filled"
      | undefined;
    baseColor?: string;
    bgColor?: string;
    color?: string;
    rules?: ValidationRule[];
    textSmall?: boolean;
    noPadding?: boolean;
  }>(),
  {
    rows: "2",
    hideDetails: "auto",
    rounded: "lg",
    variant: "outlined",
    baseColor: "grey",
    bgColor: "white",
    color: "grey-lighten-1",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const inputId = computed(() => {
  return props.label ? `input-${props.label.toLowerCase().replace(/\s+/g, "-")}` : undefined;
});

const modelValueProxy = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<style scoped></style>
