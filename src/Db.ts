import {
  MongoClient,
  ServerApiVersion,
  type Db as BaseDb,
  type ObjectId as MongoObjectId,
} from "mongodb";

// TODO: be more explicit about the default if no connection string is set
// TODO: add a Connection class

/**
 * A MongoDB database connection.
 *
 * Instances of this class are intended to be lightweight and can be short-lived - for example,
 * an HTTP server could create a new instance for each request.
 *
 * The database connection is configured via the `AVOCADO_MONGODB_CONNECTION_STRING` environment
 * variable.  If not set, MongoDB's default connection string is used.
 *
 * Example usage:
 * ```typescript
 * const projects: Array<Project> = await new Db().getAll("projects");
 * console.log(projects);
 * ```
 */
export class Db {
  // The MongoClient manages the connection pool, so ideally, there should be one per application.
  // See https://www.mongodb.com/docs/manual/administration/connection-pool-overview/.
  private static client: MongoClient | null = null;

  private static getDb(dbName?: string): BaseDb {
    if (Db.client == null) {
      Db.client = new MongoClient(process.env.AVOCADO_MONGODB_CONNECTION_STRING ?? "", {
        serverApi: {
          version: ServerApiVersion.v1,
          // Allow only commands in the Stable API
          strict: true,
          deprecationErrors: true,
        },
      });
    }

    return Db.client.db(dbName ?? undefined);
  }

  private db: BaseDb;

  /**
   * Create a new database connection.
   *
   * @param dbName Database name.  If not provided, the database from the connection string is used.
   */
  constructor(dbName?: string) {
    this.db = Db.getDb(dbName);
  }

  /**
   * Get an array of all documents in a collection.
   */
  async getAll<T extends Document>(collectionName: string): Promise<Array<T>> {
    return (await this.db.collection<T>(collectionName).find({}).toArray()) as Array<T>;
  }
}

// Re-export types from MongoDB
export type Document = { [key: string]: any } & { _id: ObjectId };
export type ObjectId = MongoObjectId;
