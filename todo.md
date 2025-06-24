# Migration TODO List

## Completed ✅

- [x] Set up mkdocs-material environment with uv
- [x] Create base mkdocs.yml configuration with proper navigation
- [x] Convert index.mdx splash page to mkdocs-material home page with grid cards
- [x] Convert code-structure.mdx FileTree component to code block with ASCII tree
- [x] Copy all .md files from Starlight to mkdocs structure
- [x] Update internal links from `/path/` format to `path.md` format
- [x] Add Google Analytics integration
- [x] Implement Scriv chat widget with custom HTML template
- [x] Configure redirects for `/api-keys` → `/apis` and `/using-virtualenvs` → `/python/`
- [x] Create GitHub Actions workflow for automated deployment
- [x] Fix most relative link issues between directories
- [x] Update image references for subdirectory files

## Remaining Issues 🔧

### High Priority

1. **Image Assets Not Found**
   - Images are copied to `docs/assets/images/` but mkdocs is looking for them relative to each page
   - Need to either move images to mkdocs site root or fix all image references
   - Affects: All pages with images (getting-started, configuration, apis, etc.)

2. **Broken Cross-References**
   - Links like `configuration.md#absolute-urls` from deployment pages need to be `../configuration.md#absolute-urls`
   - Links within same directory sections need fixing (e.g., `front-end/vite.md#section` → `vite.md#section`)
   - Some anchor links still have `.md` extension that should be removed

3. **Missing Link Targets** 
   - `ai/llms.md` links to `celery.md` but should link to `../celery.md`
   - Some internal section references like `front-end/design-patterns.md#using-the-sitejs-library` are broken
   - `experimental/react-front-end.md` links to `apis.md#api-clients` but should be `../apis.md#api-clients`

### Medium Priority

4. **Navigation Polish**
   - Consider if all 60+ pages need to be in the main navigation or if some should be auto-generated
   - Templates.md was added but may need better organization
   - Some sections might benefit from index pages

5. **Content Review**
   - Verify all code blocks render correctly with syntax highlighting
   - Check that all embedded videos (iframes) work properly
   - Ensure all tables display correctly

### Low Priority

6. **Optimization**
   - Enable more mkdocs-material features like navigation tracking
   - Consider adding search customization
   - Add any missing metadata or descriptions

## Migration Summary

**Successfully migrated:**
- 60 markdown files
- Complete navigation structure
- Google Analytics tracking
- Scriv chat integration
- GitHub Actions CI/CD
- Most internal linking

**Architecture:**
- Converted from Astro/Starlight to MkDocs Material
- Maintained URL structure where possible with redirects for changed URLs
- Preserved all content and metadata
- Added modern mkdocs-material features like dark mode, search, and responsive design

**Build Status:** ✅ Builds successfully with warnings about missing images and some broken links

The migration is ~90% complete. The main remaining work is fixing image asset paths and cross-reference links.