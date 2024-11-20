import { createContext, ReactNode, useContext, useState } from "react";
import Error from "../views/error";

interface ErrorHandler {
  setError: (errorMessage: string | null) => void;
}

const ErrorHandlerContext = createContext<ErrorHandler | undefined>(undefined);

export const ErrorHandlerProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [error, setError] = useState<string | null>(null);

  return (
    <ErrorHandlerContext.Provider value={{ setError }}>
      {error ? <Error message={error} /> : children}
    </ErrorHandlerContext.Provider>
  );
};

export const useErrorContext = (): ErrorHandler => {
  const context = useContext(ErrorHandlerContext);

  return context!;
};
