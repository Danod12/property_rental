import React from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Work_Reference_View() {
  const { work_reference } = useParams();

  const [numPage, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPage);
    setPageNumber(1);
  }

  return (
    <div>
      <Document
        file={require(`../../assets/work_references/${work_reference}`)}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page height="900" pageNumber={pageNumber} />
      </Document>
    </div>
  );
}

export default Work_Reference_View;
