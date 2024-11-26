import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "包知识库",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '小碳二手交易平台', link: 'http://8.137.118.146/' },
      { text: '网站详情', link: '/mission' }
    ],

    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '我们的使命', link: '/mission' },
          { text: '如何工作', link: '/how-it-works' },
          { text: '常见问题', link: '/faq' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'gitee', link: 'https://gitee.com/inMyBag' }
    ]
  }
})
