This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

https://nextjs.org/docs/

## Special Thanks

### UI Component Library can be found here:
https://flowrift.com/
- Uses TailwindCSS

# Prompt
- ChatGPT: wwww.chatgpt.com
### Structuring the App for Customization

### 1. **State Management Strategy**:

- Use a global state management library like **React’s Context API** or **Redux** to keep track of all the customization options the user selects (e.g., colors, shapes, size).
- Each customization option (e.g., color, shape, size, eye shape) should be managed with its own piece of state. You can use **React hooks (`useState`)** for simplicity or **useReducer** if the app becomes more complex.

Example state management:

- `foregroundColor`
- `backgroundColor`
- `shape`
- `eyeShape`
- `size`
- `downloadFormat`

### 2. **User Interface Design**:

- **Color Picker**:
    - Provide two color pickers (using a package like `react-color`) to let users select the foreground and background colors of the QR code.
- **Shape Selectors**:
    - Use radio buttons, dropdowns, or a visual grid with preview icons to allow users to select the block shape and eye shape. Show a real-time preview as users switch between these options.
- **Download Options**:
    - Display a dropdown or radio buttons for users to select the desired file format (PNG, SVG, PDF) for downloading.

### 3. **Live QR Code Preview**:

- As users make changes (color, shape, etc.), provide a **real-time preview** of the QR code that reflects their choices. This can be updated by listening to the state changes and re-rendering the QR code accordingly.
- Place the preview prominently, possibly with a larger version of the code that scales as users change size and color.

### 4. **Accessibility**:

- Provide contrast warnings if users pick a foreground and background color that might be difficult to scan. You could show an alert or warning icon, prompting users to choose more contrasting colors.

### 5. **Customization Tabs**:

- To keep the interface clean, divide the customization options into sections/tabs like:
    - **Color**
    - **Shape**
    - **Eye Shape**
    - **Size**
    - **Download**
- Users can navigate through each tab to customize their QR code step by step.

---

### Best Practices for Structuring the Options:

1. **Group related options** (e.g., colors in one section, shapes in another) to make the UI more intuitive.
2. **Show visual previews** of each option (especially for shapes and eye styles) to make it easy for users to see the effect of their changes in real time.
3. **Include a reset button** to allow users to start over with default QR code settings.

### **`react-color`**: A simple color picker component for users to select colors for their QR code.

React-Color Works:

1. **State Management**:
    - `color`: Manages the selected color.
    - `displayColorPicker`: Toggles the visibility of the color picker.
2. **ChromePicker**:
    - Renders a color picker UI from `react-color` when `displayColorPicker` is true.
3. **Color Change**:
    - The `handleColorChange` function updates the selected color when the user selects a new one.

**`file-saver`**: For saving files (if needed for custom file download handling).

QR code to be downloaded as (e.g., `png`, `svg`, or `pdf`). Only if all of these are readily available, if not, let’s go with the easiest options.

### Important:

When the user makes a change to the qr code color or anything related to the qr-code-styling (except for logo), we will automatically show a live preview of their new logo. First, a spinning icon for 500 milliseconds and then the new QR code.

1. **State Management**: Use `useState` to manage color and data inputs.
2. **Live Preview**: Update the QR code preview in real-time with the `useEffect` hook and `QRCodePreview` component.
3. **Final Generation**: Generate and download the QR code only when the 'Create' button is pressed using the `downloadQRCode` function.

## Key Considerations:

### 1. **Checking Contrast Between QR Code and Background**

When users select a **foreground color** (for the QR code) and a **background color**, ensuring the contrast between these two is important to maintain scannability.

### **How Contrast Works**:

- The key is the **difference in luminance** between the foreground and background colors. If the difference is too small, the QR code may blend into the background, making it hard to scan.
- **WCAG (Web Content Accessibility Guidelines)** provides a way to calculate contrast ratios between colors. The recommended contrast ratio for text readability is **4.5:1**. However, for QR codes, higher contrast (7:1 or more) is safer.

### **Steps to Check Contrast**:

1. **Get the RGB values** of both the **foreground** (QR code) and **background** colors selected by the user.
2. **Convert RGB to relative luminance** using this formula:where R, G, and B are the RGB values normalized to a 0–1 range.
    
    ```
    plaintext
    Copy code
    L = 0.2126 * R + 0.7152 * G + 0.0722 * B
    
    ```
    
3. **Calculate the contrast ratio** between the foreground and background:where:
    
    ```
    plaintext
    Copy code
    contrast_ratio = (L1 + 0.05) / (L2 + 0.05)
    
    ```
    
    - `L1` is the luminance of the lighter color
    - `L2` is the luminance of the darker color.
4. **Evaluate the ratio**: Keep the ratio 7:1.  alert the user that the contrast might be too low for scannability.

### **How to Implement in Your App**:

- **Real-time Feedback**: When users select a foreground or background color using your color picker, you could instantly calculate the contrast ratio and display a warning message if it’s too low.
- **UI Suggestion**: You could show a message like “The contrast is too low. Please pick a more contrasting background/foreground color for better QR code visibility.”
    - I would like this in a toast notification (client side, we are not using the server).

### **Visual Feedback**:

- Use a **dynamic indicator** (such as a color bar or percentage) to help users understand the quality of the contrast as they pick colors.

---

### 2. **Using a Transparent Background to Avoid Contrast Checking**

If you allow users to choose a **transparent background** for the QR code, you eliminate the need to check contrast between the QR code and the background, since it will simply blend with whatever surface it’s placed on. This is a great option to avoid potential readability issues with the QR code.

### **How Transparency Affects Scannability**:

QR code scanners primarily rely on **contrast** between the black or colored QR blocks and the background. If the background is transparent, the QR code will depend entirely on the surface it’s being displayed on. In most cases, users would be placing the QR code on a white or neutral background, which should provide sufficient contrast.

### **How to Implement a Transparent Background**:

1. **Allow users to select transparency** as an option in the background color picker.
    - When the user picks a color for the background, include an option like a **“Transparent”** checkbox.
    - If the checkbox is selected, the QR code background becomes transparent, and there’s no need to check the contrast between the background and foreground.
2. **QR Code Styling**: If using a package like `qr-code-styling`, you can set the background color to `null` or an alpha value (`rgba(255, 255, 255, 0)` for full transparency).

### **Visual Feedback for Transparency**:

- In the preview, show a **checkered pattern** (like in image editors) to indicate the QR code will be transparent. This gives the user a clear understanding of how the QR code will look when placed on a surface.

---

### **High-Level Workflow**:

### **1. Initial Color Selection**:

- User selects foreground (QR code) and background colors.
- If they select a **non-transparent** background, the app automatically checks contrast between the foreground and background.
- If contrast is too low, provide real-time feedback suggesting they change the color.

### **2. Transparent Background Option**:

- Provide a checkbox or toggle to select a transparent background.
- If transparent is selected, disable contrast checking and display the QR code on a checkered background in the preview.




