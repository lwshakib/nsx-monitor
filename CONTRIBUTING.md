# Contributing to NSX Monitor

First off, thank you for considering contributing to NSX Monitor! It's people like you who make this tool better for everyone.

## 🛠️ Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (>= 20)
- [pnpm](https://pnpm.io/) (>= 9)

### Initial Setup
1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/nsx-monitor.git
   cd nsx-monitor
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/original-owner/nsx-monitor.git
   ```
4. **Install dependencies**:
   ```bash
   pnpm install
   ```

---

## 🌿 Branching Strategy
- Always create a new branch for your work: `git checkout -b feature/your-feature-name` or `git checkout -b fix/your-fix-name`.
- Keep your branch up to date with `upstream/main`:
  ```bash
  git fetch upstream
  git rebase upstream/main
  ```

---

## 💻 Coding Guidelines
- **Consistency**: Follow the existing code style. We use Prettier for formatting and ESLint for linting.
- **TypeScript**: Ensure all new code is properly typed. Avoid using `any`.
- **Components**: Use the shared UI components in `packages/ui` whenever possible.
- **Formatting**: Run `pnpm format` before committing your changes.

---

## 🚀 How to Run Locally

### Running the Whole Suite
```bash
pnpm dev
```
This will start both the Desktop app and the Web app concurrently.

### Running Individual Apps
- **Desktop**: `pnpm --filter desktop dev`
- **Web**: `pnpm --filter web dev`

### Environment Variables
If you need to add environment variables:
- Create a `.env` file in the respective app directory (`apps/desktop/.env` or `apps/web/.env`).
- Never commit sensitive keys to the repository. Use `.env.example` to document required keys.

---

## 📤 Submitting a Pull Request
1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
2. **Open a Pull Request** (PR) on GitHub against the `main` branch.
3. **Describe your changes**: Provide a clear summary of what you've done and any testing steps.
4. **Link issues**: Mention any related issues using `#issue-number`.

---

## 📜 Code of Conduct
By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

Thank you for your contributions!
