import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme}>
      <div
        className="min-h-screen"
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--text)",
        }}
      >
        {children}
      </div>
    </div>
  );
}