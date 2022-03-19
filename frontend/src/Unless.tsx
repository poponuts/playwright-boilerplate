import React from "react";
import { RefreshIcon, ExclamationIcon } from "@heroicons/react/solid";

export const Spinner: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <RefreshIcon className="animate-spin h-5 w-5" />
  </div>
);

export const SpinnerUnless: React.FC<{ condition: boolean }> = ({
  condition,
  children,
}) => (condition ? <>{children}</> : <Spinner />);

export const Error: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <ExclamationIcon className="h-5 w-5 mr-8" />
    <span>An error has occured</span>
  </div>
);

export const ErrorUnless: React.FC<{ condition: boolean }> = ({
  condition,
  children,
}) => (condition ? <>{children}</> : <Error />);
