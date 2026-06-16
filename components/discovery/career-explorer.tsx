"use client";

import { Brain } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { careerExplorer } from '@/data/career-explorer';

const CareerExplorer = () => {
    return (
        <div className="bg-gray-50 p-8 min-h-screen">
            <div className="max-w-7xl mx-auto text-center">
                <div className="mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-gray-600 text-xs font-semibold tracking-wide uppercase">
                    <Brain size={11} />
                    Career
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Career Explorer
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {careerExplorer.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-center overflow-hidden"
                        >
                            <div className="relative w-20 h-20 mt-6 mx-auto">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-contain"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </div>

                            <div className="p-5 text-center">
                                <h3 className="text-base font-semibold text-gray-800 mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-violet-600 font-medium">
                                    {item.count}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CareerExplorer;