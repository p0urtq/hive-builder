// Example of how to use local images from the public folder

const antData = {
  name: 'Piggy',
  rarity: 'Legendary',
  icon: '🐷',
  color: '#F97316',
  // This image would be located at: public/images/ants/piggy.png
  imageUrl: '/images/ants/piggy.png'
};

// Or you could organize by rarity:
const alternativeStructure = {
  name: 'Diamond',
  rarity: 'Legendary', 
  icon: '💎',
  color: '#06B6D4',
  // This would be at: public/images/ants/legendary/diamond.png
  imageUrl: '/images/ants/legendary/diamond.png'
};