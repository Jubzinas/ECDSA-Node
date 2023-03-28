import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1";
import {toHex} from "ethereum-cryptography/utils";
import {hexToBytes} from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, signature, setSignature, recoverKey, setRecoverKey}) {
  async function onChange(evt) {
    const signature = document.getElementsByName("signature")[0].value;
    const recoverKey = document.getElementsByName("recoverKey")[0].value;
    setRecoverKey(recoverKey);
    setSignature(signature);
    if (signature && recoverKey) {
      const address = toHex(secp.recoverPublicKey(toHex(keccak256(utf8ToBytes("Hello world!"))),hexToBytes(signature), recoverKey));
      setAddress(address);
      if (address) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      } else {
        setBalance(0);
      }
    }
  }
  

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Signature
        <input placeholder="Type in a signature" name='signature' value={signature} onChange={onChange}></input>
      </label>

      <label>
        Recover key
        <input placeholder="Type in the recover key" name='recoverKey' value={recoverKey} onChange = {onChange}></input>
      </label>

      <div>
        Address: {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
