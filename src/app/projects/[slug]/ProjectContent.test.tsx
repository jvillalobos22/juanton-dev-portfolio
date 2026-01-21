import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/test-utils'
import ProjectContent from './ProjectContent'

// Mock react-markdown
vi.mock('react-markdown', () => ({
  default: ({ children }: { children: string }) => (
    <div data-testid="markdown-content">{children}</div>
  ),
}))

describe('ProjectContent', () => {
  it('should render the markdown content', () => {
    render(
      <ProjectContent
        projectContent="# Test Project\n\nThis is the project description."
      />
    )

    const markdownContent = screen.getByTestId('markdown-content')
    expect(markdownContent).toBeInTheDocument()
    expect(markdownContent.textContent).toContain('# Test Project')
    expect(markdownContent.textContent).toContain('This is the project description.')
  })

  it('should match snapshot', () => {
    const { container } = render(
      <ProjectContent
        projectContent="# Test Project\n\nSome markdown content here."
      />
    )

    expect(container).toMatchSnapshot()
  })

  it('should match snapshot with code block', () => {
    const contentWithCode = `
# Project Code

Here's some code:

\`\`\`typescript
interface Project {
  name: string;
  version: string;
}
\`\`\`
`
    const { container } = render(
      <ProjectContent projectContent={contentWithCode} />
    )

    expect(container).toMatchSnapshot()
  })
})
