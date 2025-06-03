export interface SEOCheckResult {
  check: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  impact: 'high' | 'medium' | 'low';
}

export class SEOMonitor {
  private results: SEOCheckResult[] = [];

  // Check if page has proper title
  checkTitle(): SEOCheckResult {
    const title = document.title;
    const result: SEOCheckResult = {
      check: 'Page Title',
      status: 'pass',
      message: '',
      impact: 'high'
    };

    if (!title) {
      result.status = 'fail';
      result.message = 'Page is missing a title tag';
    } else if (title.length < 30) {
      result.status = 'warning';
      result.message = `Title is too short (${title.length} chars). Recommended: 30-60 characters`;
    } else if (title.length > 60) {
      result.status = 'warning';
      result.message = `Title is too long (${title.length} chars). Recommended: 30-60 characters`;
    } else {
      result.message = `Title length is optimal (${title.length} chars)`;
    }

    this.results.push(result);
    return result;
  }

  // Check meta description
  checkMetaDescription(): SEOCheckResult {
    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const result: SEOCheckResult = {
      check: 'Meta Description',
      status: 'pass',
      message: '',
      impact: 'high'
    };

    if (!metaDesc) {
      result.status = 'fail';
      result.message = 'Page is missing a meta description';
    } else if (metaDesc.length < 120) {
      result.status = 'warning';
      result.message = `Description is too short (${metaDesc.length} chars). Recommended: 120-160 characters`;
    } else if (metaDesc.length > 160) {
      result.status = 'warning';
      result.message = `Description is too long (${metaDesc.length} chars). Recommended: 120-160 characters`;
    } else {
      result.message = `Description length is optimal (${metaDesc.length} chars)`;
    }

    this.results.push(result);
    return result;
  }

  // Check for heading structure
  checkHeadingStructure(): SEOCheckResult {
    const h1s = document.querySelectorAll('h1');
    const h2s = document.querySelectorAll('h2');
    const result: SEOCheckResult = {
      check: 'Heading Structure',
      status: 'pass',
      message: '',
      impact: 'medium'
    };

    if (h1s.length === 0) {
      result.status = 'fail';
      result.message = 'Page is missing an H1 tag';
    } else if (h1s.length > 1) {
      result.status = 'warning';
      result.message = `Multiple H1 tags found (${h1s.length}). Recommended: Use only one H1 per page`;
    } else if (h2s.length === 0) {
      result.status = 'warning';
      result.message = 'No H2 tags found. Consider adding subheadings for better structure';
    } else {
      result.message = `Good heading structure: 1 H1, ${h2s.length} H2 tags`;
    }

    this.results.push(result);
    return result;
  }

  // Check for images without alt text
  checkImageAltText(): SEOCheckResult {
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
    const result: SEOCheckResult = {
      check: 'Image Alt Text',
      status: 'pass',
      message: '',
      impact: 'medium'
    };

    if (imagesWithoutAlt.length > 0) {
      result.status = 'warning';
      result.message = `${imagesWithoutAlt.length} images missing alt text out of ${images.length} total`;
    } else if (images.length === 0) {
      result.status = 'warning';
      result.message = 'No images found on page';
    } else {
      result.message = `All ${images.length} images have alt text`;
    }

    this.results.push(result);
    return result;
  }

  // Check for JSON-LD structured data
  checkStructuredData(): SEOCheckResult {
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    const result: SEOCheckResult = {
      check: 'Structured Data',
      status: 'pass',
      message: '',
      impact: 'high'
    };

    if (jsonLdScripts.length === 0) {
      result.status = 'fail';
      result.message = 'No JSON-LD structured data found';
    } else {
      try {
        const schemas = Array.from(jsonLdScripts).map(script => {
          const data = JSON.parse(script.textContent || '');
          return data['@type'] || 'Unknown';
        });
        result.message = `Found ${jsonLdScripts.length} structured data schemas: ${schemas.join(', ')}`;
      } catch (e) {
        result.status = 'warning';
        result.message = 'Structured data found but contains JSON errors';
      }
    }

    this.results.push(result);
    return result;
  }

  // Check Open Graph tags
  checkOpenGraph(): SEOCheckResult {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const result: SEOCheckResult = {
      check: 'Open Graph',
      status: 'pass',
      message: '',
      impact: 'medium'
    };

    const missing = [];
    if (!ogTitle) missing.push('og:title');
    if (!ogDescription) missing.push('og:description');
    if (!ogImage) missing.push('og:image');

    if (missing.length > 0) {
      result.status = 'warning';
      result.message = `Missing Open Graph tags: ${missing.join(', ')}`;
    } else {
      result.message = 'All essential Open Graph tags present';
    }

    this.results.push(result);
    return result;
  }

  // Check page load performance
  async checkPageSpeed(): Promise<SEOCheckResult> {
    const result: SEOCheckResult = {
      check: 'Page Speed',
      status: 'pass',
      message: '',
      impact: 'high'
    };

    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;

      if (loadTime > 3000) {
        result.status = 'fail';
        result.message = `Page load time is slow: ${Math.round(loadTime)}ms (recommended: <3000ms)`;
      } else if (loadTime > 1500) {
        result.status = 'warning';
        result.message = `Page load time could be improved: ${Math.round(loadTime)}ms (optimal: <1500ms)`;
      } else {
        result.message = `Good page load time: ${Math.round(loadTime)}ms`;
      }
    } else {
      result.status = 'warning';
      result.message = 'Performance API not available';
    }

    this.results.push(result);
    return result;
  }

  // Run all checks
  async runAllChecks(): Promise<SEOCheckResult[]> {
    this.results = [];
    
    this.checkTitle();
    this.checkMetaDescription();
    this.checkHeadingStructure();
    this.checkImageAltText();
    this.checkStructuredData();
    this.checkOpenGraph();
    await this.checkPageSpeed();

    return this.results;
  }

  // Get summary of results
  getSummary() {
    const total = this.results.length;
    const passed = this.results.filter(r => r.status === 'pass').length;
    const warnings = this.results.filter(r => r.status === 'warning').length;
    const failed = this.results.filter(r => r.status === 'fail').length;
    const highImpactIssues = this.results.filter(r => r.impact === 'high' && r.status !== 'pass').length;

    return {
      total,
      passed,
      warnings,
      failed,
      highImpactIssues,
      score: Math.round((passed / total) * 100)
    };
  }
}

// Development-only SEO monitoring
export function initSEOMonitoring() {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    // Add SEO monitoring to window for debugging
    (window as any).seoMonitor = new SEOMonitor();
    
    // Auto-run checks after page load
    window.addEventListener('load', async () => {
      const monitor = new SEOMonitor();
      const results = await monitor.runAllChecks();
      const summary = monitor.getSummary();
      
      console.group('🔍 SEO Analysis');
      console.log(`Score: ${summary.score}/100`);
      console.log(`Passed: ${summary.passed}, Warnings: ${summary.warnings}, Failed: ${summary.failed}`);
      
      if (summary.highImpactIssues > 0) {
        console.warn(`⚠️ ${summary.highImpactIssues} high-impact SEO issues found!`);
      }
      
      results.forEach(result => {
        const emoji = result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
        console.log(`${emoji} ${result.check}: ${result.message}`);
      });
      
      console.groupEnd();
    });
  }
}
