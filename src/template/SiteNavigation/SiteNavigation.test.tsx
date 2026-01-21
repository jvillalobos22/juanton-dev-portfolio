import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import SiteNavigation from "./SiteNavigation";

describe("SiteNavigation", () => {
  it("should render the header element", () => {
    render(<SiteNavigation />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("should render the logo with link to home", () => {
    render(<SiteNavigation />);

    const logoText = screen.getAllByText("JV")[0];
    const homeLink = logoText.closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("should render the navigation menu", () => {
    render(<SiteNavigation />);

    // Desktop and mobile nav both render links, so we check for at least one of each
    const projectLinks = screen.getAllByRole("link", { name: /Projects/i });
    const blogLinks = screen.getAllByRole("link", { name: /Blog/i });
    const aboutLinks = screen.getAllByRole("link", { name: /About/i });

    expect(projectLinks.length).toBeGreaterThan(0);
    expect(blogLinks.length).toBeGreaterThan(0);
    expect(aboutLinks.length).toBeGreaterThan(0);
  });

  /* it('should render the Newsletter button', () => {
    render(<SiteNavigation />)

    const newsletterButton = screen.getByRole('link', { name: 'Newsletter' })
    expect(newsletterButton).toBeInTheDocument()
    expect(newsletterButton).toHaveAttribute(
      'href',
      'https://mailchi.mp/f5a5cde72458/frontend-development-with-juanton'
    )
    expect(newsletterButton).toHaveAttribute('target', '_blank')
  }) */

  /* it('should render the Resume link', () => {
    render(<SiteNavigation />)

    const resumeLink = screen.getByRole('link', { name: 'Resume' })
    expect(resumeLink).toBeInTheDocument()
  }) */

  it("should match snapshot", () => {
    const { container } = render(<SiteNavigation />);

    expect(container).toMatchSnapshot();
  });
});
