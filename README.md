# Avocado

A simplified interface to the MongoDB Node.js driver.

Example usage:

```javascript
import { Db } from "@axesilo/avocado";

new Db()
  .getAll("projects")
  .then((projects) => {
    console.log(projects);
    process.exit(0);
  })
  .catch(console.error);
```
