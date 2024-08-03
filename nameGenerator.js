class NameGenerator {
    static alphabet = "abcdefghijlmnopqrstuvz";
    static vowels = "aeiou";
    static goodConsonants = "bcdfgjlmnpqrstvz";

    static prefixes = [
        "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
        "n", "p", "r", "s", "t", "v", "z",
        "br", "cr", "dr", "fr", "gr", "pr", "tr",
        "fl", "gl", "pl",
        "qu",
        "ch"
    ]

    static suffixes = [
        "l", "n", "r", "s",
    ]

    static endings = [
        "s", "l"
    ]

    static allowedLettersAfterLetter = {
        "a": NameGenerator.goodConsonants + "eiou",
        "e": NameGenerator.goodConsonants + "aiou",
        "i": NameGenerator.goodConsonants + "aeou",
        "o": NameGenerator.goodConsonants + "aeiu",
        "u": NameGenerator.goodConsonants + "aeio",
        "l": "bcdfgpqtv",
        "n": "bcdfgpt",
        "r": "bcdfgptv",
        "s": "bcdfgklmnprtvz",
    }

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
         * 
         * Rules:
         * 
         *     - If the previous silable ended with a vowel, the current silable must start with a consonant.
         *     - If the previous silable ended with a consonant, the current silable has start with a vowel.
        **/

        let silable = "";

        let lastLetter;
        let allowedLetters;

        if (previousSilable) {
            lastLetter = previousSilable[previousSilable.length - 1];
            allowedLetters = NameGenerator.allowedLettersAfterLetter[lastLetter];
        }

        // 1. Prefix
        // If the previous silable exists, we see what letter it ended with.
        // We use the lookup table to see what letters can come after that letter.

        if (rng.next() % 100 < 70 || (previousSilable && !NameGenerator.vowels.includes(lastLetter))) {
            if (!previousSilable) {
                silable += NameGenerator.prefixes[rng.nextInt(0, NameGenerator.prefixes.length - 1)];
            }
            else {
                // Add a prefix that starts with an allowed letter.
                let allowedPrefixes = NameGenerator.prefixes.filter(prefix => allowedLetters.includes(prefix[0]));

                // Not allow 3 consecutive consonants.
                if (NameGenerator.goodConsonants.includes(lastLetter)) {
                    // Only allow single consonants or digraphs that start with a consonant.
                    allowedPrefixes = allowedPrefixes.filter(prefix => prefix.length === 1 || prefix === "qu");
                }

                silable += allowedPrefixes[rng.nextInt(0, allowedPrefixes.length - 1)];
            }
        }

        // 2. Vowel
        if (previousSilable && silable === "") {
            // Here means that the las letter was a vowel and no prefix was added.
            // This means we need to add an allowed vowel.
            // Which is just a different vowel from the last one.
            let vowel = NameGenerator.vowels[rng.nextInt(0, NameGenerator.vowels.length - 1)];
            while (vowel === lastLetter) {
                vowel = NameGenerator.vowels[rng.nextInt(0, NameGenerator.vowels.length - 1)];
            }

            silable += vowel;
        }
        else if (silable === "qu") {
            silable += "aeio"[rng.nextInt(0, 3)];
        }
        else {
            silable += NameGenerator.vowels[rng.nextInt(0, NameGenerator.vowels.length - 1)];
        }

        // 3. Suffix
        if (rng.next() % 100 < 40) {
            let sufix = NameGenerator.suffixes[rng.nextInt(0, NameGenerator.suffixes.length - 1)];

            while (silable.includes(sufix)) {
                sufix = NameGenerator.suffixes[rng.nextInt(0, NameGenerator.suffixes.length - 1)];
            }
        }

        return silable;
    }

    static generateName(rng, silableCount) {
        let name = "";

        let previousSilable;

        for (let i = 0; i < silableCount; i++) {
            const silable = NameGenerator.generateSilable(rng, previousSilable);
            name += silable;
            previousSilable = silable;
        }

        return name[0].toUpperCase() + name.slice(1);
    }
}