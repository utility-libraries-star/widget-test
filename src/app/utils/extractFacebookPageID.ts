const PAGE_ID_PATTERN = /^\d+$/;

export function extractFacebookPageID(url: string) {
  const regexPatterns = [
    // https://www.facebook.com/profile.php?id={NUMERIC-ID}
    /facebook\.com\/profile\.php\?id=(\d+)/,

    // https://www.facebook.com/p/{SOME-COMPANY-NAME}-{NUMERIC-ID}
    /facebook\.com\/p\/([\w\-.]+)-(\d+)/,

    // https://www.facebook.com/people/{SOME-COMPANY-NAME}/{NUMERIC-ID}
    /facebook\.com\/people\/([\w\-.]+)\/(\d+)/,

    // https://www.facebook.com/{SOME-COMPANY-NAME}-{NUMERIC-ID}
    /facebook\.com\/([\w\-.]+)-(\d+)/,

    // https://www.facebook.com/{SOME-COMPANY-NAME} (без ID)
    /facebook\.com\/([\w\-.]+)\/?$/
  ];

  if (PAGE_ID_PATTERN.test(url)) {
    return url.trim();
  }

  for (const pattern of regexPatterns) {
    const match = url.match(pattern);
    if (match) {
      if (match.length === 2) {
        return match[1];
      } else if (match.length >= 3) {
        return `${match[1]} (ID: ${match[2]})`;
      }
    }
  }

  return null;
}
