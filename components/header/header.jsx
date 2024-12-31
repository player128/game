import Image from "next/image";
import logoSrc from "./logo.svg";
import avatarSrc from "./avatar.png";

export function Header() {
  return (
    <header className="flex h-24 items-center px-8 bg-white shadow-lg">
      <Image src={logoSrc} alt="logo" />
      <div className="w-px h-8 bg-slate-200 mx-6" />
      <button className="w-44 bg-teal-600 text-white rounded-lg px-5 py-2 text-2xl leading-tight hover:bg-teal-500 transition-colors">
        Играть
      </button>
      <button className="ml-auto flex items-center gap-2 text-start text-teal-600 hover:text-teal-500 transition-colors">
        <Image
          src={avatarSrc}
          width={48}
          height={48}
          alt="avatar"
          unoptimized
        />
        <div>
          <div className="text-lg leading-tight">Paromovevg</div>
          <div className="text-slate-400 text-xs leading-tight">
            Рейтинг: 1230
          </div>
        </div>
        <svg
          width="13"
          height="7"
          viewBox="0 0 13 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.18753 6.75003C6.04368 6.75003 5.89968 6.69505 5.78985 6.58522L0.164848 0.960222C-0.0549492 0.740426 -0.0549492 0.384504 0.164848 0.164848C0.384645 -0.0548086 0.740566 -0.0549492 0.960222 0.164848L6.18753 5.39216L11.4148 0.164848C11.6346 -0.0549492 11.9906 -0.0549492 12.2102 0.164848C12.4299 0.384645 12.43 0.740566 12.2102 0.960222L6.58522 6.58522C6.47539 6.69505 6.33139 6.75003 6.18753 6.75003Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </header>
  );
}
