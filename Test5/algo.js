var tab = [6,1,4,2,5,3];

// Trier la table impair puis pair et croissant
var result = tab.sort(function(a, b) {
  return b % 2 - a % 2 || a - b;
});

console.log(result);