import Image from "next/image";
import Link from "next/link";

const Logo = ({ imgSrc }) => {
  return (
    <Link href="/">
      <a>
        <Image src={imgSrc} width={150} height={50} alt="Anifowoshe Logo" />
      </a>
    </Link>
  );
};

export default Logo;
