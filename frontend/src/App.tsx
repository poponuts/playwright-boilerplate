import React from "react";
import { useSessionCheck } from "./helpers";
import { SpinnerUnless, ErrorUnless } from "./Unless";
import { Profile } from "./Profile";
import { UserProvider } from "./UserContext";

const App: React.FC = () => {
  const { checkingSession, userId } = useSessionCheck();
  return (
    <SpinnerUnless condition={!checkingSession}>
      <ErrorUnless condition={userId !== undefined}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
          <div className="max-w-3xl mx-auto">
            {userId && (
              <UserProvider userId={userId}>
                <Profile />
              </UserProvider>
            )}
          </div>
        </div>
      </ErrorUnless>
    </SpinnerUnless>
  );
};

export default App;
