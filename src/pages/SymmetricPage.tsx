import { useState } from "react";
import { symmetricDecrypt, symmetricEncrypt } from "../api/symmetricApi";
import { FormSection } from "../components/FormSection";
import { ResultPanel } from "../components/ResultPanel";
import { SampleButton } from "../components/SampleButton";
import { SelectInput } from "../components/SelectInput";
import { TextAreaInput } from "../components/TextAreaInput";
import { TextInput } from "../components/TextInput";
import type { CryptoResult } from "../types/crypto";
import { DEFAULT_IV, DEFAULT_KEY } from "../utils/samples";

export function SymmetricPage() {
  const [algorithm, setAlgorithm] = useState("AES");
  const [operation, setOperation] = useState("Encrypt");
  const [mode, setMode] = useState("CBC");
  const [padding, setPadding] = useState("PKCS7");
  const [inputFormat, setInputFormat] = useState("utf8");
  const [outputFormat, setOutputFormat] = useState("base64");
  const [key, setKey] = useState(DEFAULT_KEY);
  const [iv, setIv] = useState(DEFAULT_IV);
  const [text, setText] = useState("网络信息安全");
  const [result, setResult] = useState<CryptoResult | null>(null);

  function applySample(nextAlgorithm: string) {
    setAlgorithm(nextAlgorithm);
    setOperation("Encrypt");
    setMode("CBC");
    setPadding("PKCS7");
    setInputFormat("utf8");
    setOutputFormat("base64");
    setKey(DEFAULT_KEY);
    setIv(DEFAULT_IV);
    setText(`网络信息安全 ${nextAlgorithm}`);
  }

  async function submit() {
    const body = { algorithm, key, mode, iv, padding, input_format: inputFormat, key_format: "hex", iv_format: "hex", output_format: outputFormat };
    const response = operation === "Encrypt"
      ? await symmetricEncrypt({ ...body, plaintext: text })
      : await symmetricDecrypt({ ...body, ciphertext: text });
    setResult(response);
  }

  return (
    <div className="page-stack">
      <FormSection title="对称加密参数" actions={<><SampleButton onClick={() => applySample("AES")}>AES-CBC 样例</SampleButton><SampleButton onClick={() => applySample("SM4")}>SM4-CBC 样例</SampleButton><SampleButton onClick={() => applySample("RC6")}>RC6-CBC 样例</SampleButton><SampleButton onClick={() => setText("")}>清空</SampleButton></>}>
        <SelectInput label="算法" value={algorithm} options={["AES", "SM4", "RC6"]} onChange={setAlgorithm} />
        <SelectInput label="操作" value={operation} options={["Encrypt", "Decrypt"]} onChange={(value) => { setOperation(value); setInputFormat(value === "Decrypt" ? "base64" : "utf8"); setOutputFormat(value === "Decrypt" ? "utf8" : "base64"); }} />
        <SelectInput label="模式" value={mode} options={["ECB", "CBC"]} onChange={setMode} />
        <SelectInput label="填充" value={padding} options={["PKCS7", "NoPadding"]} onChange={setPadding} />
        <SelectInput label="输入格式" value={inputFormat} options={["utf8", "hex", "base64"]} onChange={setInputFormat} />
        <SelectInput label="输出格式" value={outputFormat} options={["utf8", "hex", "base64"]} onChange={setOutputFormat} />
        <TextInput label="key(hex)" value={key} onChange={setKey} />
        <TextInput label="iv(hex)" value={iv} onChange={setIv} />
        <TextAreaInput label={operation === "Encrypt" ? "明文" : "密文"} value={text} onChange={setText} />
      </FormSection>
      <button className="primary-button" type="button" onClick={submit}>调用接口</button>
      <ResultPanel result={result} />
    </div>
  );
}
