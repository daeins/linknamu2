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
  name: "나일등",
  bio: "엔지니어 | 요즘에는 AI 활용에 관심이 많아요",
  image: "/ai.jpg",
  links: [
    {
      id: "github",
      title: "👌 깃허브",
      url: "https://github.com/daeins/",
    },
    {
      id: "blog",
      title: "🎂 블로그",
      url: "https://blog.naver.com/akadanny",
    },
    {
      id: "email",
      title: "🎁 이메일",
      url: "mailto:akadanny4@gmail.com",
    },
  ],
};
