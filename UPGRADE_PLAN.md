# Next.js & React Upgrade Plan

## Current State

| Package | Current Version | Target Version |
|---------|-----------------|----------------|
| next | 15.0.3 | 15.5.9 |
| react | ^17.0.0 \|\| ^18.0.0 \|\| ^19.0.0 | ^19.0.0 |
| react-dom | ^17.0.0 \|\| ^18.0.0 \|\| ^19.0.0 | ^19.0.0 |
| @types/react | ^18 | ^19 |
| @types/react-dom | ^18 | ^19 |
| eslint-config-next | 15.0.3 | 15.5.9 |
| react-syntax-highlighter | ^15.6.1 | ^16.1.0 |

## Security Vulnerabilities (Pre-Upgrade)

### Critical
- **next 15.0.3**: Multiple CVEs including DoS, SSRF, RCE, Authorization bypass
  - GHSA-7m27-7ghc-44w9 (DoS with Server Actions)
  - GHSA-f82v-jwr5-mffw (Authorization Bypass in Middleware)
  - GHSA-9qr9-h5gf-34mp (RCE in React flight protocol)

### High
- **glob** (via sucrase): Command injection via CLI

### Moderate
- **prismjs** (via react-syntax-highlighter): DOM Clobbering
- **js-yaml** (via gray-matter): Prototype pollution
- **@babel/runtime**: Inefficient RegExp complexity
- **brace-expansion**: ReDoS vulnerability
- **mdast-util-to-hast**: Unsanitized class attribute
- **nanoid**: Predictable results with non-integer values

## Breaking Changes

### Next.js 15.0.3 → 15.5.9

#### Async Request APIs
The `params`, `searchParams`, `cookies()`, and `headers()` APIs are now asynchronous.

**Files requiring updates:**
- `src/app/blog/[slug]/page.tsx`
- `src/app/projects/[slug]/page.tsx`

**Before:**
```typescript
export default function Page({ params }: { params: { slug: string } }) {
  const content = getPostContent(params.slug);
}
```

**After:**
```typescript
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getPostContent(slug);
}
```

#### Caching Semantics
- `fetch` requests are no longer cached by default
- GET Route Handlers are no longer cached by default
- Client navigations no longer cache by default

*Note: This project uses static export (`output: "export"`), so caching changes have minimal impact.*

### React 19 Changes

#### Removed APIs (verify not in use)
- [x] String refs - not used
- [x] `propTypes` / `defaultProps` on function components - not used
- [x] Legacy Context (`contextTypes`, `getChildContext`) - not used
- [x] `React.createFactory` - not used
- [x] `ReactDOM.render` / `ReactDOM.hydrate` - not used (using App Router)

#### New Patterns
- `ref` can now be passed as a prop (no `forwardRef` needed)
- Ref cleanup functions supported

### react-syntax-highlighter 15 → 16

- Updated prismjs dependency (security fix)
- API remains compatible
- Verify syntax highlighting still works after upgrade

## Upgrade Steps

### Phase 1: Critical Security Fixes
```bash
# Upgrade Next.js to latest secure version
npm install next@15.5.9 eslint-config-next@15.5.9
```

### Phase 2: Fix Vulnerable Dependencies
```bash
# Auto-fix compatible vulnerabilities
npm audit fix

# Upgrade react-syntax-highlighter
npm install react-syntax-highlighter@16
```

### Phase 3: Upgrade React to v19
```bash
# Install React 19
npm install react@19 react-dom@19

# Update TypeScript types
npm install --save-dev @types/react@19 @types/react-dom@19
```

### Phase 4: Code Changes for Async Params

#### Update `src/app/blog/[slug]/page.tsx`
```typescript
// Update interface
interface IBlogPostProps {
  params: Promise<{ slug: string }>;
}

// Update generateMetadata
export async function generateMetadata({ params }: IBlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  // ... rest of function
}

// Update page component
export default async function BlogPost({ params }: IBlogPostProps) {
  const { slug } = await params;
  // ... rest of function
}
```

#### Update `src/app/projects/[slug]/page.tsx`
```typescript
// Update interface
interface IProjectProps {
  params: Promise<{ slug: string }>;
}

// Update generateMetadata
export async function generateMetadata({ params }: IProjectProps): Promise<Metadata> {
  const { slug } = await params;
  // ... rest of function
}

// Update page component
export default async function Project({ params }: IProjectProps) {
  const { slug } = await params;
  // ... rest of function
}
```

### Phase 5: Update package.json
Update React version ranges to be explicit:
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

### Phase 6: Verify & Test
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Run security audit
npm audit

# Build project
npm run build

# Run linter
npm run lint

# Start and manually test
npm start
```

## Post-Upgrade Checklist

- [ ] All pages render correctly
- [ ] Blog posts load and display properly
- [ ] Project pages load and display properly
- [ ] Syntax highlighting works in blog posts
- [ ] Navigation works throughout site
- [ ] Images load correctly
- [ ] Fonts load correctly
- [ ] MUI components render properly
- [ ] No console errors in browser
- [ ] `npm audit` shows 0 vulnerabilities
- [ ] Build completes without errors

## Rollback Plan

If issues arise, revert to previous versions:
```bash
npm install next@15.0.3 eslint-config-next@15.0.3 react@18 react-dom@18 react-syntax-highlighter@15
npm install --save-dev @types/react@18 @types/react-dom@18
```

## Resources

- [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-15)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [Next.js Releases](https://github.com/vercel/next.js/releases)
- [React Releases](https://github.com/facebook/react/releases)
