"use client";
import React, { useMemo } from 'react';
import JsxParser from 'react-jsx-parser';

// Import icon libraries to support all needed icons
import * as FaIcons from 'react-icons/fa';     // Font Awesome
import * as MdIcons from 'react-icons/md';     // Material Design
import * as BsIcons from 'react-icons/bs';     // Bootstrap
import * as FiIcons from 'react-icons/fi';     // Feather
import * as AiIcons from 'react-icons/ai';     // Ant Design
import * as Io5Icons from 'react-icons/io5';   // Ionicons 5
import * as BiIcons from 'react-icons/bi';     // BoxIcons
import * as RiIcons from 'react-icons/ri';     // Remix

const ComponentPreview = ({ previewCode }) => {
  // Create a comprehensive list of icons
  const allIcons = useMemo(() => ({
    ...FaIcons,
    ...MdIcons,
    ...BsIcons,
    ...FiIcons,
    ...AiIcons,
    ...Io5Icons,
    ...BiIcons,
    ...RiIcons
  }), []);

  // Preprocess the preview code to ensure proper className handling
  const processedPreviewCode = useMemo(() => {
    if (!previewCode) return '';
    
    // Replace class with className for React compatibility
    let code = previewCode.replace(/class=/g, 'className=');
    
    // Replace non-standard Tailwind classes with standard ones
    // hover:shadow-glow is not a standard Tailwind class
    code = code.replace(/hover:shadow-glow/g, 'hover:shadow-lg');
    
    // Fix h-150 which is not a standard Tailwind class
    code = code.replace(/h-150/g, 'h-48');
    
    // Handle Link component by converting it to an anchor tag
    code = code.replace(/<Link/g, '<a');
    code = code.replace(/<\/Link>/g, '</a>');
    
    return code;
  }, [previewCode]);

  // Custom render function to handle className properly for Tailwind CSS
  const renderCustomElement = React.useCallback((tagName, props) => {
    // Ensure className is properly handled for Tailwind CSS
    const elementProps = {
      ...props,
      // Make sure both class and className are handled properly
      className: props.className || props.class || ''
    };

    // Remove both class and className to avoid conflicts
    delete elementProps.class;

    // Add default styling for better visualization if needed
    if (tagName === 'button') {
      elementProps.className = elementProps.className + ' focus:outline-none';
    }

    // Handle anchor tags specifically
    if (tagName === 'a') {
      elementProps.className = elementProps.className || '';
      // Add default styles for links if none provided
      if (!elementProps.className.includes('text-')) {
        elementProps.className += ' text-blue-600 hover:text-blue-800';
      }
    }

    return React.createElement(tagName, elementProps);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <JsxParser
        components={allIcons}
        jsx={processedPreviewCode}
        // Allow className attribute for Tailwind CSS
        allowUnknownElements={true}
        disableKeyGeneration={true}
        autoCloseVoidElements={true}
        // Allow all attributes including className for Tailwind
        blacklistedAttrs={[]}
        // Render unrecognized tags as regular HTML elements with proper className handling
        renderUnrecognized={renderCustomElement}
        // Enable error handling
        onError={(e) => {
          console.warn('JSX parsing error:', e);
        }}
      />
    </div>
  );
};

export default ComponentPreview;