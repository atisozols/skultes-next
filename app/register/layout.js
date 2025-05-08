import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

export default async function RegisterLayout({ children }) {
  const { userId } = await auth();

  console.log(userId);

  if (userId) {
    redirect('/');
  }

  return children;
}
