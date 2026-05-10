export function SampleButton({ children, onClick }: { children: string; onClick: () => void }) {
  return <button className="secondary-button" type="button" onClick={onClick}>{children}</button>;
}
