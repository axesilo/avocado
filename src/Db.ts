import { MongoClient, ServerApiVersion, type Db as BaseDb, ObjectId } from "mongodb";
export { ObjectId } from "mongodb";

// TODO: be more explicit about the default if no connection string is set

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
 * const projects = await new Db().getAll("projects");
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
  async getAll(collectionName: string): Promise<Array<Document>> {
    return await this.db.collection(collectionName).find({}).toArray();
  }

  /**
   * Create a new document in a collection and return its ID.
   */
  async create(collectionName: string, document: DocumentWithoutId): Promise<ObjectId> {
    // The driver will mutate the document object that is passed in, so make a clone.
    const documentClone = { ...document };

    // forceServerObjectId should default to false, but make it explicit so that we are guaranteed
    // that the driver knows the inserted _id
    const result = await this.db.collection(collectionName).insertOne(documentClone, {
      forceServerObjectId: false,
    });

    return result.insertedId;
  }

  /**
   * Delete a document from a collection, returning `true` if the delete was successful.
   *
   * If no document with the given ID is found, this method returns `false`.
   */
  async delete(collectionName: string, documentId: ObjectId): Promise<boolean> {
    return (
      (await this.db.collection(collectionName).deleteOne({ _id: documentId })).deletedCount === 1
    );
  }
}

export type DocumentWithoutId = { [key: string]: any } & { _id: never };
export type Document = { [key: string]: any } & { _id: ObjectId };
