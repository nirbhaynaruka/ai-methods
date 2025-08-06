// File: src/components/CompetitorCard.tsx

import React, { useState } from 'react';
import type { Competitor } from '@/data/competitorData';

interface CompetitorCardProps {
  competitor: Competitor;
  index: number;
}

export default function CompetitorCard({ competitor, index }: CompetitorCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  let typeColor = 'bg-gray-200 text-gray-800';
  if (competitor.type.toLowerCase().includes('product')) typeColor = 'bg-blue-100 text-blue-800';
  else if (competitor.type.toLowerCase().includes('suite')) typeColor = 'bg-indigo-100 text-indigo-800';
  else if (competitor.type.toLowerCase().includes('tool')) typeColor = 'bg-green-100 text-green-800';
  else if (competitor.type.toLowerCase().includes('service')) typeColor = 'bg-yellow-100 text-yellow-800';

  return (
    <div
      className="card-enter bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-lg"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div className="tracking-wide text-sm text-indigo-500 font-semibold">
            {competitor.category}
          </div>
          <span className={`${typeColor} text-xs font-semibold px-2.5 py-0.5 rounded-full`}>
            {competitor.type}
          </span>
        </div>

        <a
          href={``}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-1 text-lg leading-tight font-bold text-black hover:underline"
        >
          {competitor.name}
        </a>
        <p className="mt-2 text-gray-600 text-sm">{competitor.offering}</p>

        {/* Key Meta Highlights */}
        <div className="mt-4 space-y-1 text-sm text-gray-500">
          <p><span className="font-semibold text-gray-700">Status:</span> {competitor.status}</p>
          <p><span className="font-semibold text-gray-700">Deployment:</span> {competitor.deployment}</p>
          <p><span className="font-semibold text-gray-700">Pricing:</span> {competitor.pricingModel}</p>
          <p><span className="font-semibold text-gray-700">Audience:</span> {competitor.audience.join(', ')}</p>
        </div>
      </div>

      <div className={`details-pane ${isOpen ? 'open' : ''}`}>
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">Strategic Takeaway for AIMethods:</h4>
          <p className="text-gray-700 text-sm mb-4">{competitor.takeaway}</p>

          <h5 className="font-semibold text-gray-800 mb-1">Key Features:</h5>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            {competitor.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>

          <h5 className="font-semibold text-gray-800 mt-4 mb-1">Tags:</h5>
          <div className="flex flex-wrap gap-1">
            {competitor.tags.map((tag, i) => (
              <span key={i} className="bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-3 bg-gray-100">
        <button
          onClick={toggleDetails}
          className="details-toggle text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          {isOpen ? 'Hide Details ↑' : 'Show Details ↓'}
        </button>
      </div>
    </div>
  );
}
