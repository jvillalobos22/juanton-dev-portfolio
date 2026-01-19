import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import ProjectListing from './ProjectListing'
import { IProjectData } from '@/interface/projects'

const mockProjectData: IProjectData = {
  title: 'Test Project Title',
  date: new Date('2024-01-15'),
  tags: ['React', 'TypeScript', 'Next.js'],
  summary: 'This is a test summary for the project.',
  banner: 'test-project-banner.jpg',
  githubUrl: 'https://github.com/test/project',
  liveUrl: 'https://test-project.com',
}

describe('ProjectListing', () => {
  it('should render the project title as a link', () => {
    render(
      <ProjectListing
        projectContent="Test content"
        projectData={mockProjectData}
        slug="test-project"
      />
    )

    const titleLink = screen.getByRole('link', { name: 'Test Project Title' })
    expect(titleLink).toBeInTheDocument()
    expect(titleLink).toHaveAttribute('href', 'projects/test-project')
  })

  it('should render the project summary', () => {
    render(
      <ProjectListing
        projectContent="Test content"
        projectData={mockProjectData}
        slug="test-project"
      />
    )

    expect(
      screen.getByText('This is a test summary for the project.')
    ).toBeInTheDocument()
  })

  it('should render the banner image when provided', () => {
    render(
      <ProjectListing
        projectContent="Test content"
        projectData={mockProjectData}
        slug="test-project"
      />
    )

    const image = screen.getByAltText('Test Project Title project image')
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
      <ProjectListing
        projectContent="Test content"
        projectData={projectDataWithoutBanner}
        slug="test-project"
      />
    )

    expect(
      screen.queryByAltText('Test Project Title project image')
    ).not.toBeInTheDocument()
  })

  it('should render all tags as chips', () => {
    render(
      <ProjectListing
        projectContent="Test content"
        projectData={mockProjectData}
        slug="test-project"
      />
    )

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
  })

  it('should not render tags section when tags array is empty', () => {
    const projectDataWithoutTags: IProjectData = {
      ...mockProjectData,
      tags: [],
    }

    const { container } = render(
      <ProjectListing
        projectContent="Test content"
        projectData={projectDataWithoutTags}
        slug="test-project"
      />
    )

    expect(container.querySelector('.MuiChip-root')).not.toBeInTheDocument()
  })

  it('should match snapshot with full data', () => {
    const { container } = render(
      <ProjectListing
        projectContent="Test content"
        projectData={mockProjectData}
        slug="test-project"
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
      <ProjectListing
        projectContent="Test content"
        projectData={projectDataWithoutBanner}
        slug="no-banner-project"
      />
    )

    expect(container).toMatchSnapshot()
  })

  it('should match snapshot without tags', () => {
    const projectDataWithoutTags: IProjectData = {
      ...mockProjectData,
      tags: [],
    }

    const { container } = render(
      <ProjectListing
        projectContent="Test content"
        projectData={projectDataWithoutTags}
        slug="no-tags-project"
      />
    )

    expect(container).toMatchSnapshot()
  })
})
