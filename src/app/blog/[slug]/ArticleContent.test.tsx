import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/test-utils'
import ArticleContent from './ArticleContent'
import { IPostData } from '@/interface/posts'

// Mock react-markdown
vi.mock('react-markdown', () => ({
  default: ({ children }: { children: string }) => (
    <div data-testid="markdown-content">{children}</div>
  ),
}))

const mockPostData: IPostData = {
  title: 'Test Article Title',
  date: new Date('2024-01-15'),
  tags: ['React', 'TypeScript'],
  summary: 'This is a test summary.',
  author: 'Test Author',
  banner: 'test-banner.jpg',
}

describe('ArticleContent', () => {
  it('should render the banner image', () => {
    render(
      <ArticleContent
        postData={mockPostData}
        postContent="# Test Content\n\nThis is the article body."
      />
    )

    const image = screen.getByAltText('Brush stroke image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/articles/test-banner.jpg')
  })

  it('should render the markdown content', () => {
    render(
      <ArticleContent
        postData={mockPostData}
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
        postData={mockPostData}
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
      <ArticleContent postData={mockPostData} postContent={contentWithCode} />
    )

    expect(container).toMatchSnapshot()
  })

  it('should match snapshot with different banner', () => {
    const differentPostData: IPostData = {
      ...mockPostData,
      banner: 'different-banner.png',
    }

    const { container } = render(
      <ArticleContent
        postData={differentPostData}
        postContent="Different article content"
      />
    )

    expect(container).toMatchSnapshot()
  })
})
