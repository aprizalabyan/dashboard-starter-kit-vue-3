<template>
  <v-btn
    :color="color"
    :variant="variant"
    :elevation="elevation"
    :rounded="rounded"
    :size="size"
    :density="density"
    :flat="flat"
    :height="height"
    :type="type"
    :disabled="disabled"
    :width="width"
    v-bind="$attrs"
    @click="onClick"
  >
    <template v-if="$slots.prepend || prependIcon" #prepend>
      <slot name="prepend">
        <v-icon v-if="prependIcon" :icon="prependIcon" />
      </slot>
    </template>

    <span v-if="label" :class="['text-l14', 'text-capitalize']">
      <slot>{{ label }}</slot>
    </span>
    <template v-else>
      <slot />
    </template>

    <template v-if="$slots.append || appendIcon" #append>
      <slot name="append">
        <v-icon v-if="appendIcon" :icon="appendIcon" />
      </slot>
    </template>

    <template v-if="$slots.loader" #loader>
      <slot name="loader" />
    </template>
  </v-btn>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    type?: string;
    density?: "default" | "comfortable" | "compact";
    rounded?: boolean | string;
    size?: number | string;
    elevation?: number | string;
    flat?: boolean;
    disabled?: boolean;
    height?: string | number;
    width?: string | number;
    variant?: "outlined" | "plain" | "flat" | "text" | "elevated" | "tonal" | undefined;
    color?: string;
    prependIcon?: string;
    appendIcon?: string;
  }>(),
  {
    density: "comfortable",
    rounded: "lg",
    variant: "flat",
    color: "primary",
    height: "40",
  }
);

const emit = defineEmits<{
  (e: "click", value: MouseEvent): void;
}>();

function onClick(event: MouseEvent) {
  emit("click", event);
}
</script>

<style scoped></style>
