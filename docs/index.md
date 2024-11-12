---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "包知识库"
  text: "包能学到东西的"
  tagline: VitePress
  image:
    src: /img/loto.png
    alt: VitePress
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples
    - theme: alt
      text: Test
      link: /test

features:
  - icon: 
        src: /svg/tailwindcss.svg
    title: TailwindCSS
    details: 原子化CSS，写响应式简单，好用爱用😍
    link: https://tailwindcss.com
  - icon: 
        src: /svg/shadcn.svg
    title: shadcn
    details: 使用 Radix Vue 和 Tailwind CSS 构建的可重用组件，好用爱用😍。
    link: https://www.shadcn-vue.com/
  - icon: 🍍
    title: pinia
    details: vue状态管理库，好用爱用😍。
    link: https://pinia.vuejs.org/
---
<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: '/img/loto.jpg',
    name: '骆驼佬',
    title: 'Creator',
    links: [
      { icon: 'gitee', link: 'https://gitee.com/inMyBag' },
    ]
  },
  {
    avatar: '/img/jinyu.jpg',
    name: '金鱼佬',
    title: 'Creator',
    links: [
      { icon: 'gitee', link: 'https://gitee.com/jjchen99' },
    ]
  }
]
</script>

# Our Team

Say hello to our awesome team.

<VPTeamMembers size="small" :members="members" />