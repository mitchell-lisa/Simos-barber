import {
  Book,
  Hero,
  Menu,
  Shop,
  TrustStrip,
  Visit,
} from "@/components/sections";
import { Footer, Header, PreviewNotice } from "@/components/site";

export default function Page() {
  return (
    <>
      <PreviewNotice />
      <Header />
      <main>
        <Hero />
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
