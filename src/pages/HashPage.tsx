import { useState } from "react";
import { hashDigest } from "../api/hashApi";
import { FormSection } from "../components/FormSection";
import { ResultPanel } from "../components/ResultPanel";
import { SampleButton } from "../components/SampleButton";
import { SelectInput } from "../components/SelectInput";
import { TextAreaInput } from "../components/TextAreaInput";
import type { CryptoResult } from "../types/crypto";

export function HashPage() {
  const [algorithm, setAlgorithm] = useState("SHA256");
  const [data, setData] = useState("abc");
  const [inputFormat, setInputFormat] = useState("utf8");
  const [outputFormat, setOutputFormat] = useState("hex");
  const [result, setResult] = useState<CryptoResult | null>(null);
  return (
    <div className="page-stack">
      <FormSection title="哈希摘要" actions={<><SampleButton onClick={() => setData("abc")}>abc</SampleButton><SampleButton onClick={() => setData("hello crypto")}>hello crypto</SampleButton><SampleButton onClick={() => setData("网络信息安全")}>网络信息安全</SampleButton></>}>
        <SelectInput label="算法" value={algorithm} options={["SHA1", "SHA256", "SHA3", "RIPEMD160"]} onChange={setAlgorithm} />
        <SelectInput label="输入格式" value={inputFormat} options={["utf8", "hex", "base64"]} onChange={setInputFormat} />
        <SelectInput label="输出格式" value={outputFormat} options={["hex", "base64"]} onChange={setOutputFormat} />
        <TextAreaInput label="输入消息" value={data} onChange={setData} />
      </FormSection>
      <button className="primary-button" type="button" onClick={async () => setResult(await hashDigest({ algorithm, data, input_format: inputFormat, output_format: outputFormat }))}>计算摘要</button>
      <ResultPanel result={result} />
    </div>
  );
}
