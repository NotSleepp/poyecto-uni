export const getImageUrl = (path) => {
  const basename = import.meta.env.BASE_URL || '/frontend/home/';
  return `${basename}${path.startsWith('/') ? path.slice(1) : path}`;
};

export const getPlaceholderImage = () => {
  return getImageUrl('assets/img/placeholder.jpg');
}; 