export const setUser = (username) => {
  localStorage.setItem("blog_user", username);
}

export const getUser = () => {
  return localStorage.getItem("blog_user");
}

export const removeUser = () => {
  localStorage.removeItem("blog_user");
}
