module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/lib/games/e-digits.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// First 1000 digits of e (Euler's number)
// e = 2.71828...
__turbopack_context__.s([
    "E_DIGITS",
    ()=>E_DIGITS
]);
const E_DIGITS = "718281828459045235360287471352662497757247093699959574966967627724076630353547594571382178525166427427466391932003059921817413596629043572900334295260595630738132328627943490763233829880753195251019011573834187930702154089149934884167509244761460668082264800168477411853742345442437107539077744992069551702761838606261331384583000752044933826560297606737113200709328709127443747047230696977209310141692836819025515108657463772111252389784425056953696770785449969967946864454905987931636889230098793127736178215424999229576351482208269895193668033182528869398496465105820939239829488793320362509443117301238197068416140397019837679320683282376464804295311802328782509819455815301756717361332069811250996181881593041690351598888519345807273866738589422879228499892086805825749279610484198444363463244968487560233624827041978623209002160990235304369941849146314093431738143640546253152096183690888707601788033614048349476037895361643694787037077460895535814552681168680959178316066730281698266622440603073883405836647194635374766431825390715243161587324468441523816221256732157602252424405038264131900659608609521937344200681202834852336133103647272889277407328981986394964061334167179048593919704966562163852490613828362136305217341202130483836884216158572637053061932658946795058188699459632459801761815266408742062454452217691130370602570055874492866054430090709667460666757838867549291855342601877772123341258562102273502399136936871112665738452686206533485091520345956884743301703103350128933412559188612814869465898524716374432910732097182443193611673226317845400426429484519467856234917595220024625238592390846583365782492064546736556168690856551352246683089192463372918726086356201952096708078326382985955394538250272221932679775581441829359104406332917105782343812435636916473902144932571012838111482866795202277878354762063";
}),
"[project]/src/lib/games/game-logic.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createGame",
    ()=>createGame,
    "getCursorPosition",
    ()=>getCursorPosition,
    "getDisplayDigits",
    ()=>getDisplayDigits,
    "getPersonalBest",
    ()=>getPersonalBest,
    "getPersonalBestForMode",
    ()=>getPersonalBestForMode,
    "getRevealedDigits",
    ()=>getRevealedDigits,
    "getScore",
    ()=>getScore,
    "savePersonalBest",
    ()=>savePersonalBest,
    "savePersonalBestForMode",
    ()=>savePersonalBestForMode,
    "updatePracticeRevealedCount",
    ()=>updatePracticeRevealedCount,
    "validateDigit",
    ()=>validateDigit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$e$2d$digits$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/games/e-digits.ts [app-ssr] (ecmascript)");
