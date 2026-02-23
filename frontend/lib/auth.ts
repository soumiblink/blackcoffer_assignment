export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const user = localStorage.getItem('currentUser');
  if (!user) return false;
  
  try {
    const userData = JSON.parse(user);
    return userData.loggedIn === true;
  } catch {
    return false;
  }
};

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  
  const user = localStorage.getItem('currentUser');
  if (!user) return null;
  
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const logout = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('currentUser');
};
