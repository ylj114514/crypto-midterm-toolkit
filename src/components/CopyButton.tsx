export function CopyButton({ value, label = "复制" }: { value: string; label?: string }) {
  return (
    <button className="ghost-button" type="button" onClick={() => navigator.clipboard.writeText(value)}>
      {label}
    </button>
  );
}
