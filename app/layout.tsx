import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import Navbar from "@/components/Navbar";
import StorageNotice from "@/components/StorageNotice";
import ThemeToggle from "@/components/ThemeToggle";
import { themeInitScript } from "@/lib/theme";
import Furigana, {
  FuriganaProvider,
  FuriganaToggle,
} from "@/components/Furigana";
export const metadata: Metadata = {
  title: {
    default: "LearnNova · Góc học tiếng Nhật",
    template: "%s · LearnNova",
  },
  description:
    "Học tiếng Nhật theo từng bài: từ vựng, kanji, ngữ pháp, đọc hiểu và ôn tập theo tiến độ riêng của bạn.",
  applicationName: "LearnNova",
  appleWebApp: { capable: true, title: "LearnNova", statusBarStyle: "default" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
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
                <ThemeToggle />
              </div>
            </div>
            <main id="main-content" className="main-content">
              {children}
            </main>
            <footer className="app-footer">
              <span>LearnNova · Không gian tự học tiếng Nhật</span>
              <span>Mỗi bài học, một bước tiến.</span>
            </footer>
          </div>
          <StorageNotice />
        </FuriganaProvider>
      </body>
    </html>
  );
}
