// MOCK ONLY: Change this value to 'student' or 'tutor' to test frontend role-based UI
export type UserRole = "student" | "tutor" | "admin" | null;

export function useUserRole() {
  // Change this value to test as different roles
  const mockRole: UserRole = "student"; // or "tutor" or "admin"
  return { role: mockRole, loading: false };
}
