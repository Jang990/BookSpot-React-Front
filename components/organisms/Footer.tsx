import Link from "next/link";

export const Footer = () => {
  const myEmail = "sdsd090811@gmail.com";
  return (
    <footer className="bg-background border-t">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Link Groups */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-sm">
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              © {new Date().getFullYear()} BookSpot
            </h3>
            <p className="text-muted-foreground">책과 만나는 새로운 공간</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">법적고지</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  개인정보 처리 방침
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">리소스</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.data4library.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  도서관 정보나루
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">문의</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${myEmail}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {myEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
