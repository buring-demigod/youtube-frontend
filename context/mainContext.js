import { useState } from 'react';
import mainContext from "./createMainContext";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

const MainContextProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState({ name: '', email: '', picture: '' });
  const [subscriptions, setSubscriptions] = useState(null);
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [drawerActive, setDrawerActive] = useState('Home');
  const [drawer, setDrawer] = useState('close');

  const handleUser = (item) => {
    setUser(item);
  }

  const handleSubscriptions = (item) => {
    setSubscriptions(item);
  }

  const handleVideos = (videos) => {
    setVideos(videos);
  }

  const handleComments = (item) => {
    setComments(item);
  }

  const handleDrawerActive = (item) => {
    setDrawerActive(item);
  }

  const handleDrawer = (item) => {
    setDrawer((prev) => !prev);
  }

  const handleSignUp = () => {

    const GetData = async (response) => {
      const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`);

      const { name, email, picture } = userInfo.data;
      setUser({ name, email, picture });

      const tokenInfo = await axios.post('http://localhost:3001/createuser', {
        name,
        email,
        picture,
        token: response.access_token
      });

      Cookies.set('token', tokenInfo.data.token, { expires: 2 });
      localStorage.setItem('token', tokenInfo.data.token);

      router.push('/');
    }

    /* global google*/
    const client = google.accounts.oauth2.initTokenClient({
      client_id: '582680695815-9hsi3h7ff9qla29fg59dnv9g9kscfg02.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
      ux_mode: 'popup',
      callback: GetData
    });

    client.requestAccessToken();
  }

  return (
    <mainContext.Provider value={{ user, subscriptions, handleSubscriptions, videos, handleVideos, handleUser, handleSignUp, comments, handleComments, drawerActive, handleDrawerActive, drawer, handleDrawer }}>
      {children}
    </mainContext.Provider>
  );
}

export default MainContextProvider;