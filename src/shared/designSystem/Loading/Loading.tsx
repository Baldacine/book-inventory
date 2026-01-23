import React from "react";
import { LoadingWrapper, SkeletonBox, Spinner } from "./styles";
import type { LoadingProps } from "./type";

export const Loading: React.FC<LoadingProps> = ({ text, skeleton = false }) => {
  if (skeleton) {
    return (
      <LoadingWrapper>
        <SkeletonBox />
        {text && <p>{text}</p>}
      </LoadingWrapper>
    );
  }

  return (
    <LoadingWrapper>
      <Spinner />
      {text && <p>{text}</p>}
    </LoadingWrapper>
  );
};
