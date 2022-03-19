import { useEffect, useState } from "react";

export const BACKEND_API_URL =
  process.env.BACKEND_API_URL || "http://backend.localhost";

export enum SessionStatus {
  VALID,
  UNAUTHENTICATED,
}

type SessionStatusResult = {
  status: SessionStatus;
  user_id?: number;
};

export const getSessionStatus = async (
  fetchFn: typeof fetch = fetch
): Promise<SessionStatusResult> => {
  const result = await fetchFn(`${BACKEND_API_URL}/session`);
  if (result.ok) {
    const { user_id } = await result.json();
    return { status: SessionStatus.VALID, user_id };
  }
  return { status: SessionStatus.UNAUTHENTICATED };
};

export const useSessionCheck = () => {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [checkingSession, setCheckingSession] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { status, user_id } = await getSessionStatus();
        if (status === SessionStatus.VALID) {
          setUserId(user_id);
          setSessionError(null);
        } else {
          setUserId(undefined);
          window.location.assign("/signin");
        }
        setCheckingSession(false);
      } catch (err) {
        setSessionError(`Failed to fetch session: ${err}`);
      }
    };

    checkSession();
  }, []);

  return { userId, checkingSession, sessionError };
};
