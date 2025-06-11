import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQ() {
  const [openItemId, setOpenItemId] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "¿Kanaroo es realmente gratis?",
      answer:
        "Sí, actualmente Kanaroo es completamente gratuito y te da acceso a todas sus funcionalidades para que puedas organizar tu trabajo y proyectos sin coste alguno.",
    },
    {
      id: 2,
      question: "¿Puedo usar Kanaroo en múltiples dispositivos?",
      answer:
        "¡Absolutamente! Kanaroo está diseñado para sincronizarse perfectamente entre tu computadora, tablet y smartphone, para que tengas acceso a tu información donde quiera que estés.",
    },
    {
      id: 3,
      question: "¿Mis datos están seguros con Kanaroo?",
      answer:
        "La seguridad de tus datos es nuestra máxima prioridad. Utilizamos encriptación y seguimos las mejores prácticas de la industria para proteger tu información personal y la de tus proyectos.",
    },
    {
      id: 4,
      question: "¿Cómo puedo empezar a usar Kanaroo?",
      answer:
        "Es muy sencillo. Simplemente busca el botón de registro en nuestra página, crea tu cuenta en pocos segundos y ¡listo! Podrás empezar a organizar tus tareas y proyectos de inmediato.",
    },
    {
      id: 5,
      question: "¿Puedo colaborar con mi equipo en Kanaroo?",
      answer:
        "Sí, Kanaroo te permite invitar a miembros a tus proyectos, asignar tareas y trabajar en conjunto para alcanzar objetivos comunes. Facilitamos la colaboración para que tu equipo esté siempre sincronizado.",
    },
    {
      id: 6,
      question: "¿Qué tan personalizable es Kanaroo?",
      answer:
        "Actualmente puedes personalizar tus tareas mediante etiquetas para una mejor organización. Estamos trabajando para ofrecerte más opciones de personalización en el futuro y así adaptar Kanaroo aún más a tu flujo de trabajo.",
    },
    {
      id: 7,
      question: "¿Qué tipo de soporte ofrecen si tengo problemas o preguntas?",
      answer:
        "Puedes contactar a nuestro equipo de soporte directamente a través de support@kanaroo.com para asistencia personalizada si tienes alguna duda o encuentras algún problema.",
    },
    {
      id: 8,
      question: "¿Hay planes para nuevas funcionalidades en el futuro?",
      answer:
        "¡Siempre estamos trabajando para mejorar Kanaroo! Tenemos muchas ideas emocionantes y nuevas funcionalidades en desarrollo, incluyendo integraciones con calendarios populares, opciones de vista de cronograma para proyectos y reportes de productividad mejorados. ¡Mantente atento a nuestras actualizaciones!",
    },
    {
      id: 9,
      question: "¿Para qué tipo de proyectos o trabajo es ideal Kanaroo?",
      answer:
        "Kanaroo es versátil y perfecto para gestionar proyectos personales, listas de tareas diarias, planificación de estudios, seguimiento de hábitos, y también para pequeños equipos que necesitan organizar su trabajo de forma visual y colaborativa.",
    },
  ];

  const handleToggle = (itemId) => {
    setOpenItemId((prevOpenItemId) =>
      prevOpenItemId === itemId ? null : itemId
    );
  };

  return (
    <section className="px-4 md:px-16 lg:px-10 2xl:px-16 bg-background">
      <div className="max-w-7xl mx-auto py-16 md:py-20 lg:py-32">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg lg:text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
            Encuentra respuestas a las consultas más comunes sobre Kanaroo y
            cómo puede ayudarte a ser más productivo.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item) => (
            <details
              key={item.id}
              open={openItemId === item.id}
              onToggle={(e) => {
                if (openItemId === item.id && !e.target.open) {
                  setOpenItemId(null);
                } else if (openItemId !== item.id && e.target.open) {
                  setOpenItemId(item.id);
                }
              }}
              className="group bg-card border border-muted/70 p-4 sm:p-6 rounded-xl shadow-sm open:shadow-md transition-shadow duration-300"
            >
              <summary
                className="flex items-center justify-between cursor-pointer list-none"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle(item.id);
                }}
              >
                <h3 className="text-lg font-semibold text-card-foreground">
                  {item.question}
                </h3>
                <ChevronDown className="h-5 w-5 text-muted-foreground group-open:text-primary group-open:rotate-180 transition-all duration-300" />
              </summary>
              <p className="text-card-foreground/80 mt-3 pt-3 border-t border-muted/50 leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
