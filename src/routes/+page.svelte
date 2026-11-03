<script lang="ts">
    import { onMount } from "svelte";
    import { fly, slide, scale } from "svelte/transition";

    import TopLeftBottomRightCutButton from "#lib/components/top-left-bottom-right-cut-button.svelte";
    import Modal from "#lib/components/modal.svelte";
    import { languageSince } from "#lib/data/language-since";
    import { elapsedSince } from "#lib/utils/elapsed";
    import {
        Csharp,
        Discord,
        Facebook,
        Github,
        Go,
        Java,
        JavaScript,
        Kotlin,
        Link,
        Php,
        Python,
        Rust,
        Steam,
        Youtube,
        Zig
    } from "#lib/icons";

    const email = "admin@lebenoa.com";

    const baseDuration = 300;

    let prefersReducedMotion = $state(false);
    const duration = $derived(prefersReducedMotion ? 0 : baseDuration);

    onMount(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => {
            prefersReducedMotion = query.matches;
        };

        now = new Date();
        update();
        query.addEventListener("change", update);

        return () => query.removeEventListener("change", update);
    });

    let now = $state(new Date());
    let activeTab = $state(0);
    let mobileNavModal = $state(false);
    let emailCopiedState = $state(false);
    let copyStatus = $state("");

    async function copyEmail() {
        if (emailCopiedState) return;

        try {
            await navigator.clipboard.writeText(email);
            emailCopiedState = true;
            copyStatus = "Email address copied to clipboard";
            setTimeout(() => {
                emailCopiedState = false;
                copyStatus = "";
            }, 3000);
        } catch {
            copyStatus = "Could not copy the email address; please select and copy it manually";
        }
    }

    function sinceFor(label: string): string | undefined {
        const since = languageSince[label];

        if (!since) return undefined;

        const month = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" });

        return `Since ${month.format(new Date(since))}`;
    }

    function durationFor(label: string): string {
        const since = languageSince[label];
        return since ? elapsedSince(since, now) : "";
    }
</script>

<a
    class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-30 focus:bg-cyan-500 focus:px-4 focus:py-2 focus:font-bold focus:text-black"
    href="#main-content">Skip to main content</a
>

<Modal
    bind:open={mobileNavModal}
    label="Sections"
    bodyClass="flex flex-col gap-2"
    outsideButtonClass="backdrop-blur"
>
    <TopLeftBottomRightCutButton
        active={activeTab == 0}
        aria-pressed={activeTab == 0}
        cutCorner={50}
        width={300}
        onclick={() => {
            activeTab = 0;
            mobileNavModal = false;
        }}
    >
        <span class="mr-1 text-green-500">&gt;</span><span class="text-orange-500">cat</span> introduction.txt
    </TopLeftBottomRightCutButton>
    <TopLeftBottomRightCutButton
        active={activeTab == 1}
        aria-pressed={activeTab == 1}
        cutCorner={50}
        width={300}
        onclick={() => {
            activeTab = 1;
            mobileNavModal = false;
        }}
    >
        <span class="mr-1 text-green-500">&gt;</span><span class="text-orange-500">ls</span> programming-exp
    </TopLeftBottomRightCutButton>
    <TopLeftBottomRightCutButton
        active={activeTab == 2}
        aria-pressed={activeTab == 2}
        cutCorner={50}
        width={300}
        onclick={() => {
            activeTab = 2;
            mobileNavModal = false;
        }}
    >
        <span class="mr-1 text-green-500">&gt;</span><span class="text-orange-500">ls</span> third-parties-exp
    </TopLeftBottomRightCutButton>
    <TopLeftBottomRightCutButton
        active={activeTab == 3}
        aria-pressed={activeTab == 3}
        cutCorner={50}
        width={300}
        onclick={() => {
            activeTab = 3;
            mobileNavModal = false;
        }}
    >
        <span class="mr-1 text-green-500">&gt;</span><span class="text-orange-500">ls</span> my-works
    </TopLeftBottomRightCutButton>
</Modal>

