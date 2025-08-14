import React from 'react';
import JsxParser from 'react-jsx-parser';
import * as FaIcons from 'react-icons/fa';
// import { FaEdit, FaTrash, FiCopy, FiCheck } from 'react-icons/fa';


const ComponentPreview = ({ previewCode }) => {
  return (
    <div className="items-center justify-center">
      <JsxParser
        components={{
          // Link,
          // ...FaIcons
        }}
        jsx={previewCode}
      />
    </div>
  );
};
export default ComponentPreview;