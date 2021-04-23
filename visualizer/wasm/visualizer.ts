export function visualize(raw: string): string {
    var out: string = "";
    for (var i = 0; i < raw.length; i ++) {
        if (i + 1 < raw.length) {
            if (raw.substring(i, i + 2) == "/Q") {
                out += "𝓠";
            }
            else if (raw.substring(i, i + 2) == "/U") {
                out += "𝓤";
            }
            else if (raw.substring(i, i + 2) == "/e") {
                out += "∈";
            }
            else if (raw.substring(i, i + 2) == "/A") {
                out += "∀";
            }
            else if (raw.substring(i, i + 2) == "/E") {
                out += "∃";
            }
            else if (raw.substring(i, i + 2) == "/S") {
                out += "∑";
            }
            else if (raw.substring(i, i + 2) == "/P") {
                out += "Π";
            }
            else if (raw.substring(i, i + 2) == "=>") {
                out += "⟹";
            }
            else if (raw.substring(i, i + 2) == "<=") {
                out += "≤";
            }
            else if (raw.substring(i, i + 2) == ">=") {
                out += "≥";
            }
            else if (raw.substring(i, i + 2) == "!=") {
                out += "≠";
            }
            else {
                out += raw.substring(i, i + 1);
            }
        }
        else {
            out += raw.substring(i, i + 1);
        }
    }

    return out;
}