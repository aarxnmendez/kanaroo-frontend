import React from "react";
import { Github, Linkedin, Mail, UserCircle } from "lucide-react";

const TeamPage = () => {
  const teamMember = {
    name: "Aarón Méndez",
    role: "Fundador y Desarrollador",
    imageUrl: "/aaron-mendez.jpg",
    socials: [
      {
        name: "LinkedIn",
        icon: Linkedin,
        url: "https://www.linkedin.com/in/aaronmendezz/",
      },
      {
        name: "GitHub",
        icon: Github,
        url: "https://github.com/aarxnmendez",
      },
      {
        name: "Email",
        icon: Mail,
        url: "mailto:aarxnmendezz@gmail.com",
      },
    ],
  };

  return (
    <section className="bg-background text-foreground px-4 md:px-16 lg:px-10 2xl:px-16 flex flex-col flex-grow min-h-[100dvh]">
      <div className="max-w-2xl mx-auto py-16 md:py-24 lg:py-32 text-center flex flex-col flex-grow items-center justify-center">
        <header className="mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-4">
            El Equipo Kanaroo
          </h1>
          <p className="text-lg sm:text-xl text-foreground">
            Conoce a las personas detrás del proyecto.
          </p>
        </header>

        <div className="bg-card shadow-xl rounded-3xl p-8 sm:p-10 md:p-12 w-full max-w-md">
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0 mb-6">
              {teamMember.imageUrl ? (
                <img
                  src={teamMember.imageUrl}
                  alt={`Foto de ${teamMember.name}`}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-lg border-4 border-primary/20"
                />
              ) : (
                <UserCircle className="w-32 h-32 sm:w-40 sm:h-40 text-muted-foreground" />
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {teamMember.name}
            </h2>
            <p className="text-primary font-medium text-md sm:text-lg mb-4">
              {teamMember.role}
            </p>
            <div className="flex justify-center space-x-5">
              {teamMember.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.url.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPage;
