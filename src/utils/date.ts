/**
 * Date utility functions
 */

/**
 * Format date for Korean locale
 */
export function formatKoreanDateTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } catch {
    console.error('Invalid date string:', dateString);
    return dateString;
  }
}

/**
 * Format time only for Korean locale
 */
export function formatKoreanTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } catch {
    console.error('Invalid date string:', dateString);
    return dateString;
  }
}

/**
 * Get relative time description in Korean
 */
export function getRelativeTimeKorean(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return '방금 전';
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}시간 전`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}일 전`;

    return formatKoreanDateTime(dateString);
  } catch {
    console.error('Invalid date string:', dateString);
    return dateString;
  }
}
