export type TextareaProp = {
  placeholder: string;
  currentValue: string;
  updateInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}