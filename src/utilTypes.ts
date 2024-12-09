import { UndefinedInitialDataOptions, UseMutationOptions } from "@tanstack/react-query";

export type QueryOptionsWithoutKeyAndFn<T> = Omit<UndefinedInitialDataOptions<T>, "queryKey" | "queryFn">;

export type MutationOptionsWithoutKeyAndFn<TData, TError, TVariables> = Pick<
  UseMutationOptions<TData, TError, TVariables>,
  "onSuccess" | "onError"
>;
