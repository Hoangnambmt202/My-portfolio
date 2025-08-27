# Portfolio Project Structure

## 📁 Cấu trúc thư mục hiện tại

```
my-portfolio/
├── public/                    # Static assets
│   └── assets/
│       └── imgs/             # Images
│           ├── image-1.jpg
│           └── Nam_1.jpg
├── src/
│   ├── middleware.ts         # i18n middleware
│   ├── app/                  # Next.js App Router
│   │   ├── favicon.ico
│   │   ├── layout.tsx       # Root layout
│   │   ├── robots.ts        # SEO robots
│   │   ├── sitemap.ts       # SEO sitemap
│   │   ├── [locale]/        # i18n route group
│   │   │   ├── layout.tsx
│   │   │   └── (pages)/     # Route groups
│   │   │       ├── page.tsx            # Home page
│   │   │       ├── about/
│   │   │       │   └── page.tsx
│   │   │       ├── blog/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── BlogList.tsx
│   │   │       │   └── [slug]/
│   │   │       │       ├── page.tsx
│   │   │       │       └── BlogDetail.tsx
│   │   │       ├── contact/
│   │   │       └── portfolio/
│   │   ├── admin/           # Admin dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── blog/
│   │   │   ├── dashboard/
│   │   │   ├── login/
│   │   │   ├── projects/
│   │   │   └── settings/
│   │   └── api/             # API routes
│   │       ├── admin/
│   │       │   └── posts/
│   │       └── auth/
│   │           └── [...nextauth]/
│   ├── components/           # React components
│   │   ├── admin/            # Admin components
│   │   │   ├── ProjectForm.tsx
│   │   │   └── ProjectTable.tsx
│   │   ├── common/           # Common components
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── elements/         # Basic elements
│   │   │   ├── Input.tsx
│   │   │   └── NextButton.tsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── PageTransition.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── index.ts
│   │   ├── providers/       # React providers
│   │   │   └── I18nProvider.tsx
│   │   ├── sections/        # Page sections
│   │   │   ├── CanDoSection.tsx
│   │   │   └── MySkillSection.tsx
│   │   ├── Sidebar/         # Sidebar components
│   │   │   └── Sidebar.tsx
│   │   └── ui/              # UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── Loading.tsx
│   │       ├── table.tsx
│   │       └── index.ts
│   ├── lib/                  # Utility libraries
│   │   ├── hooks/            # Custom hooks
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   ├── useScrollPosition.ts
│   │   │   ├── useStores.ts
│   │   │   ├── useTranslation.ts
│   │   │   └── index.ts
│   │   ├── i18n/            # Internationalization
│   │   ├── sanity/          # Sanity CMS integration
│   │   │   ├── fetchPost.ts
│   │   │   ├── queries.ts
│   │   │   └── sanity.ts
│   │   ├── services/        # API services
│   │   ├── store/           # State management
│   │   │   ├── useBlogStore.ts
│   │   │   ├── useContactStore.ts
│   │   │   ├── useGlobalStore.tsx
│   │   │   ├── useI18nStore.ts
│   │   │   ├── usePortfolioStore.ts
│   │   │   ├── middleware/
│   │   │   │   └── persist.ts
│   │   │   ├── utils/
│   │   │   │   └── selectors.ts
│   │   │   └── index.ts
│   │   ├── types/           # TypeScript types
│   │   │   ├── blog.ts
│   │   │   ├── common.ts
│   │   │   ├── i18n.ts
│   │   │   ├── portfolio.ts
│   │   │   └── index.ts
│   │   └── utils/           # Utility functions
│   │       ├── cn.ts
│   │       ├── format.ts
│   │       ├── metadata.ts
│   │       └── index.ts
│   ├── locales/              # i18n translations
│   │   ├── en/              # English translations
│   │   │   ├── about.json
│   │   │   ├── blog.json
│   │   │   ├── common.json
│   │   │   ├── contact.json
│   │   │   ├── home.json
│   │   │   ├── navigation.json
│   │   │   ├── notifications.json
│   │   │   ├── portfolio.json
│   │   │   └── validation.json
│   │   └── vi/              # Vietnamese translations
│   │       ├── about.json
│   │       ├── blog.json
│   │       ├── common.json
│   │       ├── contact.json
│   │       ├── home.json
│   │       ├── navigation.json
│   │       ├── notifications.json
│   │       ├── portfolio.json
│   │       └── validation.json
│   ├── services/            # External services
│   └── styles/              # CSS styles
│       ├── globals.css      # Global styles
│       ├── components/      # Component styles
│       └── pages/          # Page-specific styles
├── eslint.config.mjs        # ESLint configuration
├── next-env.d.ts           # Next.js TypeScript declarations
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Project documentation
├── STRUCTURE.md           # This file
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vercel.json            # Vercel deployment configuration
```

## 📦 Thư mục chính và chức năng

### 1. `/src/app/` - Next.js App Router
- **[locale]**: Nhóm route đa ngôn ngữ (en/vi)
- **(pages)**: Các trang chính của website
- **admin**: Dashboard quản lý nội dung
- **api**: API routes cho backend

### 2. `/src/components/` - React Components
- **admin**: Components cho trang admin
- **common**: Components dùng chung
- **elements**: Các elements cơ bản (Input, Button)
- **layout**: Components layout chính
- **providers**: React context providers
- **sections**: Các section trong trang
- **ui**: UI components tái sử dụng

### 3. `/src/lib/` - Core Libraries
- **hooks**: Custom React hooks
- **i18n**: Cấu hình đa ngôn ngữ
- **sanity**: Tích hợp Sanity CMS
- **store**: State management (Zustand)
- **types**: TypeScript definitions
- **utils**: Utility functions

### 4. `/src/locales/` - i18n Translations
- **en**: English translations
- **vi**: Vietnamese translations

## 🚀 Ví dụ sử dụng

### Components Import
```typescript
// UI Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/Loading';

// Layout Components
import { Header } from '@/components/layout';
import { LanguageSwitcher } from '@/components/common';
```

### Hooks & Store
```typescript
import { useTranslation } from '@/lib/hooks/useTranslation';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { useBlogStore } from '@/lib/store/useBlogStore';
```

### Utils & Types
```typescript
import { cn } from '@/lib/utils/cn';
import type { BlogPost } from '@/lib/types/blog';
```

## ⚙️ Cấu hình hiện tại

### next.config.ts
```typescript
const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.careerviet.vn",
      "cdn.vietnambiz.vn",
      "cdn.pixabay.com",
      "i.imgur.com",
      "lh3.googleusercontent.com",
    ],
  },
};
```

### postcss.config.mjs
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 🌟 Điểm nổi bật

1. **i18n Support**
   - Đa ngôn ngữ (EN/VI)
   - Translations được tổ chức theo module
   - i18n middleware tự động

2. **Admin Dashboard**
   - Quản lý blog posts
   - Quản lý projects
   - Authentication & Authorization

3. **State Management**
   - Zustand store modules
   - Persistent state
   - TypeScript support

4. **Performance**
   - Next.js App Router
   - Image optimization
   - Dynamic imports

5. **Developer Experience**
   - ESLint configuration
   - TypeScript strict mode
   - Organized imports 