/**
 * Formats a number using compact notation
 * @param num - The number to format
 * @param options - Formatting options
 * @returns Formatted number string
 */
export const formatNumber = (num: number, options: { isPercentage?: boolean; isStroop?: boolean } = {}): string => {
  if (options.isPercentage) {
    return `${num.toFixed(2)}%`
  }

  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  })

  if (options.isStroop) {
    const lumens = num / 10000000 // Convert stroops to lumens
    return `${formatter.format(lumens)} XLM`
  }

  return formatter.format(num)
}

/**
 * Formats a percentage with a sign
 * @param num - The number to format
 * @returns Formatted percentage string with sign
 */
export const formatPercentageWithSign = (num: number | null | undefined): string => {
  if (num === undefined) return '-'
  if (num === null) return '+∞'
  const sign = num >= 0 ? '+' : ''
  return `${sign}${num.toFixed(2)}%`
}

/**
 * Truncates a hash string
 * @param hash - The hash to truncate
 * @returns Truncated hash string
 */
export const truncateHash = (hash: string): string => {
  if (hash.length <= 12) return hash
  return `${hash.slice(0, 6)}...${hash.slice(-6)}`
}

/**
 * Converts stroops to lumens
 * @param stroops - The amount in stroops
 * @returns Formatted lumens string
 */
export const convertStroopsToLumens = (stroops: number): string => {
  const lumens = stroops / 10000000
  return `${lumens.toFixed(2)} XLM`
}

/**
 * Converts camelCase to snake_case
 * @param str - The string to convert
 * @returns Converted snake_case string
 */
export const camelToSnakeCase = (str: string): string => {
  return str?.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
}

/**
 * Formats a date string
 * @param dateString - The date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

/**
 * Formats a date string to show only the date (optionally without year)
 * @param dateString - The date string to format
 * @param includeYear - Whether to include the year in the formatted date
 * @returns Formatted date string
 */
export const formatShortDate = (dateString: string, includeYear: boolean = false): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  }

  if (includeYear) {
    options.year = 'numeric'
  }

  return new Date(dateString).toLocaleDateString('en-US', options)
}
