const config = {
  port: process.env.PORT || 4200,
  db_host: process.env.DB_HOST || "localhost",
  db_user: process.env.DB_USER || "root",
  db_password: process.env.DB_PASSWORD || "password"
};

export default config;
