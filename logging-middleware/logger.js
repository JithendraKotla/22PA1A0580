import axios from "axios";

export async function log(level, message) {
  console.log(`[${level.toUpperCase()}] ${message}`);

  try {
    await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        level,
        message,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          Authorization: "qxRMwq",
        },
      }
    );
  } catch (error) {
    console.error("Logging error:", error.message);
  }
}
