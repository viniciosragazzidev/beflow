import { Loader } from "lucide-react";

const LoadingSkeleton = () => {
  return (
    <div className="w-screen h-screen top-0 left-0 fixed z-50 bg-app-bg-light dark:bg-app-bg flex justify-center items-center">
      <div className="container flex items-center justify-center">
        <Loader className="animate-spin text-app-subtext-light dark:text-app-subtext text-8xl" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
