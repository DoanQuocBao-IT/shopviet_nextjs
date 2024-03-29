const isBrowser = typeof window !== 'undefined'

let defaultLocale = 'en-US'

if (isBrowser) {
  defaultLocale = navigator.language || 'en-US'
}

function formatNumber(number, locale = defaultLocale) {
  return new Intl.NumberFormat(locale).format(number)
}

function formatDate(date, locale = defaultLocale) {
  if (date instanceof Date && !isNaN(date.getTime())) {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: 'short',
    }).format(date)
  }
  return date
}

function formatDateTime(date, locale = defaultLocale) {
  if (date instanceof Date && !isNaN(date.getTime())) {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: 'short',
      timeStyle: 'medium',
    }).format(date)
  }
  return date
}

export default {
  formatNumber,
  formatDateTime,
  formatDate,
}
