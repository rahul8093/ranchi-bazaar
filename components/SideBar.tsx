'use client';

import React from 'react';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80  transition-transform duration-300 shadow-lg z-50 theme-gradient ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-white/40 text-white">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose} className="text-xl">&times;</button>
        </div>

        <div className="p-4 space-y-4 text-white">
          {/* Example Filters */}
          <div>
            <h3 className="font-medium">Price Range</h3>
            <input type="range" min="0" max="1000" className="w-full" />
          </div>

          <div>
            <h3 className="font-medium">Category</h3>
            <div className="space-y-2">
              <label className="block"><input type="checkbox" className="mr-2" /> Electronics</label>
              <label className="block"><input type="checkbox" className="mr-2" /> Clothing</label>
              <label className="block"><input type="checkbox" className="mr-2" /> Furniture</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