<nav aria-label="Sections">
    <div class="hidden lg:flex lg:flex-row lg:justify-center">
        <TopLeftBottomRightCutButton
            active={activeTab == 0}
            aria-pressed={activeTab == 0}
            cutCorner={50}
            width={280}
            textStyle="text-lg"
            onclick={() => {
                activeTab = 0;
            }}
        >
            <span class="mr-1 text-green-500">&gt;</span><span class="text-orange-500">cat</span> introduction.txt
        </TopLeftBottomRightCutButton>
        <TopLeftBottomRightCutButton
            active={activeTab == 1}
            aria-pressed={activeTab == 1}
            cutCorner={50}
            width={280}
            textStyle="text-lg"
            buttonStyle={"ml-[-47px]"}
            onclick={() => {
                activeTab = 1;
            }}
        >
            <span class="mr-1 text-green-500">&gt;</span><span class="text-orange-500">ls</span> programming-exp
        </TopLeftBottomRightCutButton>
        <TopLeftBottomRightCutButton
            active={activeTab == 2}
            aria-pressed={activeTab == 2}
            cutCorner={50}
            width={280}
            textStyle="text-lg"
            buttonStyle={"ml-[-47px]"}
            onclick={() => {
                activeTab = 2;
            }}
        >
            <span class="mr-1 text-green-500">&gt;</span><span class="text-orange-500">ls</span> third-parties-exp
        </TopLeftBottomRightCutButton>
        <TopLeftBottomRightCutButton
            active={activeTab == 3}
            aria-pressed={activeTab == 3}
            cutCorner={50}
            width={280}
            textStyle="text-lg"
            buttonStyle={"ml-[-47px]"}
            onclick={() => {
                activeTab = 3;
            }}
        >
            <span class="mr-1 text-green-500">&gt;</span><span class="text-orange-500">ls</span> my-works
        </TopLeftBottomRightCutButton>
    </div>
    <div class="relative flex w-full justify-center py-2 lg:hidden">
        <TopLeftBottomRightCutButton
            active={false}
            cutCorner={50}
            width={300}
            aria-haspopup="dialog"
            aria-expanded={mobileNavModal}
            onclick={() => {
                mobileNavModal = true;
            }}
        >
            {#if activeTab == 0}
                <span class="mr-1 text-green-500">&gt;</span><span class="text-orange-500">cat</span
                > introduction.txt
            {:else if activeTab == 1}
                <span class="mr-1 text-green-500">&gt;</span><span class="text-orange-500">ls</span>
                programming-exp
            {:else if activeTab == 2}
                <span class="mr-1 text-green-500">&gt;</span><span class="text-orange-500">ls</span>
                third-parties-exp
            {:else if activeTab == 3}
                <span class="mr-1 text-green-500">&gt;</span><span class="text-orange-500">ls</span>
                my-works
            {/if}
        </TopLeftBottomRightCutButton>
    </div>
</nav>

<main id="main-content" tabindex="-1">
    {#if activeTab == 0}
        <div
            class="mx-auto my-2 flex h-fit w-[98%] flex-col items-center px-4 text-white shadow-lg shadow-black backdrop-blur-md backdrop-brightness-[90%] md:w-2/3 lg:h-3/4 lg:w-2/3"
            in:slide={{ duration, delay: duration }}
            out:slide={{ duration }}
        >
            <div class="my-4 flex w-full flex-row items-center justify-between gap-4 p-4">
                <div class="w-2/3">
                    <h1
                        class="mb-2 text-center text-5xl font-bold"
                        in:fly={{ y: -100, duration, delay: duration }}
                        out:fly={{ y: -100, duration }}
                    >
                        Hello there! I'm
                        <span
                            class="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent"
                        >
                            Lebenoa
                        </span>!
                    </h1>
                    <p
                        class="text-center text-xl text-gray-400"
                        in:fly={{ x: -100, duration, delay: duration }}
                        out:fly={{ x: -100, duration }}
                    >
                        I code for fun! Initially, I have no interest in coding but, back then, no
                        one was maintaining our website, so it start by me learning my way to
                        maintain that website. Eventually ended up find coding fun probably because
                        it's like a game where you solve problem after problem
                    </p>
                </div>
                <img
                    in:scale={{ duration, delay: duration }}
                    out:scale={{ duration }}
                    class="h-auto w-[130px] self-start md:w-[200px] md:self-center"
                    src="https://cdn.discordapp.com/avatars/572446728759017472/2f8ca3270a849789da4c23e453209fcc.png?size=2048"
                    width="200"
                    height="200"
                    alt="Lebenoa's avatar"
                />
            </div>
            <h2
                class="mt-4 text-4xl font-bold"
                in:fly={{ x: 100, duration, delay: duration }}
                out:fly={{ x: 100, duration }}
            >
                Contact Me
            </h2>
            <div
                class="mt-4 flex w-full flex-row flex-wrap justify-evenly"
                in:scale={{ duration: duration + 500, delay: duration }}
                out:scale={{ duration }}
            >
                <a
                    class="flex h-fit w-fit flex-col items-center border border-transparent px-8 py-6 transition-colors duration-200 active:border-cyan-500 active:bg-cyan-500/25 lg:hover:border-cyan-500 lg:hover:bg-cyan-500/25"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://r.lebenoa.com/facebook"
                >
                    <img class="mb-2 h-24 w-auto" src={Facebook} alt="" aria-hidden="true" />
                    <p class="text-lg">
                        Facebook<span class="sr-only"> (opens in a new tab)</span>
                    </p>
                </a>
                <a
                    class="flex h-fit w-fit flex-col items-center border border-transparent px-8 py-6 transition-colors duration-200 active:border-cyan-500 active:bg-cyan-500/25 lg:hover:border-cyan-500 lg:hover:bg-cyan-500/25"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://r.lebenoa.com/youtube"
                >
                    <img class="mb-2 h-24 w-auto" src={Youtube} alt="" aria-hidden="true" />
                    <p class="text-lg">
                        YouTube<span class="sr-only"> (opens in a new tab)</span>
                    </p>
                </a>
                <a
                    class="flex h-fit w-fit flex-col items-center border border-transparent px-8 py-6 transition-colors duration-200 active:border-cyan-500 active:bg-cyan-500/25 lg:hover:border-cyan-500 lg:hover:bg-cyan-500/25"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://r.lebenoa.com/github"
                >
                    <img class="mb-2 h-24 w-auto" src={Github} alt="" aria-hidden="true" />
                    <p class="text-lg">
                        GitHub<span class="sr-only"> (opens in a new tab)</span>
                    </p>
                </a>
                <a
                    class="flex h-fit w-fit flex-col items-center border border-transparent px-8 py-6 transition-colors duration-200 active:border-cyan-500 active:bg-cyan-500/25 lg:hover:border-cyan-500 lg:hover:bg-cyan-500/25"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://r.lebenoa.com/steam"
                >
                    <img class="mb-2 h-24 w-auto" src={Steam} alt="" aria-hidden="true" />
                    <p class="text-lg">
                        Steam<span class="sr-only"> (opens in a new tab)</span>
                    </p>
                </a>
                <a
                    class="flex h-fit w-fit flex-col items-center border border-transparent px-8 py-6 transition-colors duration-200 active:border-cyan-500 active:bg-cyan-500/25 lg:hover:border-cyan-500 lg:hover:bg-cyan-500/25"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://r.lebenoa.com/discord"
                >
                    <img class="mb-2 h-24 w-auto" src={Discord} alt="" aria-hidden="true" />
                    <p class="text-lg">
                        Discord Server<span class="sr-only"> (opens in a new tab)</span>
                    </p>
                </a>
            </div>
            <p class="my-auto text-xl font-bold">OR</p>
            <button
                class="relative my-auto h-fit cursor-pointer border border-transparent px-4 py-2 text-lg transition-colors duration-200 active:border-cyan-500 active:bg-cyan-500/25 lg:hover:border-cyan-500 lg:hover:bg-cyan-500/25"
                type="button"
                title="Click to copy!"
                onclick={copyEmail}
                in:fly={{ y: 100, duration: duration + 1000, delay: duration }}
                out:fly={{ y: 100, duration }}
            >
                <span class="font-bold">Email:</span>
                {email}
                <span class="sr-only" role="status" aria-atomic="true">{copyStatus}</span>
                {#if emailCopiedState}
                    <div
                        class="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-green-500 text-lg font-bold text-black"
                        aria-hidden="true"
                        in:scale={{ duration }}
                        out:scale={{ duration }}
                    >
                        Copied!
                    </div>
                {/if}
            </button>
        </div>
    {:else if activeTab == 1}
        <div
            class="mx-auto mt-2 mb-4 flex h-fit w-[98%] flex-col items-center px-4 text-white shadow-lg shadow-black backdrop-blur-md backdrop-brightness-[90%] md:w-2/3 lg:w-1/2 xl:w-2/3 2xl:w-1/3"
            in:slide={{ duration, delay: duration }}
            out:slide={{ duration }}
        >
            <h2 class="sr-only">Programming Experience</h2>
            <table
                class="table-auto border-separate border-spacing-x-4 border-spacing-y-2 xl:border-spacing-x-8 xl:border-spacing-y-4"
            >
                <caption class="sr-only">
                    Programming language experience, showing the time since the earliest repository
                    in that language
                </caption>
                <tbody>
                    <tr
                        in:fly={{ x: 100, duration, delay: duration }}
                        out:fly={{ x: 100, duration }}
                    >
                        <td><img class="h-16 w-auto" src={Csharp} alt="" aria-hidden="true" /></td>
                        <th scope="row" class="text-2xl">C#</th>
                        <td class="text-lg text-gray-400" title={sinceFor("C#")}>
                            {durationFor("C#")}
                        </td>
                    </tr>
                    <tr
                        in:fly={{ x: -100, duration, delay: duration + 100 }}
                        out:fly={{ x: -100, duration }}
                    >
                        <td><img class="h-16 w-auto" src={Go} alt="" aria-hidden="true" /></td>
                        <th scope="row" class="text-2xl">GO</th>
                        <td class="text-lg text-gray-400" title={sinceFor("GO")}>
                            {durationFor("GO")}
                        </td>
                    </tr>
                    <tr
                        in:fly={{ x: 100, duration, delay: duration + 200 }}
                        out:fly={{ x: 100, duration }}
                    >
                        <td><img class="h-16 w-auto" src={Java} alt="" aria-hidden="true" /></td>
                        <th scope="row" class="text-2xl">Java</th>
                        <td class="text-lg text-gray-400" title={sinceFor("Java")}>
                            {durationFor("Java")}
                        </td>
                    </tr>
                    <tr
                        in:fly={{ x: -100, duration, delay: duration + 300 }}
                        out:fly={{ x: -100, duration }}
                    >
                        <td
                            ><img
                                class="h-16 w-auto"
                                src={JavaScript}
                                alt=""
                                aria-hidden="true"
                            /></td
                        >
                        <th scope="row" class="text-2xl">JavaScript</th>
                        <td class="text-lg text-gray-400" title={sinceFor("JavaScript")}>
                            {durationFor("JavaScript")}
                        </td>
                    </tr>
                    <tr
                        in:fly={{ x: 100, duration, delay: duration + 400 }}
                        out:fly={{ x: 100, duration }}
                    >
                        <td><img class="h-16 w-auto" src={Kotlin} alt="" aria-hidden="true" /></td>
                        <th scope="row" class="text-2xl">Kotlin</th>
                        <td class="text-lg text-gray-400" title={sinceFor("Kotlin")}>
                            {durationFor("Kotlin")}
                        </td>
                    </tr>
                    <tr
                        in:fly={{ x: -100, duration, delay: duration + 500 }}
                        out:fly={{ x: -100, duration }}
                    >
                        <td><img class="h-16 w-auto" src={Php} alt="" aria-hidden="true" /></td>
                        <th scope="row" class="text-2xl">PHP</th>
                        <td class="text-lg text-gray-400" title={sinceFor("PHP")}>
                            {durationFor("PHP")}
                        </td>
                    </tr>
                    <tr
                        in:fly={{ x: 100, duration, delay: duration + 600 }}
                        out:fly={{ x: 100, duration }}
                    >
                        <td><img class="h-16 w-auto" src={Python} alt="" aria-hidden="true" /></td>
                        <th scope="row" class="text-2xl">Python</th>
                        <td class="text-lg text-gray-400" title={sinceFor("Python")}>
                            {durationFor("Python")}
                        </td>
                    </tr>
                    <tr
                        in:fly={{ x: -100, duration, delay: duration + 700 }}
                        out:fly={{ x: -100, duration }}
                    >
                        <td><img class="h-16 w-auto" src={Rust} alt="" aria-hidden="true" /></td>
                        <th scope="row" class="text-2xl">Rust</th>
                        <td class="text-lg text-gray-400" title={sinceFor("Rust")}>
                            {durationFor("Rust")}
                        </td>
                    </tr>
                    <tr
                        in:fly={{ x: 100, duration, delay: duration + 800 }}
                        out:fly={{ x: 100, duration }}
                    >
                        <td><img class="h-16 w-auto" src={Zig} alt="" aria-hidden="true" /></td>
                        <th scope="row" class="text-2xl">Zig</th>
                        <td class="text-lg text-gray-400" title={sinceFor("Zig")}>
                            {durationFor("Zig")}
                        </td>
                    </tr>
                </tbody>
            </table>
            <p
                class="py-4"
                in:fly={{ x: -100, duration, delay: duration + 900 }}
                out:fly={{ x: 100, duration }}
            >
                <strong class="text-xl">NOTE:&nbsp;</strong>
                <code class="bg-indigo-600 p-1 font-bold text-white">TypeScript</code>
                is a VS Code Extension so it does
                <strong class="text-xl text-red-500">NOT</strong> count
            </p>
        </div>
    {:else if activeTab == 2}
        <div
            class="mx-auto my-2 flex h-fit w-[98%] flex-col items-center px-4 text-white shadow-lg shadow-black backdrop-blur-md backdrop-brightness-[90%] md:w-2/3 lg:h-3/4 lg:w-2/3"
            in:slide={{ duration, delay: duration }}
            out:slide={{ duration }}
        >
            <h2 class="text-4xl font-bold text-red-500 underline">Under Construction</h2>
        </div>
    {:else if activeTab == 3}
        <div
            class="mx-auto my-2 flex h-fit w-[98%] flex-col items-center px-4 py-6 text-white shadow-lg shadow-black backdrop-blur-md backdrop-brightness-[90%] md:w-2/3 lg:h-3/4 lg:w-2/3"
            in:slide={{ duration, delay: duration }}
            out:slide={{ duration }}
        >
            <h2
                class="mt-4 text-4xl font-bold"
                in:fly={{ x: 100, duration, delay: duration }}
                out:fly={{ x: 100, duration }}
            >
                My Works
            </h2>
            <p
                class="mt-2 max-w-2xl text-center text-xl text-gray-400"
                in:fly={{ x: -100, duration, delay: duration }}
                out:fly={{ x: -100, duration }}
            >
                A collection of the things I have built and worked on lives over at
                <code class="bg-indigo-600 p-1 font-bold text-white">cr.lebenoa.com</code>
            </p>
            <a
                class="mt-8 flex h-fit w-fit flex-col items-center border border-transparent px-8 py-6 transition-colors duration-200 active:border-cyan-500 active:bg-cyan-500/25 lg:hover:border-cyan-500 lg:hover:bg-cyan-500/25"
                target="_blank"
                rel="noopener noreferrer"
                href="https://cr.lebenoa.com"
                in:scale={{ duration, delay: duration + 500 }}
                out:scale={{ duration }}
            >
                <img class="mb-2 h-24 w-auto" src={Link} alt="" aria-hidden="true" />
                <p class="text-lg">
                    cr.lebenoa.com<span class="sr-only"> (opens in a new tab)</span>
                </p>
            </a>
        </div>
    {/if}
</main>

<style>
    td,
    th {
        text-align: center;
    }
    th {
        font-weight: normal;
    }
    td img {
        margin-inline: auto;
    }
</style>
