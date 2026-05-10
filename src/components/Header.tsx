export function Header({ title }: { title: string }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <p>图形化调用 FastAPI 密码算法接口，展示状态码、耗时、结果和原始 JSON。</p>
    </header>
  );
}
