export type Fmt = "curl" | "js" | "py" | "php" | "go";

export type ParamValue = string | number | boolean;

export type Params = Record<string, ParamValue>;

export type ParamEntry = [string, ParamValue];

export type BatchItem = Record<string, ParamValue>;
