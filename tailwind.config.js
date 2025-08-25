/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
safelist: [
  {
    pattern:
      /(bg|bg-gradient-to|text|from|via|to|border|outline|ring|placeholder|accent|caret|fill|stroke|p|m|gap|space|w|max|min|h|flex|grid|items|justify|content|col|row|rounded|shadow|overflow|z|cursor|transition|duration|ease|scale|rotate|translate|skew|opacity|leading|tracking|font|hidden|block|inline|absolute|relative|sticky|top|bottom|left|right|aspect|object|list|underline|decoration|align|place|whitespace|break|truncate)-?.*/,
    variants: ["hover", "focus", "active", "disabled", "lg", "md", "sm"],
  },
  // Explicitly include gradient directions
  "bg-gradient-to-r",
  "bg-gradient-to-l",
  "bg-gradient-to-t",
  "bg-gradient-to-b",
  "bg-gradient-to-tr",
  "bg-gradient-to-tl",
  "bg-gradient-to-br",
  "bg-gradient-to-bl",
],

  theme: {
    extend: {},
  },
  plugins: [],
};
