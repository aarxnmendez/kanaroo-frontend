import { ArrowRightIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BentoGrid = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[14rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  hoverColor,
  ...props
}) => (
  <div
    key={name}
    className={cn(
      "group relative h-full w-full flex flex-col justify-between overflow-hidden rounded-xl",
      // base styles
      "bg-transparent border transition-all duration-300",
      // Mobile and tablet styles (colored by default)
      "border-[var(--hover-color)] shadow-[0_0_15px_rgba(var(--hover-color-rgb),0.15)]",
      // Desktop hover styles (only apply colors on hover for lg and above screens)
      "lg:border-border/50 lg:shadow-none lg:group-hover:border-[var(--hover-color)] lg:group-hover:shadow-[0_0_15px_rgba(var(--hover-color-rgb),0.15)]",
      className
    )}
    style={{
      "--hover-color": hoverColor || "var(--primary)",
      "--hover-color-rgb": hoverColor
        ? hoverColor.replace("rgb(", "").replace(")", "")
        : "59, 130, 246",
    }}
    {...props}
  >
    <div className="absolute inset-0 z-0">{background}</div>
    <div className="relative z-10 flex flex-col gap-1 p-3 md:p-4 lg:p-5 h-full">
      <div className="flex flex-col gap-1">
        <Icon
          className={cn(
            "h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 shrink-0 transition-all duration-300 ease-in-out",
            // Mobile and tablet styles (colored by default)
            "text-[var(--hover-color)]",
            // Desktop styles (color only on hover)
            "lg:text-foreground lg:group-hover:text-[var(--hover-color)]"
          )}
        />
        <h3 className="text-sm md:text-base lg:text-lg font-semibold text-foreground mt-1">
          {name}
        </h3>
      </div>
      <p className="text-xs sm:text-xs md:text-sm text-muted mt-1 flex-grow">
        {description}
      </p>

      {href && cta && (
        <div className="mt-auto pt-2">
          <a
            href={href}
            className={cn(
              "inline-flex items-center gap-1 group/btn text-xs sm:text-xs md:text-sm transition-all duration-300 px-0 py-0 hover:no-underline",
              // Mobile and tablet styles (colored by default)
              "text-[var(--hover-color)]",
              // Desktop styles (color only on hover)
              "lg:text-foreground lg:group-hover:text-[var(--hover-color)] lg:hover:text-[var(--hover-color)]"
            )}
          >
            <span>{cta}</span>
            <ArrowRightIcon className="h-3 w-3 md:h-4 md:w-4 rtl:rotate-180 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </a>
        </div>
      )}
    </div>
  </div>
);

export { BentoCard, BentoGrid };
