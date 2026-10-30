export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description?: string;
};

export type Profile = {
  name: string;
  bio: string;
  image: string;
  links: LinkItem[];
};

// TODO(내용 채우기): 아래는 보여 주기용 더미 값입니다. 진짜 프로필·링크로 교체하세요.
// id는 클릭 수 집계 키로 쓰이므로 한 번 정하면 바꾸지 않는 것이 좋습니다.
export const profile: Profile = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
  image: "/profile.svg",
  links: [
    {
      id: "github",
      title: "GitHub",
      url: "https://github.com",
      description: "코드 저장소",
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      url: "https://www.linkedin.com",
      description: "경력 · 이력",
    },
    {
      id: "blog",
      title: "블로그",
      url: "https://velog.io",
      description: "개발 기록",
    },
  ],
};
