declare global {
  type FlexibleValue = string | number | boolean | null | undefined | object;

  type ValidationRule =
    | string
    | boolean
    | PromiseLike<ValidationResult>
    | ((value: unknown) => string | false | true)
    | ((value: unknown) => PromiseLike<ValidationResult>)
    | [string, unknown, string];

  interface IDataTableHeader {
    key: string;
    title: string;
    sortable?: boolean;
    align?: "start" | "center" | "end";
    width?: string | number;
  }
}

export {};
