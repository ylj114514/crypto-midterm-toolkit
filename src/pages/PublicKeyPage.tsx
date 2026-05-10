import { useState } from "react";
import { eccKeypair, ecdsaSign, ecdsaVerify, rsaDecrypt, rsaEncrypt, rsaKeypair, rsaSignSha1, rsaVerifySha1 } from "../api/publicKeyApi";
import { CopyButton } from "../components/CopyButton";
import { FormSection } from "../components/FormSection";
import { StatusBadge } from "../components/StatusBadge";
import { TextAreaInput } from "../components/TextAreaInput";
import { TextInput } from "../components/TextInput";
import type { CryptoResult } from "../types/crypto";
import { resultToText } from "../utils/format";

function readJsonKey(text: unknown): Record<string, string> {
  if (typeof text !== "string") return {};
  try {
    return JSON.parse(text) as Record<string, string>;
  } catch {
    return {};
  }
}

function OutputBlock({ title, result }: { title: string; result: CryptoResult | null }) {
  if (!result) {
    return (
      <section className="output-card">
        <h3>{title}</h3>
        <p className="muted">暂无执行结果。</p>
      </section>
    );
  }

  const output = resultToText(result.result);

  return (
    <section className="output-card">
      <div className="output-head">
        <h3>{title}</h3>
        <StatusBadge status={result.status} />
        <span>{result.message}</span>
        <span>{String(result.meta?.elapsed_ms ?? "-")} ms</span>
      </div>
      <div className="output-grid">
        <div className="plain-output">
          <div className="panel-title">
            <span>执行结果</span>
            <CopyButton value={output} />
          </div>
          <pre>{output || "-"}</pre>
        </div>
      </div>
    </section>
  );
}

