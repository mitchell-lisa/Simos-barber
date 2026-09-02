import {
  Book,
  Hero,
  Menu,
  Shop,
  TrustStrip,
  Visit,
  Welcome,
} from "@/components/sections";
import { Footer, Header, PreviewNotice } from "@/components/site";

export default function Page() {
  return (
    <>
      <PreviewNotice />
      <Header />
      <main>
        <Hero />
        <Welcome />
        <TrustStrip />
        <Menu />
        <Book />
        <Shop />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
