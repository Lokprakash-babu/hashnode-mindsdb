import MindsDB from "mindsdb-js-sdk";

const connect = async () => {
  try {
    await MindsDB.connect({
      host: process.env.NEXT_MINDSDB_URL,
      user: "",
      password: "",
    });

    return console.log("Connected to MindsDB");
  } catch (error: any) {
    return error;
  }
};

export default connect;
