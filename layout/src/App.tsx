import React, { useState, useCallback } from 'react';
import { Download, Upload, Trash2, RotateCcw, Info, Sparkles, Star, Crown } from 'lucide-react';

interface AntData {
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  icon: string;
  color: string;
  imageUrl?: string;
}

const antsByRarity: Record<string, AntData[]> = {
  Common: [
    { name: 'Ordinary', rarity: 'Common', icon: '🐜', color: '#8B7355', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop' },
    { name: 'Ashen', rarity: 'Common', icon: '🌫️', color: '#9CA3AF', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&sat=-100' },
    { name: 'Squinty', rarity: 'Common', icon: '😑', color: '#6B7280', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&brightness=-20' }
  ],
  Rare: [
    { name: 'Hurry', rarity: 'Rare', icon: '💨', color: '#3B82F6', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=240' },
    { name: 'Stray', rarity: 'Rare', icon: '🗺️', color: '#1E40AF', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=220' },
    { name: 'Cool', rarity: 'Rare', icon: '😎', color: '#0EA5E9', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=200' },
    { name: 'Grumpy', rarity: 'Rare', icon: '😠', color: '#DC2626', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=0' },
    { name: 'Bomber', rarity: 'Rare', icon: '💣', color: '#991B1B', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=10' },
    { name: 'Buzzy', rarity: 'Rare', icon: '⚡', color: '#FACC15', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=60' },
    { name: 'Lousy', rarity: 'Rare', icon: '😤', color: '#64748B', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=210' },
    { name: 'Timid', rarity: 'Rare', icon: '😰', color: '#10B981', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=160' },
    { name: 'Rueful', rarity: 'Rare', icon: '😔', color: '#6366F1', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=250' },
    { name: 'Drowsy', rarity: 'Rare', icon: '😴', color: '#8B5CF6', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=270' },
    { name: 'Nosey', rarity: 'Rare', icon: '🔍', color: '#F59E0B', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=40' },
    { name: 'Silver', rarity: 'Rare', icon: '✨', color: '#C0C0C0', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&sat=-50&brightness=20' },
    { name: 'Twincy', rarity: 'Rare', icon: '👥', color: '#EC4899', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=320' },
    { name: 'Twency', rarity: 'Rare', icon: '👫', color: '#F97316', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=20' }
  ],
  Epic: [
    { name: 'Ricco', rarity: 'Epic', icon: '💰', color: '#7C3AED', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=280&brightness=10' },
    { name: 'Murco', rarity: 'Epic', icon: '🏰', color: '#9333EA', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=275' },
    { name: 'Square', rarity: 'Epic', icon: '◼️', color: '#A855F7', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=270&contrast=20' },
    { name: 'Waxen', rarity: 'Epic', icon: '🕯️', color: '#C084FC', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=265&brightness=15' },
    { name: 'Liquid', rarity: 'Epic', icon: '💧', color: '#06B6D4', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=190&brightness=10' },
    { name: 'Angry', rarity: 'Epic', icon: '😡', color: '#DC2626', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=0&contrast=30' },
    { name: 'Bib', rarity: 'Epic', icon: '🍼', color: '#F472B6', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=330&brightness=20' },
    { name: 'Bob', rarity: 'Epic', icon: '👷', color: '#EF4444', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=5&contrast=25' },
    { name: 'Bab', rarity: 'Epic', icon: '👶', color: '#FBBF24', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=50&brightness=25' },
    { name: 'Snowy', rarity: 'Epic', icon: '❄️', color: '#E5E7EB', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&sat=-80&brightness=40' },
    { name: 'Dazed', rarity: 'Epic', icon: '😵', color: '#A78BFA', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=260&brightness=5' },
    { name: 'Golden', rarity: 'Epic', icon: '🏆', color: '#F59E0B', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=45&brightness=30' },
    { name: 'Shocked', rarity: 'Epic', icon: '😱', color: '#FACC15', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=55&brightness=25' },
    { name: 'Pretty', rarity: 'Epic', icon: '💅', color: '#FB7185', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=340&brightness=15' }
  ],
  Legendary: [
    { name: 'Piggy', rarity: 'Legendary', icon: '🐷', color: '#F97316', imageUrl: '/images/ants/piggy.png' },
    { name: 'Bumble', rarity: 'Legendary', icon: '🐝', color: '#FACC15', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=60&brightness=35&contrast=35' },
    { name: 'Cruel', rarity: 'Legendary', icon: '😈', color: '#991B1B', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=0&brightness=-10&contrast=50' },
    { name: 'Gaper', rarity: 'Legendary', icon: '😲', color: '#0EA5E9', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=200&brightness=15&contrast=30' },
    { name: 'Diamond', rarity: 'Legendary', icon: '💎', color: '#06B6D4', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=190&brightness=25&contrast=45' },
    { name: 'Thorn', rarity: 'Legendary', icon: '🌹', color: '#EF4444', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=0&brightness=10&contrast=40' },
    { name: 'Dozy', rarity: 'Legendary', icon: '😪', color: '#8B5CF6', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=270&brightness=5&contrast=35' },
    { name: 'Grimy', rarity: 'Legendary', icon: '🤢', color: '#059669', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=150&brightness=-5&contrast=30' }
  ],
  Mythic: [
    { name: 'Dramedy', rarity: 'Mythic', icon: '🎭', color: '#FF1493', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=320&brightness=20&contrast=60' },
    { name: 'Clown', rarity: 'Mythic', icon: '🤡', color: '#FF69B4', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=330&brightness=25&contrast=55' },
    { name: 'Lily', rarity: 'Mythic', icon: '🌺', color: '#FF6B9D', imageUrl: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&hue=325&brightness=15&contrast=50' }
  ]
};

const rarityColors = {
  Common: { border: '#9CA3AF', bg: '#F9FAFB', glow: '0 0 10px rgba(156, 163, 175, 0.3)' },
  Rare: { border: '#3B82F6', bg: '#EFF6FF', glow: '0 0 15px rgba(59, 130, 246, 0.4)' },
  Epic: { border: '#7C3AED', bg: '#F5F3FF', glow: '0 0 20px rgba(124, 58, 237, 0.5)' },
  Legendary: { border: '#F59E0B', bg: '#FFFBEB', glow: '0 0 25px rgba(245, 158, 11, 0.6)' },
  Mythic: { border: '#FF1493', bg: '#FDF2F8', glow: '0 0 30px rgba(255, 20, 147, 0.7)' }
};

const hiveLayout = [
  [null, null, 1, 1, null, null],
  [null, 1, 1, 1, 1, 1, 1, null],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, null, null, 1, 1, 1, 1],
  [1, 1, 1, 1, null, null, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1]
];

const totalSlots = hiveLayout.flat().filter(cell => cell !== null).length;

function App() {
  const [selectedAnt, setSelectedAnt] = useState<string>('Ordinary');
  const [hive, setHive] = useState<string[]>(new Array(totalSlots).fill('Empty'));
  const [importData, setImportData] = useState<string>('');
  const [showImport, setShowImport] = useState(false);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);

  const allAnts = Object.values(antsByRarity).flat();
  const getAntData = (antName: string): AntData | null => 
    allAnts.find(ant => ant.name === antName) || null;

  const handleSlotClick = useCallback((index: number) => {
    const newHive = [...hive];
    newHive[index] = selectedAnt;
    setHive(newHive);
  }, [hive, selectedAnt]);

  const handleSlotClear = useCallback((index: number) => {
    const newHive = [...hive];
    newHive[index] = 'Empty';
    setHive(newHive);
  }, [hive]);

  const exportHive = useCallback(() => {
    const exportData = JSON.stringify({ slots: hive }, null, 2);
    navigator.clipboard.writeText(exportData);
    alert('Hive configuration copied to clipboard!');
  }, [hive]);

  const importHive = useCallback(() => {
    try {
      const obj = JSON.parse(importData);
      if (obj.slots && obj.slots.length === totalSlots) {
        setHive(obj.slots);
        setImportData('');
        setShowImport(false);
        alert('Hive configuration imported successfully!');
      } else {
        alert('Invalid hive format! Make sure it has exactly ' + totalSlots + ' slots.');
      }
    } catch {
      alert('Invalid JSON format!');
    }
  }, [importData]);

  const clearHive = useCallback(() => {
    if (confirm('Are you sure you want to clear the entire hive?')) {
      setHive(new Array(totalSlots).fill('Empty'));
    }
  }, []);

  const renderHive = () => {
    let slotIndex = 0;
    return (
      <div className="flex flex-col items-center gap-2">
        {hiveLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 justify-center">
            {row.map((cell, cellIndex) => {
              if (cell === null) {
                return <div key={cellIndex} className="w-16 h-16 md:w-20 md:h-20" />;
              }
              
              const currentSlotIndex = slotIndex++;
              const antName = hive[currentSlotIndex];
              const antData = getAntData(antName);
              const isHovered = hoveredSlot === currentSlotIndex;
              const isEmpty = antName === 'Empty';

              return (
                <div
                  key={currentSlotIndex}
                  className={`
                    relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 
                    flex items-center justify-center cursor-pointer
                    transition-all duration-300 ease-out
                    ${isEmpty 
                      ? 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50' 
                      : `border-2 ${antData ? `bg-gradient-to-br from-white to-${antData.color}20` : 'bg-white'}`
                    }
                    ${isHovered ? 'scale-110 z-10' : 'scale-100'}
                    hover:shadow-lg active:scale-95
                    group
                  `}
                  style={{
                    borderColor: antData ? rarityColors[antData.rarity].border : '#D1D5DB',
                    backgroundColor: antData ? rarityColors[antData.rarity].bg : '#FFFFFF',
                    boxShadow: isHovered && antData ? rarityColors[antData.rarity].glow : undefined
                  }}
                  onClick={() => handleSlotClick(currentSlotIndex)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleSlotClear(currentSlotIndex);
                  }}
                  onMouseEnter={() => setHoveredSlot(currentSlotIndex)}
                  onMouseLeave={() => setHoveredSlot(null)}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    {isEmpty ? (
                      <div className="text-gray-400 text-2xl group-hover:text-gray-600 transition-colors">
                        +
                      </div>
                    ) : (
                      <>
                        <div className="text-xl md:text-2xl mb-1">
                          {antData?.icon || '🐜'}
                        </div>
                        <div className="text-xs font-medium text-gray-600 truncate max-w-full px-1">
                          {antName}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Slot number */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-700 text-white rounded-full text-xs flex items-center justify-center font-medium">
                    {currentSlotIndex + 1}
                  </div>
                  
                  {/* Rarity indicator */}
                  {antData && (
                    <div className="absolute -top-1 -left-1">
                      {antData.rarity === 'Mythic' && <Crown className="w-4 h-4 text-pink-500" />}
                      {antData.rarity === 'Legendary' && <Star className="w-4 h-4 text-yellow-500" />}
                      {antData.rarity === 'Epic' && <Sparkles className="w-3 h-3 text-purple-500" />}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const getRarityStats = () => {
    const stats: Record<string, number> = {};
    hive.forEach(antName => {
      if (antName !== 'Empty') {
        const antData = getAntData(antName);
        if (antData) {
          stats[antData.rarity] = (stats[antData.rarity] || 0) + 1;
        }
      }
    });
    return stats;
  };

  const rarityStats = getRarityStats();
  const totalAnts = hive.filter(ant => ant !== 'Empty').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              🐜 Ant Sim 2 Hive Planner
            </h1>
            <p className="text-gray-600 text-lg">opppp</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel - Ant Selection */}
            <div className="lg:w-80">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Ant</h2>
                
                <div className="space-y-4">
                  {Object.entries(antsByRarity).map(([rarity, ants]) => (
                    <div key={rarity} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-sm text-gray-700">{rarity}</h3>
                        <div 
                          className="h-1 flex-1 rounded-full"
                          style={{ backgroundColor: rarityColors[rarity as keyof typeof rarityColors].border }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {ants.map((ant) => (
                          <button
                            key={ant.name}
                            onClick={() => setSelectedAnt(ant.name)}
                            className={`
                              p-3 rounded-lg border-2 transition-all duration-200
                              ${selectedAnt === ant.name
                                ? `border-${ant.color} shadow-lg scale-105`
                                : 'border-gray-200 hover:border-gray-300'
                              }
                              flex flex-col items-center gap-1 text-sm
                            `}
                            style={{
                              borderColor: selectedAnt === ant.name ? rarityColors[ant.rarity].border : undefined,
                              backgroundColor: selectedAnt === ant.name ? rarityColors[ant.rarity].bg : undefined
                            }}
                          >
                            {ant.imageUrl ? (
                              <img 
                                src={ant.imageUrl} 
                                alt={ant.name}
                                className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                onError={(e) => {
                                  // Fallback to emoji if image fails to load
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const fallback = target.nextElementSibling as HTMLElement;
                                  if (fallback) fallback.style.display = 'inline-block';
                                }}
                              />
                            ) : null}
                            <span 
                              className="text-lg"
                              style={{ display: ant.imageUrl ? 'none' : 'inline-block' }}
                            >
                              {ant.icon}
                            </span>
                            <span className="font-medium truncate w-full text-center">{ant.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-3">Hive Statistics</h3>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Total Ants:</span>
                      <span className="font-medium">{totalAnts}/{totalSlots}</span>
                    </div>
                    {Object.entries(rarityStats).map(([rarity, count]) => (
                      <div key={rarity} className="flex justify-between">
                        <span className="text-gray-600">{rarity}:</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Hive */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-wrap justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Hive Layout</h2>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={exportHive}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                    <button
                      onClick={() => setShowImport(!showImport)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Import
                    </button>
                    <button
                      onClick={clearHive}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear
                    </button>
                  </div>
                </div>

                {showImport && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <textarea
                      value={importData}
                      onChange={(e) => setImportData(e.target.value)}
                      placeholder="Paste your hive JSON here..."
                      className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none font-mono text-sm"
                    />
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={importHive}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Import Hive
                      </button>
                      <button
                        onClick={() => setShowImport(false)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex justify-center mb-6">
                  {renderHive()}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span>Left click to place selected ant • Right click to remove ant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;