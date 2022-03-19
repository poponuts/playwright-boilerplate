import { getSessionStatus, SessionStatus } from "./helpers";

describe("getSessionStatus", () => {
  it("resolves for authentated users", async () => {
    const { status, user_id } = await getSessionStatus(
      jest.fn().mockResolvedValue(new Response(JSON.stringify({ user_id: 1 })))
    );
    expect(status).toBe(SessionStatus.VALID);
    expect(user_id).toBe(1);
  });
  it("resolves for unauthentated users", async () => {
    const { status, user_id } = await getSessionStatus(
      jest
        .fn()
        .mockResolvedValue(new Response(JSON.stringify({}), { status: 401 }))
    );
    expect(status).toBe(SessionStatus.UNAUTHENTICATED);
    expect(user_id).toBeUndefined();
  });
});
