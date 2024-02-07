import { LogsProvider } from "../context/LogContext";
import SectionLogs from "../components/log/section";

export const LogsPage = () => {
  return (
    <LogsProvider>
      <SectionLogs />
    </LogsProvider>
  );
};
