const config = {
  BASE_SERVER_URL: import.meta.env.DEV ? "http://localhost:8080/api" : "/api",
  LIMIT: 30, // Количество файлов за запрос
  ACCESS_TOKEN_TIMER: 1000 * 1800, // 30 min
};

export default config;
