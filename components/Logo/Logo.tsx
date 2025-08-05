import Image from 'next/image';

const Logo = () => (
  <Image src="/logos/logo.svg" alt="RanchiBazaar Logo" width={90} height={40} priority />
);

export default Logo;
