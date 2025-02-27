"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "顔認証出退勤管理システム",
    description: "自社プロジェクトとして開発・導入した顔認証技術を活用した出退勤管理システム",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "自社開発",
  },
  {
    id: 2,
    title: "物流業界向け在庫管理システム",
    description: "リアルタイム在庫追跡と予測分析機能を備えた物流業界向けの在庫管理システム",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "業務システム",
  },
  {
    id: 3,
    title: "ECプラットフォーム構築",
    description: "日本企業向けにカスタマイズされた多言語対応のECプラットフォーム",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Webシステム",
  },
  {
    id: 4,
    title: "NextEngine連携動画整理アプリ",
    description: "NextEngineと連携し、商品管理と動画コンテンツを効率的に整理するアプリケーション",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "モバイルアプリ",
  },
  {
    id: 5,
    title: "クラウド移行プロジェクト",
    description: "レガシーシステムからクラウドへの移行を実現し、運用コストを30%削減",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "クラウドインフラ",
  },
  {
    id: 6,
    title: "AIチャットボット開発",
    description: "顧客サポート向けに自然言語処理を活用した多言語対応AIチャットボット",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "AI開発",
  },
]

const categories = ["All", ...new Set(projects.map((project) => project.category))]

export default function PortfolioGrid() {
  const [filter, setFilter] = useState("All")

  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter)

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">開発実績</h2>
          <p className="mt-4 text-lg text-muted-foreground">多様な業界・技術領域での開発実績をご紹介します</p>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-8 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors m-1 ${
                filter === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-primary hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-secondary rounded-3xl shadow-lg overflow-hidden hover-lift transition-all duration-300 ease-in-out border border-primary/20"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300"
                    whileHover={{ opacity: 1 }}
                  >
                    <p className="text-white text-center px-4">{project.description}</p>
                  </motion.div>
                </div>
                <div className="p-6">
                  <div className="text-sm font-medium text-primary mb-1">{project.category}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

