import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/test-utils'
import ArticleContent from './ArticleContent'

// Mock react-markdown
vi.mock('react-markdown', () => ({
  default: ({ children }: { children: string }) => (
    <div data-testid="markdown-content">{children}</div>
  ),
}))

describe('ArticleContent', () => {
  it('should render the markdown content', () => {
    render(
      <ArticleContent
        postContent="# Test Content\n\nThis is the article body."
      />
    )

    const markdownContent = screen.getByTestId('markdown-content')
    expect(markdownContent).toBeInTheDocument()
    expect(markdownContent.textContent).toContain('# Test Content')
    expect(markdownContent.textContent).toContain('This is the article body.')
  })

  it('should match snapshot', () => {
    const { container } = render(
      <ArticleContent
        postContent="# Test Content\n\nSome markdown content here."
      />
    )

    expect(container).toMatchSnapshot()
  })

  it('should match snapshot with code block', () => {
    const contentWithCode = `
# Code Example

Here's some code:

\`\`\`javascript
const hello = 'world';
console.log(hello);
\`\`\`
`
    const { container } = render(
      <ArticleContent postContent={contentWithCode} />
    )

    expect(container).toMatchSnapshot()
  })
})
