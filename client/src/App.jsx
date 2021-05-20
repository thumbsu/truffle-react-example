import React, { useEffect } from "react";
import "./App.scss";
import Auth from "./components/Auth";
import BlockNumber from "./components/BlockNumber";
import caver from "./klaytn/caver";

const App = ({ children }) => {
  useEffect(() => {
    const walletFromSession = sessionStorage.getItem("walletInstance");
    if (walletFromSession) {
      try {
        caver.klay.accounts.wallet.add(JSON.parse(walletFromSession));
      } catch (e) {
        sessionStorage.removeItem("walletInstance");
      }
    }
  }, []);

  return (
    <div className="App">
      <BlockNumber />
      <Auth />
      {children}
    </div>
  );
};

export default App;
