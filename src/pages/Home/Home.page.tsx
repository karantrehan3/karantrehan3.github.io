import { Welcome } from "@/components/Welcome/Welcome";
import { Header } from "@/components/Header/Header";
import { InProgress } from "@/components/InProgress/InProgress";

export function HomePage() {
  return (
    <>
      <Header />
      <Welcome />
      <InProgress />
    </>
  );
}
