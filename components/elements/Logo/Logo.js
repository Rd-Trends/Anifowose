import Image from "next/image";
import Link from "next/link";

const Logo = ({ imgSrc }) => {
  return (
    <Link href="/">
      <a>
        <Image
          src={imgSrc}
          width={200}
          height={35}
          alt="Anifowose Logo"
          priority
        />
      </a>
    </Link>
  );
};

export default Logo;
