Latest variable icon fonts and CSS for Material Symbols.

> This package is automatically updated, so it will always have the latest icons from Google.

- [Installation](#installation)
- [Usage](#usage)
- [Available Icons](#available-icons)

## Installation

Install the [latest version][releases] using:

```sh
npm install @coscom/material-symbols@latest
```

## Usage

Import in JS (example: `src/main.js` in Vue CLI):

```js
import '@coscom/material-symbols';
```

or import in CSS:

```css
@import '@coscom/material-symbols';
```

or import in HTML:

```html
<link href="/path/to/@coscom/material-symbols/outlined.css" rel="stylesheet">
```

To display an icon, use one of the following:

```html
<span class="el-face">face</span>
```

### SCSS
```scss
@import '@coscom/material-symbols/outlined';
```

### JavaScript
```js
import '@coscom/material-symbols/outlined.css';
```

## Icon Variants

### Outlined (Default)
```html
<span class="el-face"></span>
```

### Rounded
```html
<span class="el-face el-rounded"></span>
```

### Sharp
```html
<span class="el-face el-sharp"></span>
```

## Available Icons

**All 3,794 Material Symbols icons are automatically available!**

### Icon Naming Convention

Material Symbols use underscores in their names, which are converted to hyphens in class names:

| Icon Name | Class Name |
|-----------|-----------|
| `face` | `el-face` |
| `account_circle` | `el-account-circle` |
| `arrow_back` | `el-arrow-back` |
| `home` | `el-home` |
| `account_box` | `el-account-box` |
| `add_circle` | `el-add-circle` |

See `ICON-REFERENCE.md` for a complete list of all available icons.

### Examples

```html
<!-- Common icons -->
<span class="el-home"></span>
<span class="el-search"></span>
<span class="el-settings"></span>
<span class="el-add"></span>
<span class="el-delete"></span>
<span class="el-edit"></span>

<!-- With variants -->
<span class="el-favorite el-rounded"></span>
<span class="el-check el-sharp"></span>

<!-- Arrow icons -->
<span class="el-arrow-back"></span>
<span class="el-arrow-forward"></span>
<span class="el-arrow-upward"></span>
<span class="el-arrow-downward"></span>
```

## Generating Icon Classes

All icon classes are automatically generated from the Material Symbols type definitions. If Material Symbols updates with new icons, you can regenerate the classes by running:

```bash
node generate-icons.js
```

Or in PowerShell:

```powershell
node generate-icons.js
```

This command will:
- Read all available Material Symbols icon names from `index.d.ts`
- Generate both `outlined.scss` and `outlined.css`
- Create an `ICON-REFERENCE.md` with all available icons

## Customization

### Change Font Size

```css
.el {
  font-size: 32px; /* or any size you prefer */
}
```

### Remove Icon Spacing

If you don't want the default margin between icon and text, override it:

```css
.el::before {
  margin-right: 0;
}
```

### Customize Specific Icon

```css
.el-face {
  color: red;
}

.el-favorite {
  color: pink;
}
```

### Custom Icon Size

```css
.el-large {
  font-size: 48px;
}

.el-small {
  font-size: 16px;
}
```

Then use:
```html
<span class="el-face el-large"></span>
<span class="el-home el-small"></span>
```

## How It Works

The system uses CSS `::before` pseudo-elements to display icons. Each custom class (e.g., `.el-face`) has a corresponding `content` property that references the actual Material Symbol icon name. The pseudo-element inherits the Material Symbols font from the parent `.el` class.

### File Structure

- `outlined.scss` - SCSS source file with all icon definitions (auto-generated)
- `outlined.css` - Compiled CSS ready to use (auto-generated)
- `generate-icons.js` - Node.js script to regenerate icon classes
- `ICON-REFERENCE.md` - Reference documentation for all available icons (auto-generated)

## Advantages

- Shorter, cleaner HTML syntax
- Semantic class names that describe the icon
- Easy to add custom styling per icon
- All 3,794 Material Symbols icons available
- Auto-generates from source, always up-to-date
- No need to add icon names as text content in HTML

