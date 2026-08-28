import { Details, Masthead, Services, Shop, Visit } from "@/components/sections";
import { Footer, Header, PreviewNotice } from "@/components/site";

export default function Page() {
  return (
    <>
      <PreviewNotice />
      <Header />
      <main>
        <Masthead />
        <Shop />
        <Services />
        <Details />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
