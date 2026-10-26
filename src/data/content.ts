import type { IconName } from '../components/atoms'
import type { L10n } from '../lib/i18n'

/**
 * Single source of truth for everything the site displays.
 * Every visible string is bilingual: { ja, en }.
 *
 * Placeholders are marked TODO so they are easy to find. Replacing them is the
 * only edit needed to change the site's content.
 */

export type Link = {
  label: string
  href: string
  icon: IconName
}

/**
 * A tool, language or idea you like. `weight` drives the size in the tag
 * cloud: 3 is "I reach for this constantly", 1 is "I like it, occasionally".
 */
export type Tag = {
  label: string
  weight: 1 | 2 | 3
}

/** Same shape as Tag, but the label needs translating — a certification's
 * official name isn't a language-agnostic proper noun like "AWS" is. */
export type Credential = {
  label: L10n
  weight: 1 | 2 | 3
}

/** Section anchors, in page order. Drives the nav and the scroll spy. */
export const sectionIds = ['about', 'playground', 'contact'] as const
export type SectionId = (typeof sectionIds)[number]

export const profile = {
  name: { ja: '下田 大河', en: 'Taiga Shimoda' } satisfies L10n,
  /** Katakana reading, shown in small type above the JA headline only — "大河"
   * alone could be read several ways, and this is meant to work as a name card. */
  reading: 'シモダ タイガ',
  handle: '4moda',
  location: { ja: 'Tokyo, Japan', en: 'Tokyo, Japan' } satisfies L10n,
  /** Small pill at the top of the hero. Set to null to hide it. */
  availability: null as L10n | null,
}

/** LinkedIn first — it's the one of these that's actually a contact channel;
 * ContactSection highlights whichever link comes first. */
