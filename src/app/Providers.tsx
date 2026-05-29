import LandmarkContextProvider from "@/contexts/LandmarkContext";
import ChatContextProvider from "@/contexts/ChatContext";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <LandmarkContextProvider>
          <ChatContextProvider>{children}</ChatContextProvider>
        </LandmarkContextProvider>
        <Toaster />
      </ThemeProvider>
    </>
  );
};
export default Providers;
