import Image from "next/image";
import React from "react";

const feedbacks = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Participante do evento 2023",
    avatar:
      "https://randomuser.me/api/portraits/women/65.jpg",
    comment:
      "Participar da comunidade mudou minha forma de ver os jogos digitais. Os eventos são incríveis e muito inspiradores!",
    date: "Mar 2024",
  },
  {
    id: 2,
    name: "Carlos Pereira",
    role: "Membro ativo da comunidade",
    avatar:
      "https://randomuser.me/api/portraits/men/43.jpg",
    comment:
      "Os workshops e palestras ajudaram muito no meu desenvolvimento profissional. Ambiente super acolhedor!",
    date: "Fev 2024",
  },
  {
    id: 3,
    name: "Mariana Costa",
    role: "Voluntária e entusiasta",
    avatar:
      "https://randomuser.me/api/portraits/women/22.jpg",
    comment:
      "A troca de experiências e o networking são os pontos altos da comunidade. Recomendo para todos que querem crescer.",
    date: "Jan 2024",
  },
];

const HeroCommunityFeedback = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">
        O que nossa comunidade fala
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {feedbacks.map(({ id, name, role, avatar, comment, date }) => (
          <article
            key={id}
            className="bg-base-200 rounded-lg shadow-lg p-6 flex flex-col"
            role="region"
            aria-labelledby={`feedback-title-${id}`}
          >
            <div className="flex items-center mb-4">
              <Image
                src={avatar}
                alt={`Foto de ${name}`}
                className="w-14 h-14 rounded-full mr-4"
                loading="lazy"
              />
              <div>
                <h3
                  id={`feedback-title-${id}`}
                  className="text-lg font-semibold"
                >
                  {name}
                </h3>
                <p className="text-sm text-muted">{role}</p>
              </div>
            </div>
            <p className="flex-grow leading-relaxed">
              “{comment}”
            </p>
            <time
              dateTime={date}
              className="mt-4 text-xs text-right text-muted"
            >
              {date}
            </time>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HeroCommunityFeedback;
