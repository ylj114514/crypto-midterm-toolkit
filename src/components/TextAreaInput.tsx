export function TextAreaInput(props: { label: string; value: string; onChange: (value: string) => void; rows?: number }) {
  return (
    <label className="field full">
      <span>{props.label}</span>
      <textarea rows={props.rows ?? 4} value={props.value} onChange={(event) => props.onChange(event.target.value)} />
    </label>
  );
}
