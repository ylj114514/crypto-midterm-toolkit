export function TextInput(props: { label: string; value: string | number; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="field">
      <span>{props.label}</span>
      <input type={props.type ?? "text"} value={props.value} onChange={(event) => props.onChange(event.target.value)} />
    </label>
  );
}
