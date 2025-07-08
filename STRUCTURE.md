# Portfolio Project Structure

## 📁 Cấu trúc thư mục tối ưu

```
my-portfolio/
├── public/                    # Static assets
│   ├── assets/
│   │   └── imgs/             # Images
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (pages)/          # Route groups
│   │   │   ├── about/
│   │   │   ├── blog/
│   │   │   ├── contact/
│   │   │   └── portfolio/
│   │   ├── api/              # API routes
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/           # React components
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── Loading.tsx
│   │   │   └── index.ts
│   │   ├── layout/           # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── PageTransition.tsx
│   │   │   └── index.ts
│   │   ├── sections/         # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── index.ts
│   │   └── common/           # Common components
│   ├── lib/                  # Utility libraries
│   │   ├── utils/            # Utility functions
│   │   │   ├── cn.ts         # Class name utility
│   │   │   ├── format.ts     # Formatting utilities
│   │   │   └── index.ts
│   │   ├── constants/        # App constants
│   │   │   ├── app.ts        # App configuration
│   │   │   ├── navigation.ts # Navigation items
│   │   │   ├── social.ts     # Social media links
│   │   │   └── index.ts
│   │   ├── types/            # TypeScript types
│   │   │   ├── common.ts     # Common types
│   │   │   ├── portfolio.ts  # Portfolio types
│   │   │   ├── blog.ts       # Blog types
│   │   │   └── index.ts
│   │   ├── hooks/            # Custom hooks
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useScrollPosition.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   └── index.ts
│   │   ├── services/         # API services
│   │   └── validations/      # Form validations
│   └── styles/               # CSS styles
│       ├── globals/          # Global styles
│       │   └── index.css
│       ├── components/       # Component styles
│       └── pages/            # Page-specific styles
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## 🎯 Lợi ích của cấu trúc mới

### 1. **Tổ chức rõ ràng**
- Phân tách rõ ràng giữa components, utilities, và styles
- Mỗi thư mục có mục đích cụ thể
- Dễ dàng tìm kiếm và bảo trì

### 2. **Scalability**
- Dễ dàng mở rộng khi dự án phát triển
- Cấu trúc hỗ trợ team development
- Tái sử dụng components hiệu quả

### 3. **Type Safety**
- TypeScript types được tổ chức tốt
- Interfaces rõ ràng cho data models
- Giảm thiểu lỗi runtime

### 4. **Performance**
- Code splitting tự động với Next.js
- Lazy loading components
- Optimized imports

## 📦 Các thư mục chính

### `/src/components/`
- **ui/**: Components UI cơ bản, tái sử dụng
- **layout/**: Components layout (Navbar, Footer, etc.)
- **sections/**: Sections của trang (Hero, About, etc.)
- **common/**: Components dùng chung

### `/src/lib/`
- **utils/**: Utility functions
- **constants/**: App constants và configuration
- **types/**: TypeScript type definitions
- **hooks/**: Custom React hooks
- **services/**: API calls và external services
- **validations/**: Form validation schemas

### `/src/styles/`
- **globals/**: Global CSS và variables
- **components/**: Component-specific styles
- **pages/**: Page-specific styles

## 🚀 Cách sử dụng

### Import components
```typescript
// Import từ index files
import { Loading } from '@/components/ui';
import { Navbar } from '@/components/layout';
import { Hero, About } from '@/components/sections';
```

### Import utilities
```typescript
// Import utilities
import { cn, formatDate } from '@/lib/utils';
import { NAVIGATION, SOCIAL_LINKS } from '@/lib/constants';
import { useLocalStorage } from '@/lib/hooks';
```

### Import types
```typescript
// Import types
import type { Project, BlogPost } from '@/lib/types';
```

## 🔧 Cấu hình

### Path aliases (tsconfig.json)
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  }
}
```

### Next.js config
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons']
  }
};
```

## 📝 Best Practices

1. **Naming conventions**: camelCase cho files, PascalCase cho components
2. **Index files**: Export tất cả từ index files để clean imports
3. **Type safety**: Sử dụng TypeScript cho tất cả components
4. **Performance**: Lazy load components khi cần thiết
5. **Accessibility**: Đảm bảo semantic HTML và ARIA labels
6. **SEO**: Sử dụng Next.js metadata API
7. **Testing**: Tổ chức tests theo cấu trúc components

## 🎨 Styling

- **Tailwind CSS v4**: Utility-first CSS framework
- **CSS Variables**: Custom properties cho theming
- **Component styles**: Scoped styles cho components
- **Responsive design**: Mobile-first approach

## 🔄 Migration Notes

Các file UI hiện có đã được giữ nguyên và di chuyển vào cấu trúc mới:
- `Loading.tsx` → `src/components/ui/Loading.tsx`
- `Nav.tsx` → `src/components/layout/Navbar.tsx`
- Các section components giữ nguyên trong `src/components/sections/` 