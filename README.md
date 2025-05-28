
# MikePass - Secure Password Generator & Analyzer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MikePass is a modern, secure password generator and strength analyzer application built with a cutting-edge tech stack. It helps users create strong, unique passwords tailored to their requirements and provides AI-powered insights into password strength.

<!-- Suggestion: Add a screenshot or GIF of the application here! -->
<!-- e.g., ![MikePass Screenshot](link_to_your_screenshot.png) -->

## ✨ Features

*   **Customizable Password Generation:**
    *   Adjust password length (8-64 characters).
    *   Include/exclude character sets:
        *   Uppercase letters (A-Z)
        *   Lowercase letters (a-z)
        *   Numbers (0-9)
        *   Symbols (!@#$%, etc.)
*   **AI-Powered Strength Analysis:**
    *   Leverages Genkit and Google AI (Gemini) to analyze the generated password.
    *   Provides a strength score (0-100%).
    *   Offers a textual analysis of password weaknesses and suggestions for improvement.
*   **User-Friendly Interface:**
    *   Clean, intuitive, and responsive design built with ShadCN UI components.
    *   Easy-to-use controls for password customization.
    *   Visual strength indicator.
*   **Instant Copy to Clipboard:** Quickly copy the generated password.
*   **Dark Mode by Default:** Aesthetically pleasing and easy on the eyes.

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Components, TypeScript)
*   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **AI Integration:** [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`)
*   **Linting/Formatting:** ESLint, Prettier (via Next.js defaults)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18.x or later recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/pinkythegawd/mikepass.git
    cd mikepass
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of your project. For Genkit to work with Google AI, you might need to configure API keys or authentication. By default, it might try to use Application Default Credentials if run in a Google Cloud environment. For local development, ensure your Google Cloud SDK is authenticated (`gcloud auth application-default login`) or set up the `GOOGLE_API_KEY` environment variable if your Genkit configuration requires it.
    ```env
    # .env
    # Example for Google AI / Genkit if needed:
    # GOOGLE_API_KEY=your_google_api_key_here
    ```
    *(Note: The current `src/ai/genkit.ts` setup with `googleAI()` might pick up ADC automatically or might require specific environment variables depending on your Google Cloud setup.)*

4.  **Run the Development Servers:**
    You'll need to run two development servers: one for the Next.js frontend and one for Genkit.

    *   **Next.js App:**
        ```bash
        npm run dev
        ```
        This will typically start the Next.js app on `http://localhost:9002`.

    *   **Genkit Development Server:**
        Open a new terminal window and run:
        ```bash
        npm run genkit:dev
        # or for auto-reloading on changes to AI flows:
        # npm run genkit:watch
        ```
        This will start the Genkit development server, usually on `http://localhost:3400`, allowing you to inspect and test your AI flows.

5.  **Open the application:**
    Navigate to `http://localhost:9002` (or the port Next.js started on) in your browser.

## 📂 Project Structure

A brief overview of key files and directories:

```
mikepass/
├── src/
│   ├── ai/                        # Genkit AI related files
│   │   ├── flows/                 # AI flow definitions (e.g., password analysis)
│   │   │   └── analyze-password-strength.ts
│   │   ├── genkit.ts              # Genkit plugin initialization
│   │   └── dev.ts                 # Genkit development server entry point
│   ├── app/                       # Next.js App Router
│   │   ├── (pages)/               # Route groups
│   │   │   └── page.tsx           # Main homepage
│   │   ├── globals.css            # Global styles and Tailwind CSS setup
│   │   └── layout.tsx             # Root layout
│   ├── components/                # React components
│   │   ├── ui/                    # ShadCN UI components
│   │   ├── password-generator.tsx # Core password generation component
│   │   ├── strength-indicator.tsx # Password strength display
│   │   └── footer.tsx             # Application footer
│   ├── hooks/                     # Custom React hooks (e.g., useToast, useMobile)
│   └── lib/                       # Utility functions (e.g., cn for classnames)
├── public/                        # Static assets
├── .env.example                   # Example environment variables
├── next.config.ts                 # Next.js configuration
├── package.json                   # Project dependencies and scripts
└── README.md                      # This file
```

## ⚙️ How It Works

*   **Password Generation:** The `PasswordGenerator` component (`src/components/password-generator.tsx`) uses client-side JavaScript to construct a password based on the user's selected length and character set preferences. It ensures that if specific character sets are chosen, at least one character from each set is included (if the password length allows).
*   **AI Strength Analysis:** When the "Check Password Strength" button is clicked:
    1.  The `analyzePasswordStrength` function (exported from `src/ai/flows/analyze-password-strength.ts`) is called.
    2.  This function invokes a Genkit flow (`analyzePasswordStrengthFlow`).
    3.  The flow uses a prompt defined in `analyzePasswordStrengthPrompt` which instructs a Google AI model (Gemini) to analyze the provided password.
    4.  The AI model returns a strength score (0-1) and a textual analysis, which are then displayed in the `StrengthIndicator` component.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or find any bugs, please feel free to:

1.  Open an issue to discuss the change or bug.
2.  Fork the repository and create a new branch for your feature or fix.
3.  Submit a pull request with a clear description of your changes.

Please ensure your code follows the existing style and that all tests pass (if applicable).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details (if you choose to add one). For now, it's unlicensed.

---

Built with ❤️ by [MikePinku](https://github.com/pinkythegawd).
Enjoy generating secure passwords!

##

<img src="https://raw.githubusercontent.com/pinkythegawd/pinkythegawd/refs/heads/main/github-header-image%20(1).png" style="width: 80%">
