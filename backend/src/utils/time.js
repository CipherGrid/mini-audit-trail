import dayjs from "dayjs";

function formatTimestamp(date = new Date()) {
  return dayjs(date).format("YYYY-MM-DD HH:mm");
}

export { formatTimestamp };
