<!-- 
********************************************************************
*  LOGO PLACEHOLDER: Replace the 'src' in the img tag below with  *
*  the path to your project's logo. It's centered for you.         *
********************************************************************
-->
<p align="center">
  <img src="public\logo.jpg" alt="ChromaFlux AI Logo" width="150">
</p>

<h1 align="center">ChromaFlux AI ✨</h1>

<!-- 
********************************************************************
*  BADGES: These are placeholders. You can use services like      *
*  shields.io to generate real ones for your project.              *
********************************************************************
-->


<p align="center">
  <strong>ChromaFlux AI</strong> is a next-generation image editor that transmutes your photos with the power of generative AI. Simply upload an image, describe your desired edit in plain English, and watch as your vision is brought to life.
</p>

---

## 📸 Showcase



---

## 📜 Table of Contents

- [Core Features](#-core-features)
- [Tech Stack](#-tech-stack)
- [Getting Started: Setup & Launch](#-getting-started-setup--launch)
- [How It Works](#-how-it-works)
- [License](#-license)

---

## 🚀 Core Features

- **🧠 AI-Powered Editing:** Harnesses Google's cutting-edge `gemini-2.5-flash-image-preview` (Nano Banana) model to perform complex edits that would take hours in traditional software.
- **✍️ Text-to-Edit:** The ultimate intuitive interface. If you can describe it, you can create it. "Add a silly hat," "change the background to a futuristic city," or "make it look like a watercolor painting."
- **🖱️ Seamless UI:** A clean, responsive, drag-and-drop interface built with React and Tailwind CSS for a smooth creative workflow.
- **💡 Promptspiration:** Stuck for ideas? Use the built-in example prompts to kickstart your imagination.
- **💾 Download & Share:** Save your high-quality, AI-generated images directly to your device.

---

## 🛠️ Tech Stack

- **Frontend:** React & TypeScript
- **Styling:** Tailwind CSS
- **Core AI Engine:** Google Gemini API (`@google/genai`)

---

## ⚡ Getting Started: Setup & Launch

Follow these steps to get ChromaFlux AI running on your local machine.

### Prerequisites

- A modern web browser.
- A Google Gemini API Key.

### ⚠️ CRITICAL: API Key & Billing Requirement

Before you begin, you must understand the following:

1.  **Get Your API Key:** If you don't have one, create an API key at [Google AI Studio](https://aistudio.google.com/).
2.  **Enable Billing:** The `gemini-2.5-flash-image-preview` model is extremely powerful and **requires a billing-enabled Google Cloud account.** You must link a billing account to your project in the [Google Cloud Console](https://console.cloud.google.com/billing).
    - This step unlocks the model's free tier. You will **not** be charged unless you exceed the generous free usage limits.
    - **Failure to enable billing will result in a permission or quota error (`429`) from the API.**

### Installation & Configuration

#### Step 1: Download the Project

Download the project files as a ZIP or clone the repository if you have Git installed.

#### Step 2: Inject Your API Key

This is the most important step.

1.  Open the project in your favorite code editor.
2.  Navigate to the file: `services/geminiService.ts`
3.  Locate the line that starts with `const API_KEY =`. For local development, it will look like this:
    ```javascript
    // For local development:
    const API_KEY = "YOUR_API_KEY_HERE";
    ```
4.  Replace `"YOUR_API_KEY_HERE"` with your actual Gemini API key.

    -   **Before:** `const API_KEY = "YOUR_API_KEY_HERE";`
    -   **After:** `const API_KEY = "AIzaSy...your...long...and...secret...key";`

> 🚨 **SECURITY ALERT:** This method is for **local development only**. Never commit this file with your API key to a public repository like GitHub. Automated bots will find it and misuse it within seconds.

#### Step 3: Launch the Application

No complex build steps are needed for this project.

1.  Ensure you have saved the changes in `services/geminiService.ts`.
2.  Open the `index.html` file directly in your web browser.

That's it! You can now start uploading images and bringing your creative ideas to life.

---

## 💡 How It Works

ChromaFlux AI operates on a simple yet powerful client-side principle:

1.  **Upload:** You provide an image, which is converted in the browser into a base64 string.
2.  **Prompt:** You write a text prompt describing the desired edit.
3.  **Transmute:** The base64 image data and your text prompt are sent as a multi-modal request to the Google Gemini API.
4.  **Render:** The API processes your request and returns a brand-new, edited image.
5.  **Display:** The new image is rendered in the UI, ready for you to download and enjoy.

---

## 📄 License

This project is licensed under the MIT License.
