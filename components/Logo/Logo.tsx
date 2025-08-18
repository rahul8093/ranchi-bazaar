import Image from 'next/image';

const Logo = () => (
  <Image src="/logos/companyLogoSimple.png" alt="RanchiBazaar Logo" width={120} height={60} priority />
);

export default Logo;
