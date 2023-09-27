import { connectDatabase, insertDocument } from "../../../helpers/db-util";

export default async function Handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "This is not valid" });
      return;
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to database failed" });
    }
    try {
      await insertDocument(client, 'newsletter',{ email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "inserting data failed" });
    }

    res.status(201).json({ message: "success" });
  }
}
