module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/lib/games/wordle-solver.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Comprehensive Wordle word list - all valid 5-letter words
__turbopack_context__.s([
    "WORDLE_WORDS",
    ()=>WORDLE_WORDS,
    "addLetter",
    ()=>addLetter,
    "createWordleGame",
    ()=>createWordleGame,
    "evaluateGuess",
    ()=>evaluateGuess,
    "filterPossibleWords",
    ()=>filterPossibleWords,
    "getKeyboardState",
    ()=>getKeyboardState,
    "removeLetter",
    ()=>removeLetter,
    "submitGuess",
    ()=>submitGuess
]);
const WORDLE_WORDS = [
    'ABOUT',
    'ABOVE',
    'ABUSE',
    'ACTOR',
    'ACUTE',
    'ADMIT',
    'ADOPT',
    'ADULT',
    'AFTER',
    'AGAIN',
    'AGENT',
    'AGREE',
    'AHEAD',
    'ALARM',
    'ALBUM',
    'ALERT',
    'ALIEN',
    'ALIGN',
    'ALIKE',
    'ALIVE',
    'ALLOW',
    'ALONE',
    'ALONG',
    'ALTER',
    'ANGEL',
    'ANGER',
    'ANGLE',
    'ANGRY',
    'APART',
    'APPLE',
    'APPLY',
    'ARENA',
    'ARGUE',
    'ARISE',
    'ARRAY',
    'ASIDE',
    'ASSET',
    'AVOID',
    'AWAKE',
    'AWARE',
    'BADLY',
    'BAKER',
    'BASES',
    'BASIC',
    'BEACH',
    'BEGAN',
    'BEING',
    'BELOW',
    'BENCH',
    'BILLY',
    'BIRTH',
    'BLACK',
    'BLAME',
    'BLIND',
    'BLOCK',
    'BLOOD',
    'BOARD',
    'BOOST',
    'BOOTH',
    'BOUND',
    'BRAIN',
    'BRAND',
    'BRAVE',
    'BREAD',
    'BREAK',
    'BREED',
    'BRIEF',
    'BRING',
    'BROAD',
    'BROKE',
    'BROWN',
    'BUILD',
    'BUILT',
    'BUYER',
    'CABLE',
    'CALIF',
    'CARRY',
    'CATCH',
    'CAUSE',
    'CHAIN',
    'CHAIR',
    'CHAOS',
    'CHARM',
    'CHART',
    'CHASE',
    'CHEAP',
    'CHECK',
    'CHEST',
    'CHIEF',
    'CHILD',
    'CHINA',
    'CHOSE',
    'CIVIL',
    'CLAIM',
    'CLASS',
    'CLEAN',
    'CLEAR',
    'CLICK',
    'CLIMB',
    'CLOCK',
    'CLOSE',
    'CLOUD',
    'COACH',
    'COAST',
    'COULD',
    'COUNT',
    'COURT',
    'COVER',
    'CRAFT',
    'CRASH',
    'CRAZY',
    'CREAM',
    'CRIME',
    'CROSS',
    'CROWD',
    'CROWN',
    'CRUDE',
    'CURVE',
    'CYCLE',
    'DAILY',
    'DANCE',
    'DATED',
    'DEALT',
    'DEATH',
    'DEBUT',
    'DELAY',
    'DELTA',
    'DENSE',
    'DEPOT',
    'DEPTH',
    'DERBY',
    'DIGIT',
    'DIRTY',
    'DOESN',
    'DOING',
    'DOUBT',
    'DOZEN',
    'DRAFT',
    'DRAMA',
    'DRANK',
    'DRAWN',
    'DREAM',
    'DRESS',
    'DRIED',
    'DRILL',
    'DRINK',
    'DRIVE',
    'DROVE',
    'DYING',
    'EAGER',
    'EARLY',
    'EARTH',
    'EIGHT',
    'ELITE',
    'EMPTY',
    'ENEMY',
    'ENJOY',
    'ENTER',
    'ENTRY',
    'EQUAL',
    'ERROR',
    'EVENT',
    'EVERY',
    'EXACT',
    'EXIST',
    'EXTRA',
    'FAITH',
    'FALSE',
    'FAULT',
    'FIBER',
    'FIELD',
    'FIFTH',
    'FIFTY',
    'FIGHT',
    'FINAL',
    'FIRST',
    'FIXED',
    'FLASH',
    'FLEET',
    'FLOOR',
    'FLUID',
    'FOCUS',
    'FORCE',
    'FORTH',
    'FORTY',
    'FORUM',
    'FOUND',
    'FRAME',
    'FRANK',
    'FRAUD',
    'FRESH',
    'FRONT',
    'FRUIT',
    'FULLY',
    'FUNNY',
    'GIANT',
    'GIVEN',
    'GLASS',
    'GLOBE',
    'GOING',
    'GRACE',
    'GRADE',
    'GRAIN',
    'GRAND',
    'GRANT',
    'GRASS',
    'GRAVE',
    'GREAT',
    'GREEN',
    'GROSS',
    'GROUP',
    'GROWN',
    'GUARD',
    'GUESS',
    'GUEST',
    'GUIDE',
    'GUILT',
    'HAPPY',
    'HARRY',
    'HEART',
    'HEAVY',
    'HELLO',
    'HENRY',
    'HORSE',
    'HOTEL',
    'HOUSE',
    'HUMAN',
    'IDEAL',
    'IMAGE',
    'IMPLY',
    'INDEX',
    'INNER',
    'INPUT',
    'ISSUE',
    'JAPAN',
    'JIMMY',
    'JOINT',
    'JONES',
    'JUDGE',
    'KNOWN',
    'LABEL',
    'LARGE',
    'LASER',
    'LATER',
    'LAUGH',
    'LAYER',
    'LEARN',
    'LEASE',
    'LEAST',
    'LEAVE',
    'LEGAL',
    'LEMON',
    'LEVEL',
    'LEWIS',
    'LIGHT',
    'LIMIT',
    'LINKS',
    'LIVES',
    'LOCAL',
    'LOGIC',
    'LOOSE',
    'LOWER',
    'LUCKY',
    'LUNCH',
    'LYING',
    'MAGIC',
    'MAJOR',
    'MAKER',
    'MARCH',
    'MARIA',
    'MATCH',
    'MAYBE',
    'MAYOR',
    'MEANT',
    'MEDIA',
    'METAL',
    'MIGHT',
    'MINOR',
    'MINUS',
    'MIXED',
    'MODEL',
    'MONEY',
    'MONTH',
    'MORAL',
    'MOTOR',
    'MOUNT',
    'MOUSE',
    'MOUTH',
    'MOVED',
    'MOVIE',
    'MUSIC',
    'NEEDS',
    'NEVER',
    'NEWLY',
    'NIGHT',
    'NOISE',
    'NORTH',
    'NOTED',
    'NOVEL',
    'NURSE',
    'OCCUR',
    'OCEAN',
    'OFFER',
    'OFTEN',
    'ORDER',
    'OTHER',
    'OUGHT',
    'OUTER',
    'OWNED',
    'OWNER',
    'PAINT',
    'PANEL',
    'PAPER',
    'PARIS',
    'PARTY',
    'PEACE',
    'PENNY',
    'PETER',
    'PHASE',
    'PHONE',
    'PHOTO',
    'PIANO',
    'PIECE',
    'PILOT',
    'PITCH',
    'PLACE',
    'PLAIN',
    'PLANE',
    'PLANT',
    'PLATE',
    'PLAZA',
    'POINT',
    'POUND',
    'POWER',
    'PRESS',
    'PRICE',
    'PRIDE',
    'PRIME',
    'PRINT',
    'PRIOR',
    'PRIZE',
    'PROOF',
    'PROUD',
    'PROVE',
    'QUEEN',
    'QUICK',
    'QUIET',
    'QUITE',
    'RADIO',
    'RAISE',
    'RANGE',
    'RAPID',
    'RATIO',
    'REACH',
    'READY',
    'REALM',
    'REFER',
    'RELAX',
    'REPLY',
    'RIDER',
    'RIDGE',
    'RIFLE',
    'RIGHT',
    'RIGID',
    'RIVER',
    'ROBIN',
    'ROCKY',
    'ROGER',
    'ROMAN',
    'ROUGH',
    'ROUND',
    'ROUTE',
    'ROYAL',
    'RURAL',
    'SCALE',
    'SCENE',
    'SCOPE',
    'SCORE',
    'SENSE',
    'SERVE',
    'SEVEN',
    'SHALL',
    'SHAPE',
    'SHARE',
    'SHARP',
    'SHEET',
    'SHELF',
    'SHELL',
    'SHIFT',
    'SHINE',
    'SHIRT',
    'SHOCK',
    'SHOOT',
    'SHORT',
    'SHOWN',
    'SIGHT',
    'SILLY',
    'SIMON',
    'SINCE',
    'SIXTH',
    'SIXTY',
    'SIZED',
    'SKILL',
    'SLASH',
    'SLEEP',
    'SLIDE',
    'SMALL',
    'SMART',
    'SMILE',
    'SMITH',
    'SMOKE',
    'SOLID',
    'SOLVE',
    'SORRY',
    'SOUND',
    'SOUTH',
    'SPACE',
    'SPARE',
    'SPEAK',
    'SPEED',
    'SPEND',
    'SPENT',
    'SPLIT',
    'SPOKE',
    'SPORT',
    'STAFF',
    'STAGE',
    'STAKE',
    'STAND',
    'START',
    'STATE',
    'STEAM',
    'STEEL',
    'STICK',
    'STILL',
    'STOCK',
    'STONE',
    'STOOD',
    'STORE',
    'STORM',
    'STORY',
    'STRIP',
    'STUCK',
    'STUDY',
    'STUFF',
    'STYLE',
    'SUGAR',
    'SUITE',
    'SUNNY',
    'SUPER',
    'SURGE',
    'SWEET',
    'SWIFT',
    'SWING',
    'SWORD',
    'TABLE',
    'TAKEN',
    'TASTE',
    'TAXES',
    'TEACH',
    'TEAMS',
    'TEETH',
    'TEMPO',
    'TERRY',
    'TEXAS',
    'THANK',
    'THEFT',
    'THEIR',
    'THEME',
    'THERE',
    'THESE',
    'THICK',
    'THING',
    'THINK',
    'THIRD',
    'THOSE',
    'THREE',
    'THREW',
    'THROW',
    'TIGHT',
    'TIMES',
    'TITLE',
    'TODAY',
    'TOPIC',
    'TOTAL',
    'TOUCH',
    'TOUGH',
    'TOWER',
    'TRACK',
    'TRADE',
    'TRAIN',
    'TRASH',
    'TREAT',
    'TREND',
    'TRIAL',
    'TRIBE',
    'TRICK',
    'TRIED',
    'TRIES',
    'TROOP',
    'TRUCK',
    'TRULY',
    'TRUMP',
    'TRUST',
    'TRUTH',
    'TWICE',
    'TWINS',
    'UNCLE',
    'UNDER',
    'UNDUE',
    'UNION',
    'UNITY',
    'UNTIL',
    'UPPER',
    'UPSET',
    'URBAN',
    'USAGE',
    'USUAL',
    'VALID',
    'VALUE',
    'VIDEO',
    'VIRUS',
    'VISIT',
    'VITAL',
    'VOCAL',
    'VOICE',
    'WASTE',
    'WATCH',
    'WATER',
    'WHEEL',
    'WHERE',
    'WHICH',
    'WHILE',
    'WHITE',
    'WHOLE',
    'WHOSE',
    'WOMAN',
    'WOMEN',
    'WORLD',
    'WORRY',
    'WORSE',
    'WORST',
    'WORTH',
    'WOULD',
    'WOUND',
    'WRITE',
    'WRONG',
    'WROTE',
    'YIELD',
    'YOUNG',
    'YOURS',
    'YOUTH',
    'ZEBRA',
    // Additional common Wordle words
    'ABACK',
    'ABASE',
    'ABATE',
    'ABBOT',
    'ABEAM',
    'ABELE',
    'ABETS',
    'ABIDE',
    'ABODE',
    'ABORT',
    'ABOUN',
    'ABOUT',
    'ABOVE',
    'ABUSE',
    'ABUTS',
    'ABYSS',
    'ACED',
    'ACERB',
    'ACES',
    'ACHE',
    'ACHES',
    'ACHOO',
    'ACID',
    'ACIDS',
    'ACIDY',
    'ACING',
    'ACME',
    'ACNE',
    'ACORN',
    'ACRES',
    'ACRID',
    'ACTED',
    'ACTIN',
    'ACTON',
    'ACTOR',
    'ACTS',
    'ACUTE',
    'ADDED',
    'ADDER',
    'ADEPT',
    'ADIEU',
    'ADIOS',
    'ADITS',
    'ADMIN',
    'ADMIT',
    'ADMAN',
    'ADMEN',
    'ADOBES',
    'ADORE',
    'ADORN',
    'ADOZE',
    'ADULT',
    'ADZE',
    'AEGIS',
    'AERIE',
    'AEROS',
    'AETIO',
    'AFACE',
    'AFAR',
    'AFIRE',
    'AFOOT',
    'AFOUL',
    'AFTER',
    'AGAIN',
    'AGAPE',
    'AGARS',
    'AGATE',
    'AGAVE',
    'AGAZE',
    'AGEND',
    'AGENT',
    'AGERS',
    'AGGER',
    'AGGIE',
    'AGLOW',
    'AGAPE',
    'AGONY',
    'AGORA',
    'AGREE',
    'AHEAD',
    'AHEM',
    'AHOLD',
    'AHULL',
    'AIDED',
    'AIDER',
    'AIDES',
    'AIDES',
    'AILED',
    'AIMED',
    'AIMER',
    'AIMS',
    'AIOLI',
    'AISLE',
    'AKELA',
    'AKING',
    'ALACK',
    'ALARM',
    'ALBUM',
    'ALDER',
    'ALEFS',
    'ALEPH',
    'ALERT',
    'ALGAE',
    'ALIBI',
    'ALIEN',
    'ALIGN',
    'ALIKE',
    'ALINE',
    'ALIST',
    'ALIVE',
    'ALKYL',
    'ALLAY',
    'ALLEE',
    'ALLEY',
    'ALLIS',
    'ALLOW',
    'ALLOY',
    'ALOES',
    'ALOFT',
    'ALOHA',
    'ALONE',
    'ALONG',
    'ALOUD',
    'ALPHA',
    'ALTAR',
    'ALTER',
    'ALTHO',
    'ALTOS',
    'ALUMS',
    'ALUMN',
    'ALWAYS',
    'AMASS',
    'AMAZE',
    'AMBAN',
    'AMBER',
    'AMBIT',
    'AMBLE',
    'AMBO',
    'AMEND',
    'AMEND',
    'AMENS',
    'AMEND',
    'AMINO',
    'AMIRS',
    'AMITY',
    'AMNIO',
    'AMOKS',
    'AMORE',
    'AMORT',
    'AMOUR',
    'AMPLE',
    'AMPUL',
    'AMULE',
    'AMUSE',
    'AMYLS',
    'ANAL',
    'ANAS',
    'ANATA',
    'ANCHO',
    'ANCLE',
    'ANDAN',
    'ANDER',
    'ANDRO',
    'ANEAR',
    'ANEW',
    'ANGAS',
    'ANGER',
    'ANGLE',
    'ANGOR',
    'ANGRY',
    'ANILE',
    'ANIMA',
    'ANIME',
    'ANKHS',
    'ANKLE',
    'ANKUS',
    'ANNAL',
    'ANNAS',
    'ANNEA',
    'ANNEX',
    'ANNIE',
    'ANNOS',
    'ANNUL',
    'ANODE',
    'ANOMY',
    'ANSAE',
    'ANSER',
    'ANTAE',
    'ANTAR',
    'ANTED',
    'ANTES',
    'ANTIC',
    'ANTI',
    'ANTS',
    'ANURA',
    'ANVIL',
    'ANYON',
    'APACE',
    'APART',
    'APART',
    'APHID',
    'APISH',
    'APODS',
    'APOLL',
    'APONE',
    'APPLE',
    'APPLY',
    'APRAX',
    'APRES',
    'APRIL',
    'APRO',
    'APSES',
    'APTLY',
    'APTS',
    'ARAKS',
    'ARAME',
    'ARBAS',
    'ARBED',
    'ARBIT',
    'ARBOR',
    'ARCAD',
    'ARCH',
    'ARCHY',
    'ARCOD',
    'ARCS',
    'ARDEB',
    'ARDOR',
    'AREAD',
    'AREAL',
    'AREAS',
    'ARECA',
    'AREIC',
    'ARENE',
    'AREPA',
    'ARETE',
    'ARGAN',
    'ARGIL',
    'ARGON',
    'ARGOT',
    'ARGUE',
    'ARHAT',
    'ARIEL',
    'ARILS',
    'ARISE',
    'ARKED',
    'ARKOS',
    'ARLES',
    'ARMED',
    'ARMER',
    'ARMET',
    'ARMIL',
    'ARMOR',
    'ARNAS',
    'ARNIS',
    'AROAR',
    'AROMA',
    'AROSE',
    'ARPA',
    'ARPEN',
    'ARROW',
    'ARSIS',
    'ARSON',
    'ARTAL',
    'ARTEL',
    'ARTER',
    'ARTIL',
    'ARTS',
    'ASANA',
    'ASBEST',
    'ASCOT',
    'ASEA',
    'ASEAN',
    'ASIDE',
    'ASKED',
    'ASKER',
    'ASKES',
    'ASKOI',
    'ASLAV',
    'ASPER',
    'ASPEN',
    'ASPIC',
    'ASPRO',
    'ASSAI',
    'ASSAM',
    'ASSES',
    'ASSIG',
    'ASSOT',
    'ASTAR',
    'ASTED',
    'ASTER',
    'ASTIR',
    'ASTON',
    'ASTUN',
    'ASURA',
    'ASWED',
    'ASWIM',
    'ATABS',
    'ATAXY',
    'ATEES',
    'ATMAN',
    'ATMAP',
    'ATOM',
    'ATONE',
    'ATOPY',
    'APPAL',
    'APPAY',
    'APPEA',
    'APPEL',
    'APPEX',
    'APPLE',
    'APPLY',
    'APPTS',
    'APRIL',
    'APRON',
    'APTLY',
    'APTS',
    'ARAKS',
    'ARAM',
    'ARAME',
    'ARBAS',
    'ARBED',
    'ARBOR',
    'ARCED',
    'ARCH',
    'ARCHY',
    'ARCS',
    'ARCTI',
    'ARDEN',
    'ARDOR',
    'AREAD',
    'AREAL',
    'AREAS',
    'ARECA',
    'AREIC',
    'ARENE',
    'AREPA',
    'ARETE',
    'ARGAN',
    'ARGIL',
    'ARGON',
    'ARGOT',
    'ARGUE',
    'ARHAT',
    'ARIAN',
    'ARIEL',
    'ARILS',
    'ARISE',
    'ARKED',
    'ARKOS',
    'ARLES',
    'ARMED',
    'ARMER',
    'ARMET',
    'ARMIL',
    'ARMOR',
    'ARNAS',
    'ARNIS',
    'AROAR',
    'AROMA',
    'AROSE',
    'ARPA',
    'ARPEN',
    'ARROW',
    'ARSIS',
    'ARSON',
    'ARTAL',
    'ARTEL',
    'ARTER',
    'ARTIL',
    'ARTS',
    'ASANA',
    'ASBEST',
    'ASCOT',
    'ASEA',
    'ASEAN',
    'ASIDE',
    'ASKED',
    'ASKER',
    'ASKES',
    'ASKOI',
    'ASLAV',
    'ASPER',
    'ASPEN',
    'ASPIC',
    'ASPRO',
    'ASSAI',
    'ASSAM',
    'ASSES',
    'ASSIG',
    'ASSOT',
    'ASTAR',
    'ASTED',
    'ASTER',
    'ASTIR',
    'ASTON',
    'ASTUN',
    'ASURA',
    'ASWED',
    'ASWIM',
    'ATABS',
    'ATAXY',
    'ATEES',
    'ATMAN',
    'ATMAP',
    'ATOM',
    'ATONE',
    'ATOPY',
    'ATTAR',
    'ATTIC',
    'ATUBY',
    'AUDET',
    'AUDIL',
    'AUDIT',
    'AUGER',
    'AUGHT',
    'AULOS',
    'AUNTY',
    'AURAE',
    'AURAL',
    'AURAR',
    'AURAS',
    'AUREI',
    'AURIC',
    'AURIS',
    'AUROR',
    'AUSUS',
    'AUTOS',
    'AUXES',
    'AVAIL',
    'AVALE',
    'AVANT',
    'AVELS',
    'AVENS',
    'AVERS',
    'AVERT',
    'AVIAN',
    'AVIES',
    'AVINE',
    'AVION',
    'AVISO',
    'AVOIR',
    'AVOID',
    'AVOIR',
    'AVOWS',
    'AVOWS',
    'AVULS',
    'AWAIT',
    'AWAKE',
    'AWARD',
    'AWARE',
    'AWASH',
    'AWAY',
    'AWFUL',
    'AWING',
    'AWNED',
    'AWOLS',
    'AWOKE',
    'AXELS',
    'AXELS',
    'AXIAL',
    'AXILS',
    'AXING',
    'AXION',
    'AXIS',
    'AXMAN',
    'AXMEN',
    'AXOID',
    'AXONE',
    'AXONS',
    'AYAH',
    'AYE',
    'AYINS',
    'AYOND',
    'AYRES',
    'AZANS',
    'AZIDE',
    'AZINE',
    'AZOIC',
    'AZON',
    'AZOTE',
    'AZOTH',
    'AZURE',
    'AZURN',
    'AZURY',
    'AZYGY',
    'AZYLE'
];
// Function to fetch today's Wordle word from a public API
async function fetchTodayWordleWord() {
    try {
        // Using a free Wordle API that provides daily answers
        const response = await fetch('https://wordle.votee.dev:8000/daily');
        if (response.ok) {
            const data = await response.json();
            return data.word.toUpperCase();
        }
    } catch  {
        console.warn('Failed to fetch today\'s Wordle word, using random word');
    }
    // Fallback to random word if API fails
    return WORDLE_WORDS[Math.floor(Math.random() * WORDLE_WORDS.length)];
}
async function createWordleGame(useTodayWord = true) {
    let targetWord;
    if (useTodayWord) {
        targetWord = await fetchTodayWordleWord();
    } else {
        targetWord = WORDLE_WORDS[Math.floor(Math.random() * WORDLE_WORDS.length)];
    }
    return {
        targetWord,
        guesses: [],
        currentGuess: '',
        isGameOver: false,
        isWon: false,
        possibleWords: [
            ...WORDLE_WORDS
        ],
        isLoading: useTodayWord,
        useTodayWord
    };
}
function evaluateGuess(guess, targetWord) {
    const states = [
        'empty',
        'empty',
        'empty',
        'empty',
        'empty'
    ];
    const targetLetters = targetWord.split('');
    const guessLetters = guess.split('');
    // First pass: mark correct positions
    for(let i = 0; i < 5; i++){
        if (guessLetters[i] === targetLetters[i]) {
            states[i] = 'correct';
            targetLetters[i] = '_';
            guessLetters[i] = '_';
        }
    }
    // Second pass: mark present letters
    for(let i = 0; i < 5; i++){
        if (guessLetters[i] !== '_' && targetLetters.includes(guessLetters[i])) {
            states[i] = 'present';
            targetLetters[targetLetters.indexOf(guessLetters[i])] = '_';
        }
    }
    // Third pass: mark absent letters
    for(let i = 0; i < 5; i++){
        if (guessLetters[i] !== '_' && states[i] === 'empty') {
            states[i] = 'absent';
        }
    }
    return states;
}
function filterPossibleWords(possibleWords, guesses) {
    return possibleWords.filter((word)=>{
        for (const guess of guesses){
            // Check if word is consistent with all guesses
            for(let i = 0; i < 5; i++){
                const guessLetter = guess.word[i];
                const wordLetter = word[i];
                const state = guess.states[i];
                if (state === 'correct' && wordLetter !== guessLetter) {
                    return false;
                }
                if (state === 'absent' && word.includes(guessLetter)) {
                    // Make sure the letter isn't in a position marked as 'present'
                    let hasPresent = false;
                    for(let j = 0; j < 5; j++){
                        if (guess.states[j] === 'present' && guess.word[j] === guessLetter) {
                            hasPresent = true;
                            break;
                        }
                    }
                    if (!hasPresent && word.includes(guessLetter)) {
                        return false;
                    }
                }
                if (state === 'present' && !word.includes(guessLetter)) {
                    return false;
                }
                if (state === 'present' && wordLetter === guessLetter) {
                    // Letter is present but not in this position
                    return false;
                }
            }
        }
        return true;
    });
}
function submitGuess(state, guess) {
    if (state.isGameOver || guess.length !== 5 || !WORDLE_WORDS.includes(guess)) {
        return state;
    }
    const states = evaluateGuess(guess, state.targetWord);
    const newGuess = {
        word: guess,
        states
    };
    const newGuesses = [
        ...state.guesses,
        newGuess
    ];
    const isWon = guess === state.targetWord;
    const isGameOver = isWon || newGuesses.length >= 6;
    const newPossibleWords = filterPossibleWords(state.possibleWords, newGuesses);
    return {
        ...state,
        guesses: newGuesses,
        currentGuess: '',
        isGameOver,
        isWon,
        possibleWords: newPossibleWords
    };
}
function addLetter(state, letter) {
    if (state.currentGuess.length < 5 && !state.isGameOver) {
        return {
            ...state,
            currentGuess: state.currentGuess + letter
        };
    }
    return state;
}
function removeLetter(state) {
    if (state.currentGuess.length > 0) {
        return {
            ...state,
            currentGuess: state.currentGuess.slice(0, -1)
        };
    }
    return state;
}
function getKeyboardState(guesses) {
    const keyboardState = new Map();
    for (const guess of guesses){
        for(let i = 0; i < 5; i++){
            const letter = guess.word[i];
            const state = guess.states[i];
            // Update keyboard state with the best (most informative) state for each letter
            const currentState = keyboardState.get(letter);
            if (!currentState || currentState === 'absent' && state !== 'absent' || currentState === 'present' && state === 'correct') {
                keyboardState.set(letter, state);
            }
        }
    }
    return keyboardState;
}
}),
"[project]/src/app/games/wordle-solver/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WordleSolver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$wordle$2d$solver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/games/wordle-solver.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const KEYBOARD_ROWS = [
    [
        "Q",
        "W",
        "E",
        "R",
        "T",
        "Y",
        "U",
        "I",
        "O",
        "P"
    ],
    [
        "A",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L"
    ],
    [
        "ENTER",
        "Z",
        "X",
        "C",
        "V",
        "B",
        "N",
        "M",
        "BACK"
    ]
];
function WordleSolver() {
    const [gameState, setGameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        targetWord: '',
        guesses: [],
        currentGuess: '',
        isGameOver: false,
        isWon: false,
        possibleWords: [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$wordle$2d$solver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WORDLE_WORDS"]
        ],
        isLoading: true,
        useTodayWord: true
    });
    const [showTarget, setShowTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const initializeGame = async (useTodayWord)=>{
        const newState = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$wordle$2d$solver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createWordleGame"])(useTodayWord);
        setGameState(newState);
    };
    // Initialize game on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const initGame = async ()=>{
            await initializeGame(true);
        };
        initGame();
    }, []);
    const keyboardState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$wordle$2d$solver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getKeyboardState"])(gameState.guesses);
    const handleKeyPress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (gameState.isGameOver) return;
        if (e.key === "Enter") {
            if (gameState.currentGuess.length === 5) {
                setGameState((prev)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$wordle$2d$solver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["submitGuess"])(prev, prev.currentGuess));
            }
        } else if (e.key === "Backspace") {
            setGameState((prev)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$wordle$2d$solver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeLetter"])(prev));
        } else if (/^[a-zA-Z]$/.test(e.key)) {
            setGameState((prev)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$wordle$2d$solver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addLetter"])(prev, e.key.toUpperCase()));
        }
    }, [
        gameState.isGameOver,
        gameState.currentGuess.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        window.addEventListener("keydown", handleKeyPress);
        return ()=>window.removeEventListener("keydown", handleKeyPress);
    }, [
        handleKeyPress
    ]);
    const resetGame = ()=>{
        initializeGame(gameState.useTodayWord);
        setShowTarget(false);
    };
    const toggleTodayWord = ()=>{
        initializeGame(!gameState.useTodayWord);
        setShowTarget(false);
    };
    const getLetterColor = (state)=>{
        switch(state){
            case "correct":
                return "bg-green-500 text-white";
            case "present":
                return "bg-yellow-500 text-white";
            case "absent":
                return "bg-gray-500 text-white";
            default:
                return "bg-gray-700 text-gray-300";
        }
    };
    const getKeyboardKeyColor = (letter)=>{
        const state = keyboardState.get(letter);
        if (state === "correct") return "bg-green-500 text-white";
        if (state === "present") return "bg-yellow-500 text-white";
        if (state === "absent") return "bg-gray-500 text-white";
        return "bg-gray-600 text-gray-200 hover:bg-gray-500";
    };
    const handleVirtualKey = (key)=>{
        if (gameState.isGameOver) return;
        if (key === "ENTER") {
            if (gameState.currentGuess.length === 5) {
                setGameState((prev)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$wordle$2d$solver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["submitGuess"])(prev, prev.currentGuess));
            }
        } else if (key === "BACK") {
            setGameState((prev)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$wordle$2d$solver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeLetter"])(prev));
        } else {
            setGameState((prev)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$wordle$2d$solver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addLetter"])(prev, key));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "text-white/70 hover:text-white transition-colors",
                            children: "← Back to Hub"
                        }, void 0, false, {
                            fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold text-white",
                            children: "Wordle Solver"
                        }, void 0, false, {
                            fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20"
                        }, void 0, false, {
                            fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-300 mb-2",
                            children: "Guess the 5-letter word in 6 tries or less."
                        }, void 0, false, {
                            fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-400 mb-4",
                            children: "Green = correct position, Yellow = wrong position, Gray = not in word"
                        }, void 0, false, {
                            fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-4 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-400",
                                    children: [
                                        "Mode: ",
                                        gameState.useTodayWord ? "Today&apos;s Wordle" : "Random Word"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                                    lineNumber: 140,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: toggleTodayWord,
                                    className: "px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors",
                                    children: [
                                        "Switch to ",
                                        gameState.useTodayWord ? "Random" : "Today&apos;s"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this),
                        gameState.isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-yellow-400 text-sm",
                            children: "Loading today's Wordle word..."
                        }, void 0, false, {
                            fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                            lineNumber: 152,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-rows-6 gap-2 mb-6",
                            children: Array.from({
                                length: 6
                            }).map((_, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-5 gap-2",
                                    children: Array.from({
                                        length: 5
                                    }).map((_, colIndex)=>{
                                        const guess = gameState.guesses[rowIndex];
                                        const letter = guess ? guess.word[colIndex] : rowIndex === gameState.guesses.length ? gameState.currentGuess[colIndex] || "" : "";
                                        const state = guess ? guess.states[colIndex] : "empty";
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `aspect-square flex items-center justify-center text-2xl font-bold rounded-lg border-2 ${getLetterColor(state)} ${state === "empty" ? "border-gray-600" : "border-transparent"}`,
                                            children: letter
                                        }, colIndex, false, {
                                            fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                                            lineNumber: 174,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, rowIndex, false, {
                                    fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                                    lineNumber: 161,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this),
                        gameState.isGameOver && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-4",
                            children: [
                                gameState.isWon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-green-400 text-xl font-bold mb-2",
                                    children: "🎉 Congratulations! You solved it!"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                                    lineNumber: 195,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-red-400 text-xl font-bold mb-2",
                                    children: [
                                        "Game Over! The word was: ",
                                        gameState.targetWord
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                                    lineNumber: 199,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-gray-400",
                                    children: [
                                        "Possible words remaining: ",
                                        gameState.possibleWords.length
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                                    lineNumber: 203,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                            lineNumber: 193,
                            columnNumber: 13
                        }, this),
                        !gameState.isGameOver && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-gray-400",
                                    children: [
                                        "Possible words: ",
                                        gameState.possibleWords.length
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                                    lineNumber: 211,
                                    columnNumber: 15
                                }, this),
                                gameState.possibleWords.length <= 10 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 text-xs text-gray-500",
                                    children: gameState.possibleWords.slice(0, 20).join(", ")
                                }, void 0, false, {
                                    fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                                    lineNumber: 215,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                            lineNumber: 210,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20",
                    children: KEYBOARD_ROWS.map((row, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center gap-1 mb-1",
                            children: row.map((key)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleVirtualKey(key),
                                    className: `px-2 py-3 rounded font-semibold text-sm transition-colors ${getKeyboardKeyColor(key)} ${key === "ENTER" || key === "BACK" ? "px-3 text-xs" : "px-4"}`,
                                    children: key === "BACK" ? "⌫" : key
                                }, key, false, {
                                    fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                                    lineNumber: 227,
                                    columnNumber: 17
                                }, this))
                        }, rowIndex, false, {
                            fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                            lineNumber: 225,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                    lineNumber: 223,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-4 justify-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: resetGame,
                            className: "px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors",
                            disabled: gameState.isLoading,
                            children: gameState.isLoading ? "Loading..." : "New Game"
                        }, void 0, false, {
                            fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                            lineNumber: 246,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowTarget(!showTarget),
                            className: "px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors",
                            disabled: gameState.isLoading,
                            children: [
                                showTarget ? "Hide" : "Show",
                                " Answer"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                            lineNumber: 253,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                    lineNumber: 245,
                    columnNumber: 9
                }, this),
                showTarget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-yellow-400 text-lg font-bold",
                        children: [
                            "Answer: ",
                            gameState.targetWord
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                        lineNumber: 264,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/games/wordle-solver/page.tsx",
                    lineNumber: 263,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/games/wordle-solver/page.tsx",
            lineNumber: 119,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/games/wordle-solver/page.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7454eda1._.js.map