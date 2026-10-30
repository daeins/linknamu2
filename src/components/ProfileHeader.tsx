import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image: string;
};

export default function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={image}
        alt={`${name} 프로필 사진`}
        width={160}
        height={160}
        priority
        className="h-40 w-40 rounded-full object-cover shadow-md ring-4 ring-white dark:ring-gray-800"
      />
      <h1 className="mt-4 text-2xl font-bold">{name}</h1>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{bio}</p>
    </header>
  );
}
