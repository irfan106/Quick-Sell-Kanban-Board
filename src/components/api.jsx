import Avatar from 'react-avatar';

const fetchData = async () => {
  try {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    const data = await response.json();
    
    const usersWithAvatars = data.users.map((user) => ({
      ...user,
      avatar: <Avatar name={user.name} size="25" round />,
    }));
    
    return { ...data, users: usersWithAvatars };
  } catch (error) {
    throw error;
  }
};

export { fetchData };
