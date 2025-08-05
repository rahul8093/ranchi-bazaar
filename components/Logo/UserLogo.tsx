import Image from 'next/image';

const UserLogo = () => (
  <Image src="/logos/user.svg" alt="RanchiBazaar Logo" width={24} height={24} priority />
);

export default UserLogo;
