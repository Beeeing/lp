"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "Beeeeingさんのサポートにより、開発期間を当初の予定より30%短縮できました。AIを活用した提案は非常に効果的でした。",
    author: "田中 健太",
    position: "株式会社テックイノベーション CTO",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "オフショア開発に不安がありましたが、日本人PMの方が常に状況を把握してくださり、スムーズなコミュニケーションが実現しました。",
    author: "佐藤 美咲",
    position: "LogiTech株式会社 マーケティング部長",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "複雑な要件にも柔軟に対応いただき、予算内で高品質なシステムを構築できました。継続的な改善提案も非常に参考になっています。",
    author: "鈴木 大輔",
    position: "NextShop 代表取締役",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="container mx-auto">
        <motion.h2
          className="text-5xl font-black mb-16 text-center text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          お客様の声
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              className="bg-background p-6 rounded-lg border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.author}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-gray-400">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

