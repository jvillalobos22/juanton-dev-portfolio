import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import ArticleListing from './ArticleListing'
import { IPostData } from '@/interface/posts'

const mockPostData: IPostData = {
  title: 'Test Article Title',
  date: new Date('2024-01-15'),
  tags: ['React', 'TypeScript', 'Testing'],
  summary: 'This is a test summary for the article.',
  author: 'Test Author',
  banner: 'test-banner.jpg',
}

describe('ArticleListing', () => {
  it('should render the article title as a link', () => {
    render(
      <ArticleListing
        postContent="Test content"
        postData={mockPostData}
        slug="test-article"
      />
    )

    const titleLink = screen.getByRole('link', { name: 'Test Article Title' })
    expect(titleLink).toBeInTheDocument()
    expect(titleLink).toHaveAttribute('href', 'blog/test-article')
  })

  it('should render the article summary', () => {
    render(
      <ArticleListing
        postContent="Test content"
        postData={mockPostData}
        slug="test-article"
      />
    )

    expect(
      screen.getByText('This is a test summary for the article.')
    ).toBeInTheDocument()
  })

  it('should render the banner image', () => {
    render(
      <ArticleListing
        postContent="Test content"
        postData={mockPostData}
        slug="test-article"
      />
    )

    const image = screen.getByAltText('Brush stroke image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/articles/test-banner.jpg')
  })

  it('should render all tags as chips', () => {
    render(
      <ArticleListing
        postContent="Test content"
        postData={mockPostData}
        slug="test-article"
      />
    )

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Testing')).toBeInTheDocument()
  })

  it('should match snapshot', () => {
    const { container } = render(
      <ArticleListing
        postContent="Test content"
        postData={mockPostData}
        slug="test-article"
      />
    )

    expect(container).toMatchSnapshot()
  })

  it('should match snapshot with different data', () => {
    const differentPostData: IPostData = {
      title: 'Another Article',
      date: new Date('2024-02-20'),
      tags: ['JavaScript'],
      summary: 'A different summary.',
      author: 'Another Author',
      banner: 'another-banner.png',
    }

    const { container } = render(
      <ArticleListing
        postContent="Different content"
        postData={differentPostData}
        slug="another-article"
      />
    )

    expect(container).toMatchSnapshot()
  })
})
