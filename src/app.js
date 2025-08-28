import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// ? try
// import { dirname, resolve } from 'path';
// import { fileURLToPath } from 'url';

const app = express();

app.use(cors(
  {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }
));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// ? If this not work
app.use(express.static("public"))

// ? try this
// const __dirname = dirname(fileURLToPath(import.meta.url))
// app.use(express.static(resolve(__dirname, '../public')));

app.use(cookieParser())

app.use(express.json({ limit: "16kb" }));

export { app }