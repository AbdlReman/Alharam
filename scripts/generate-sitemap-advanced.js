const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://www.alharam.store'; // Alharam Electronics Store
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// Contentful configuration (you'll need to add your Contentful credentials)
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID || 'your-space-id';
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN || 'your-access-token';

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

// Fetch product slugs from Contentful CMS
async function fetchProductSlugs() {
  try {
    // If Contentful credentials are not configured, use sample data
    if (CONTENTFUL_SPACE_ID === 'your-space-id' || CONTENTFUL_ACCESS_TOKEN === 'your-access-token') {
      console.log('⚠️  Contentful credentials not configured. Using sample product slugs.');
      return getSampleProductSlugs();
    }

    const response = await fetch(
      `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/entries?content_type=product&select=fields.slug&limit=1000`,
      {
        headers: {
          'Authorization': `Bearer ${CONTENTFUL_ACCESS_TOKEN}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Contentful API error: ${response.status}`);
    }

    const data = await response.json();
    const slugs = data.items.map(item => item.fields.slug).filter(Boolean);
    
    console.log(`✅ Fetched ${slugs.length} product slugs from Contentful`);
    return slugs;
  } catch (error) {
    console.error('❌ Error fetching product slugs from Contentful:', error.message);
    console.log('🔄 Falling back to sample product slugs...');
    return getSampleProductSlugs();
  }
}

// Sample product slugs for fallback
function getSampleProductSlugs() {
  return [
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
    'table-fan-oscillating',
    'ac-inverter-1-ton',
    'ac-portable-12000-btu',
    'freezer-upright-20-cubic-feet',
    'refrigerator-french-door',
    'dishwasher-built-in',
    'oven-electric-convection',
    'dryer-front-load',
    'dehumidifier-50-pint',
    'humidifier-ultrasonic',
    'air-conditioner-mini-split'
  ];
}

// Generate product pages for sitemap
function generateProductPages(productSlugs) {
  return productSlugs.map(slug => ({
    url: `/product/${slug}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.8'
  }));
}

// Combine static pages and product pages
function getAllPages(productSlugs) {
  const productPages = generateProductPages(productSlugs);
  return [...staticPages, ...productPages];
}

// Generate sitemap XML
function generateSitemapXML(productSlugs) {
  const allPages = getAllPages(productSlugs);
  
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
async function writeSitemap() {
  try {
    console.log('🚀 Generating sitemap...');
    console.log('📡 Fetching product slugs...');
    
    const productSlugs = await fetchProductSlugs();
    const sitemapXML = generateSitemapXML(productSlugs);
    const allPages = getAllPages(productSlugs);
    
    fs.writeFileSync(OUTPUT_PATH, sitemapXML, 'utf8');
    
    console.log(`✅ Sitemap generated successfully at: ${OUTPUT_PATH}`);
    console.log(`📊 Total pages: ${allPages.length}`);
    console.log(`🏪 Product pages: ${productSlugs.length}`);
    console.log(`📄 Static pages: ${staticPages.length}`);
    
    // Show some sample product URLs
    if (productSlugs.length > 0) {
      console.log('\n📋 Sample product URLs:');
      productSlugs.slice(0, 5).forEach(slug => {
        console.log(`   ${BASE_URL}/product/${slug}`);
      });
      if (productSlugs.length > 5) {
        console.log(`   ... and ${productSlugs.length - 5} more`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  writeSitemap();
}

module.exports = { 
  generateSitemapXML, 
  writeSitemap, 
  fetchProductSlugs,
  getAllPages 
}; 