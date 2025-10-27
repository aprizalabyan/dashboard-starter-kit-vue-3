import { h } from "vue";

const icons: Record<string, any> = import.meta.glob("@/assets/icons/*.svg", {
  query: "?raw",
  eager: true,
});

export function useCustomIconComponent() {
  return (props: any) => {
    const iconName = props.icon.replace("custom:", "");
    const iconKey = Object.keys(icons).find((key) => key.endsWith(`/${iconName}.svg`));
    const svgRaw = iconKey ? icons[iconKey] : null;
    const svgContent = svgRaw?.default || svgRaw;

    if (!svgContent) return h("span", {}, "");

    return h("span", {
      class: "",
      innerHTML: svgContent,
    });
  };
}
