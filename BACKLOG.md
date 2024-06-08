# Backlog

## Bugfixes

- [ ] Need to re-export `DocumentWithoutId`

## Publishing

- [x] Make a separate build script so the package doesn't pull down unnecessary stuff
- [x] Test the build script
- [x] Set up basic TypeScript experience
- [x] Generate type files as part of the build

## Developer Experience

- [ ] Test and update commit hooks
- [ ] Set up `lint-staged`
- [ ] Add `.husky/post-merge` script to run `npm install`
- [x] Set up TypeScript builds and look into type publishing

## Primary Db Class

- [ ] Look into if anything should be done for connection cleanup. See snippet below.
- [ ] Add "update" method

## Queries

- [ ] Create initial version of Query class that just uses raw documents

## Other

- [ ] Permissions checking on the MongoDB side
- [ ] `_id: never` type requirement when inserting documents seems confusing on the client side
- [ ] Custom errors

## Snippets

```typescript
/**
 * Close any connections and clean up any pending tasks.
 */
static shutdown() {
    if (this.instance == null) {
        console.log("No active MongoDB instance to close");
        return;
    }

    this.instance.client.close();
    console.log("MongoDB connections closed.");
}
```

```typescript
export default class MongoDBError {
  constructor(private _message: string) {}

  get message() {
    return this._message;
  }
}
```
