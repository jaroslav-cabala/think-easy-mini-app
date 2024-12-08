import { useEffect, useRef, useState } from "react";

export type UseDelayedLoadingResultProps = {
  asyncOperationIsPending: boolean;
  asyncOperationIsComplete: boolean;
  delay?: number;
  restartSession?: unknown;
};

export const useDelayedLoading = ({
  restartSession,
  asyncOperationIsPending,
  asyncOperationIsComplete,
  delay = 300,
}: UseDelayedLoadingResultProps): boolean => {
  const [delayedLoading, setDelayedLoading] = useState(false);
  const [delayedLoadingDone, setDelayedLoadingDone] = useState(false);

  console.log("-----------------------------------------------");
  console.log("delayedLoading = ", delayedLoading);
  console.log("delayedLoadingDone = ", delayedLoadingDone);
  console.log("asyncOperationIsPending prop = ", asyncOperationIsPending);
  console.log("asyncOperationIsCompleted prop = ", asyncOperationIsComplete);

  const delayedLoadingTimeout = useRef<number | undefined>();

  useEffect(() => {
    console.log("useDelayedLoading useEffect");

    let innerTimeoutId: number | undefined;

    setDelayedLoading(false);
    setDelayedLoadingDone(false);

    delayedLoadingTimeout.current = window.setTimeout(() => {
      setDelayedLoading(true);
      innerTimeoutId = window.setTimeout(() => {
        console.log("inner timeout elapsed");
        setDelayedLoadingDone(true);
      }, 500);
    }, delay);

    return () => {
      console.log(
        `clear timeouts, outerTimeout = ${delayedLoadingTimeout}, innerTimeout = ${innerTimeoutId}`
      );
      clearTimeout(delayedLoadingTimeout.current);
      clearTimeout(innerTimeoutId);
    };
  }, [delay, restartSession]);

  //return loading false if time to show loading status has not elapsed yet
  if (!delayedLoading) {
    console.log("return delayedLoading = false");

    // if async operation is complete clear delayed loading timeout
    if (asyncOperationIsComplete) {
      clearTimeout(delayedLoadingTimeout.current);
    }
    return false;
  }
  // time to show loading status elapsed
  else {
    // return loading true for a specific time(500ms by default) or until the async operation is pending
    if (!delayedLoadingDone || asyncOperationIsPending) {
      console.log(
        `return delayedLoading = true, delayedLoadingDone=${delayedLoadingDone},
       asyncOperationIsPending=${asyncOperationIsPending},
       asyncOperationIsCompleted=${asyncOperationIsComplete}`
      );
      return true;
    }

    // return loading false because async operation is completed or minimum time to show loading status
    // has elapsed
    console.log("return delayedLoading = false");
    return false;
  }
};
