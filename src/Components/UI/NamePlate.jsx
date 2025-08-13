import Image from "next/image";
import Link from "next/link";
import React from "react";

const NamePlate = () => {
  return (
    <div>
      <Link href={"/"}>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900  bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient flex items-center justify-center">
          <Image
            src={"/icon/icon.png"}
            width={30}
            height={30}
            alt="logo"
          ></Image>
          FrostUI
        </h1>
      </Link>
    </div>
  );
};

export default NamePlate;


// bg-[linear-gradient(135deg,#1f4037,#438875FF,#1f4037)]