export type NonNullableFields<T extends Record<PropertyKey, unknown>> = {
	[Key in keyof T]: NonNullable<T[Key]>;
};
