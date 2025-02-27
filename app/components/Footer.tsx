import Link from "next/link"

const footerSections = [
  {
    title: "サービス",
    links: [
      { name: "Webアプリケーション開発", href: "#services" },
      { name: "モバイルアプリケーション開発", href: "#services" },
      { name: "PM代行サポート", href: "#services" },
    ],
  },
  {
    title: "会社情報",
    links: [
      { name: "会社概要", href: "/company" },
      { name: "開発実績", href: "#portfolio" },
      { name: "パートナー企業", href: "#partner" },
    ],
  },
  {
    title: "お問い合わせ",
    links: [
      { name: "無料相談", href: "#contact" },
      { name: "採用情報", href: "/careers" },
      { name: "お客様の声", href: "#testimonials" },
    ],
  },
  {
    title: "法的情報",
    links: [
      { name: "プライバシーポリシー", href: "/privacy" },
      { name: "利用規約", href: "/terms" },
      { name: "特定商取引法に基づく表記", href: "/legal" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-primary/20">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-primary font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-primary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="/placeholder.svg?height=32&width=120" alt="合同会社Beeeeing ロゴ" className="h-8 w-auto" />
              <p className="text-sm text-muted-foreground">〒123-4567 東京都渋谷区○○1-2-3</p>
            </div>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">© 2024 合同会社Beeeeing All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

