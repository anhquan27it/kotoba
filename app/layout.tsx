import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import Navbar from "@/components/Navbar";
import StorageNotice from "@/components/StorageNotice";
import Furigana, {
  FuriganaProvider,
  FuriganaToggle,
} from "@/components/Furigana";
export const metadata: Metadata = {
  title: { default: "Kotoba · Góc học tiếng Nhật", template: "%s · Kotoba" },
  description:
    "Học tiếng Nhật theo từng bài: từ vựng, kanji, ngữ pháp, đọc hiểu và ôn tập theo tiến độ riêng của bạn.",
  applicationName: "Kotoba",
  appleWebApp: { capable: true, title: "Kotoba", statusBarStyle: "default" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" data-scroll-behavior="smooth">
      <body>
        <FuriganaProvider>
          <a className="skip-link" href="#main-content">
            Đến nội dung chính
          </a>
          <Navbar />
          <div className="app-shell">
            <div className="app-topbar">
              <span>HỌC ĐỀU ĐẶN. NHỚ LÂU HƠN.</span>
              <div className="topbar-tools">
                <span className="topbar-jp" lang="ja">
                  <Furigana text="わたしの日本語ノート" />
                </span>
                <FuriganaToggle />
              </div>
            </div>
            <main id="main-content" className="main-content">
              {children}
            </main>
            <footer className="app-footer">
              <span>kotoba. · Không gian tự học tiếng Nhật</span>
              <span>Mỗi bài học, một bước tiến.</span>
            </footer>
          </div>
          <StorageNotice />
        </FuriganaProvider>
      </body>
    </html>
  );
}
