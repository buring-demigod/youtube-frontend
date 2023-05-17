import Cookies from 'js-cookie';

const HandleTokenExpire = () => {
  Cookies.remove('token');
  localStorage.removeItem('token');
  window.location.href = '/';
}

export default HandleTokenExpire;