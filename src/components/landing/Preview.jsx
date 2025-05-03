import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";

function Preview() {
  return (
    <>
      <section
        id="preview-section"
        aria-label="Product preview showcase"
        className="relative flex flex-col items-center justify-center w-9/10 lg:w-3/4 py-4 md:py-8 lg:py-16"
      >
        {/* Background gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, var(--background) 30%, transparent 50%)",
            zIndex: 10,
          }}
        />

        <AspectRatio
          ratio={16 / 9}
          className="bg-transparent overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-4xl cursor-pointer"
          onClick={() =>
            window.open("https://placehold.co/1920x1080", "_blank")
          }
        >
          <BlurFade duration={0.6} delay={0.4} offset={10}>
            <img
              src="https://placehold.co/1920x1080"
              alt="Platform interface preview showing workspace organization features"
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </BlurFade>

          {/* Mobile (default) */}
          <BorderBeam
            duration={10}
            size={100}
            delay={1}
            borderWidth={1}
            colorFrom="var(--primary)"
            colorTo="var(--success)"
            className="sm:hidden"
          />

          {/* Small Tablet */}
          <BorderBeam
            duration={10}
            size={200}
            delay={1}
            borderWidth={1.5}
            colorFrom="var(--primary)"
            colorTo="var(--success)"
            className="hidden sm:block md:hidden"
          />

          {/* Tablet/Laptop */}
          <BorderBeam
            duration={10}
            size={250}
            delay={1}
            borderWidth={1.5}
            colorFrom="var(--primary)"
            colorTo="var(--success)"
            className="hidden md:block lg:hidden"
          />

          {/* Desktop - with hover effects */}
          <BorderBeam
            duration={10}
            size={400}
            delay={1}
            borderWidth={2}
            colorFrom="var(--primary)"
            colorTo="var(--success)"
            className="hidden lg:block"
          />
        </AspectRatio>
      </section>
    </>
  );
}

export default Preview;
