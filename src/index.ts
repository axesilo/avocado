import { MongoClient, ServerApiVersion, type Db as BaseDb } from "mongodb";

// Contrary to to what the README says, this isn't necessarily good code yet.
// It's a placeholder to get the project scaffolded.

/**
 * A MongoDB database connection.
 *
 * Instances of this class are intended to be lightweight and can be short-lived - for example,
 * an HTTP server could create a new instance for each request.
 *
 * The database connection is configured via `process.env` variables:
 * - `AVOCADO_MONGODB_CONNECTION_STRING`: The connection string to the MongoDB cluster.
 *   If not set, a local in-memory database is used.
 * - `AVOCADO_MONGODB_DATABASE_NAME`: The name of the database repesented by the class.
 *   If not set, the default database from the connection string is used.
 */
export class Db {
  // The MongoClient manages the connection pool, so ideally, there should be one per application.
  // See https://www.mongodb.com/docs/manual/administration/connection-pool-overview/.
  private static client: MongoClient | null = null;

  private static getDb(): BaseDb {
    if (Db.client == null) {
      // TODO: local in-memory database
      Db.client = new MongoClient(process.env.AVOCADO_MONGODB_CONNECTION_STRING ?? "", {
        serverApi: {
          version: ServerApiVersion.v1,
          // Allow only commands in the Stable API
          strict: true,
          deprecationErrors: true,
        },
      });
    }

    return Db.client.db(process.env.AVOCADO_MONGODB_DATABASE_NAME);
  }

  private db: BaseDb;

  constructor() {
    this.db = Db.getDb();
  }

  /**
   * Get a Promise that resolves to an array of all documents in a collection.
   */
  getMany(collectionName: string) {
    return this.db.collection(collectionName).find({}).toArray();
  }
}
