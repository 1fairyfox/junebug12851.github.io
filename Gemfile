# fairyfox.io — Jekyll dependencies.
# Built by GitHub Actions with `bundle exec jekyll build` (see
# .github/workflows/pages.yml), so we are NOT limited to the github-pages gem's
# pinned plugin allowlist — plain Jekyll + the plugins below.

source "https://rubygems.org"

gem "jekyll", "~> 4.3"

group :jekyll_plugins do
  gem "jekyll-feed",     "~> 0.17"   # /feed.xml Atom feed
  gem "jekyll-seo-tag",  "~> 2.8"    # <head> SEO + Open Graph tags
  gem "jekyll-sitemap",  "~> 1.4"    # sitemap.xml
end

# Windows / JRuby timezone data (harmless elsewhere).
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Ruby 3.4 dropped some libraries from the default gems — keep local builds happy.
gem "webrick", "~> 1.8"
gem "csv"
gem "base64"
gem "bigdecimal"
