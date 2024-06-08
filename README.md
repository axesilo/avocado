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

## Philosophy

- Bias for the most common operations, setting reasonable defaults.
- Use flexible types and class-based patterns over generics and strict typing. One of the advantages
  of using a NoSQL document store like MongoDB (over a relational database, say) is its flexibility.
