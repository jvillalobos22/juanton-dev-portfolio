import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import SiteNavigation from './SiteNavigation'

describe('SiteNavigation', () => {
  it('should render the header element', () => {
    render(<SiteNavigation />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('should render the logo with link to home', () => {
    render(<SiteNavigation />)

    const homeLinks = screen.getAllByRole('link', { name: /juanton logo/i })
    expect(homeLinks.length).toBeGreaterThan(0)
    expect(homeLinks[0]).toHaveAttribute('href', '/')
  })

  it('should render both light and dark mode logo images', () => {
    render(<SiteNavigation />)

    const logos = screen.getAllByAltText('Juanton Logo')
    expect(logos).toHaveLength(2)
    expect(logos[0]).toHaveAttribute(
      'src',
      '/images/juanton-logo-black.png'
    )
    expect(logos[1]).toHaveAttribute(
      'src',
      '/images/juanton-logo-white.png'
    )
  })

  it('should render the navigation menu', () => {
    render(<SiteNavigation />)

    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument()
  })

  it('should render the Newsletter button', () => {
    render(<SiteNavigation />)

    const newsletterButton = screen.getByRole('link', { name: 'Newsletter' })
    expect(newsletterButton).toBeInTheDocument()
    expect(newsletterButton).toHaveAttribute(
      'href',
      'https://mailchi.mp/f5a5cde72458/frontend-development-with-juanton'
    )
    expect(newsletterButton).toHaveAttribute('target', '_blank')
  })

  it('should render the Resume link', () => {
    render(<SiteNavigation />)

    const resumeLink = screen.getByRole('link', { name: 'Resume' })
    expect(resumeLink).toBeInTheDocument()
  })

  it('should match snapshot', () => {
    const { container } = render(<SiteNavigation />)

    expect(container).toMatchSnapshot()
  })
})
