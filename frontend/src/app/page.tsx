"use client";

import { useAuth } from "@/contexts/AuthContext/AuthContext";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <div>Not logged in</div>;
  }

  // هنحوّل اليوزر لأراي علشان نعمل map
  const userFields = [
    { label: "ID", value: user.id },
    { label: "Username", value: user.username },
    { label: "Email", value: user.email },
    { label: "First Name", value: user.first_name },
    { label: "Last Name", value: user.last_name },
    { label: "Active", value: user.is_active ? "Yes" : "No" },
    { label: "Staff", value: user.is_staff ? "Yes" : "No" },
    { label: "Superuser", value: user.is_superuser ? "Yes" : "No" },
  ];

  return (
    <div style={{ padding: 16 }}>
      <h2>User Info</h2>

      <ul>
        {userFields.map((item) => (
          <li key={item.label}>
            <strong>{item.label}:</strong> {item.value}
          </li>
        ))}
      </ul>

      {/* Groups */}
      <h3>Groups</h3>
      {user.groups.length ? (
        <ul>
          {user.groups.map((group, idx) => (
            <li key={idx}>{group}</li>
          ))}
        </ul>
      ) : (
        <p>No groups</p>
      )}

      {/* Permissions */}
      <h3>Permissions</h3>
      {user.user_permissions.length ? (
        <ul>
          {user.user_permissions.map((perm, idx) => (
            <li key={idx}>{perm}</li>
          ))}
        </ul>
      ) : (
        <p>No permissions</p>
      )}
    </div>
  );
}