export const links: Link[] = [
  { label: 'LinkedIn', href: 'https://jp.linkedin.com/in/taiga-shimoda-76666b137', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/4moda', icon: 'github' },
  { label: 'Zenn', href: 'https://zenn.dev/4moda', icon: 'note' },
]

// DRAFT — rewrite freely, this is a first pass to give the page something to
// show rather than TODO placeholders.
export const about: L10n<string[]> = {
  ja: [
    '大手精密機器メーカーでソフトウェアエンジニアとして、モノとインターネットをつなぐクラウドサービスの設計・開発・保守に携わっています。世界中のお客様に利用いただいているサービスです。',
    '前職では SIer としてプロジェクトリーダーを務め、お客様と直接やり取りしながら要件定義から運用まで一貫してサポートしていました。',
    '現在は国立情報学研究所の社会人向けソフトウェア技術者育成プログラム「トップエスイー」の2026年度生として、最新のソフトウェア工学を学んでいます。',
    '趣味は写真を撮ることと卓球です。',
  ],
  en: [
    'I work as a software engineer at a major precision equipment manufacturer, on the design, development, and maintenance of a cloud service that connects things to the internet — used by customers around the world.',
    'Before that, I worked as an SIer, leading projects and working directly with clients to support everything from requirements definition through operations.',
    "I'm currently a 2026 cohort member of Top SE, the National Institute of Informatics' software engineering program for working professionals.",
    'My hobbies are photography and table tennis.',
  ],
}

// DRAFT — the 保守 line is inferred from the certifications, not something
// you told me directly. Check it before relying on this.
export const skillsIntro: L10n<string[]> = {
  ja: [
    'SIer 時代、プロジェクトリーダーとしてお客様と直接やり取りしながら要件定義を担った経験を活かして、ビジネス要件を技術要件に落とし込み、実現性と保守性のバランスを取った提案ができます。',
    '設計では、アーキテクトとしてシステム全体やマイクロサービスの設計を担当し、言語やプラットフォームは要件の特性や保守性、メンバーのスキルに合わせて柔軟に選定します。',
    '開発では、フロントエンド・バックエンドを問わず実装を行い、CI/CD の設計・構築や生成 AI を活用した開発環境づくりもサポートします。',
    '保守では、安定運用を見据えた改善や監視体制の整備など、長期的に手を入れ続けられる体制づくりに取り組みます。',
  ],
  en: [
    'Drawing on my time as an SIer project leader, working directly with clients on requirements definition, I translate business requirements into technical ones and propose solutions that balance feasibility with maintainability.',
    'In design, I take on whole-system and microservice architecture, choosing languages and platforms flexibly based on the requirements, maintainability, and the team.',
    'In development, I implement both frontend and backend, and also support CI/CD design and setting up development environments that make use of generative AI.',
    'In maintenance, I focus on improvements aimed at stable operation and monitoring, building something that can keep being worked on long-term.',
  ],
}

/** Tools and languages. Hobbies live in `about`'s prose, not here — this
 * cloud is specifically "the tools I play with". */
export const playground: Tag[] = [
  { label: 'AWS', weight: 2 },
  { label: 'TypeScript', weight: 2 },
  { label: 'Python', weight: 2 },
  { label: 'Java', weight: 2 },
  { label: 'Go', weight: 2 },
]

export const certifications: Credential[] = [
  {
    label: {
      ja: 'AWS Certified Solutions Architect – Associate',
      en: 'AWS Certified Solutions Architect – Associate',
    },
    weight: 2,
  },
  {
    label: { ja: 'AWS Certified Developer – Associate', en: 'AWS Certified Developer – Associate' },
    weight: 2,
  },
  {
    label: {
      ja: 'AWS Certified SysOps Administrator – Associate',
      en: 'AWS Certified SysOps Administrator – Associate',
    },
    weight: 2,
  },
  { label: { ja: '情報処理安全確保支援士', en: 'Registered Security Specialist' }, weight: 2 },
  { label: { ja: 'システムアーキテクト', en: 'Systems Architect' }, weight: 2 },
  { label: { ja: 'データベーススペシャリスト', en: 'Database Specialist' }, weight: 2 },
  { label: { ja: '応用情報技術者', en: 'Applied IT Engineer' }, weight: 2 },
  { label: { ja: 'Oracle Java Gold SE7', en: 'Oracle Java Gold SE7' }, weight: 2 },
]

/**
 * Words that scroll across the filmstrip band between sections.
 * Left blank on purpose for now — undecided what belongs here, and an
 * unexposed strip of film reads fine empty. Fill in later.
 */
export const marquee: string[] = []

/** Fixed interface strings. These are chrome, not profile content. */
export const ui = {
  skipLink: { ja: '本文へスキップ', en: 'Skip to content' },
  nav: {
    label: { ja: 'セクション', en: 'Sections' },
    items: {
      about: { ja: '自己紹介', en: 'About' },
      playground: { ja: 'スキル', en: 'Skills' },
      contact: { ja: 'リンク', en: 'Links' },
    } satisfies Record<SectionId, L10n>,
  },
  hero: {
    cta: { ja: 'スキルを見る', en: 'See my skills' },
    ctaSecondary: { ja: '連絡する', en: 'Say hello' },
  },
  sections: {
    about: { ja: '自己紹介', en: 'About' },
    aboutLead: { ja: 'わたしについて', en: 'About me' },
    playground: { ja: 'スキル', en: 'Skills' },
    playgroundLead: { ja: '習得したもの', en: "What I've learned" },
    technology: { ja: '技術', en: 'Technology' },
    certifications: { ja: '資格', en: 'Certifications' },
    contact: { ja: 'リンク', en: 'Links' },
    contactLead: { ja: '活動の記録', en: 'Activity log' },
  },
  contact: {
    body: {
      ja: 'メッセージは LinkedIn よりお願いします。',
      en: 'Message me on LinkedIn.',
    },
  },
  langToggle: { ja: 'English に切り替え', en: 'Switch to Japanese' },
  themeToggle: { ja: 'テーマを切り替え', en: 'Toggle theme' },
  colorToggle: { ja: '配色を変更', en: 'Change colours' },
}
