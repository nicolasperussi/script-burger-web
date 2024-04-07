import { getOrderStatus } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

interface OrderStepperProps {
  status: "WAITING" | "IN_PRODUCTION" | "IN_TRANSIT" | "DELIVERED";
}

function OrderStepper({ status }: OrderStepperProps) {
  const steps: Array<"WAITING" | "IN_PRODUCTION" | "IN_TRANSIT" | "DELIVERED"> =
    ["WAITING", "IN_PRODUCTION", "IN_TRANSIT", "DELIVERED"];

  return (
    <div className="flex-1 flex justify-evenly items-center">
      {steps.map((step, i) => {
        const Icon = getOrderStatus(step).icon;

        return (
          <div
            key={step}
            className="flex flex-col gap-4 items-center w-1/4 relative"
          >
            {i !== steps.length - 1 && steps.indexOf(status) >= i && (
              <span
                className={twMerge(
                  "absolute w-full h-[2px] left-1/2 top-[3rem] z-10 bg-green-500",
                  steps.indexOf(status) === i && "animate-load"
                )}
              ></span>
            )}
            {i !== steps.length - 1 && (
              <span
                className={twMerge(
                  "absolute w-full h-[2px] left-1/2 top-[3rem] -z-10 bg-secondary"
                )}
              ></span>
            )}
            <div
              className={twMerge(
                "size-24 rounded-full relative grid place-content-center z-10",
                steps.indexOf(status) >= i ? "bg-green-500" : "bg-muted",
                steps.indexOf(status) === i && "border-4 border-green-100"
              )}
            >
              <Icon
                className={twMerge(
                  "size-12",
                  steps.indexOf(status) >= i
                    ? "text-green-100"
                    : "text-muted-foreground"
                )}
              />
            </div>
            <span
              className={twMerge(
                steps.indexOf(status) >= i
                  ? "text-green-500 font-medium"
                  : "text-muted-foreground"
              )}
            >
              {getOrderStatus(step).display}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default OrderStepper;
