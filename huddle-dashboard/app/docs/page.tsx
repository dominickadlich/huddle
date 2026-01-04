import { Metadata } from "next";
import Header from "../ui/header";

export const metadata: Metadata = {
  title: "Docs",
};

export default async function Page() {
  return (
    <Header title="Docs" />
  );
}
