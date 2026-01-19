import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import path from 'path'

// Mock the fs module
vi.mock('fs', () => ({
  default: {
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
    existsSync: vi.fn(),
  },
  readdirSync: vi.fn(),
  readFileSync: vi.fn(),
  existsSync: vi.fn(),
}))

// Mock gray-matter
vi.mock('gray-matter', () => ({
  default: vi.fn(),
}))

import fs from 'fs'
import matter from 'gray-matter'
import {
  getListOfPosts,
  getPostContent,
  getPageContent,
  getListOfProjects,
  getProjectContent,
} from './contentHelper'

describe('contentHelper', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('getListOfPosts', () => {
    it('should return only markdown files', () => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'post1.md',
        'post2.md',
        'image.png',
        'notes.txt',
      ] as unknown as ReturnType<typeof fs.readdirSync>)

      const result = getListOfPosts()

      expect(result).toEqual(['post1.md', 'post2.md'])
      expect(fs.readdirSync).toHaveBeenCalledWith(
        path.join(process.cwd(), 'posts')
      )
    })

    it('should return empty array when no markdown files exist', () => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'image.png',
        'notes.txt',
      ] as unknown as ReturnType<typeof fs.readdirSync>)

      const result = getListOfPosts()

      expect(result).toEqual([])
    })
  })

  describe('getPostContent', () => {
    it('should read and parse post content', () => {
      const mockContent = '---\ntitle: Test Post\n---\nContent here'
      const mockParsed = {
        data: { title: 'Test Post' },
        content: 'Content here',
      }

      vi.mocked(fs.readFileSync).mockReturnValue(mockContent)
      vi.mocked(matter).mockReturnValue(mockParsed as unknown as ReturnType<typeof matter>)

      const result = getPostContent('test-post')

      expect(fs.readFileSync).toHaveBeenCalledWith(
        path.join(process.cwd(), 'posts', 'test-post') + '.md',
        'utf8'
      )
      expect(matter).toHaveBeenCalledWith(mockContent)
      expect(result).toEqual(mockParsed)
    })
  })

  describe('getPageContent', () => {
    it('should read and parse page content', () => {
      const mockContent = '---\ntitle: About Page\n---\nPage content'
      const mockParsed = {
        data: { title: 'About Page' },
        content: 'Page content',
      }

      vi.mocked(fs.readFileSync).mockReturnValue(mockContent)
      vi.mocked(matter).mockReturnValue(mockParsed as unknown as ReturnType<typeof matter>)

      const result = getPageContent('about')

      expect(fs.readFileSync).toHaveBeenCalledWith(
        path.join(process.cwd(), 'pages', 'about') + '.md',
        'utf8'
      )
      expect(matter).toHaveBeenCalledWith(mockContent)
      expect(result).toEqual(mockParsed)
    })
  })

  describe('getListOfProjects', () => {
    it('should return only markdown files when folder exists', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true)
      vi.mocked(fs.readdirSync).mockReturnValue([
        'project1.md',
        'project2.md',
        'readme.txt',
      ] as unknown as ReturnType<typeof fs.readdirSync>)

      const result = getListOfProjects()

      expect(result).toEqual(['project1.md', 'project2.md'])
      expect(fs.existsSync).toHaveBeenCalledWith(
        path.join(process.cwd(), 'projects')
      )
    })

    it('should return empty array when folder does not exist', () => {
      vi.mocked(fs.existsSync).mockReturnValue(false)

      const result = getListOfProjects()

      expect(result).toEqual([])
      expect(fs.readdirSync).not.toHaveBeenCalled()
    })
  })

  describe('getProjectContent', () => {
    it('should read and parse project content', () => {
      const mockContent = '---\ntitle: Test Project\n---\nProject description'
      const mockParsed = {
        data: { title: 'Test Project' },
        content: 'Project description',
      }

      vi.mocked(fs.readFileSync).mockReturnValue(mockContent)
      vi.mocked(matter).mockReturnValue(mockParsed as unknown as ReturnType<typeof matter>)

      const result = getProjectContent('test-project')

      expect(fs.readFileSync).toHaveBeenCalledWith(
        path.join(process.cwd(), 'projects', 'test-project') + '.md',
        'utf8'
      )
      expect(matter).toHaveBeenCalledWith(mockContent)
      expect(result).toEqual(mockParsed)
    })
  })
})
