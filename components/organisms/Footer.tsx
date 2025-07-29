export const Footer = () => {
  const myEmail = "sdsd090811@gmail.com";
  return (
    <footer className="">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center bg-background border-t">
        <p className="text-sm text-muted-foreground">
          <span className="cursor-default">문의: </span>
          <a
            href={`mailto:${myEmail}`}
            className="text-primary hover:underline"
          >
            {myEmail}
          </a>
        </p>
        <p className="cursor-default text-muted-foreground">© 2025 BookSpot</p>
      </div>
    </footer>
  );
};
