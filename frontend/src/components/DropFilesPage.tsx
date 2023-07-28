import styled from "styled-components";
import ModalDropFile from "./ModalDropFile";
import React from "react";
import scanFiles, { fileContainer } from "../utils/scanFiles";

type dropFilesPage = {
  children?: React.ReactNode;
  onDropFiles?: (contaiener: fileContainer) => void;
};

const StyledDropFilesPage = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const DropFilesPage: React.FC<dropFilesPage> = (props) => {
  const { children, onDropFiles } = props;
  const [active, setActive] = React.useState(false);
  const [disableDrag, setDisableDrag] = React.useState(false);

  const [test, setTest] = React.useState<any>();

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(false);

    if (e.dataTransfer && e.dataTransfer.items) {
      const items = e.dataTransfer.items;
      for (let i = 0; i < items.length; i++) {
        const item = items[i].webkitGetAsEntry();
        if (item) {
          scanFiles(item).then((val) => console.log(val));
          // onDropFiles?.(scanFiles(item));
        }
      }
      return;
    }
  };

  const onDragStart = () => setDisableDrag(true);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    !disableDrag && setActive(true);
  };

  const onDragEnd = () => {
    setActive(false);
    setDisableDrag(false);
  };

  return (
    <StyledDropFilesPage
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      {active && <ModalDropFile />}
      {children}
    </StyledDropFilesPage>
  );
};

export default DropFilesPage;
