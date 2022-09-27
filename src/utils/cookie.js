const Cookie = {
  set: function (name, value, days = 2, subdomainOnly) {
    var domain, domainParts, date, expires, host;

    if (days) {
      date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toGMTString();
    } else {
      expires = '';
    }

    domain = '';
    host = window.location.host;
    domainParts = host.split('.');

    if (!subdomainOnly) {
      domain = host;
    } else {
      // Store cross subdomains cookie
      domain = !domainParts.some(
        d => d === `localhost${window.location.port ? ':' + window.location.port : ''}`
      )
        ? '.' + domainParts[domainParts.length - 2] + '.' + domainParts[domainParts.length - 1]
        : 'localhost';
    }

    if (window.location.port) {
      domain = domain.replace(`:${window.location.port}`, '');
    }

    document.cookie = name + '=' + value + expires + '; path=/; domain=' + domain;
  },
  get: function (name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }

      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  erase: function (name) {
    let domain = window.location.host;

    if (window.location.port) {
      domain = domain.replace(`:${window.location.port}`, '');
    }

    document.cookie = name + '=; expires=Mon, 01 Mar 1980 00:00:01 GMT; path=/; domain=' + domain;
  }
};

export default Cookie;
