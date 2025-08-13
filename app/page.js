import ScribdDownloader from "./mainpage.jsx";

export async function generateMetadata() {
  return {
    title: "Scribd Downloader : Download Pdf from Scribd",
    description:
      "Download pdf from scribd in one click using our Scribd downloader tool",
    robots: "index, follow",
  };
}
export default function Page() {
  return <ScribdDownloader />;
}
