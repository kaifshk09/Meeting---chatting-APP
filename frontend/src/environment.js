// Set IS_PROD=false for local development
const IS_PROD = process.env.NODE_ENV === 'production';

const server = IS_PROD
  ? "https://apnacollegebackend.onrender.com"
  : (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000");

export default server;

