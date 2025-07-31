const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://www.alharam.store'; // Alharam Electronics Store
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// Define your site structure - Static Pages
const staticPages = [
  {
    url: '/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: '1.0'
  },
  {
    url: '/shop',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.9'
  },

  {
    url: '/mobileaccessories',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/electronics',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/blog-standard',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.7'
  },
  {
    url: '/blog-no-sidebar',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.7'
  },
  {
    url: '/blog-right-sidebar',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.7'
  },
  {
    url: '/about',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.6'
  },
  {
    url: '/contact',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.6'
  },
  {
    url: '/my-account',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.5'
  },
  {
    url: '/login-register',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.5'
  },
  {
    url: '/cart',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.4'
  },
  {
    url: '/wishlist',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.4'
  },
  {
    url: '/compare',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.4'
  },
  {
    url: '/checkout',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.4'
  }
];

// Sample product slugs (you can replace these with actual product slugs from your Contentful CMS)
// In a real implementation, you would fetch these from your CMS or API
const sampleProductSlugs = [
  'premium-ac-unit-1-ton',
  'split-ac-1-5-ton',
  'window-ac-2-ton',
  'freezer-15-cubic-feet',
  'refrigerator-side-by-side',
  'washing-machine-front-load',
  'microwave-oven-convection',
  'air-purifier-hepa-filter',
  'water-dispenser-cold-hot',
  'electric-kettle-stainless-steel',
  'blender-mixer-grinder',
  'food-processor-multi-function',
  'toaster-4-slice',
  'coffee-maker-automatic',
  'rice-cooker-fuzzy-logic',
  'electric-pressure-cooker',
  'steam-iron-non-stick',
  'vacuum-cleaner-bagless',
  'ceiling-fan-remote-control',
  'table-fan-oscillating'
];

// Generate product pages for sitemap
const generateProductPages = () => {
  return sampleProductSlugs.map(slug => ({
    url: `/product/${slug}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.8'
  }));
};

// Combine static pages and product pages
const getAllPages = () => {
  const productPages = generateProductPages();
  return [...staticPages, ...productPages];
};

// Generate sitemap XML
function generateSitemapXML() {
  const allPages = getAllPages();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  allPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
}

// Write sitemap to file
function writeSitemap() {
  try {
    const sitemapXML = generateSitemapXML();
    const allPages = getAllPages();
    fs.writeFileSync(OUTPUT_PATH, sitemapXML, 'utf8');
    console.log(`✅ Sitemap generated successfully at: ${OUTPUT_PATH}`);
    console.log(`📊 Total pages: ${allPages.length}`);
    console.log(`🏪 Product pages: ${sampleProductSlugs.length}`);
    console.log(`📄 Static pages: ${staticPages.length}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  console.log('🚀 Generating sitemap...');
  writeSitemap();
}

module.exports = { generateSitemapXML, writeSitemap }; 