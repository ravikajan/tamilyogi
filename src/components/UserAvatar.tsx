import React from "react";

interface UserAvatarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  if (user?.image) {
    return (
      <img
        src={user.image}
        alt={user.name || "User Avatar"}
        className="w-8 h-8 rounded-full object-cover border border-gray-700"
      />
    );
  }
  // No avatar or fallback circle, render nothing
  return null;
};

export default UserAvatar;
