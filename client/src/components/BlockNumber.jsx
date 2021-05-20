import { useCallback, useEffect, useRef, useState } from "react";
import caver from "../klaytn/caver";
import "./BlockNumber.scss";

const BlockNumber = () => {
  const timer = useRef();
  const [currentBlockNumber, setCurrentBlockNumber] = useState("");

  const getBlockNumber = useCallback(async () => {
    const blockNumber = await caver.klay.getBlockNumber();
    setCurrentBlockNumber(blockNumber);
  }, []);

  useEffect(() => {
    timer.current = setInterval(getBlockNumber, 1000);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [getBlockNumber]);

  return (
    <div className="BlockNumber">
      <p className="BlockNumber__current">Block No. {currentBlockNumber}</p>
    </div>
  );
};

export default BlockNumber;
