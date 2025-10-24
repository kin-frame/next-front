// ──────────────────────────────────────────────
// api 오브젝트를 받아, 각 함수의 타입을 추론하는 제네릭
// ──────────────────────────────────────────────

type TQueryMap<
  T extends Record<string, (...args: P) => unknown>,
  D extends string
> = {
  [K in keyof T as K extends `get${string}` ? K : never]: Parameters<
    T[K]
  > extends [infer P]
    ? P extends undefined
      ? // ⭕ 인자가 없는 함수의 경우
        () => {
          queryKey: [D, ...unknown[]];
          queryFn: () => ReturnType<T[K]>;
        }
      : // ⭕ 인자가 있는 함수의 경우
        (params: P) => {
          queryKey: [D, ...unknown[]];
          queryFn: () => ReturnType<T[K]>;
        }
    : // ⭕ 인자가 전혀 없는 경우 (no parameters)
      () => {
        queryKey: [D, ...unknown[]];
        queryFn: () => ReturnType<T[K]>;
      };
};

type TMutationMap<T extends Record<string, (...args: P) => unknown>> = {
  [K in keyof T as K extends
    | `create${string}`
    | `update${string}`
    | `delete${string}`
    | `remove${string}`
    | `upload${string}`
    ? K
    : never]: {
    mutationFn: T[K];
  };
};
