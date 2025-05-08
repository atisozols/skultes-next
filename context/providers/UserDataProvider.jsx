import { UserProvider } from '@/context/UserContext';
import { auth } from '@clerk/nextjs/server';

async function fetchUserData() {
  try {
    const authObject = await auth();
    const token = await authObject.getToken();

    const response = await fetch(`${process.env.SERVER_URL}/api/user`, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch user data:', response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

export default async function UserDataProvider({ children }) {
  const userData = await fetchUserData();
  console.log(userData);

  return <UserProvider userData={userData}>{children}</UserProvider>;
}
