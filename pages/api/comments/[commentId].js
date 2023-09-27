import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "@/helpers/db-util";

export default async function Handler(req, res) {
  const eventId = req.query.commentId;
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to database failed" });
  }

  if (req.method === "POST") {
    const { name, email, comment } = req.body;
    if (
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !comment ||
      comment.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid inputs!!!" });
      client.close();
      return;
    }

    const newComment = {
      name,
      email,
      comment,
      eventId,
    };
    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Added comment", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed" });
    }
  }
  if (req.method === "GET") {
    let result;
    try {
      result = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(201).json({ comments: result });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed" });
    }
  }
  client.close();
}
