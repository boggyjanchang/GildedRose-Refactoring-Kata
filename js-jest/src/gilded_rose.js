class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    const itemType = {
      sulfuras: 'Sulfuras, Hand of Ragnaros',
      agedBrie: 'Aged Brie',
      backstagePasses: 'Backstage passes to a TAFKAL80ETC concert',
      conjured: 'Conjured Mana Cake',
    };

    const adjQuality = (item, n) => {
      const q = item.quality + n;
      const qMin = 0;
      const qMax = 50;
      return q > qMax ? qMax : q < qMin ? qMin : q;
    };

    this.items.forEach(item => {
      if (item.name === itemType.sulfuras) {
        return;
      }

      if (item.name === itemType.agedBrie) {
        item.quality = adjQuality(item, 1);
      } else if (item.name === itemType.backstagePasses) {
        if (item.sellIn < 6) {
          item.quality = adjQuality(item, 3);
        } else if (item.sellIn < 11) {
          item.quality = adjQuality(item, 2);
        } else {
          item.quality = adjQuality(item, 1);
        }
      } else if (item.name === itemType.conjured) {
        item.quality = adjQuality(item, -2);
      } else {
        item.quality = adjQuality(item, -1);
      }

      item.sellIn -= 1;

      if (item.sellIn >= 0) {
        return;
      }

      if (item.name === itemType.agedBrie) {
        item.quality = adjQuality(item, 1);
        return;
      }

      if (item.name === itemType.conjured) {
        item.quality = adjQuality(item, -2);
      } else if (item.name === itemType.backstagePasses) {
        item.quality = adjQuality(item, -item.quality);
      } else {
        item.quality = adjQuality(item, -1);
      }
    });

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
