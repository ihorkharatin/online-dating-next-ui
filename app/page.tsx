import { redirect } from "next/navigation";

export default function Root() {
  redirect("/en"); // або на брендову/лендінг-сторінку: "/en/home"
}
