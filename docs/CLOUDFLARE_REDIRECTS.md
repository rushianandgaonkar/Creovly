# Cloudflare Redirect Configuration: www to Apex (301)

To consolidate all indexing signals on `https://creovly.com` and eliminate duplicate impressions in Google Search Console:

## Cloudflare Dashboard Setup

1. Log in to the Cloudflare dashboard for **creovly.com**.
2. Navigate to **Rules** → **Redirect Rules** (or **Rules** → **Page Rules**).
3. Click **Create rule**.
4. Configure the rule as follows:

| Field | Configuration |
|---|---|
| **Rule name** | `Redirect www to apex` |
| **Field** | `Hostname` |
| **Operator** | `equals` |
| **Value** | `www.creovly.com` |
| **Expression preview** | `(http.host eq "www.creovly.com")` |
| **Type** | Dynamic |
| **Expression (Target URL)** | `concat("https://creovly.com", http.request.uri.path)` |
| **Status code** | `301` (Moved Permanently) |
| **Preserve query string** | Checked (`true`) |

5. Click **Deploy**.

## Verification

Run curl or test in browser:
```bash
curl -I https://www.creovly.com/tools/youtube-rpm-calculator
```
Expected response:
```http
HTTP/2 301 
location: https://creovly.com/tools/youtube-rpm-calculator
```
