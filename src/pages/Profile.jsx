import  { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      {/* Add form for updating profile information */}
    </div>
  );
};

export default ProfilePage;
