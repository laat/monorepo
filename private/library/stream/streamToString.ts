export default function streamToString(stream: NodeJS.ReadableStream, encoding = "utf8") {
  let str = "";

  return new Promise((resolve, reject) => {
    stream.on("data", data => {
      str += data.toString(encoding);
    });
    stream.on("end", () => {
      resolve(str);
    });
    stream.on("error", err => {
      reject(err);
    });
  });
}
