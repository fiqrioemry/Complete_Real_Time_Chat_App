import { Loader } from "lucide-react";

const PageLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );
};

export default PageLoading;
