import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/test-utils'
import ProjectContent from './ProjectContent'
import { IProjectData } from '@/interface/projects'

// Mock react-markdown
vi.mock('react-markdown', () => ({
  default: ({ children }: { children: string }) => (
    <div data-testid="markdown-content">{children}</div>
  ),
}))

const mockProjectData: IProjectData = {
  title: 'Test Project Title',
  date: new Date('2024-01-15'),
  tags: ['React', 'TypeScript'],
  summary: 'This is a test summary.',
  banner: 'test-project-banner.jpg',
  githubUrl: 'https://github.com/test/project',
  liveUrl: 'https://test-project.com',
}

describe('ProjectContent', () => {
  it('should render the banner image when provided', () => {
    render(
      <ProjectContent
        projectData={mockProjectData}
        projectContent="# Test Project\n\nThis is the project description."
      />
    )

    const image = screen.getByAltText('Test Project Title project banner')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute(
      'src',
      '/images/projects/test-project-banner.jpg'
    )
  })

  it('should not render banner image when not provided', () => {
    const projectDataWithoutBanner: IProjectData = {
      ...mockProjectData,
      banner: undefined,
    }

    render(
      <ProjectContent
        projectData={projectDataWithoutBanner}
        projectContent="# Test Project\n\nThis is the project description."
      />
    )

    expect(
      screen.queryByAltText('Test Project Title project banner')
    ).not.toBeInTheDocument()
  })

  it('should render the markdown content', () => {
    render(
      <ProjectContent
        projectData={mockProjectData}
        projectContent="# Test Project\n\nThis is the project description."
      />
    )

    const markdownContent = screen.getByTestId('markdown-content')
    expect(markdownContent).toBeInTheDocument()
    expect(markdownContent.textContent).toContain('# Test Project')
    expect(markdownContent.textContent).toContain('This is the project description.')
  })

  it('should match snapshot with banner', () => {
    const { container } = render(
      <ProjectContent
        projectData={mockProjectData}
        projectContent="# Test Project\n\nSome markdown content here."
      />
    )

    expect(container).toMatchSnapshot()
  })

  it('should match snapshot without banner', () => {
    const projectDataWithoutBanner: IProjectData = {
      ...mockProjectData,
      banner: undefined,
    }

    const { container } = render(
      <ProjectContent
        projectData={projectDataWithoutBanner}
        projectContent="# Project Without Banner\n\nContent here."
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
      <ProjectContent
        projectData={mockProjectData}
        projectContent={contentWithCode}
      />
    )

    expect(container).toMatchSnapshot()
  })
})
