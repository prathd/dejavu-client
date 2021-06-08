import Error from "next/error";

export default function Unauthorized() {
  return <Error statusCode={401} />;
}
