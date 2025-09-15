export const config = () => ({
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URI,
  jwt_secret: process.env.JWT_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
});
