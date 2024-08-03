class NameGenerator {
    static alphabet = "abcdefghijklmnopqrstuvwxyz";
    static vowels = "aeiou";

    static prefixes = [
        "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
        "n", "p", "r", "s", "t", "v", "z",
        "br", "cr", "dr", "fr", "gr", "pr", "tr",
        "fl", "gl", "pl",
        "qu",
        "ch", "th"
    ]

    static suffixes = [
        "l", "n", "r", "s",
    ]

    static endings = [
        "s", "l"
    ]

    static generateSilable(rng, previousSilable) {
        /**
         * Silables are going to be composed of 3 parts:
         * 
         *      1. The prefix (optional): consonants, or digraphs, that can be at the beginning of a silable.
         *      2. The vowel:             a single vowel.
         *      3. The suffix (optional): any letter that could end a silable.
         *      4. The ending (optional): if step 3 is a vowel, then we can add a consonant to end the silable.
         * 
         * The probability of each part is going to be:
         * 
         *      1. Prefix: 70%
         *      2. Vowel: 100%
         *      3. Suffix: 40%
         *      4. Ending: 30% (if step 3 is a vowel)
        **/

        let silable = "";

        // Step 1: Prefix
        if (rng.nextInt(0, 100) < 70) {
            silable += NameGenerator.prefixes[rng.nextInt(0, NameGenerator.prefixes.length - 1)];
        }

        // Step 2: Vowel
        // Can't be a double vowel (would happen when "qu" is the prefix)
        if (silable !== "qu") {
            silable += NameGenerator.vowels[rng.nextInt(0, NameGenerator.vowels.length - 1)];
        }
        else {
            silable += "aeio"[rng.nextInt(0, 3)];
        }

        // Step 3: Suffix
        if (rng.nextInt(0, 100) < 20) {
            silable += NameGenerator.suffixes[rng.nextInt(0, NameGenerator.suffixes.length - 1)];

            // Step 4: Ending
            if (NameGenerator.vowels.includes(silable[silable.length - 1]) && rng.nextInt(0, 100) < 30) {
                silable += NameGenerator.endings[rng.nextInt(0, NameGenerator.endings.length - 1)];
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