;
;
function createGame(mode = 'main', practiceRevealedCount = 0) {
    return {
        currentIndex: 0,
        isGameOver: false,
        isWon: false,
        wrongDigit: null,
        mode,
        practiceRevealedCount
    };
}
function validateDigit(gameState, digit) {
    if (gameState.isGameOver || !/^\d$/.test(digit)) {
        return gameState;
    }
    const expectedDigit = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$e$2d$digits$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E_DIGITS"][gameState.currentIndex];
    if (digit !== expectedDigit) {
        return {
            ...gameState,
            isGameOver: true,
            wrongDigit: digit
        };
    }
    const newIndex = gameState.currentIndex + 1;
    const isWon = newIndex >= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$e$2d$digits$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E_DIGITS"].length;
    return {
        ...gameState,
        currentIndex: newIndex,
        isGameOver: isWon,
        isWon
    };
}
function getScore(gameState) {
    return gameState.currentIndex;
}
function getPersonalBest() {
    if ("TURBOPACK compile-time truthy", 1) return 0;
    //TURBOPACK unreachable
    ;
    const stored = undefined;
}
function savePersonalBest(score) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const current = undefined;
}
function getDisplayDigits(gameState, windowSize = 30) {
    const start = Math.max(0, gameState.currentIndex - Math.floor(windowSize / 2));
    const end = Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$e$2d$digits$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E_DIGITS"].length, start + windowSize);
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$e$2d$digits$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E_DIGITS"].slice(start, end);
}
function getCursorPosition(gameState, windowSize = 30) {
    const start = Math.max(0, gameState.currentIndex - Math.floor(windowSize / 2));
    return gameState.currentIndex - start;
}
function getRevealedDigits(count) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$e$2d$digits$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E_DIGITS"].slice(0, count);
}
function getPersonalBestForMode(mode) {
    if ("TURBOPACK compile-time truthy", 1) return 0;
    //TURBOPACK unreachable
    ;
    const key = undefined;
    const stored = undefined;
}
function savePersonalBestForMode(score, mode) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const key = undefined;
    const current = undefined;
}
function updatePracticeRevealedCount(gameState, count) {
    return {
        ...gameState,
        practiceRevealedCount: Math.max(0, Math.min(999, count))
    };
}
}),
"[project]/src/app/games/e-digits/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EDigitsGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$game$2d$logic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/games/game-logic.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$e$2d$digits$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/games/e-digits.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function EDigitsGame() {
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('main');
    const [gameState, setGameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$game$2d$logic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createGame"])('main'));
    const [personalBest, setPersonalBest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [practiceRevealed, setPracticeRevealed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [showModeSelect, setShowModeSelect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isInputFocused, setIsInputFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [practiceWrongDigit, setPracticeWrongDigit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setPersonalBest((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$game$2d$logic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getPersonalBestForMode"])(mode));
    }, [
        mode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (gameState.isGameOver && !gameState.isWon) {
            const score = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$game$2d$logic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getScore"])(gameState);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$game$2d$logic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["savePersonalBestForMode"])(score, mode);
            setPersonalBest((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$game$2d$logic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getPersonalBestForMode"])(mode));
        }
    }, [
        gameState,
        mode
    ]);
    const handleKeyPress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (gameState.isGameOver || showModeSelect || isInputFocused) return;
        if (e.key >= "0" && e.key <= "9") {
            if (mode === 'practice') {
                const expectedDigit = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$e$2d$digits$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E_DIGITS"][gameState.currentIndex];
                if (e.key !== expectedDigit) {
                    setPracticeWrongDigit(e.key);
                    return;
                }
                setPracticeWrongDigit(null);
            }
            setGameState((prev)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$game$2d$logic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["validateDigit"])(prev, e.key));
        }
    }, [
        gameState.isGameOver,
        showModeSelect,
        isInputFocused,
        mode,
        gameState.currentIndex
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        window.addEventListener("keydown", handleKeyPress);
        return ()=>window.removeEventListener("keydown", handleKeyPress);
    }, [
        handleKeyPress
    ]);
    const startGame = (selectedMode)=>{
        setMode(selectedMode);
        setGameState((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$game$2d$logic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createGame"])(selectedMode, selectedMode === 'practice' ? practiceRevealed : 0));
        setShowModeSelect(false);
    };
    const resetGame = ()=>{
        setShowModeSelect(true);
        setGameState((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$game$2d$logic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createGame"])('main'));
        setPracticeRevealed(0);
    };
    const score = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$game$2d$logic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getScore"])(gameState);
    const revealedDigits = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$game$2d$logic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getRevealedDigits"])(gameState.practiceRevealedCount);
    const enteredDigits = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$e$2d$digits$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E_DIGITS"].slice(0, gameState.currentIndex);
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
                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold text-white",
                            children: "e-Digits Memory"
                        }, void 0, false, {
                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20"
                        }, void 0, false, {
                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/games/e-digits/page.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this),
                showModeSelect ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl font-bold text-white text-center mb-8",
                            children: "Choose Mode"
                        }, void 0, false, {
                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>startGame('main'),
                                    className: "p-6 bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold text-white mb-2",
                                            children: "Main Mode"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                                            lineNumber: 91,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-purple-100",
                                            children: "Pure memory test. No hints, no help. Test how many digits you truly know."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                                            lineNumber: 92,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/games/e-digits/page.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 bg-white/10 rounded-xl",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold text-white mb-2",
                                            children: "Practice Mode"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                                            lineNumber: 96,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-300 mb-4",
                                            children: "Learn with revealed digits. Adjust how many digits to see while playing."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                                            lineNumber: 97,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>startGame('practice'),
                                            className: "w-full py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors",
                                            children: "Start Practice"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                                            lineNumber: 99,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/games/e-digits/page.tsx",
                                    lineNumber: 95,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/games/e-digits/page.tsx",
                    lineNumber: 83,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300",
                                children: [
                                    mode === 'main' ? 'Main Mode' : 'Practice Mode',
                                    mode === 'practice' && gameState.practiceRevealedCount > 0 && ` • ${gameState.practiceRevealedCount} digits revealed`
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/games/e-digits/page.tsx",
                                lineNumber: 111,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                            lineNumber: 110,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-300 mb-2",
                                    children: "Type the digits of e (Euler's number) one at a time."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/games/e-digits/page.tsx",
                                    lineNumber: 120,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-400",
                                    children: [
                                        "Starts with ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-purple-300",
                                            children: "2."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                                            lineNumber: 124,
                                            columnNumber: 29
                                        }, this),
                                        " — you begin with the first digit after the decimal."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/games/e-digits/page.tsx",
                                    lineNumber: 123,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                            lineNumber: 119,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-6 border border-white/20",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg text-gray-400",
                                                children: "Current Score"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/games/e-digits/page.tsx",
                                                lineNumber: 131,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-5xl font-bold text-white mt-2",
                                                children: score
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/games/e-digits/page.tsx",
                                                lineNumber: 132,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/games/e-digits/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 17
                                    }, this),
                                    personalBest > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-purple-300",
                                            children: [
                                                "Personal Best (",
                                                mode === 'main' ? 'Main' : 'Practice',
                                                "): ",
                                                personalBest
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                                            lineNumber: 137,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/games/e-digits/page.tsx",
                                        lineNumber: 136,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-xl sm:text-2xl tracking-wider text-white break-all leading-relaxed",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-purple-300",
                                                children: "2."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/games/e-digits/page.tsx",
                                                lineNumber: 144,
                                                columnNumber: 19
                                            }, this),
                                            mode === 'practice' && gameState.practiceRevealedCount > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    gameState.currentIndex > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-green-400",
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$e$2d$digits$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E_DIGITS"].slice(0, gameState.currentIndex)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/games/e-digits/page.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 25
                                                    }, this),
                                                    gameState.currentIndex < gameState.practiceRevealedCount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-500",
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$e$2d$digits$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E_DIGITS"].slice(gameState.currentIndex, gameState.practiceRevealedCount)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/games/e-digits/page.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true) : /* Main mode or no revealed digits - just show entered */ enteredDigits.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-green-400",
                                                children: enteredDigits
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/games/e-digits/page.tsx",
                                                lineNumber: 159,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "animate-pulse",
                                                children: "|"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/games/e-digits/page.tsx",
                                                lineNumber: 162,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/games/e-digits/page.tsx",
                                        lineNumber: 143,
                                        columnNumber: 17
                                    }, this),
                                    mode === 'practice' && gameState.currentIndex >= gameState.practiceRevealedCount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-yellow-400 mt-4",
                                        children: "You've entered all revealed digits. Continue from memory!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/games/e-digits/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 19
                                    }, this),
                                    mode === 'practice' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 flex items-center justify-center gap-3 p-3 bg-black/20 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-gray-400",
                                                children: "Show"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/games/e-digits/page.tsx",
                                                lineNumber: 173,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                inputMode: "numeric",
                                                pattern: "[0-9]*",
                                                min: "0",
                                                max: "999",
                                                value: gameState.practiceRevealedCount,
                                                onChange: (e)=>{
                                                    const val = parseInt(e.target.value) || 0;
                                                    setGameState((prev)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$game$2d$logic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updatePracticeRevealedCount"])(prev, val));
                                                },
                                                onFocus: ()=>setIsInputFocused(true),
                                                onBlur: ()=>setIsInputFocused(false),
                                                className: "w-20 px-3 py-2 bg-black/30 border border-gray-600 rounded-lg text-white text-center font-mono focus:outline-none focus:border-purple-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/games/e-digits/page.tsx",
                                                lineNumber: 174,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-gray-400",
                                                children: "digits"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/games/e-digits/page.tsx",
                                                lineNumber: 189,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/games/e-digits/page.tsx",
                                        lineNumber: 172,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/games/e-digits/page.tsx",
                                lineNumber: 129,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                            lineNumber: 128,
                            columnNumber: 13
                        }, this),
                        mode === 'main' && gameState.isGameOver && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-red-500/20 border border-red-500/50 rounded-xl p-6 text-center mb-6",
                            children: gameState.isWon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-green-400 mb-2",
                                        children: "Incredible! You won!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/games/e-digits/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-300",
                                        children: "You memorized all 1000 digits of e!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/games/e-digits/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-red-400 mb-2",
                                        children: "Game Over!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/games/e-digits/page.tsx",
                                        lineNumber: 208,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-300 mb-2",
                                        children: [
                                            "You entered",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-red-300 text-xl",
                                                children: gameState.wrongDigit
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/games/e-digits/page.tsx",
                                                lineNumber: 213,
                                                columnNumber: 23
                                            }, this),
                                            " ",
                                            "but should have entered",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-green-300 text-xl",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$e$2d$digits$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E_DIGITS"][gameState.currentIndex]
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/games/e-digits/page.tsx",
                                                lineNumber: 217,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/games/e-digits/page.tsx",
                                        lineNumber: 211,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-400",
                                        children: [
                                            "Score: ",
                                            score,
                                            " digit",
                                            score !== 1 ? "s" : "",
                                            " of e memorized"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/games/e-digits/page.tsx",
                                        lineNumber: 221,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                            lineNumber: 196,
                            columnNumber: 15
                        }, this),
                        mode === 'practice' && practiceWrongDigit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-4 text-center mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-300",
                                    children: [
                                        "You entered",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-red-300 text-xl",
                                            children: practiceWrongDigit
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                                            lineNumber: 233,
                                            columnNumber: 19
                                        }, this),
                                        " ",
                                        "but should have entered",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-green-300 text-xl",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2f$e$2d$digits$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E_DIGITS"][gameState.currentIndex]
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                                            lineNumber: 237,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/games/e-digits/page.tsx",
                                    lineNumber: 231,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-400 mt-2",
                                    children: "Keep practicing! Try again."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/games/e-digits/page.tsx",
                                    lineNumber: 241,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                            lineNumber: 230,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: resetGame,
                                className: "px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors",
                                children: mode === 'main' && gameState.isGameOver ? "Play Again" : "Change Mode"
                            }, void 0, false, {
                                fileName: "[project]/src/app/games/e-digits/page.tsx",
                                lineNumber: 248,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/games/e-digits/page.tsx",
                            lineNumber: 247,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/games/e-digits/page.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/games/e-digits/page.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__91bb25f0._.js.map