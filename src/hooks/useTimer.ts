import { useState } from "react";

const useCountdown = (
  countDownTime: number,
): {
  minutes: string;
  seconds: string;
  countDownStatus: string;
  startCountdown: () => void;
} => {
  const [countDownStatus, setCountDownStatus] = useState<string>("not started");
  const startCountdown = () => {
    setCountDownStatus("running");
    const interval = setInterval(() => {
      setCountDown((prevState:any) => prevState - 1000);
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
      setCountDownStatus("stopped");
    }, countDownTime);
  };
  const [countDown, setCountDown] = useState(countDownTime);
  const [minutes, seconds] = getReturnValues(countDown);
  return { minutes, seconds, countDownStatus, startCountdown };
};

const getReturnValues = (countDown: any) => {
  const minutes = Math.floor((countDown / 1000) / 60);
  const seconds = Math.round((countDown / 1000) % 60);
  if (seconds >= 0 && String(seconds).length === 1) {
    return [String(minutes), "0" + seconds];
  }
  return [String(minutes), String(seconds)];
};

export { useCountdown };
