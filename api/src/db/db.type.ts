import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './db.schema';

export type DBType = NodePgDatabase<typeof schema>;
