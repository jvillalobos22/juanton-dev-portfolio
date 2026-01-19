import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, className, priority, ...props }: {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    priority?: boolean
    [key: string]: unknown
  }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        data-priority={priority}
        {...props}
      />
    )
  },
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: {
    href: string
    children: React.ReactNode
    [key: string]: unknown
  }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  },
}))

// Mock react-syntax-highlighter
vi.mock('react-syntax-highlighter', () => ({
  Prism: ({ children, language, ...props }: {
    children: string
    language?: string
    [key: string]: unknown
  }) => (
    <pre data-language={language} {...props}>
      <code>{children}</code>
    </pre>
  ),
}))

vi.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  a11yDark: {},
}))

// Mock @mui/material/useMediaQuery
vi.mock('@mui/material/useMediaQuery', () => ({
  default: () => false,
}))

// Mock window for SSR-safe tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
