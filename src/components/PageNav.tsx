import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

interface PageNavProps {
  /** Optional title shown to the right of the buttons (e.g. "Shop", "Contact") */
  title?: string;
}

export default function PageNav({ title }: PageNavProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 hover:text-emerald-700 transition-colors"
          aria-label="Go back to previous page"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 hover:text-emerald-700 transition-colors"
          aria-label="Go to homepage"
        >
          <Home className="h-4 w-4" />
          Home
        </button>
        {title && (
          <span className="ml-auto text-sm font-medium text-gray-500 hidden sm:inline">
            {title}
          </span>
        )}
      </div>
    </div>
  );
}
