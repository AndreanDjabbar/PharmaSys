import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPaths = {
    development: path.join(__dirname, "../../.env.dev"),
    production: path.join(__dirname, "../../.env.prod"),
    default: path.join(__dirname, "../../.env")
}

const envPath = envPaths[process.env.NODE_ENV] || envPaths.default;

dotenv.config({ path: envPath });