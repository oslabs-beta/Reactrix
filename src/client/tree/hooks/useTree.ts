import { RefObject, useRef } from "react";

import { ITreeRefProps } from "../../../interfaces";

// interface ITreeProps extends ITreeRefProps {
interface ITreeProps {
  treeRef: RefObject<ITreeRefProps>;
}

export const useTree = (): ITreeProps => {
  const treeRef = useRef<ITreeRefProps>(null);

  return {
    treeRef,
  };
};