export function PublicKeyPage() {
  const [rsaKeyResult, setRsaKeyResult] = useState<CryptoResult | null>(null);
  const [rsaEncryptResult, setRsaEncryptResult] = useState<CryptoResult | null>(null);
  const [rsaDecryptResult, setRsaDecryptResult] = useState<CryptoResult | null>(null);
  const [rsaSignResult, setRsaSignResult] = useState<CryptoResult | null>(null);
  const [rsaVerifyResult, setRsaVerifyResult] = useState<CryptoResult | null>(null);
  const [eccKeyResult, setEccKeyResult] = useState<CryptoResult | null>(null);
  const [ecdsaSignResult, setEcdsaSignResult] = useState<CryptoResult | null>(null);
  const [ecdsaVerifyResult, setEcdsaVerifyResult] = useState<CryptoResult | null>(null);

  const [rsaN, setRsaN] = useState("");
  const [rsaE, setRsaE] = useState("65537");
  const [rsaD, setRsaD] = useState("");
  const [rsaP, setRsaP] = useState("");
  const [rsaQ, setRsaQ] = useState("");
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
    setRsaKeyResult(response);
    const payload = response.result as Record<string, unknown>;
    const publicKey = readJsonKey(payload.public_key);
    const privateKey = readJsonKey(payload.private_key);
    setRsaN(publicKey.n ?? privateKey.n ?? "");
    setRsaE(publicKey.e ?? privateKey.e ?? "65537");
    setRsaD(privateKey.d ?? "");
    setRsaP(privateKey.p ?? "");
    setRsaQ(privateKey.q ?? "");
  }

  async function genEcc() {
    const response = await eccKeypair({ curve: "secp160r1", output_format: "json" });
    setEccKeyResult(response);
    const payload = response.result as Record<string, string>;
    setEccPublic(payload.public_key);
    setEccPrivate(payload.private_key);
  }

  const publicFields = { public_n: rsaN, public_e: rsaE };
  const privateFields = { private_n: rsaN, private_e: rsaE, private_d: rsaD, private_p: rsaP, private_q: rsaQ };

  return (
    <div className="page-stack">
      <FormSection title="RSA 密钥生成" actions={<button type="button" onClick={genRsa}>生成 RSA-1024</button>}>
        <TextInput label="bits" value="1024" onChange={() => undefined} />
        <TextInput label="public exponent e" value={rsaE} onChange={setRsaE} />
      </FormSection>
      <OutputBlock title="RSA 密钥生成结果" result={rsaKeyResult} />

      <FormSection title="RSA 密钥字段输入">
        <TextAreaInput label="n：模数，可输入 0x 十六进制或十进制" value={rsaN} onChange={setRsaN} rows={3} />
        <TextInput label="e：公钥指数，常用 65537" value={rsaE} onChange={setRsaE} />
        <TextAreaInput label="d：私钥指数" value={rsaD} onChange={setRsaD} rows={3} />
        <TextAreaInput label="p：素数 p，可选" value={rsaP} onChange={setRsaP} rows={2} />
        <TextAreaInput label="q：素数 q，可选" value={rsaQ} onChange={setRsaQ} rows={2} />
      </FormSection>

      <FormSection title="RSA 加密解密">
        <TextAreaInput label="明文 plaintext" value={rsaPlain} onChange={setRsaPlain} />
        <TextAreaInput label="密文 ciphertext" value={rsaCipher} onChange={setRsaCipher} />
      </FormSection>
      <div className="actions-row">
        <button type="button" onClick={async () => {
          const r = await rsaEncrypt({ plaintext: rsaPlain, ...publicFields, input_format: "utf8", output_format: "base64" });
          setRsaEncryptResult(r);
          if (typeof r.result === "string") setRsaCipher(r.result);
        }}>RSA 加密</button>
        <button type="button" onClick={async () => {
          setRsaDecryptResult(await rsaDecrypt({ ciphertext: rsaCipher, ...privateFields, input_format: "base64", output_format: "utf8" }));
        }}>RSA 解密</button>
      </div>
      <section className="grid-2">
        <OutputBlock title="RSA 加密结果" result={rsaEncryptResult} />
        <OutputBlock title="RSA 解密结果" result={rsaDecryptResult} />
      </section>

      <FormSection title="RSA-SHA1 签名验签">
        <TextAreaInput label="消息 message" value={rsaMessage} onChange={setRsaMessage} />
        <TextAreaInput label="签名 signature" value={rsaSignature} onChange={setRsaSignature} />
      </FormSection>
      <div className="actions-row">
        <button type="button" onClick={async () => {
          const r = await rsaSignSha1({ data: rsaMessage, ...privateFields, input_format: "utf8", output_format: "base64" });
          setRsaSignResult(r);
          if (typeof r.result === "string") setRsaSignature(r.result);
        }}>RSA-SHA1 签名</button>
        <button type="button" onClick={async () => {
          setRsaVerifyResult(await rsaVerifySha1({ data: rsaMessage, signature: rsaSignature, ...publicFields, input_format: "utf8", signature_format: "base64" }));
        }}>RSA-SHA1 验签</button>
      </div>
      <section className="grid-2">
        <OutputBlock title="RSA-SHA1 签名结果" result={rsaSignResult} />
        <OutputBlock title="RSA-SHA1 验签结果" result={rsaVerifyResult} />
      </section>

      <FormSection title="ECC/ECDSA">
        <TextInput label="curve" value="secp160r1" onChange={() => undefined} />
        <TextAreaInput label="ECC public_key(JSON)" value={eccPublic} onChange={setEccPublic} rows={3} />
        <TextAreaInput label="ECC private_key(JSON)" value={eccPrivate} onChange={setEccPrivate} rows={3} />
        <TextAreaInput label="message" value={ecdsaMessage} onChange={setEcdsaMessage} />
        <TextAreaInput label="signature" value={ecdsaSignature} onChange={setEcdsaSignature} />
      </FormSection>
      <div className="actions-row">
        <button type="button" onClick={genEcc}>生成 ECC 密钥</button>
        <button type="button" onClick={async () => {
          const r = await ecdsaSign({ data: ecdsaMessage, private_key: eccPrivate, curve: "secp160r1", input_format: "utf8", key_format: "json", output_format: "base64" });
          setEcdsaSignResult(r);
          if (typeof r.result === "string") setEcdsaSignature(r.result);
        }}>ECDSA 签名</button>
        <button type="button" onClick={async () => {
          setEcdsaVerifyResult(await ecdsaVerify({ data: ecdsaMessage, signature: ecdsaSignature, public_key: eccPublic, curve: "secp160r1", input_format: "utf8", signature_format: "base64", key_format: "json" }));
        }}>ECDSA 验签</button>
      </div>
      <OutputBlock title="ECC 密钥生成结果" result={eccKeyResult} />
      <section className="grid-2">
        <OutputBlock title="ECDSA 签名结果" result={ecdsaSignResult} />
        <OutputBlock title="ECDSA 验签结果" result={ecdsaVerifyResult} />
      </section>
    </div>
  );
}
