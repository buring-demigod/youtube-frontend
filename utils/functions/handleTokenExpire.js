import Cookies from 'js-cookie';

const HandleTokenExpire = () => {
  Cookies.remove('token');
  localStorage.removeItem('token');

  alert('Session expired need to sign in again');

  setTimeout(() => {
    window.location.href = '/';
  }, 3000);
}

export default HandleTokenExpire;