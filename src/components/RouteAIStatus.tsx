import Link from 'next/link';

const RouteAIStatus = () => {
  return (
    <Link
      href="https://routeai.aimethods.co"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2"
    >
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      RouteAI Active
    </Link>
  );
};

export default RouteAIStatus;
