import { XYPosition } from "react-flow-renderer";

export const makeStringNumbersToPosition = (text: string): XYPosition => {
  const textSplited = text.split(":");
  const onlyNumbers = textSplited.map((node) => node.replace(/\D/g, ""));
  const onlyPositions = onlyNumbers.slice(1, 3);
  const stringToNumbers = onlyPositions.map((position) => Number(position));
  const ObjToReturn = {
    x: stringToNumbers[0],
    y: stringToNumbers[1],
  };

  return ObjToReturn;
};
