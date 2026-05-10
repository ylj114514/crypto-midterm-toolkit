import { useState } from "react";
import { base64Decode, base64Encode, utf8Decode, utf8Encode } from "../api/encodingApi";
import { FormSection } from "../components/FormSection";
import { ResultPanel } from "../components/ResultPanel";
import { SelectInput } from "../components/SelectInput";
import { TextAreaInput } from "../components/TextAreaInput";
import type { CryptoResult } from "../types/crypto";

export function EncodingPage() {
  const [tab, setTab] = useState("Base64");
  const [operation, setOperation] = useState("encode");
  const [text, setText] = useState("网络信息安全");
  const [result, setResult] = useState<CryptoResult | null>(null);
  async function submit() {
    if (tab === "Base64") {
      setResult(operation === "encode" ? await base64Encode({ data: text, input_format: "utf8", output_format: "base64" }) : await base64Decode({ data: text, output_format: "utf8" }));
    } else {
      setResult(operation === "encode" ? await utf8Encode({ text, output_format: "hex" }) : await utf8Decode({ data: text, input_format: "hex" }));
    }
  }
  return (
    <div className="page-stack">
      <div className="tabs"><button className={tab === "Base64" ? "active" : ""} onClick={() => { setTab("Base64"); setText("网络信息安全"); }}>Base64</button><button className={tab === "UTF-8" ? "active" : ""} onClick={() => { setTab("UTF-8"); setText("网络信息安全"); }}>UTF-8</button></div>
      <FormSection title={`${tab} 编码`}>
        <SelectInput label="操作" value={operation} options={["encode", "decode"]} onChange={(value) => { setOperation(value); setText(value === "decode" && tab === "Base64" ? "572R57uc5L+h5oGv5a6J5YWo" : value === "decode" ? "e7bd91e7bb9ce4bfa1e681afe5ae89e585a8" : "网络信息安全"); }} />
        <TextAreaInput label="输入内容" value={text} onChange={setText} />
      </FormSection>
      <button className="primary-button" type="button" onClick={submit}>调用接口</button>
      <ResultPanel result={result} />
    </div>
  );
}
