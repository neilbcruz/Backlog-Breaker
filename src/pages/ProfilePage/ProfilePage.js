import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://localhost:8080";
const profileUrl = `${baseUrl}/profile`;

function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const token = sessionStorage.getItem('JWTtoken');

    if (!token) {
      return;
    }
    
    axios.get(profileUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setIsLoading(false);
        setUserInfo({ name: response.data.username });
        console.log(response)
      });

      
  }, []);

  return isLoading ? <h1>Loading...</h1> : <h1>Welcome {userInfo.name}!</h1>;
}

export default Profile;