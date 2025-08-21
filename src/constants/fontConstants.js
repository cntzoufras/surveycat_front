// Generic family names for detection
export const GENERIC_FAMILIES = new Set([
  'serif',
  'sans-serif',
  'monospace',
  'cursive',
  'fantasy',
  'system-ui',
  'ui-sans-serif',
  'ui-serif',
  'ui-monospace',
  'ui-rounded',
]);

// A curated set of font options with platform availability and webfont fallbacks.
// Each option stores a "stack" string that we will save in theme.typography.fontFamily
// so the UI renders consistently across platforms. If a Google webfont is present in
// the stack, the runtime will auto-load it.
export const FONT_OPTIONS = [
  // Cross-platform Google fonts
  {
    label: 'Inter',
    family: 'Inter',
    stack: 'Inter, Arial, sans-serif',
    google: true,
    availability: { windows: 'web', mac: 'web', ios: 'web', android: 'web' },
  },
  {
    label: 'Roboto',
    family: 'Roboto',
    stack: 'Roboto, Arial, sans-serif',
    google: true,
    availability: { windows: 'web', mac: 'web', ios: 'web', android: 'web' },
  },
  {
    label: 'Open Sans',
    family: 'Open Sans',
    stack: 'Open Sans, Arial, sans-serif',
    google: true,
    availability: { windows: 'web', mac: 'web', ios: 'web', android: 'web' },
  },
  {
    label: 'Source Sans 3',
    family: 'Source Sans 3',
    stack: 'Source Sans 3, Arial, sans-serif',
    google: true,
    availability: { windows: 'web', mac: 'web', ios: 'web', android: 'web' },
  },

  // Common system/web-safe families
  {
    label: 'Arial',
    family: 'Arial',
    stack: 'Arial, sans-serif',
    google: false,
    availability: { windows: 'native', mac: 'native', ios: 'native', android: 'native' },
  },
  {
    label: 'Helvetica',
    family: 'Helvetica',
    stack: 'Helvetica, Arial, sans-serif',
    google: false,
    availability: { windows: 'fallback', mac: 'native', ios: 'native', android: 'fallback' },
  },
  {
    label: 'Verdana',
    family: 'Verdana',
    stack: 'Verdana, Geneva, sans-serif',
    google: false,
    availability: { windows: 'native', mac: 'native', ios: 'native', android: 'native' },
  },
  {
    label: 'Tahoma',
    family: 'Tahoma',
    stack: 'Tahoma, Geneva, sans-serif',
    google: false,
    availability: { windows: 'native', mac: 'native', ios: 'native', android: 'native' },
  },
  {
    label: 'Trebuchet MS',
    family: 'Trebuchet MS',
    stack: 'Trebuchet MS, Tahoma, sans-serif',
    google: false,
    availability: { windows: 'native', mac: 'native', ios: 'native', android: 'native' },
  },
  {
    label: 'Calibri',
    family: 'Calibri',
    stack: 'Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif',
    google: false,
    availability: { windows: 'native', mac: 'fallback', ios: 'fallback', android: 'fallback' },
  },
  {
    label: 'Segoe UI',
    family: 'Segoe UI',
    stack: 'Segoe UI, Roboto, Arial, sans-serif',
    google: false,
    availability: { windows: 'native', mac: 'fallback', ios: 'fallback', android: 'fallback' },
  },
  {
    label: 'Gill Sans',
    family: 'Gill Sans',
    stack: 'Gill Sans, Gill Sans MT, Calibri, sans-serif',
    google: false,
    availability: { windows: 'fallback', mac: 'native', ios: 'native', android: 'fallback' },
  },

  // macOS-first with smart webfont fallback
  {
    label: 'Optima',
    family: 'Optima',
    stack: 'Optima, "Source Sans 3", Segoe UI, Arial, sans-serif',
    google: false,
    // We will auto-load the first Google font present in the stack (Source Sans 3)
    availability: { windows: 'fallback', mac: 'native', ios: 'native', android: 'fallback' },
  },
  {
    label: 'Georgia',
    family: 'Georgia',
    stack: 'Georgia, Times New Roman, serif',
    google: false,
    availability: { windows: 'native', mac: 'native', ios: 'native', android: 'native' },
  },
  {
    label: 'Palatino',
    family: 'Palatino',
    stack: 'Palatino, Palatino Linotype, Book Antiqua, serif',
    google: false,
    availability: { windows: 'native', mac: 'native', ios: 'native', android: 'native' },
  },
  {
    label: 'Times New Roman',
    family: 'Times New Roman',
    stack: 'Times New Roman, Times, serif',
    google: false,
    availability: { windows: 'native', mac: 'native', ios: 'native', android: 'native' },
  },
  {
    label: 'Times',
    family: 'Times',
    stack: 'Times, Times New Roman, serif',
    google: false,
    availability: { windows: 'native', mac: 'native', ios: 'native', android: 'native' },
  },

  // Monospace
  {
    label: 'Courier New',
    family: 'Courier New',
    stack: 'Courier New, Courier, monospace',
    google: false,
    availability: { windows: 'native', mac: 'native', ios: 'native', android: 'native' },
  },
  {
    label: 'Consolas',
    family: 'Consolas',
    stack: 'Consolas, Monaco, monospace',
    google: false,
    availability: { windows: 'native', mac: 'fallback', ios: 'fallback', android: 'fallback' },
  },

  // Cursive
  {
    label: 'Brush Script MT',
    family: 'Brush Script MT',
    stack: 'Brush Script MT, cursive',
    google: false,
    availability: { windows: 'native', mac: 'native', ios: 'native', android: 'native' },
  },
  {
    label: 'Comic Sans MS',
    family: 'Comic Sans MS',
    stack: 'Comic Sans MS, Comic Sans, cursive',
    google: false,
    availability: { windows: 'native', mac: 'native', ios: 'native', android: 'native' },
  },
];

export default FONT_OPTIONS;
