import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);

  console.log("Current Theme:", theme);

  return (
    <div className={theme}>
      <div
        className="bg-white text-gray-700 min-h-screen
        dark:bg-[rgb(16,23,42)] dark:text-gray-200"
      >
        {children}
      </div>
    </div>
  );
}