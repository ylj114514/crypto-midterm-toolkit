import { useState } from "react";
import { eccKeypair, ecdsaSign, ecdsaVerify, rsaDecrypt, rsaEncrypt, rsaKeypair, rsaSignSha1, rsaVerifySha1 } from "../api/publicKeyApi";
import { FormSection } from "../components/FormSection";
import { ResultPanel } from "../components/ResultPanel";
import { TextAreaInput } from "../components/TextAreaInput";
import { TextInput } from "../components/TextInput";
import type { CryptoResult } from "../types/crypto";

export function PublicKeyPage() {
  const [result, setResult] = useState<CryptoResult | null>(null);
  const [rsaPublic, setRsaPublic] = useState("");
  const [rsaPrivate, setRsaPrivate] = useState("");
  const [rsaPlain, setRsaPlain] = useState("网络信息安全 RSA");
  const [rsaCipher, setRsaCipher] = useState("");
  const [rsaMessage, setRsaMessage] = useState("network security");
  const [rsaSignature, setRsaSignature] = useState("");
  const [eccPublic, setEccPublic] = useState("");
  const [eccPrivate, setEccPrivate] = useState("");
  const [ecdsaMessage, setEcdsaMessage] = useState("网络信息安全 ECDSA");
  const [ecdsaSignature, setEcdsaSignature] = useState("");

  async function genRsa() {
    const response = await rsaKeypair({ bits: 1024, output_format: "json" });
    setResult(response);
    const payload = response.result as Record<string, string>;
    setRsaPublic(payload.public_key);
    setRsaPrivate(payload.private_key);
  }
  async function genEcc() {
    const response = await eccKeypair({ curve: "secp160r1", output_format: "json" });
    setResult(response);
    const payload = response.result as Record<string, string>;
    setEccPublic(payload.public_key);
    setEccPrivate(payload.private_key);
  }
  return (
    <div className="page-stack">
      <FormSection title="RSA 密钥生成" actions={<button onClick={genRsa}>生成 RSA-1024</button>}>
        <TextInput label="bits" value="1024" onChange={() => undefined} />
        <TextInput label="output_format" value="json" onChange={() => undefined} />
      </FormSection>
      <FormSection title="RSA 加密解密">
        <TextAreaInput label="plaintext" value={rsaPlain} onChange={setRsaPlain} />
        <TextAreaInput label="ciphertext" value={rsaCipher} onChange={setRsaCipher} />
        <TextAreaInput label="public_key" value={rsaPublic} onChange={setRsaPublic} rows={3} />
        <TextAreaInput label="private_key" value={rsaPrivate} onChange={setRsaPrivate} rows={3} />
      </FormSection>
      <div className="actions-row"><button onClick={async () => { const r = await rsaEncrypt({ plaintext: rsaPlain, public_key: rsaPublic, input_format: "utf8", key_format: "json", output_format: "base64" }); setResult(r); if (typeof r.result === "string") setRsaCipher(r.result); }}>RSA 加密</button><button onClick={async () => setResult(await rsaDecrypt({ ciphertext: rsaCipher, private_key: rsaPrivate, input_format: "base64", key_format: "json", output_format: "utf8" }))}>RSA 解密</button></div>
      <FormSection title="RSA-SHA1 签名验签">
        <TextAreaInput label="message" value={rsaMessage} onChange={setRsaMessage} />
        <TextAreaInput label="signature" value={rsaSignature} onChange={setRsaSignature} />
      </FormSection>
      <div className="actions-row"><button onClick={async () => { const r = await rsaSignSha1({ data: rsaMessage, private_key: rsaPrivate, input_format: "utf8", key_format: "json", output_format: "base64" }); setResult(r); if (typeof r.result === "string") setRsaSignature(r.result); }}>RSA-SHA1 签名</button><button onClick={async () => setResult(await rsaVerifySha1({ data: rsaMessage, signature: rsaSignature, public_key: rsaPublic, input_format: "utf8", signature_format: "base64", key_format: "json" }))}>RSA-SHA1 验签</button></div>
      <FormSection title="ECC/ECDSA">
        <TextInput label="curve" value="secp160r1" onChange={() => undefined} />
        <TextAreaInput label="public_key" value={eccPublic} onChange={setEccPublic} rows={3} />
        <TextAreaInput label="private_key" value={eccPrivate} onChange={setEccPrivate} rows={3} />
        <TextAreaInput label="message" value={ecdsaMessage} onChange={setEcdsaMessage} />
        <TextAreaInput label="signature" value={ecdsaSignature} onChange={setEcdsaSignature} />
      </FormSection>
      <div className="actions-row"><button onClick={genEcc}>生成 ECC 密钥</button><button onClick={async () => { const r = await ecdsaSign({ data: ecdsaMessage, private_key: eccPrivate, curve: "secp160r1", input_format: "utf8", key_format: "json", output_format: "base64" }); setResult(r); if (typeof r.result === "string") setEcdsaSignature(r.result); }}>ECDSA 签名</button><button onClick={async () => setResult(await ecdsaVerify({ data: ecdsaMessage, signature: ecdsaSignature, public_key: eccPublic, curve: "secp160r1", input_format: "utf8", signature_format: "base64", key_format: "json" }))}>ECDSA 验签</button></div>
      <ResultPanel result={result} />
    </div>
  );
}
