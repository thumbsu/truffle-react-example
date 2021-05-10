import { cav } from "../klaytn/caver";
import { useCallback, useEffect, useRef, useState } from "react";
import "./BlockNumber.scss";

const BlockNumber = () => {
  const timer = useRef();
  const [currentBlockNumber, setCurrentBlockNumber] = useState("");

  const getBlockNumber = useCallback(async () => {
    const blockNumber = await Caver.klay.getBlockNumber();
    setCurrentBlockNumber(blockNumber);
  }, []);

  useEffect(() => {
    timer.current = setInterval(getBlockNumber, 1000);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <div className="BlockNumber">
      <p className="BlockNumber__current">Block No. {currentBlockNumber}</p>
    </div>
  );
};

export default BlockNumber;