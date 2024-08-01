class NameGenerator {
    static generateSilable(rng) {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        const vowels = "aeiou";

        const table = [
            ["a", "snrl"],
            ["e", "snrl"],
            ["i", "snrl"],
            ["o", "snrl"],
            ["u", "snrl"],
            ["b", "aeiourl"],
            ["c", "aeiouhrl"],
            ["d", "aeiour"],
            ["f", "aeiourl"],
            ["g", "aeiourl"],
            ["h", "aeiou"],
            ["j", "aeiou"],
            ["k", "aeiou"],
            ["l", "aeiouh"],
            ["m", "aeiou"],
            ["n", "aeiouh"],
            ["p", "aeiourhl"],
            ["q", "aeiou"],
            ["r", "aeiou"],
            ["s", "aeiouh"],
            ["t", "aeiourh"],
            ["v", "aeiourl"],
            ["w", "aeiou"],
            ["x", "aeiou"],
            ["y", "aeiou"],
            ["z", "aeiou"]
        ]

        let silable = "";

        silable += alphabet[rng.nextInt(0, alphabet.length - 1)];

        let tableForLetter = table.find((element) => element[0] == silable[0])[1];
        silable += tableForLetter[rng.nextInt(0, tableForLetter.length - 1)];

        // if there are no vowels, add one
        if (!silable.split("").some((char) => vowels.includes(char))) {
            silable += vowels[rng.nextInt(0, vowels.length - 1)];
        }
        else if (vowels.includes(silable[1])){
            // small chance o adding a consonant:
            if (rng.nextInt(0, 100) < 10) {
                tableForLetter = table.find((element) => element[0] == silable[1])[1];
                silable += tableForLetter[rng.nextInt(0, tableForLetter.length - 1)];
            }
        }

        return silable;
    }

    static generateName(rng, silableCount) {
        let name = "";

        for (let i = 0; i < silableCount; i++) {
            name += NameGenerator.generateSilable(rng);
        }

        return name[0].toUpperCase() + name.slice(1);
    }
}