<template>
  <div class="d-flex flex-column gap-2 w-100">
    <label v-if="label" :for="inputId">
      <span class="text-p16 font-weight-medium">{{ label }}</span>
      <span v-if="required" class="text-red">*</span>
    </label>

    <v-select
      :id="inputId"
      v-model="modelValueProxy"
      :items="items"
      :item-title="itemTitle"
      :item-value="itemValue"
      :item-color="itemColor"
      :return-object="returnObject"
      :density="density"
      :hide-details="hideDetails"
      :rounded="rounded"
      :flat="flat"
      :width="width"
      :variant="variant"
      :menu-icon="menuIcon"
      :menu-props="{ contentClass: 'custom-select-item' }"
      :base-color="baseColor"
      :color="color"
      :bg-color="bgColor"
      :placeholder="placeholder"
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
      :rules="rules"
      @update="$emit('update:modelValue', $event.target.value)"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </v-select>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    items?: any[];
    itemTitle?: string;
    itemValue?: string;
    itemColor?: string;
    returnObject?: boolean;
    label?: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    density?: "default" | "comfortable" | "compact";
    hideDetails?: "auto" | boolean;
    rounded?: boolean | string;
    flat?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    width?: string | number;
    variant?:
      | "outlined"
      | "filled"
      | "plain"
      | "underlined"
      | "solo"
      | "solo-inverted"
      | "solo-filled"
      | undefined;
    menuIcon?: string;
    baseColor?: string;
    bgColor?: string;
    color?: string;
    rules?: ValidationRule[];
  }>(),
  {
    items: () => [],
    itemTitle: "title",
    itemValue: "value",
    density: "comfortable",
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
