import "dotenv/config";
import app from "./app";
import { connectDatabase, runMigrations } from "../database/database";

const PORT = Number(process.env.PORT) || 3000;

async function bootstrap() {
  await connectDatabase();
  await runMigrations();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

bootstrap();
