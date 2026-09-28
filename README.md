# Lebedynets Hausmeisterdienst — одностраничный сайт

Next.js (App Router) + React + Tailwind CSS v4 + shadcn/ui.
Собирается в обычные статические файлы (`output: "export"`) — работает на любом
хостинге, PHP и Node.js на сервере не нужны.

## Разработка

```bash
npm install
npm run dev      # http://localhost:3000
```

## Что где

| Путь | Что это |
|---|---|
| `lib/site.ts` | **домен сайта**, телефон, e-mail, адрес, услуги — менять здесь |
| `app/page.tsx` | порядок секций страницы |
| `app/layout.tsx` | SEO: title, description, Open Graph, keywords, viewport |
| `components/json-ld.tsx` | структурированные данные для Google (schema.org LocalBusiness) |
| `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts` | robots.txt, sitemap.xml, manifest |
| `app/globals.css` | цвета бренда (`--brand-*`) и тема shadcn |
| `components/*.tsx` | секции: шапка (+ мобильное меню), hero, услуги, преимущества, этапы, контакт, футер |
| `components/request-form.tsx` | форма заявки — открывает WhatsApp с готовым текстом |
| `components/ui/` | компоненты shadcn (добавлять: `npx shadcn@latest add <имя>`) |
| `public/` | видео, логотип, иконки, `.htaccess` для Apache-хостинга |
| `scripts/generate-images.mjs` | генерирует иконки и картинку для соцсетей (`npm run images`) |
| `legacy/` | старая версия сайта — для сравнения, можно удалить |

## Форма заявки

Форма ничего не отправляет на сервер: кнопка «Per WhatsApp senden» открывает
WhatsApp с заполненным текстом заявки на номер 0152 03587320.

## Как выложить в интернет

1. Купить домен .de + хостинг (например all-inkl.com или netcup.de).
2. Если домен не `lebedynets-hausmeister.de` — поменять `siteUrl` в `lib/site.ts`
   (или собрать с `NEXT_PUBLIC_SITE_URL=https://ваш-домен.de npm run build`).
   От этого зависят canonical, sitemap, Open Graph и JSON-LD.
3. Собрать сайт: `npm run build` — появится папка `out/`.
4. Загрузить **содержимое** папки `out/` в корень сайта (обычно `htdocs` / `www`),
   включая скрытый файл `.htaccess` (сжатие и кеширование на Apache).
5. После включения HTTPS раскомментировать редирект в конце `.htaccess`.
6. Добавить сайт в Google Search Console и отправить `https://ваш-домен.de/sitemap.xml`.
7. Проверить разметку: https://search.google.com/test/rich-results

## Контакты на сайте

- Телефон и WhatsApp: 0152 03587320
- E-Mail: lebedinets.antonio@gmail.com
