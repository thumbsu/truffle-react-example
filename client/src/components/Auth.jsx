import cx from "classnames";
import { useCallback, useState } from "react";
import caver from "../klaytn/caver";
import "./Auth.scss";

const Auth = () => {
  const [accessType, setAccessType] = useState("keystore");
  const [keystore, setKeystore] = useState("");
  const [keystoreMsg, setKeystoreMsg] = useState("");
  const [keystoreName, setKeystoreName] = useState("");
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const reset = useCallback(() => {
    setKeystore("");
    setKeystoreMsg("");
    setPassword("");
    setPrivateKey("");
  }, []);

  const checkValidKeystore = useCallback(keystore => {
    const parsedKeystore = JSON.parse(keystore);

    const isValidKeystore =
      parsedKeystore.version &&
      parsedKeystore.id &&
      parsedKeystore.address &&
      parsedKeystore.crypto;

    return isValidKeystore;
  }, []);

  const handleImport = useCallback(
    e => {
      const keystore = e.target.files[0];

      const fileReader = new FileReader();
      fileReader.onload = e => {
        try {
          if (!checkValidKeystore(e.target.result)) {
            setKeystoreMsg("Invalid keystore file.");
            return;
          }

          setKeystore(e.target.result);
          setKeystoreMsg("It is valid keystore. input your password.");
          setKeystoreName(keystore.name);
        } catch (e) {
          setKeystoreMsg("Invalid keystore file.");
        }
      };

      fileReader.readAsText(keystore);
    },
    [setKeystoreMsg, setKeystore, setKeystoreName, checkValidKeystore]
  );

  const integrateWallet = useCallback(
    privateKey => {
      const walletInstance =
        caver.klay.accounts.privateKeyToAccount(privateKey);
      caver.klay.accounts.wallet.add(walletInstance);
      sessionStorage.setItem("walletInstance", JSON.stringify(walletInstance));
      reset();
    },
    [reset]
  );

  const handleLogin = useCallback(() => {
    if (accessType === "privateKey") {
      integrateWallet(privateKey);
      return;
    }

    try {
      const { privateKey: privateKeyFromKeystore } =
        caver.klay.accounts.decrypt(keystore, password);
      integrateWallet(privateKeyFromKeystore);
    } catch (e) {
      setKeystoreMsg("Password doesn't match");
    }
  }, [
    privateKey,
    setKeystoreMsg,
    accessType,
    keystore,
    integrateWallet,
    password
  ]);

  const getWallet = useCallback(() => {
    if (caver.klay.accounts.wallet.length) {
      return caver.klay.accounts.wallet[0];
    }
  }, []);

  const removeWallet = useCallback(() => {
    caver.klay.accounts.wallet.clear();
    sessionStorage.removeItem("walletInstance");
    reset();
  }, [reset]);

  const toggleAccessType = useCallback(() => {
    setAccessType(accessType === "privateKey" ? "keystore" : "privateKey");
  }, [setAccessType, accessType]);

  const renderAuth = () => {
    const walletInstance = getWallet();

    if (walletInstance) {
      return (
        <>
          <label className="Auth__label">Integrated: </label>
          <p className="Auth__address">{walletInstance.address}</p>
          <button className="Auth__logout" onClick={removeWallet}>
            Logout
          </button>
        </>
      );
    }

    return (
      <>
        {accessType === "keystore" ? (
          <>
            <div className="Auth__keystore">
              <p className="Auth__label" htmlFor="keystore">
                Keystore:
              </p>
              <label className="Auth__button" htmlFor="keystore">
                Upload
              </label>
              <input
                className="Auth__file"
                id="keystore"
                type="file"
                onChange={handleImport}
                accept=".json"
              />
              <p className="Auth__fileName">
                {keystoreName || "No keystore file..."}
              </p>
            </div>
            <label className="Auth__label" htmlFor="password">
              Password:
            </label>
            <input
              id="input-password"
              className="Auth__passwordInput"
              name="password"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
          </>
        ) : (
          <>
            <label className="Auth__label">Private Key:</label>
            <input
              className="Auth__input"
              name="privateKey"
              onChange={e => setPrivateKey(e.target.value)}
            />
          </>
        )}
        <button className="Auth__button" onClick={handleLogin}>
          Login
        </button>
        <p className="Auth__keystoreMsg">{keystoreMsg}</p>
        <p className="Auth__toggleAccessButton" onClick={toggleAccessType}>
          {accessType === "privateKey"
            ? "Want to login with keystore? (click)"
            : "Want to login with privatekey? (click)"}
        </p>
      </>
    );
  };

  return (
    <div
      className={cx("Auth", {
        // If keystore file is imported, Adds a 'Auth--active' classname.
        "Auth--active": !!keystore
      })}
    >
      <div className="Auth__flag" />
      <div className="Auth__content">{renderAuth()}</div>
    </div>
  );
};

export default Auth;
