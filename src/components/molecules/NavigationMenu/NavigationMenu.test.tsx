import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import NavigationMenu from './NavigationMenu'

describe('NavigationMenu', () => {
  it('should render all navigation links', () => {
    render(<NavigationMenu />)

    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Skills' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('should have correct href attributes', () => {
    render(<NavigationMenu />)

    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '/projects'
    )
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute(
      'href',
      '/blog'
    )
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute(
      'href',
      '/skills'
    )
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about'
    )
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '/contact'
    )
  })

  it('should render as an unordered list', () => {
    render(<NavigationMenu />)

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    expect(list.tagName).toBe('UL')
  })

  it('should match snapshot', () => {
    const { container } = render(<NavigationMenu />)

    expect(container).toMatchSnapshot()
  })
})
