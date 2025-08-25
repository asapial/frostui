"use client";
import React from 'react';
import JsxParser from 'react-jsx-parser';

// Import all major icon libraries from react-icons
import * as FaIcons from 'react-icons/fa';     // Font Awesome
import * as MdIcons from 'react-icons/md';     // Material Design
import * as BsIcons from 'react-icons/bs';     // Bootstrap
import * as FiIcons from 'react-icons/fi';     // Feather
import * as AiIcons from 'react-icons/ai';     // Ant Design
import * as IoIcons from 'react-icons/io';     // Ionicons 4
import * as Io5Icons from 'react-icons/io5';   // Ionicons 5
import * as RiIcons from 'react-icons/ri';     // Remix
import * as BiIcons from 'react-icons/bi';     // BoxIcons
import * as CgIcons from 'react-icons/cg';     // css.gg
import * as CiIcons from 'react-icons/ci';     // Circum
import * as HiIcons from 'react-icons/hi';     // Heroicons
import * as Hi2Icons from 'react-icons/hi2';   // Heroicons 2
import * as SiIcons from 'react-icons/si';     // Simple Icons
import * as SlIcons from 'react-icons/sl';     // Simple Line
import * as TbIcons from 'react-icons/tb';     // Tabler
import * as GiIcons from 'react-icons/gi';     // Game
import * as WiIcons from 'react-icons/wi';     // Weather
import * as DiIcons from 'react-icons/di';     // Dev
import * as RxIcons from 'react-icons/rx';     // Radix
import * as LiaIcons from 'react-icons/lia';   // Linear Icons
import * as TfiIcons from 'react-icons/tfi';   // Themify
import * as PiIcons from 'react-icons/pi';     // Phosphor
import * as LuIcons from 'react-icons/lu';     // Lucide

const ComponentPreview = ({ previewCode }) => {
  // Create a comprehensive list of all icon components
  const allIcons = {
    ...FaIcons,
    ...MdIcons,
    ...BsIcons,
    ...FiIcons,
    ...AiIcons,
    ...IoIcons,
    ...Io5Icons,
    ...RiIcons,
    ...BiIcons,
    ...CgIcons,
    ...CiIcons,
    ...HiIcons,
    ...Hi2Icons,
    ...SiIcons,
    ...SlIcons,
    ...TbIcons,
    ...GiIcons,
    ...WiIcons,
    ...DiIcons,
    ...RxIcons,
    ...LiaIcons,
    ...TfiIcons,
    ...PiIcons,
    ...LuIcons
  };

  return (
    <div className="flex items-center justify-center w-full ">
      <JsxParser
        components={allIcons}
        jsx={previewCode}
        // Allow className attribute for Tailwind CSS
        allowUnknownElements={true}
        disableKeyGeneration={true}
        autoCloseVoidElements={true}
        // Allow all attributes including className for Tailwind
        blacklistedAttrs={[]}
        // Render unrecognized tags as regular HTML elements
        renderUnrecognized={tagName => {
          // Create a React element for unrecognized tags
          return React.createElement(tagName, {});
        }}
      />
    </div>
  );
};
export default ComponentPreview;