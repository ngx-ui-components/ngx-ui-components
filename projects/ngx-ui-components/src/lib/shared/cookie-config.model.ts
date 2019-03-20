import { CookieLawConsentConfig } from '../cookie-consent/config.model';

export class CookieOptions {
  // Name of the cookie that keeps track of users choice
  // Default: 'cookielawconsent'
  name = 'cookielawconsent';

  // URL path that the cookie 'name' belongs to. The cookie can only be read at this location
  // Default: '/'
  path = '/';

  // The domain that the cookie 'name' belongs to. The cookie can only be read on this domain. Guide to cookie domains
  // Default: <empty string>
  domain: string;

  // The cookies expire date, specified in days (specify -1 for no expiry)
  // Default: 365
  expires = 365;

  // If true the cookie will be created with the secure flag. Secure cookies will only be transmitted via HTTPS.
  secure = false;

  sameSite: string;
}
