function visualize(raw) {
  var out = "";
  for (var i = 0; i < raw.length; i ++) {
      if (i + 1 < raw.length) {
          if (raw.substring(i, i + 2) == "/Q") {
              out += "𝓠";
              i += 1;
              continue;
          }
          else if (raw.substring(i, i + 2) == "/U") {
              out += "𝓤";
              i += 1;
              continue;
          }
          else if (raw.substring(i, i + 2) == "/e") {
              out += "∈";
              i += 1;
              continue;
          }
          else if (raw.substring(i, i + 2) == "/A") {
              out += "∀";
              i += 1;
              continue;
          }
          else if (raw.substring(i, i + 2) == "/E") {
              out += "∃";
              i += 1;
              continue;
          }
          else if (raw.substring(i, i + 2) == "/S") {
              out += "∑";
              i += 1;
              continue;
          }
          else if (raw.substring(i, i + 2) == "/P") {
              out += "Π";
              i += 1;
              continue;
          }
          else if (raw.substring(i, i + 2) == "=>") {
              out += "⟹";
              i += 1;
              continue;
          }
          else if (raw.substring(i, i + 2) == "<=") {
              out += "≤";
              i += 1;
              continue;
          }
          else if (raw.substring(i, i + 2) == ">=") {
              out += "≥";
              i += 1;
              continue;
          }
          else if (raw.substring(i, i + 2) == "!=") {
              out += "≠";
              i += 1;
              continue;
          }
        }
          
        if (raw.substring(i, i + 1) == "^") {
          out += "∧";
          i += 1;
        }
        else if (raw.substring(i, i + 1) == "v") {
            out += "∨";
            i += 1;
        }
        else {
            out += raw.substring(i, i + 1);
        }
  }

  return out;
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
   
readline.question('Enter a text:', text => {
    console.log(visualize(text));
    readline.close();
});