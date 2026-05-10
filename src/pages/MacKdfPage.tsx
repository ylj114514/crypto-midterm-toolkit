import { useState } from "react";
import { hmacDigest, pbkdf2Derive } from "../api/macApi";
import { FormSection } from "../components/FormSection";
import { ResultPanel } from "../components/ResultPanel";
import { SelectInput } from "../components/SelectInput";
import { TextAreaInput } from "../components/TextAreaInput";
import { TextInput } from "../components/TextInput";
import type { CryptoResult } from "../types/crypto";

export function MacKdfPage() {
  const [tab, setTab] = useState("HMAC");
  const [result, setResult] = useState<CryptoResult | null>(null);
  const [hmacAlg, setHmacAlg] = useState("HMacSHA256");
  const [key, setKey] = useState("key");
  const [message, setMessage] = useState("abc");
  const [password, setPassword] = useState("password");
  const [salt, setSalt] = useState("salt");
  const [iterations, setIterations] = useState("10000");
  const [dklen, setDklen] = useState("32");
  const [prf, setPrf] = useState("HMacSHA256");
  return (
    <div className="page-stack">
      <div className="tabs"><button className={tab === "HMAC" ? "active" : ""} onClick={() => setTab("HMAC")}>HMAC</button><button className={tab === "PBKDF2" ? "active" : ""} onClick={() => setTab("PBKDF2")}>PBKDF2</button></div>
      {tab === "HMAC" ? (
        <FormSection title="HMAC">
          <SelectInput label="算法" value={hmacAlg} options={["HMacSHA1", "HMacSHA256"]} onChange={setHmacAlg} />
          <TextInput label="key" value={key} onChange={setKey} />
          <SelectInput label="key_format" value="utf8" options={["utf8"]} onChange={() => undefined} />
          <SelectInput label="input_format" value="utf8" options={["utf8"]} onChange={() => undefined} />
          <SelectInput label="output_format" value="hex" options={["hex", "base64"]} onChange={() => undefined} />
          <TextAreaInput label="message" value={message} onChange={setMessage} />
        </FormSection>
      ) : (
        <FormSection title="PBKDF2">
          <TextInput label="password" value={password} onChange={setPassword} />
          <TextInput label="salt" value={salt} onChange={setSalt} />
          <TextInput label="iterations" value={iterations} onChange={setIterations} type="number" />
          <TextInput label="dklen" value={dklen} onChange={setDklen} type="number" />
          <SelectInput label="prf" value={prf} options={["HMacSHA1", "HMacSHA256"]} onChange={setPrf} />
        </FormSection>
      )}
      <button className="primary-button" type="button" onClick={async () => setResult(tab === "HMAC" ? await hmacDigest({ algorithm: hmacAlg, key, data: message, key_format: "utf8", input_format: "utf8", output_format: "hex" }) : await pbkdf2Derive({ password, salt, iterations: Number(iterations), dklen: Number(dklen), prf, output_format: "hex" }))}>调用接口</button>
      <ResultPanel result={result} />
    </div>
  );
}
