// Format time ago in Arabic
export const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const published = new Date(timestamp);
  const diffInHours = Math.floor((now - published) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return 'قبل ساعة';
  } else if (diffInHours < 15) {
    return `قبل ${diffInHours} ${diffInHours === 1 ? 'ساعة' : diffInHours === 2 ? 'ساعتين' : 'ساعات'}`;
  } else {
    // Format as: day/month/year hour:minute AM/PM
    const day = published.getDate();
    const month = published.getMonth() + 1;
    const year = published.getFullYear();
    let hours = published.getHours();
    const minutes = published.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'مساءً' : 'صباحاً';
    hours = hours % 12 || 12;

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  }
};

// Format price with commas
export const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Get user by ID
export const getUserById = (userId, users) => {
  return users.find(u => u.id === userId);
};
