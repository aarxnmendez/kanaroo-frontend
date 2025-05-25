import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils/utils";

export function PasswordInput({
  id,
  name,
  value,
  onChange,
  placeholder,
  className,
  inputClassName,
  required,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("relative w-full", className)}>
      {" "}
      <Input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={cn(
          "pr-10 placeholder:text-muted-foreground",
          inputClassName
        )}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff size={16} className="text-muted-foreground" />
        ) : (
          <Eye size={16} className="text-muted-foreground" />
        )}
      </Button>
    </div>
  );
}
