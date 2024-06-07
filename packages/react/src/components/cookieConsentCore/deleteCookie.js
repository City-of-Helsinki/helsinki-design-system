import { serialize } from 'cookie';

/**
 * Deletes a cookie with the specified name in all contexts like subdomains.
 * @param {string} cookieName - The name of the cookie to delete.
 */
const deleteCookie = (cookieName) => {
  /**
   * Retrieves the value of a cookie by its name.
   *
   * @param {string} name - The name of the cookie.
   * @return {string|null} The value of the cookie, or null if the cookie does not exist.
   */
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  /**
   * Deletes a cookie by setting it to expire in the past.
   *
   * @param {string} name - The name of the cookie to delete.
   * @param {string} path - The path of the cookie.
   * @param {string} domain - The domain of the cookie.
   */
  function setDeletionCookie(name, path, domain) {
    // console.log('Deleting cookie:', name, path, domain);
    const cookieOptions = {
      expires: new Date(0), // Set to a past date to expire the cookie
      path,
      domain,
    };
    // Using 'cookie' library to serialize the cookie string
    const serializedCookie = serialize(name, '', cookieOptions);
    // console.log('Deleting cookie:', name, serializedCookie);
    document.cookie = serializedCookie;
  }

  // Get the current hostname and pathname
  const { hostname, pathname } = window.location;

  // Only proceed if the cookie is still set
  if (getCookie(cookieName) !== null) {
    setDeletionCookie(cookieName, '/', undefined);
    if (getCookie(cookieName) !== null) {
      // Break down the hostname into parts for domain variations
      const domains = hostname.split('.');
      while (domains.length > 1) {
        const domain = `${domains.join('.')}`;
        const paths = pathname.split('/');
        let currentPath = '';

        // Set cookies on all path levels
        paths.forEach((segment, index) => {
          if (segment || index === 0) {
            // Include root path
            currentPath += segment + (index < paths.length - 1 ? '/' : ''); // Append '/' if it's not the last segment
            if (getCookie(cookieName) !== null) {
              setDeletionCookie(cookieName, currentPath, domain);
              setDeletionCookie(cookieName, currentPath, `.${domain}`);
            }
          }
        });

        // Also set cookie at the root '/' for each domain level
        if (getCookie(cookieName) !== null) {
          setDeletionCookie(cookieName, '/', domain);
          setDeletionCookie(cookieName, '/', `.${domain}`);
        }

        domains.shift(); // Remove the leading part to move up one subdomain level
      }

      // Also attempt to delete at the highest level domain without subdomain prefix
      if (getCookie(cookieName) !== null) {
        setDeletionCookie(cookieName, '/', `${domains.join('.')}`);
        setDeletionCookie(cookieName, '/', `.${domains.join('.')}`);
      }
    }
  }
};

export default deleteCookie;
