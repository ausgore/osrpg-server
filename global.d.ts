declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    SERVER_HOST: string;
    SERVER_PORT: string;
    DB_NAME: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASS: string;
  }
}