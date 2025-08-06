// File: src/app/page.tsx

"use client"; // This is a Client Component

import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import { competitorData, categories, Competitor } from '@/data/competitorData'; // Adjust path if needed
import CompetitorCard from '@/components/CompetitorCard'; // Adjust path if needed

// Chosen Palette: Warm Neutral & Slate Blue
// Application Structure Plan: The SPA is structured as an interactive dashboard.
// The top level presents a summary visualization (a bar chart showing competitor density by category)
// and primary filtering controls (category buttons and a search bar). This allows for a high-level overview
// and immediate exploration. The main content area is a dynamic grid of competitor "cards," which presents
// concise information initially and allows users to drill down for detailed takeaways.
// This card-based, filterable grid structure was chosen over a static table for superior usability,
// especially on mobile devices, and to encourage exploration rather than passive reading.
// The user flow is: Overview (chart) -> Filter/Search -> Explore (cards) -> Drill-down (card details).
// This is more intuitive for synthesizing market data.
// Visualization & Content Choices:
// 1. Report Info: Competitor count per business domain. -> Goal: Show market saturation.
//    -> Viz Method: Horizontal Bar Chart (Chart.js/Canvas). -> Interaction: Clicking a bar filters the competitor list below.
//    -> Justification: Provides a quick visual summary of the competitive landscape and doubles as a navigation element.
//    -> Library: Chart.js.
// 2. Report Info: List of all competitors and their details. -> Goal: Organize and compare individual competitors.
//    -> Presentation Method: Grid of interactive cards (HTML/Tailwind). -> Interaction: Filtering by category buttons, live text search, and a "show details" toggle on each card.
//    -> Justification: A grid of cards is responsive and allows for progressive disclosure of information, preventing cognitive overload from a large data table.
//    -> Library/Method: React + Tailwind CSS.
// 3. Report Info: Categories of AI services. -> Goal: Allow users to narrow down the dataset.
//    -> Presentation Method: Filter buttons. -> Interaction: Click to filter the grid and highlight the corresponding bar in the chart.
//    -> Justification: Standard, intuitive UI pattern for filtering content.
//    -> Library/Method: React state management.
// CONFIRMATION: NO SVG graphics used. NO Mermaid JS used.

export default function CompetitiveAnalysisPage() {
  const [filteredCompetitors, setFilteredCompetitors] = useState<Competitor[]>(competitorData);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Function to get category counts for the chart
  const getCategoryCounts = (data: Competitor[]) => {
    return categories.reduce((acc: { [key: string]: number }, category) => {
      acc[category] = data.filter(d => d.category === category).length;
      return acc;
    }, {});
  };

  // Effect for initializing and updating the chart
  useEffect(() => {
    const categoryCounts = getCategoryCounts(competitorData); // Always use full data for chart counts
    const chartLabels = Object.keys(categoryCounts);
    const chartValues = Object.values(categoryCounts);

    const chartData = {
      labels: chartLabels,
      datasets: [{
        label: '# of Competitors',
        data: chartValues,
        backgroundColor: chartLabels.map(cat => cat === activeCategory ? '#3182CE' : '#A0AEC0'),
        borderColor: chartLabels.map(cat => cat === activeCategory ? '#2B6CB0' : '#718096'),
        borderWidth: 1,
        borderRadius: 4,
      }],
    };

    const chartOptions: any = { // Use 'any' for Chart.js options for simplicity
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#2D3748',
          titleFont: { size: 14, weight: 'bold' },
          bodyFont: { size: 12 },
          padding: 10,
          cornerRadius: 4,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            color: '#EDF2F7',
          },
          ticks: {
            color: '#4A5568',
            font: { size: 12 },
            precision: 0,
          },
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#2D3748',
            font: { size: 12, weight: '500' },
          },
        },
      },
      onClick: (event: any, elements: any) => {
        if (elements.length > 0) {
          const clickedCategory = chartInstance.current?.data.labels?.[elements[0].index] as string;
          handleCategoryFilter(clickedCategory);
        }
      },
    };

    if (chartInstance.current) {
      // Update existing chart
      chartInstance.current.data = chartData;
      chartInstance.current.options = chartOptions;
      chartInstance.current.update();
    } else if (chartRef.current) {
      // Initialize new chart
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: chartOptions,
        });
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [activeCategory]); // Re-run effect when activeCategory changes to update chart colors

  // Effect for filtering competitors based on search and category
  useEffect(() => {
    const filtered = competitorData.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = !searchTerm ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.offering.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.takeaway.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredCompetitors(filtered);
  }, [searchTerm, activeCategory]); // Re-run effect when search term or active category changes

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(prevCategory => (prevCategory === category && category !== 'All' ? 'All' : category));
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">AI Solutions: Competitive Landscape</h1>
        <p className="mt-2 text-lg text-gray-600">An interactive analysis for <span className="font-semibold text-[#4A5568]">AIMethods.co</span></p>
      </header>

      <main>
        {/* Overview & Visualization Section */}
        <section id="overview" className="mb-10 p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Market Snapshot</h2>
          <p className="text-center text-gray-600 mb-6 max-w-3xl mx-auto">
            This chart provides a high-level view of the competitive density across key AI service domains. It visualizes the number of companies identified in each category from our research. You can click on a specific bar in the chart to instantly filter the detailed competitor list below, allowing you to focus your analysis on the most relevant market segments.
          </p>
          <div className="relative w-full max-w-4xl mx-auto h-[350px] md:h-[400px]"> {/* Chart Container */}
            <canvas ref={chartRef} id="competitorChart"></canvas>
          </div>
        </section>

        {/* Filtering and Competitor Grid Section */}
        <section id="competitors">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Competitor Deep Dive</h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore the list of competitors and inspirational companies below. Use the category filters to narrow your focus or use the search bar to find specific companies or features. Click "Show Details" on any card to see actionable insights and strategic takeaways relevant to AIMethods.co.
          </p>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <div className="relative w-full md:w-1/2 lg:w-1/3">
              <input
                type="text"
                id="search-input"
                placeholder="Search by name, offering..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-gray-400 focus:outline-none transition-shadow"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {/* Search Icon (Unicode character for simplicity, as per instructions) */}
                <span className="text-gray-400 text-lg">&#x1F50D;</span> {/* Magnifying glass emoji */}
              </div>
            </div>
            <div id="category-filters" className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => handleCategoryFilter('All')}
                className={`filter-btn px-4 py-2 text-sm font-medium rounded-full shadow-sm transition-all duration-200 ${activeCategory === 'All' ? 'bg-[#4A5568] text-white transform -translate-y-0.5 shadow-md' : 'bg-white hover:bg-gray-100'}`}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`filter-btn px-4 py-2 text-sm font-medium rounded-full shadow-sm transition-all duration-200 ${activeCategory === category ? 'bg-[#4A5568] text-white transform -translate-y-0.5 shadow-md' : 'bg-white hover:bg-gray-100'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Competitor Grid */}
          <div id="competitor-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompetitors.length > 0 ? (
              filteredCompetitors.map((competitor, index) => (
                <CompetitorCard key={competitor.name} competitor={competitor} index={index} />
              ))
            ) : (
              <div id="no-results" className="text-center py-12 text-gray-500 col-span-full">
                <h3 className="text-xl font-semibold">No Results Found</h3>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
