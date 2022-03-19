import React, { useEffect, useState } from "react";
import { BACKEND_API_URL } from "./helpers";

type User = {
  userId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
};

type UserActions = {
  save: (
    fullName: string,
    email: string,
    phoneNumber: string,
    avatar: string
  ) => void;
};

type UserContextType = User & UserActions;

const defaultUser: UserContextType = {
  userId: 0,
  fullName: "",
  avatar: "",
  email: "",
  phoneNumber: "",
  save: () => {},
};

export const UserContext = React.createContext<UserContextType>(defaultUser);

type UserProviderParams = { userId: number; fetchfn?: typeof fetch };
export const UserProvider: React.FC<UserProviderParams> = ({
  userId,
  fetchfn = fetch,
  children,
}) => {
  const [user, setUser] = useState<UserContextType>(defaultUser);

  useEffect(() => {
    const save = async (
      fullName: string,
      email: string,
      phoneNumber: string,
      avatar: string
    ) => {
      const result = await fetchfn(`${BACKEND_API_URL}/users/${userId}`, {
        body: JSON.stringify({
          user: {
            full_name: fullName,
            email: email,
            phone_number: phoneNumber,
            avatar_url: avatar,
          },
        }),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result.ok) {
        setUser({
          userId,
          fullName,
          email,
          phoneNumber,
          avatar,
          save,
        });
      }
    };

    const fetchUser = async () => {
      const result = await fetchfn(`${BACKEND_API_URL}/users/${userId}`);
      if (result.ok) {
        const fetchedUser = await result.json();
        setUser({
          fullName: fetchedUser.full_name,
          userId: fetchedUser.id,
          avatar: fetchedUser.avatar_url,
          phoneNumber: fetchedUser.phone_number,
          email: fetchedUser.email,
          save,
        });
      }
    };

    fetchUser();
  }, [userId, fetchfn]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
