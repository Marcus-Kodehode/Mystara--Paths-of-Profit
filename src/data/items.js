// src/data/items.js

const items = {
    "Rusty Sword": {
      name: "Rusty Sword",
      effect: "+4 attack",
      description: "This is a very dull blade, could hardly hurt anyone.",
      image: "/images/items/rusty-sword.webp"
    },
    "Iron Sword": {
      name: "Iron Sword",
      effect: "+8 attack",
      description: "A solid blade forged from iron. Reliable in battle.",
      image: "/images/items/iron-sword.webp"
    },
  
    // --- ARMOR ---
    "Leather Tunic": {
      name: "Leather Tunic",
      type: "armor",
      price: 10,
      image: "/images/items/leather-tunic.webp",
      description: "A worn leather tunic. Offers basic protection.",
      effect: "+2 Defense",
    },
    "Leather Armor": {
      name: "Leather Armor",
      type: "armor",
      price: 120,
      image: "/images/items/leather-armor.webp",
      description: "Well-crafted leather armor. Comfortable and reliable.",
      effect: "+6 Defense",
    },
  
    // --- CONSUMABLES ---
    "Health Potion": {
      name: "Health Potion",
      type: "consumable",
      price: 50,
      image: "/images/items/health-potion.png",
      description: "Restores 50 health when used.",
      usable: true,
      effect: "+50 Health"
    },
    "Stamina Potion": {
      name: "Stamina Potion",
      type: "consumable",
      price: 50,
      image: "/images/items/stamina-potion.png",
      description: "Restores 50 stamina when used.",
      usable: true,
      effect: "+50 Stamina"
    },
  
    // --- TRADE GOODS ---
    "Spice Pack": {
      name: "Spice Pack",
      type: "trade",
      price: 200,
      image: "/images/items/spice-pack.png",
      description: "A fragrant collection of rare desert spices, cherished by merchants across the dunes.",
      lore: "Can be sold for double its value in Kavari settlements.",
      sellMultiplier: 2
    },
    "Silk Bundle": {
      name: "Silk Bundle",
      type: "trade",
      price: 100,
      image: "/images/items/silk-bundle.png",
      description: "Exotic silk gathered from distant lands. Elegant and expensive.",
    },
    "Iron Ore": {
      name: "Iron Ore",
      type: "trade",
      price: 110,
      image: "/images/items/iron-ore.png",
      description: "Raw iron ore mined from the depths of Grumhollow.",
    },
    "Forged Blade": {
      name: "Forged Blade",
      type: "trade",
      price: 200,
      image: "/images/items/forged-blade.png",
      description: "A finely crafted blade forged by master blacksmiths.",
    },
    "Enchanted Leaf": {
      name: "Enchanted Leaf",
      type: "trade",
      price: 95,
      image: "/images/items/enchanted-leaf.png",
      description: "A leaf imbued with magical properties from the forests of Sylvarin.",
    },
    "Moonblossom": {
      name: "Moonblossom",
      type: "trade",
      price: 130,
      image: "/images/items/moonblossom.png",
      description: "A rare flower that blooms under the full moon, prized for its beauty.",
    },
    "Shadow Fern": {
      name: "Shadow Fern",
      type: "trade",
      price: 105,
      image: "/images/items/shadow-fern.png",
      description: "A mysterious fern that thrives in the shadows of NymRasha.",
    },
    "Beast Fang": {
      name: "Beast Fang",
      type: "trade",
      price: 115,
      image: "/images/items/beast-fang.png",
      description: "A fang taken from a formidable beast, often used in crafting.",
    },
  
    // --- SPECIAL ITEMS ---
    "Desert Compass": {
      name: "Desert Compass",
      type: "special",
      price: 2500,
      image: "/images/items/desert-compass.png",
      description: "A mystical compass that always points toward lost ruins in the sands.",
      lore: "Vital for navigating the Great Dune beyond Thalmoor.",
    },
    "Runed Pickaxe": {
      name: "Runed Pickaxe",
      type: "special",
      price: 3000,
      image: "/images/items/runed-pickaxe.png",
      description: "An ancient pickaxe engraved with runes, effective against enchanted stones.",
      lore: "Essential for mining rare ores in Grumhollow.",
    },
    "Elven Songstone": {
      name: "Elven Songstone",
      type: "special",
      price: 2750,
      image: "/images/items/elven-songstone.png",
      description: "A stone that resonates with elven melodies, calming the mind.",
      lore: "Used by Sylvarin elders during rituals.",
    },
    "Felarii Talisman": {
      name: "Felarii Talisman",
      type: "special",
      price: 2800,
      image: "/images/items/felarii-talisman.png",
      description: "A talisman crafted by the Felarii, offering protection against dark forces.",
      lore: "Said to shield the bearer from unseen dangers in NymRasha.",
    },
    "Helm of Vitality": {
      name: "Helm of Vitality",
      type: "special",
      price: 0,
      image: "/images/items/helm-of-vitality.png",
      description: "Restores 25–50 health upon arriving in a new settlement.",
      lore: "A relic of the forge-kin, this helm pulses with ancestral strength. Those who wear it feel a warm surge of resilience each time they reach safety.",
    },
    "Forest Amulet": {
      name: "Forest Amulet",
      type: "special",
      price: 0,
      image: "/images/items/forest-amulet.png",
      description: "Increases both stamina and health by 25.",
      lore: "Woven from enchanted ivy and silver blessed under starlight, this amulet radiates calm and vitality. It strengthens the bond between body and nature.",
    },
    "Jungle Medallion": {
      name: "Jungle Medallion",
      type: "special",
      price: 0,
      image: "/images/items/jungle-medallion.png",
      description: "Effect unknown.",
      lore: "An old Felarii token etched with forgotten symbols. Traders speak in hushed tones of those who carry it returning safely from treacherous journeys... but none know exactly why.",
    }
  };
  
  export default items;
  