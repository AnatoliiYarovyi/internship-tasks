interface TypedDataResponse<T> {
  results: T;
}

type Suggestion = {
  suggestion: string | number;
}[];

export { TypedDataResponse, Suggestion };
