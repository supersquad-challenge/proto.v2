export type InputProp = {
  placeholder: string;
  currentValue: string;
  updateInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitInput: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}