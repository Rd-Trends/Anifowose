import Image from "next/image";

const Logo = ({ imgSrc }) => {
  return <Image src={imgSrc} width={150} height={50} alt="Anifowoshe Logo" />;
};

export default Logo;
