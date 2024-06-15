import { describe, expect, it } from "vitest";
import { Db } from "@axesilo/avocado";

describe("Db::create() function", () => {
  it("should create an object in a collection and return an ObjectId", async () => {
    console.log(process.env.AVOCADO_MONGODB_CONNECTION_STRING);
    const insertedId = await new Db().create("testCollection", {
      name: "Kharbranth",
      people: ["Taravangian", "Mrall"],
    });
    expect(insertedId.toHexString()).toMatch(/^[0-9a-f]{24}$/);
  });
});
