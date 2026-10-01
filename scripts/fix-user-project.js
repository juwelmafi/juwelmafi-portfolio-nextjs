const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const col = mongoose.connection.collection("projects");
  await col.updateOne(
    { _id: new mongoose.Types.ObjectId("6abdedaca286bce9742fa235") },
    { $set: { category: "Shopify" } }
  );

  // Also ensure any project with tech containing Shopify has category: Shopify
  await col.updateMany(
    { tech: { $in: ["Shopify", "shopify"] }, category: { $ne: "Shopify" } },
    { $set: { category: "Shopify" } }
  );

  const doc = await col.findOne({ _id: new mongoose.Types.ObjectId("6abdedaca286bce9742fa235") });
  console.log("Updated user project:", doc?.title, "| category:", doc?.category);
  process.exit(0);
});
