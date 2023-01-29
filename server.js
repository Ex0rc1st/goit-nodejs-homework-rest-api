const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const app = require("./app");

const { PORT, MONGO_CON_URL } = process.env;

mongoose
  .connect(MONGO_CON_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(PORT, () => {
      console.log(`Database connection successful`);
    })
  )
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
