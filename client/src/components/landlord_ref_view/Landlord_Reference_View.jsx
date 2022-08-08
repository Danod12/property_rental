import React from "react";

import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Landlord_Reference_View() {
  const { landlord_reference } = useParams();
  const [numPage, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPage);
    setPageNumber(1);
  }

  return (
    <div>
      <Document
        file={require(`../../assets/landlord_references/${landlord_reference}`)}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page height="900" pageNumber={pageNumber} />
      </Document>
    </div>
  );
}

export default Landlord_Reference_View;
