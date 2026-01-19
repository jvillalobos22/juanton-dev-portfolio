import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import NavigationItem from './NavigationItem'

describe('NavigationItem', () => {
  it('should render as a list item by default', () => {
    const { container } = render(
      <NavigationItem href="/test" element="li">
        Test Link
      </NavigationItem>
    )

    const listItem = container.querySelector('li')
    expect(listItem).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveTextContent('Test Link')
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
  })

  it('should render as a div when element prop is "div"', () => {
    const { container } = render(
      <NavigationItem href="/about" element="div">
        About Link
      </NavigationItem>
    )

    const divElement = container.querySelector('div')
    expect(divElement).toBeInTheDocument()
    expect(container.querySelector('li')).not.toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <NavigationItem href="/test" element="li" className="custom-class">
        Test Link
      </NavigationItem>
    )

    const listItem = container.querySelector('li')
    expect(listItem).toHaveClass('custom-class')
  })

  it('should match snapshot with li element', () => {
    const { container } = render(
      <NavigationItem href="/projects" element="li">
        Projects
      </NavigationItem>
    )

    expect(container).toMatchSnapshot()
  })

  it('should match snapshot with div element', () => {
    const { container } = render(
      <NavigationItem href="/blog" element="div" className="nav-item">
        Blog
      </NavigationItem>
    )

    expect(container).toMatchSnapshot()
  })
})
