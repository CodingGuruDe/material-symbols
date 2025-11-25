#!/usr/bin/env node

/**
 * Generate custom icon classes for Material Symbols
 * 
 * This script reads the Material Symbols type definitions and generates
 * SCSS class definitions for all available icons.
 * 
 * Usage: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Read the TypeScript definitions to get all icon names
const dtsPath = path.join(__dirname, 'index.d.ts');
const dtsContent = fs.readFileSync(dtsPath, 'utf8');

// Extract all icon names from the type definition
const iconMatches = dtsContent.match(/"[^"]+"/g) || [];
const icons = iconMatches.map(match => match.slice(1, -1)); // Remove quotes

// Remove duplicates and sort
const uniqueIcons = [...new Set(icons)].sort();

console.log(`Found ${uniqueIcons.length} Material Symbols icons`);

// Generate SCSS content
const scssHeader = `@import '_core.scss';

// Include the base font definitions
@include material-symbols-font('Material Symbols Outlined');
@include material-symbols-font('Material Symbols Rounded');
@include material-symbols-font('Material Symbols Sharp');

// Base styles for custom icon classes
.el {
  &::before {
    font-family: "Material Symbols Outlined";
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-feature-settings: 'liga';
    margin-right: 0.5em;
  }
}

// Variant for rounded style
.el-rounded {
  &::before {
    font-family: "Material Symbols Rounded";
  }
}

// Variant for sharp style
.el-sharp {
  &::before {
    font-family: "Material Symbols Sharp";
  }
}

// Icon definitions - Auto-generated from Material Symbols
// Generated: ${new Date().toLocaleString()}
// Total icons: ${uniqueIcons.length}

`;

// Generate icon class definitions
const iconDefinitions = uniqueIcons
  .map(icon => `.el-${icon.replace(/_/g, '-')}::before { font-family: "Material Symbols Outlined"; content: '${icon}'; }`)
  .join('\n');

const scssContent = scssHeader + iconDefinitions;

// Write the SCSS file
const scssPath = path.join(__dirname, 'outlined.scss');
fs.writeFileSync(scssPath, scssContent, 'utf8');

console.log(`✓ Generated outlined.scss with ${uniqueIcons.length} icon classes`);

// Also generate a CSS version for convenience
const cssHeader = `@font-face {
  font-family: "Material Symbols Outlined";
  font-style: normal;
  font-weight: 100 700;
  font-display: block;
  src: url("./material-symbols-outlined.woff2") format("woff2");
}

@font-face {
  font-family: "Material Symbols Rounded";
  font-style: normal;
  font-weight: 100 700;
  font-display: block;
  src: url("./material-symbols-rounded.woff2") format("woff2");
}

@font-face {
  font-family: "Material Symbols Sharp";
  font-style: normal;
  font-weight: 100 700;
  font-display: block;
  src: url("./material-symbols-sharp.woff2") format("woff2");
}

/* Base styles for custom icon classes */
.el::before {
  font-family: "Material Symbols Outlined";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga";
  margin-right: 0.5em;
}

/* Variant for rounded style */
.el-rounded::before {
  font-family: "Material Symbols Rounded";
}

/* Variant for sharp style */
.el-sharp::before {
  font-family: "Material Symbols Sharp";
}

/* Icon definitions - Auto-generated from Material Symbols */
/* Generated: ${new Date().toLocaleString()} */
/* Total icons: ${uniqueIcons.length} */

`;

const cssIconDefinitions = uniqueIcons
  .map(icon => `.el-${icon.replace(/_/g, '-')}::before { font-family: "Material Symbols Outlined"; content: "${icon}"; }`)
  .join('\n');

const cssContent = cssHeader + cssIconDefinitions;

const cssPath = path.join(__dirname, 'outlined.css');
fs.writeFileSync(cssPath, cssContent, 'utf8');

console.log(`✓ Generated outlined.css with ${uniqueIcons.length} icon classes`);

// Generate an icon name reference file for documentation
const referenceContent = `# Material Symbols Icon Reference

This file contains all ${uniqueIcons.length} available Material Symbols icons for use with the custom icon system.

## Icon List

\`\`\`
${uniqueIcons.join('\n')}
\`\`\`

## Usage

To use any of these icons, convert the icon name to a class name by replacing underscores with hyphens and prefixing with \`el-\`:

| Icon Name | Class Name |
|-----------|-----------|
${uniqueIcons.slice(0, 20).map(icon => `| \`${icon}\` | \`<span class="el-${icon.replace(/_/g, '-')}"></span>\` |`).join('\n')}
${uniqueIcons.length > 20 ? `| ... | ... (${uniqueIcons.length - 20} more icons) |` : ''}

## Examples

- \`face\` → \`<span class="el-face"></span>\`
- \`account_circle\` → \`<span class="el-account-circle"></span>\`
- \`arrow_back\` → \`<span class="el-arrow-back"></span>\`
- \`home\` → \`<span class="el-home"></span>\`

## Variants

Add the \`.el-rounded\` or \`.el-sharp\` class to the element to use different icon styles:

- Outlined (default): \`<span class="el-face"></span>\`
- Rounded: \`<span class="el-face el-rounded"></span>\`
- Sharp: \`<span class="el-face el-sharp"></span>\`
`;

const referencePath = path.join(__dirname, 'ICON-REFERENCE.md');
fs.writeFileSync(referencePath, referenceContent, 'utf8');

console.log(`✓ Generated ICON-REFERENCE.md with icon name mapping`);
console.log(`\n✅ All files generated successfully!`);
